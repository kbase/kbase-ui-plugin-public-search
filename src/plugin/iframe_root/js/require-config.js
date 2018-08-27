(function (global) {
    'use strict';

    global.require = {
        baseUrl: '/js',
        catchError: true,
        waitSeconds: 60,
        paths: {
            bluebird: 'vendor/bluebird/bluebird',
            bootstrap_css: 'vendor/bootstrap/bootstrap.css',
            bootstrap: 'vendor/bootstrap/bootstrap',
            jquery: 'vendor/jquery/jquery',
            'js-yaml': 'vendor/js-yaml',
            kb_lib: 'vendor/kbase-common-es6',
            kb_knockout: 'vendor/kbase-knockout-extensions-es6',
            'knockout-array-transforms': 'vendor/knockout-array-transforms/knockout-array-transforms',
            knockout: 'vendor/knockout/knockout',
            marked: 'vendor/marked/marked',
            moment: 'vendor/moment/moment',
            numeral: 'vendor/numeral/numeral',
            uuid: 'vendor/pure-uuid/uuid',
            require: 'vendor/requirejs/require',
            text: 'vendor/requirejs-text/text',
            vega: 'vendor/vega/vega',
            yaml: 'vendor/requirejs-yaml/yaml'
        },
        shim: {
            bootstrap: {
                deps: ['jquery', 'css!bootstrap_css']
            }
        }
    };

}(window));