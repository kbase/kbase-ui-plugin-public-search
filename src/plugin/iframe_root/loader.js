define([], function () {
    'use strict';
    require.config({
        baseUrl: './modules',
        paths: {
            bluebird: 'vendor/bluebird/bluebird',
            bootstrap_css: 'vendor/bootstrap/css/bootstrap',
            bootstrap: 'vendor/bootstrap/bootstrap',
            css: 'vendor/require-css/css',
            dompurify: 'vendor/dompurify/purify',
            'font-awesome_css': 'vendor/font-awesome/css/font-awesome',
            jquery: 'vendor/jquery/jquery',
            'js-yaml': 'vendor/js-yaml/js-yaml',
            kb_common_ts: 'vendor/kbase-common-ts',
            kb_lib: 'vendor/kbase-common-es6',
            kb_knockout: 'vendor/kbase-knockout-extensions-es6',
            'knockout-arraytransforms': 'vendor/knockout-arraytransforms/knockout-arraytransforms',
            'knockout-mapping': 'vendor/bower-knockout-mapping/knockout.mapping',
            'knockout-projections': 'vendor/knockout-projections/knockout-projections',
            'knockout-switch-case': 'vendor/knockout-switch-case/knockout-switch-case',
            'knockout-validation': 'vendor/knockout-validation/knockout.validation',
            knockout: 'vendor/knockout/knockout',
            marked: 'vendor/marked/marked',
            moment: 'vendor/moment/moment',
            normalize_css: 'vendor/normalize-css/normalize',
            numeral: 'vendor/numeral/numeral',
            preact: 'vendor/preact/preact.umd',
            uuid: 'vendor/pure-uuid/uuid',
            require: 'vendor/requirejs/require',
            text: 'vendor/requirejs-text/text',
            yaml: 'vendor/requirejs-yaml/yaml'
        },
        shim: {
            bootstrap: {
                deps: ['jquery', 'css!bootstrap_css']
            }
        }
    });
});
