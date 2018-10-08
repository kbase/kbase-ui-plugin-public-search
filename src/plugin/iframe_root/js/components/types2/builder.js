define([
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    reg,
    gen,
    html
) {
    'use strict';

    // VIEW

    const t = html.tag,
        span = t('span'),
        div = t('div');

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'row'
            }
        },
        col2: {
            css: {
                flex: '2 1 0px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }
        },
        col1: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto'
            }
        },
        row: {
            css: {
                flex: '1 1 0px',
            }
        },
        fieldSet: {
            css: {
                flex: '1 1 0px',
                overflow: 'auto',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },
        field: {
            css: {
                marginRight: '6px'
            }
        },
        label: {
            css: {
                textStyle: 'italic',
                color: 'rgba(150,150,150,1)'
            }
        },
        value: {
            css: {
                // fontWeight: 'bold'
            }
        }
    });


    function buildCol(col) {
        return div({
            class: style.classes[col.class]
        }, col.content.map((fieldSet) => {
            return div({
                class: style.classes.fieldSet
            }, fieldSet.map((field) => {
                return span({
                    class: style.classes.field
                }, [
                    span({
                        class: style.classes.label
                    }, field.label + ': '),
                    (function () {
                        if (field.format) {
                            return span({
                                class: style.classes.value,
                                dataBind: {
                                    typedText: {
                                        value: field.property,
                                        type: '"' + field.type + '"',
                                        format: '"' + field.format + '"'
                                    }
                                }
                            });
                        } else {
                            return span({
                                class: style.classes.value,
                                dataBind: {
                                    text: field.property
                                }
                            });
                        }
                    }())

                ]);
            }));
        }));
    }

    function buildCols(spec) {
        return spec.map((col) => {
            return buildCol(col);
        });
    }

    return {
        build: buildCols,
        style: style
    };
});