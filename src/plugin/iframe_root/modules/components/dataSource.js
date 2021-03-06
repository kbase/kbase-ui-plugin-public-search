define([
    'knockout',
    'kb_knockout/registry',
    'kb_lib/html'
], function (
    ko,
    reg,
    html
) {
    'use strict';

    class ViewModel {
        constructor({withUserData, withReferenceData}) {
            this.withUserData = withUserData;
            this.withReferenceData = withReferenceData;
        }
        toggleUserData() {
            if (this.withReferenceData()) {
                this.withUserData(!this.withUserData());
            }
        }
        toggleReferenceData() {
            if (this.withUserData()) {
                this.withReferenceData(!this.withReferenceData());
            }
        }
    }

    const t = html.tag,
        div = t('div'),
        span = t('span');

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
            css: {
                backgroundColor: 'rgba(209, 226, 255, 1)',
                color: '#000'
            },
            pseudo: {
                hover: {
                    backgroundColor: 'rgba(209, 226, 255, 0.5)',
                }
            }
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1.5em',
            marginBottom: '8px'
        },
        fieldGroup: {
            // marginBottom: '8px'
        },
        xtable: {
            css: {
                width: '100%',
                'border-spacing': '4px',
                'border-collapse': 'separate'
            },
            inner: {
                'tr': {
                    cursor: 'pointer'
                },
                'td:nth-child(1)': {
                    textAlign: 'center',
                    width: '1em'
                },
                'td:nth-child(2)': {
                    // width: '90%'
                }
            }
        },
        table: {
            css: {
                width: '100%',
                backgroundColor: '#FFF',
            },
            inner: {
                '.-header': {
                    fontStyle: 'italic',
                    color: 'rgba(0, 0, 0, 0.7)',
                    padding: '4px',
                    borderBottom: '1px silver solid',
                },
                '.-header > .-cell': {
                    display: 'inline-block'
                },
                '.-header > .-cell:nth-child(1)': {
                    width: '10%'
                },
                '.-header > .-cell:nth-child(2)': {
                    width: '90%'
                },
                '.-body-container': {
                    backgroundColor: 'rgba(255,255,255,1)',
                },
                '.-body > .-row': {
                    padding: '4px',
                    cursor: 'pointer',
                    height: '2em'
                },
                '.-body > .-row > .-cell': {
                    display: 'inline-block'
                },
                '.-body > .-row > .-cell:nth-child(1)': {
                    width: '10%'
                },
                '.-body > .-row > .-cell:nth-child(2)': {
                    width: '90%'
                }
            }
        },
    });

    function buildDataSourceTable() {
        return div({
            class: styles.classes.table
        }, [
            div({
                class: '-body-container'
            }, div({
                class: '-body'
            }, [
                div({
                    class: '-row',
                    dataBind: {
                        css: {
                            [styles.classes.activeFilterInput]: 'withUserData()'
                        },
                        click: 'function(d,e){$component.toggleUserData.call($component,d,e);}'
                    }
                }, [
                    div({
                        class: '-cell'
                    },
                    span({
                        class: 'fa',
                        dataBind: {
                            style: {
                                color: 'withReferenceData() ? "#000" : "#AAA"'
                            },
                            css: {
                                'fa-check-square-o': 'withUserData()',
                                'fa-square-o': '!withUserData()'
                            }
                        }
                    })
                    ),
                    div({
                        class: '-cell'
                    }, 'Narrative')
                ]),
                div({
                    class: '-row',
                    dataBind: {
                        css: {
                            [styles.classes.activeFilterInput]: 'withReferenceData()'
                        },
                        click: 'function(d,e){$component.toggleReferenceData($component,d,e);}'
                    }
                }, [
                    div({
                        class: '-cell'
                    },
                    span({
                        class: 'fa',
                        dataBind: {
                            style: {
                                color: 'withUserData() ? "#000" : "#AAA"'
                            },
                            css: {
                                'fa-check-square-o': 'withReferenceData()',
                                'fa-square-o': '!withReferenceData()'
                            }
                        }
                    })
                    ),
                    div({
                        class: '-cell'
                    }, 'Reference Data')
                ])
            ]))
        ]);
    }

    function template() {
        return div({
            class: 'component'
        }, buildDataSourceTable());
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