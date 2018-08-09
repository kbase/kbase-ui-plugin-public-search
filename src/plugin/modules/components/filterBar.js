define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    './accessControl',
    './dataSource',
    './dataTypesControl'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    AccessControlComponent,
    DataSourceComponent,
    DataTypesControlComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            const {withPrivateData, withPublicData, withUserData, withReferenceData, dataTypes} = params;

            this.withPrivateData = withPrivateData;
            this.withPublicData = withPublicData;
            this.withUserData = withUserData;
            this.withReferenceData = withReferenceData;
            this.dataTypes = dataTypes;
        }
    }

    const styles = html.makeStyles({
        component: {
            css: {
                // flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '10px'
            }
        },
        toolbar: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row',
                marginBottom: '10px',
                alignItems: 'center'
            }
        },
        cell: {
            css: {
                padding: '4px'
            }
        }
    });

    function template() {
        return div({
            class: styles.classes.component
        }, [
            div({
                class: styles.classes.toolbar,
                style: {
                    // flex: '1',
                    // display: 'flex',
                    // flexDirection: 'row',
                    // alignItems: 'center',
                    // justifyContent: 'flex-end'
                }
            }, [
                // div({
                //     style: {
                //         // flex: 'auto',
                //         display: 'flex',
                //         flexDirection: 'row',
                //         alignItems: 'center',
                //         justifyContent: 'flex-end'
                //     },
                //     dataBind: {
                //         component: {
                //             name: AccessControlComponent.quotedName(),
                //             params: {
                //                 withPrivateData: 'withPrivateData',
                //                 withPublicData: 'withPublicData',
                //             }
                //         }
                //     }
                // }),
                div({
                    style: {
                        // flex: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginLeft: '10px'
                    },
                    dataBind: {
                        component: {
                            name: DataSourceComponent.quotedName(),
                            params: {
                                withUserData: 'withUserData',
                                withReferenceData: 'withReferenceData'
                            }
                        }
                    }
                }),
                div({
                    style: {
                        flex: '1 1 0px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginLeft: '10px'
                    },
                    dataBind: {
                        component: {
                            name: DataTypesControlComponent.quotedName(),
                            params: {
                                dataTypes: 'dataTypes'
                            }
                        }
                    }
                })
            ])
        ]);
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