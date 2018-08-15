define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    '../lib/model',
    'kb_knockout/components/table',
    './inspector',
    './resultsError'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    model,
    TableComponent,
    InspectorComponent,
    ResultsErrorComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        p = t('p'),
        hr = t('hr');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {searchResults, searching, pageSize, searchState, showOverlay} = params;

            this.searchResults = searchResults;
            this.searching = searching;
            this.showOverlay = showOverlay;

            this.table = {
                rows: this.searchResults,
                columns: model.columns,
                isLoading: searching,
                pageSize: pageSize,
                state: searchState,
                env: {
                    search: this.search
                },
                actions: {
                },
                sortBy: (column) => {
                    // console.log('sorting!', column);
                    column.sort.direction(column.sort.direction()==='ascending'? 'descending' : 'ascending');
                    model.columns.forEach((column) => {
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
                    // console.log('row action?', row);
                    this.showOverlay({
                        name: InspectorComponent.name(),
                        type: 'info',
                        viewModel: {
                            row: row
                        }
                    });

                }
            };
            this.messages = {
                none: div([
                    p('No active search.'),
                    hr({style: {width: '50%'}}),
                    p('Enter one or more terms above to search for public data and narratives.'),
                    p('Multiple search terms are treated as “AND”  statements. The search will find objects or text that include all of the terms you submit. Terms are matched against whole words; no partial matches will be listed.')
                ]),
                notfound: div([
                    p('Sorry, nothing was found with this search.'),
                    hr({style: {width: '50%'}}),
                    p('Try reducing the number of search terms and/or filters.'),
                ]),
                loading: div([
                    html.loading('Running your search...')
                ]),
                error: {
                    component: {
                        name: ResultsErrorComponent.name(),
                        params: {}
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

    function buildSearchingScreen() {
        return gen.if('searching', div({
            style: {
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                backgroundColor: 'rgba(255,255,255,0.5)'
            }
        }));
    }

    function template() {
        return div({
            class: styles.classes.container
        }, [
            buildResults(),
            buildSearchingScreen()
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