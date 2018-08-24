define([
    'knockout',
    'kb_knockout/registry',
    'kb_common/html'
], function (
    ko,
    reg,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        input = t('input'),
        label = t('label');

    const styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
        },
        searchArea: {
            flex: '0 0 50px'
        },
        filterArea: {
            flex: '0 0 50px',
            textAlign: 'left'
        },
        resultArea: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        activeFilterInput: {
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        modifiedFilterInput: {
            backgroundColor: 'rgba(255, 245, 158, 1)',
            color: '#000'
        },
        checkboxControl: {
            borderColor: 'transparent',
            boxShadow: 'none',
            margin: '0 2px',
            borderRadius: 'unset'
        },
        checkboxLabel: {
            fontWeight: 'normal',
            marginRight: '4px',
            marginLeft: '6px'
        },
        fieldGroupLabel: {
            fontWeight: 'bold',
            color: 'gray',
            // marginTop: '8px',
            // marginRight: '4px'
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1.5em',
            marginBottom: '8px'
        },
        fieldGroup: {
            marginBottom: '8px'
        }
    });

    class ViewModel {
        constructor({withUserData, withReferenceData}) {
            this.withUserData = withUserData;
            this.withReferenceData = withReferenceData;
        }
    }

    function buildControl() {
        return div([
            div({
                class: styles.classes.fieldGroup
            }, [
                span({
                    class: ['form-control', styles.classes.checkboxControl],
                    title: 'Search over data created by users in Narratives',
                    dataBind: {
                        css: 'withUserData() ? "' + styles.classes.activeFilterInput + '" : null'
                    }
                }, label({
                    class: styles.classes.checkboxLabel
                }, [
                    input({
                        type: 'checkbox',
                        dataBind: {
                            checked: 'withUserData',
                            enable: 'withReferenceData'
                        }
                    }),
                    ' Narratives'
                ]))
            ]),
            div({
                class: styles.classes.fieldGroup
            }, [
                span({
                    class: ['form-control', styles.classes.checkboxControl],
                    title: 'Search over reference data',
                    dataBind: {
                        css: 'withReferenceData() ? "' + styles.classes.activeFilterInput + '" : null'
                    }
                }, label({
                    class: styles.classes.checkboxLabel
                }, [
                    input({
                        type: 'checkbox',
                        dataBind: {
                            checked: 'withReferenceData',
                            enable: 'withUserData'
                        }
                    }),
                    ' Reference Data'
                ]))
            ])
        ]);
    }

    function template() {
        return div({
            class: 'component'
        }, buildControl());
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});