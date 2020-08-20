/*eslint-env node */
/*eslint strict: ["error", "global"] */
'use strict';

var Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs-extra')),
    yaml = require('js-yaml'),
    glob = Promise.promisify(require('glob').Glob),
    chalk = require('chalk'),
    numeral = require('numeral');

function timestamp() {
    return new Date().toISOString();
}

function log(msg) {
    var line = 'INFO: '+ timestamp() + ': ' + msg;
    var chalked = chalk.blue(line);
    process.stdout.write(chalked);
    process.stdout.write('\n');
}

function warn(msg) {
    var line = 'WARN: '+ timestamp() + ': ' + msg;
    var chalked = chalk.yellow(line);
    process.stdout.write(chalked);
    process.stdout.write('\n');
}

function success(msg) {
    var line = '✔   : '+ timestamp() + ': ' + msg;
    var chalked = chalk.green(line);
    process.stdout.write(chalked);
    process.stdout.write('\n');
}

function makeModuleVFS(state) {
    var root = state.path,
        buildPath = root.concat(['src', 'plugin', 'iframe_root', 'dist']),
        srcPath = root.concat(['src', 'plugin', 'iframe_root', 'js']);

    return glob(srcPath.concat(['**', '*']).join('/'), {
        nodir: true
    })
        .then(function (matches) {

            // just read in file and build a giant map...
            var vfs = {
                scripts: {},
                resources: {
                    json: {},
                    text: {},
                    csv: {},
                    css: {}
                }
            };
            var vfsDest = buildPath.concat(['moduleVfs.js']);
            var skipped = {};

            function skip(ext) {
                if (!skipped[ext]) {
                    skipped[ext] = 1;
                } else {
                    skipped[ext] += 1;
                }
            }
            var included = {};

            function include(ext) {
                if (!included[ext]) {
                    included[ext] = 1;
                } else {
                    included[ext] += 1;
                }
            }

            function showStats(db) {
                Object.keys(db).map(function (key) {
                    return {
                        key: key,
                        count: db[key]
                    };
                })
                    .sort(function (a, b) {
                        return b.count - a.count;
                    })
                    .forEach(function (item) {
                        log(item.key + ':' + item.count);
                    });
            }
            var exceptions = [
                /\/modules\/plugins\/.*?\/iframe_root\//
            ];
            var cssExceptions = [
                /@import/,
                /@font-face/
            ];
            var supportedExtensions = ['js', 'yaml', 'yml', 'json', 'text', 'txt', 'css'];
            return Promise.all(matches)
                .mapSeries(function (match) {
                    var relativePath = match.split('/').slice(root.length + 2);
                    var path = '/' + relativePath.join('/');

                    // exclusion based on path pattern
                    if (exceptions.some(function (re) {
                        return (re.test(path));
                    })) {
                        skip('excluded');
                        return;

                    }

                    var m = /^(.*)\.([^.]+)$/.exec(path);

                    // bare files we don't support
                    if (!m) {
                        skip('no extension');
                        warn('module vfs cannot include file without extension: ' + path);
                    }
                    var base = m[1];
                    var ext = m[2];

                    // skip if in unsupported extensions
                    if (supportedExtensions.indexOf(ext) === -1) {
                        skip(ext);
                        return;
                    }

                    const actualPath = state.moduleRoot + path;

                    return fs.statAsync(match)
                        .then(function (stat) {
                            if (stat.size > 200000) {
                                warn('omitting file from bundle because too big: ' + numeral(stat.size).format('0.0b'));
                                warn('  ' + match);
                                warn('   don\'t worry, it is stil included in the build!');
                                skip('toobig');
                                return;
                            }
                            return fs.readFileAsync(match, 'utf8')
                                .then(function (contents) {

                                    switch (ext) {
                                    case 'js':
                                        include(ext);
                                        vfs.scripts[actualPath] = 'function () { ' + contents + ' }';
                                        break;
                                    case 'yaml':
                                    case 'yml':
                                        include(ext);
                                        vfs.resources.json[base] = yaml.safeLoad(contents);
                                        break;
                                    case 'json':
                                        if (vfs.resources.json[base]) {
                                            throw new Error('duplicate entry for json detected: ' + path);
                                        }
                                        try {
                                            include(ext);
                                            vfs.resources.json[base] = JSON.parse(contents);
                                        } catch (ex) {
                                            skip('error');
                                            console.error('Error parsing json file: ' + path + ':' + ex.message);
                                            // throw new Error('Error parsing json file: ' + path + ':' + ex.message);
                                        }
                                        break;
                                    case 'text':
                                    case 'txt':
                                        include(ext);
                                        vfs.resources.text[base] = contents;
                                        break;
                                    case 'css':
                                        if (cssExceptions.some(function (re) {
                                            return re.test(contents);
                                        })) {
                                            skip('css excluded');
                                        } else {
                                            include(ext);
                                            vfs.resources.css[base] = contents;
                                        }
                                        break;
                                    case 'csv':
                                        skip(ext);
                                        break;
                                    default:
                                        skip(ext);
                                    }
                                });
                        });
                })
                .then(function () {
                    log('vfs created');
                    log('skipped: ');
                    showStats(skipped);
                    log('included:');
                    showStats(included);
                    var modules = '{' + Object.keys(vfs.scripts).map(function (path) {
                        return '"' + path + '": ' + vfs.scripts[path];
                    }).join(', \n') + '}';
                    var script = [
                        'window.require_modules = ' + modules,
                        'window.require_resources = ' + JSON.stringify(vfs.resources, null, 4)
                    ].join(';\n');

                    fs.writeFileAsync(vfsDest.join('/'), script);
                });
        })
        .then(function () {
            return state;
        });
}

const state = {
    path: fs.realpathSync(process.cwd() + '/../').split('/'),
    moduleRoot: '/modules/plugins/public-search'
};

makeModuleVFS(state)
    .then((state) => {
        console.log('DONE');
    });