define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    '../lib/model',
    './autoTable/main',
    './inspector',
    './resultsError',
    './detail'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    build,
    model,
    TableComponent,
    InspectorComponent,
    ResultsErrorComponent,
    DetailComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        p = t('p'),
        span = t('span'),
        hr = t('hr');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {searchResults, searching, pageSize, searchState, showOverlay, errorMessage, selectedRows, view} = params;

            this.searchResults = searchResults;
            this.searching = searching;
            this.showOverlay = showOverlay;
            this.selectedRows = selectedRows;
            this.view = view;

            const columns = context.$root.columns;

            this.table = {
                rows: this.searchResults,
                selectedRows: selectedRows,
                detailComponent: DetailComponent.name(),
                columns: columns,
                isLoading: searching,
                pageSize: pageSize,
                state: searchState,
                errorMessage: errorMessage,
                view: view,
                env: {
                    selectedRows: selectedRows
                },
                actions: {
                },
                sortBy: (column) => {
                    column.sort.direction(column.sort.direction()==='ascending'? 'descending' : 'ascending');
                    columns.forEach((column) => {
                        if (column.sort) {
                            column.sort.active(false);
                        }
                    });
                    column.sort.active(true);
                    // return this.search.sortBy.apply(this.search, args);
                },
                rowAction: (row) => {
                    // for now, just open landing page for objects, narrative for narrative.
                    // if (row.type.value === 'Narrative') {
                    //     window.open('/narrative/ws.' + row.metadata.workspaceId + '.obj.' + row.metadata.objectId, '_blank');
                    // } else {
                    //     window.open('#dataview/' + row.metadata.ref, '_blank');
                    // }
                    this.showOverlay({
                        name: InspectorComponent.name(),
                        type: 'info',
                        viewModel: {
                            row: row.data
                        }
                    });

                }
            };
            this.messages = {
                none: div([
                    p('No active search.'),
                    hr({style: {width: '50%'}}),
                    p('Enter one or more terms above to search for public data.'),
                    p('The search will find objects that include <b>all of the search words</b>, or terms, you submit. In tech-speak, this means that the terms are implicitly combined by a logical "AND".'),
                    p([
                        'Terms are matched against <b>whole words</b>; a search term will which is part of a word found in an object will not result in a match.'
                    ])
                ]),
                notfound: div([
                    p('Sorry, nothing was found with this search.'),
                    hr({style: {width: '50%'}}),
                    p([
                        'Try broadening your search or use the ',
                        span({
                            class: 'fa fa-bullhorn'
                        }),
                        ' Feedback button above to let us know how we can improve search.'
                    ]),
                ]),
                loading: div([
                    build.loading('Running your search...')
                ]),
                error: {
                    component: {
                        name: ResultsErrorComponent.name(),
                        params: {
                            link: 'bus',
                            message: 'errorMessage'
                        }
                    }
                }
            };
        }
    }

    const styles = html.makeStyles({
        container: {
            css: {
                // border: '1px silver solid',
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }
        }
    });

    function buildResults() {
        return div({
            style: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            },
            dataBind: {
                component: {
                    name: TableComponent.quotedName(),
                    params: {
                        link: 'bus',
                        table: 'table',
                        messages: 'messages'
                    }
                }
            }
        });
    }

    function template() {
        return div({
            class: styles.classes.container
        }, [
            buildResults()
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