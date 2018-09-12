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

    class ViewModel {
        constructor({withPrivateData, withPublicData}, context) {
            this._withPrivateData = withPrivateData;
            this._withPublicData = withPublicData;
            this.authorized = context.$root.authorized;

            this.withPrivateData = ko.pureComputed(() => {
                if (!this.authorized()) {
                    return false;
                }
                return this._withPrivateData();
            });

            this.withPublicData = ko.pureComputed(() => {
                if (!this.authorized()) {
                    return true;
                }
                return this._withPublicData;
            });
        }
        togglePrivateData() {
            if (this._withPublicData()) {
                this._withPrivateData(!this._withPrivateData());
            }
        }
        togglePublicData() {
            if (this._withPrivateData()) {
                this._withPublicData(!this._withPublicData());
            }
        }
    }

    function buildPrivacyTable() {
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
                            [styles.classes.activeFilterInput]: 'withPrivateData()'
                        },
                        click: 'function(d,e){$component.togglePrivateData.call($component,d,e);}'
                    }
                }, [
                    div({
                        class: '-cell'
                    },
                    span({
                        class: 'fa',
                        dataBind: {
                            style: {
                                color: 'withPublicData() && authorized() ? "#000" : "#AAA"'
                            },
                            css: {
                                'fa-check-square-o': 'withPrivateData()',
                                'fa-square-o': '!withPrivateData()'
                            }
                        }
                    })
                    ),
                    div({
                        class: '-cell'
                    }, 'Private Data')
                ]),
                div({
                    class: '-row',
                    dataBind: {
                        css: {
                            [styles.classes.activeFilterInput]: 'withPublicData()'
                        },
                        click: 'function(d,e){$component.togglePublicData($component,d,e);}'
                    }
                }, [
                    div({
                        class: '-cell'
                    },
                    span({
                        class: 'fa',
                        dataBind: {
                            style: {
                                color: 'withPrivateData() && authorized() ? "#000" : "#AAA"'
                            },
                            css: {
                                'fa-check-square-o': 'withPublicData()',
                                'fa-square-o': '!withPublicData()'
                            }
                        }
                    })
                    ),
                    div({
                        class: '-cell'
                    }, 'Public Data')
                ])
            ]))
        ]);
    }

    function template() {
        return div({
            class: 'component'
        }, buildPrivacyTable());
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: styles.sheet
        };
    }

    return reg.registerComponent(component);
});