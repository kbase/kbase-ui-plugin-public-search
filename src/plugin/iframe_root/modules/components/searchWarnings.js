define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    class ViewModel {
        constructor() {

            this.warnings = ko.observableArray();
            this.inputWarnings = ko.pureComputed(function () {
                var terms = searchTerms();
                switch (terms.diagnosis) {
                case 'just-whitespace':
                    return [
                        'Empty search input.',
                        'You must supply one or more terms to initiate a query.'
                    ];
                case 'just-stopwords':
                    // TODO: i'd like to have emphasis on these words, but we need to
                    // sanitize them first...
                    return [
                        'The search consisted of just "stop words".',
                        'Stop words are considered too common to be usefully applied to a search.',
                        'The following stop words were detected: ' + terms.theStopWords.join(', ') + '.'
                    ];
                case 'some-stopwords':
                    // TODO: i'd like to have emphasis on these words, but we need to
                    // sanitize them first...
                    return [
                        'The search included some "stop words".',
                        'Stop words are considered too common to be usefully applied to a search ' +
                        'and are removed from the terms before submitting the query.',
                        'The following stop words were detected and removed: ' + terms.theStopWords.join(', ') + '.',
                        'The terms sent were: ' + terms.terms.join(' ')
                    ];
                }
                return [];
            });
        }

        doClearWarnings() {
            this.warnings.removeAll();
        }
    }

    const t = html.tag,
        button = t('button'),
        div = t('div');

    const style = html.makeStyles({
        warningContainer: {
            css: {
                display: 'block',
                position: 'absolute',
                border: '1px silver solid',
                // from bootstrap's bg-warning default color
                backgroundColor: '#fcf8e3',
                zIndex: '3',
                top: '100%',
                left: '0',
                right: '0'
            }
        }
    })

    function template() {
        return gen.if('warnings().length',
            div({
                class: style.classes.warningContainer,
            }, [

                div({
                    dataBind: {
                        foreach: 'warnings'
                    }
                }, div({
                    style: {
                        marginTop: '2px',
                        marginBottom: '2px',
                        padding: '3px'
                    },
                    dataBind: {
                        text: '$data'
                    }
                })),
                div({
                    style: {
                        borderTop: '1px solid rgba(200,200,200,0.5)',
                        padding: '3px',
                        textAlign: 'center'
                    }
                }, [
                    button({
                        class: 'btn btn-default btn-sm',
                        type:  'button',
                        dataBind: {
                            click: 'function(){$component.doClearWarnings.call($component)}'
                        }
                    }, 'Clear')
                ])
            ]));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});