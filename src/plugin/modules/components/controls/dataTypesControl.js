define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        label = t('label'),
        select = t('select'),
        option = t('option'),
        button = t('button');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            const {dataTypes} = params;
            this.dataTypes = dataTypes;

            this.supportedDataTypes = context.$root.supportedDataTypes;

            this.selectedDataTypes = ko.observableArray();
            this.selectedDataType = ko.observable();

            this.selectionLabel = ko.pureComputed(() => {
                const len = this.selectedDataTypes().length;
                if (len === 0) {
                    return 'All data types';
                }
                return len + ' types selected';
            });

            this.availableDataTypes = [
                {
                    value: '_select_',
                    label: this.selectionLabel,
                    enabled: ko.observable(true)
                }
            ].concat(this.supportedDataTypes.map((type) => {
                return {
                    value: type.value,
                    label: type.label,
                    enabled: ko.observable(true)
                };
            }));

            this.subscribe(this.selectedDataTypes, (newValue) => {
                if (newValue.length === 0) {
                    this.dataTypes.removeAll();
                }
                const types = newValue.map((type) => {
                    return type.value;
                });
                this.dataTypes(types);
            });

            this.availableDataTypesMap = this.availableDataTypes.reduce((m, item) => {
                m[item.value] = item;
                return m;
            }, {});

            this.dataTypeInput = ko.observable('_select_');
        }

        doSelectDataType() {
            const selected = this.availableDataTypesMap[this.dataTypeInput()];
            if (selected.value === '_select_') {
                return;
            }
            if (!selected.enabled()) {
                this.selectedDataTypes.remove(selected);
                selected.enabled(true);
            } else {
                this.selectedDataTypes.push(selected);
                selected.enabled(false);
            }
            this.dataTypeInput('_select_');
        }

        doUnselectDataType(data) {
            this.selectedDataTypes.remove(data);
            data.enabled(true);
        }

        doRemoveDataType(data) {
            this.selectedDataTypes.remove(data);
            data.enabled(true);
        }

        doClearSelectedDataTypes() {
            this.selectedDataTypes().forEach((type) => {
                type.enabled(true);
            });
            this.selectedDataTypes.removeAll();
        }
    }

    var styles = html.makeStyles({
        component: {
            flex: '1 1 0px',
            display: 'flex',
            flexDirection: 'column'
        },
        activeFilterInput: {
            backgroundColor: 'rgba(209, 226, 255, 1)',
            color: '#000'
        },
        fieldGroupLabel: {
            fontWeight: 'bold',
            color: 'gray',
            marginTop: '8px',
            marginRight: '4px'
        }
    });

    function buildClearSelectedTypes() {
        return button({
            class: 'btn btn-default',
            dataBind: {
                click: '(d,e) => {$component.doClearSelectedDataTypes.call($component,d,e)}'
            }
        }, 'Clear selected types');
    }

    // function buildSelectedTypes() {
    //     return gen.if('selectedDataTypes().length > 0',
    //         div({
    //             dataBind: {
    //                 foreach: 'selectedDataTypes'
    //             },
    //             style: {
    //                 display: 'inline-block'
    //             }
    //         }, [
    //             span({
    //                 style: {
    //                     display: 'inline-block',
    //                     margin: '0 4px'
    //                 },
    //             }, [
    //                 span(({
    //                     dataBind: {
    //                         text: 'label'
    //                     },
    //                     class: ['form-control', styles.classes.activeFilterInput]
    //                 })),
    //                 span({
    //                     dataBind: {
    //                         click: '(d,e) => {$component.doRemoveDataType.call($component,d,e)}'
    //                     },
    //                     class: 'kb-btn-mini -danger'
    //                 }, span({
    //                     class: 'fa fa-times'
    //                 }))
    //             ])
    //         ]),
    //         span({
    //             style: {
    //                 fontStyle: 'italic'
    //             }
    //         }, 'No data types selected -- all types will be searched over'));
    // }

    // function buildSelectedDataTypes2() {
    //     return gen.if('selectedDataTypes().length > 0',
    //         span([
    //             select({
    //                 class: 'form-control',
    //                 style: {
    //                     margin: '0 4px'
    //                 },
    //                 dataBind: {
    //                     foreach: 'selectedDataTypes',
    //                     value: 'selectedDataType',
    //                     event: {
    //                         change: '(d,e) => {$component.doUnselectDataType.call($component,d,e)}'
    //                     },
    //                 }
    //             }, option({
    //                 dataBind: {
    //                     value: 'value',
    //                     text: 'label'
    //                 }
    //             })),
    //             span({
    //                 style: {
    //                     margin: '0 4px'
    //                 },
    //                 dataBind: {
    //                     text: 'selectedDataTypes().length'
    //                 }
    //             }),
    //             'selected'
    //         ]),
    //         'none selected - all types shown');
    // }

    // function buildSelectedDataTypes3() {
    //     return gen.if('selectedDataTypes().length > 0',
    //         span([
    //             span({
    //                 style: {
    //                     margin: '0 4px'
    //                 },
    //                 dataBind: {
    //                     text: 'selectedDataTypes().length'
    //                 }
    //             }),
    //             'selected'
    //         ]),
    //         'none selected - all types shown');
    // }

    function buildTypeFilter() {
        return div({
            class: 'form-group',
            style: {
                margin: '0 4px'
            }
        }, [
            label({
                class: styles.classes.fieldGroupLabel
            }, 'Include Data Types:'),
            select({
                dataBind: {
                    value: 'dataTypeInput',
                    event: {
                        change: '(d,e) => {$component.doSelectDataType.call($component,d,e)}'
                    },
                    css: 'selectedDataTypes().length ? "' + styles.classes.activeFilterInput + '" : null',
                    foreach: 'availableDataTypes'
                },
                class: 'form-control',
                style: {
                    margin: '0 4px',

                }
            }, gen.if('enabled',
                option({
                    dataBind: {
                        value: 'value',
                        text: 'label',
                        // enable: 'enabled'
                    }
                }),
                option({
                    dataBind: {
                        value: 'value',
                        text: '"✓ " + label',
                        // enable: 'enabled'
                    }
                })
            )),
            gen.if('selectedDataTypes().length > 0', buildClearSelectedTypes())
        ]);
    }

    function template() {
        return div({
            class: 'form-inline ' + styles.classes.component
        }, buildTypeFilter());
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
