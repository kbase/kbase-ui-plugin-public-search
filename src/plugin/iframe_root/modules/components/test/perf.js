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

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        table = t('table'),
        thead = t('thead'),
        tr = t('tr'),
        th = t('th'),
        tbody = t('tbody'),
        td = t('td'),
        input = t('input'),
        button = t('button');

    class ViewModel {
        constructor(params, context) {
            this.searchAPI = null;
            this.runtime = context.$root.runtime;

            this.query = ko.observable();
            this.iterations = ko.observable(10);
            this.itemCount = ko.observable(20);

            this.samples = ko.observableArray();
            this.average = ko.pureComputed(() => {
                const count = this.samples().length;
                if (!count) {
                    return null;
                }
                return this.samples().reduce((sum, sample) => {
                    return sum + sample.elapsed;
                }, 0) / count;
            });

            this.averageSize = ko.pureComputed(() => {
                const count = this.samples().length;
                if (!count) {
                    return null;
                }
                return this.samples().reduce((sum, sample) => {
                    return sum + sample.size;
                }, 0) / count;
            });

            this.averageReturnedHits = ko.pureComputed(() => {
                const count = this.samples().length;
                if (!count) {
                    return null;
                }
                return this.samples().reduce((sum, sample) => {
                    return sum + sample.returnedHits;
                }, 0) / count;
            });

            this.averageTotalHits = ko.pureComputed(() => {
                const count = this.samples().length;
                if (!count) {
                    return null;
                }
                return this.samples().reduce((sum, sample) => {
                    return sum + sample.totalHits;
                }, 0) / count;
            });

            this.averageSearchTime = ko.pureComputed(() => {
                const count = this.samples().length;
                if (!count) {
                    return null;
                }
                return this.samples().reduce((sum, sample) => {
                    return sum + sample.searchTime;
                }, 0) / count;
            });

            this.scaleMin = ko.observable(0);
            this.scaleMax = ko.observable(3000);
            this.binCount = ko.observable(40);

            this.histogram = ko.pureComputed(() => {
                const binCount = this.binCount();
                const values = this.samples().map((sample) => {
                    return sample.elapsed;
                });
                const columnWidth = 20;
                const columnMargin = 5;
                // const min = Math.min(...values);
                // const max = Math.max(...values);
                const min = this.scaleMin();
                const max = this.scaleMax();
                const span = max - min;
                const count = this.samples().length;
                const binWidth = span / binCount;
                const bins = [...Array(binCount).keys()].map((bin) => {
                    return {
                        lowerInclusive: bin === 0,
                        lower: min + binWidth * bin,
                        upper: min + binWidth * bin + binWidth,
                        upperInclusive: bin === (count - 1),
                        count: 0,
                        width: columnWidth,
                        height: bin * 8
                    };
                });
                let overage = 0;

                values.forEach((value) => {
                    let bin;
                    if (value > max) {
                        overage += 1;
                    } else if (value === max) {
                        bin = binCount - 1;
                    } else {
                        bin = Math.floor((value - min)/binWidth);
                    }
                    if (bins[bin] === undefined) {
                        console.warn('bin', value, value - min, binWidth, min, max, bin);
                    }
                    bins[bin].count = bins[bin].count + 1;
                });

                const maxBinSize = bins.reduce((max, bin) => {
                    return Math.max(max, bin.count);
                }, 0);

                const heightScale = 200 / maxBinSize;

                bins.forEach((bin) => {
                    bin.height = bin.count * heightScale;
                });

                return {
                    columns: bins,
                    min: min,
                    max: max,
                    columnWidth: columnWidth,
                    columnMargin: columnMargin,
                    binCount: binCount,
                    overage: overage
                };
            });
        }

        doRunTest() {
            this.samples.removeAll();
            this.searchAPI = this.runtime.service('rpc').makeClient({
                module: 'SearchAPI2Legacy',
                timeout: this.scaleMax(),
                authenticated: false
            });
            this.warmUpCache()
                .then(() => {
                    this.searchSequence(this.iterations());
                });
        }

        doCall(param) {
            const start = Date.now();
            return this.searchAPI.callFunc('search_objects', [
                param
            ])
                .spread((result) => {
                    const elapsed = Date.now() - start;
                    return [elapsed, result, null];
                })
                .catch((err) => {
                    const elapsed = Date.now() - start;
                    return [elapsed, null, err];
                });
        }

        warmUpCache() {
            return this.searchAPI.callFunc('status', [
            ]);
        }

        // TESTS
        searchSequence(iterations) {
            const param = {
                'match_filter': {
                    'full_text_in_all': this.query(),
                    'exclude_subobjects': 1
                },
                'pagination': {
                    'start': 0,
                    'count': this.itemCount()
                },
                'post_processing': {
                    'ids_only': 0,
                    'skip_info': 0,
                    'skip_keys': 0,
                    'skip_data': 0,
                    'include_highlight': 1,
                    'add_narrative_info': 1
                },
                'access_filter': {
                    'with_private': 0,
                    'with_public': 1
                },
                'sorting_rules': [{
                    'property': 'timestamp',
                    'ascending': 0,
                    'is_object_property': 0
                }]
            };

            const samples = [];

            return new Promise((resolve, reject) => {
                const loop = (iteration) => {
                    if (iteration === 0) {
                        resolve(samples);
                        return;
                    }
                    this.doCall(param)
                        .then(([elapsed, result, error]) => {
                            let size;
                            if (result) {
                                size = JSON.stringify(result).length;
                            } else {
                                console.error('Error', error);
                                throw new Error('Error!');
                            }
                            this.samples.push({
                                iteration: iteration,
                                elapsed: elapsed,
                                searchTime: result.search_time,
                                result: result,
                                error: error,
                                size: size,
                                returnedHits: result.objects.length,
                                totalHits: result.total
                            });

                            loop(iteration - 1);
                            return null;
                        })
                        .catch((err) => {
                            reject(err);
                        });
                };
                loop(iterations);
            });
        }
    }

    const styles = html.makeStyles({
        statsTable: {
            css: {
                width: '50em',
                border: '1px silver solid'
            },
            inner: {
                td: {
                    padding: '4px',
                    margin: '4px'
                },
                th: {
                    padding: '4px',
                    margin: '4px'
                },
                'th:nth-child(1)': {
                    width: '30em'
                },
                'td:nth-child(1)': {
                    width: '30em'
                }
            }
        },
        samplesTable: {
            css: {
                width: '50em',
                border: '1px silver solid'
            },
            inner: {
                td: {
                    padding: '4px',
                    margin: '4px'
                },
                th: {
                    padding: '4px',
                    margin: '4px'
                },
                'th:nth-child(1)': {
                    width: '30em'
                },
                'td:nth-child(1)': {
                    width: '30em'
                }
            }
        },
        header: {
            css: {
                fontWeight: 'bold',
                fontSize: '120%'
            }
        },
        sectionHeader: {
            css: {
                fontWeight: 'bold',
                fontSize: '110%',
                marginTop: '20px'
            }
        }
    });

    function buildStats() {
        return table({
            class: styles.classes.statsTable
        }, [
            thead([
                tr([
                    th('Measure'),
                    th('Value')
                ])
            ]),
            tbody([
                tr([
                    td('Count'),
                    td(span({
                        dataBind: {
                            text: 'samples().length'
                        }
                    }))
                ]),
                tr([
                    td('Average'),
                    td(span({
                        dataBind: {
                            typedText: {
                                value: 'average',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }))
                ]),
                tr([
                    td('Server search time'),
                    td(span({
                        dataBind: {
                            typedText: {
                                value: 'averageSearchTime',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }))
                ]),
                tr([
                    td('Size'),
                    td(span({
                        dataBind: {
                            typedText: {
                                value: 'averageSize',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }))
                ]),
                tr([
                    td('Returned hits'),
                    td(span({
                        dataBind: {
                            typedText: {
                                value: 'averageReturnedHits',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }))
                ]),
                tr([
                    td('Total hits'),
                    td(span({
                        dataBind: {
                            typedText: {
                                value: 'averageTotalHits',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }))
                ])
            ])
        ]);
    }

    function buildSamples() {
        return table({
            class: styles.classes.samplesTable,
            style: {
                maxHeight: '10em',
                overflow: 'auto'
            }
        }, [
            thead([
                tr([
                    th('Iteration'),
                    th('Elapsed (ms)')
                ])
            ]),
            tbody({
                dataBind: {
                    foreach: 'samples'
                }
            }, [
                tr([
                    td(span({
                        dataBind: {
                            text: 'iteration'
                        }
                    })),
                    td(span({
                        dataBind: {
                            text: 'elapsed'
                        }
                    }))
                ])
            ])
        ]);
    }

    function buildInput() {
        return div({
            class: 'form',
            style: 'width: 50em'
        }, [
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-sm-6'
                }, 'Query'),
                div({
                    class: 'col-sm-6'
                }, input({
                    dataBind: {
                        textInput: 'query'
                    },
                    class: 'form-control'
                }))
            ]),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-sm-6'
                }, 'Iterations'),
                div({
                    class: 'col-sm-6'
                }, input({
                    dataBind: {
                        textInput: 'iterations'
                    },
                    class: 'form-control'
                }))
            ]),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-sm-6'
                }, 'Scale min'),
                div({
                    class: 'col-sm-6'
                }, input({
                    dataBind: {
                        textInput: 'scaleMin'
                    },
                    class: 'form-control'
                }))
            ]),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-sm-6'
                }, 'Scale max'),
                div({
                    class: 'col-sm-6'
                }, input({
                    dataBind: {
                        textInput: 'scaleMax'
                    },
                    class: 'form-control'
                }))
            ]),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-sm-6'
                }, 'Items to returm'),
                div({
                    class: 'col-sm-6'
                }, input({
                    dataBind: {
                        textInput: 'itemCount'
                    },
                    class: 'form-control'
                }))
            ]),
            div({
                class: 'row'
            }, [
                div({
                    class: 'col-sm-6'
                }),
                div({
                    class: 'col-sm-6'
                }, button({
                    class: 'btn btn-primary',
                    dataBind: {
                        click: 'doRunTest',
                        enable: 'iterations() ? true : false'
                    }
                }, 'Run Test'))
            ]),
        ]);
    }

    function buildColumn() {
        return [
            div({
                style: {
                    position: 'absolute',
                    bottom: '0',
                    backgroundColor: 'blue'
                },
                dataBind: {
                    style: {
                        left: '$index() * (width + $component.histogram().columnMargin * 2)',
                        height: 'height',
                        width: 'width',
                        marginLeft: '$component.histogram().columnMargin',
                        marginRight: '$component.histogram().columnMargin'
                    }
                }
            }),
            gen.if('count > 0',
                div({
                    style: {
                        position: 'absolute',
                        // bottom: '0',
                        width: '10px',
                        margin: '5px',
                        backgroundColor: 'transparent'
                    },
                    dataBind: {
                        style: {
                            left: '$index() * (width + 10)',
                            bottom: 'height',
                            width: 'width',
                            marginLeft: '$component.histogram().columnMargin',
                            marginRight: '$component.histogram().columnMargin'
                        }
                    }
                }, div({
                    style: {
                        transform: 'rotate(-45deg)',
                        transformOrigin: 'top left'
                    },
                    dataBind: {
                        text: 'count'
                    }
                }))),
            gen.if('count > 0',
                div({
                    style: {
                        position: 'absolute',
                        bottom: '-20px',
                        backgroundColor: 'transparent',
                        transform: 'rotate(45deg) ',
                        transformOrigin: 'bottom left',
                        // marginBottom: '-10px',
                    },
                    dataBind: {
                        style: {
                            left: '$index() * (width + $component.histogram().columnMargin * 2) + $component.histogram().columnMargin',
                        }
                    }
                }, div({
                    style: {

                        // transformOrigin: 'right, top',
                        color: 'rgba(237,41,57)'
                    }
                }, [
                    span({
                        dataBind: {
                            typedText: {
                                value: 'lower',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    }),
                    ' - ',
                    span({
                        dataBind: {
                            typedText: {
                                value: 'upper',
                                type: '"number"',
                                format: '"0,0"'
                            }
                        }
                    })
                ])))
            // gen.if('count > 0',
            // div({
            //     style: {
            //         position: 'absolute',
            //         bottom: '0',
            //         backgroundColor: 'transparent',
            //         transform: 'rotate(270deg)',
            //         transformOrigin: 'top left',
            //         marginBottom: '-10px'
            //     },
            //     dataBind: {
            //         style: {
            //             left: '$index() * (width + $component.histogram().columnMargin * 2) + $component.histogram().columnMargin',
            //         }
            //     }
            // }, div({
            //     style: {

            //         // transformOrigin: 'right, top',
            //         color: 'rgba(237,41,57,0.5)'
            //     }
            // }, [
            //     span({
            //         dataBind: {
            //             typedText: {
            //                 value: 'lower',
            //                 type: '"number"',
            //                 format: '"0,0"'
            //             }
            //         }
            //     }),
            //     ' - ',
            //     span({
            //         dataBind: {
            //             typedText: {
            //                 value: 'upper',
            //                 type: '"number"',
            //                 format: '"0,0"'
            //             }
            //         }
            //     })
            // ])))

        ];
    }

    function buildLabels() {
        return [
            div({
                style: {
                    position: 'absolute',
                    backgroundColor: 'transparent'
                },
                dataBind: {
                    style: {
                        left: '0',
                        bottom: '-20'
                    },
                    text: '$component.histogram().min'
                }
            }),
            div({
                style: {
                    position: 'absolute',
                    backgroundColor: 'transparent'
                },
                dataBind: {
                    style: {
                        left: '($component.histogram().binCount - 1) * ($component.histogram().columnWidth + $component.histogram().columnMargin * 2)',
                        bottom: '-20'
                    },
                    text: '$component.histogram().max'
                }
            })
        ];
    }

    function buildHistogram() {
        return div({
            style: {
                position: 'relative',
                height: '200px',
                backgroundColor: 'rgba(200,200,200,0.5)',
                marginTop: '30px',
                marginBottom: '100px'
            }
        }, [
            gen.foreach('histogram().columns', buildColumn()),
            buildLabels()
        ]);
    }

    function template() {
        return div([
            div({
                class: styles.classes.header
            }, 'Performance Testing'),
            div({
                class: styles.classes.sectionHeader
            }, 'Input'),
            buildInput(),
            div({
                class: styles.classes.sectionHeader
            }, 'Stats'),
            buildStats(),
            div({
                class: styles.classes.sectionHeader
            }, 'Histogram'),
            buildHistogram(),
            div({
                class: styles.classes.sectionHeader
            }, 'Samples'),
            buildSamples()
        ]);
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