/*eslint-env node*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            nodeModules: {
                expand: true,
                flatten: true,
                src: 'node_modules/vega-lib/build/vega.js',
                dest: 'src/plugin/iframe_root/js/vendor/vega'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

};