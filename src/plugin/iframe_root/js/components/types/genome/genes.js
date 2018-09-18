define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_lib/jsonRpc/genericClient',
    'kb_lib/jsonRpc/dynamicServiceClient'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    builders,
    GenericClient,
    DynamicServiceClient
) {
    'use strict';

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);
            const {ref} = params;
            this.ref = ref;
            this.runtime = context.$root.runtime;
            this.token = ko.pureComputed(() => {
                const auth = context.$root.authorization();
                if (!auth) {
                    return null;
                }
                return auth.token;
            });

            this.searchInput = ko.observable();

            this.getGenes()
                .then((genes) => {

                });
        }

        getGenes() {
            const searchAPI = this.runtime.service('rpc').makeClient({
                module: 'KBaseSearchEngine',
                timeout: 10000,
                authenticated: true
            });
            // const searchApi = new DynamicServiceClient({
            //     module: 'KBaseSearchEngine',
            //     url: this.runtime.config('services.ServiceWizard.url'),
            //     token: this.token()
            // });
            const query = this.searchInput();
            const start = 0;
            const count = 10;

            const sortingRules = [{
                property: 'id',
                ascending: 1,
                is_object_property: 1
            }];
            const assemblyGuid = '??';
            const param = {
                object_types: ['GenomeFeature'],
                match_filter: {
                    full_text_in_all: query,
                    exclude_subobjects: 1,
                    lookup_in_keys: {
                        assembly_guid: {
                            value: assemblyGuid
                        }
                    }
                },
                pagination: {
                    start: start,
                    count: count
                },
                post_processing: {
                    ids_only: 0,
                    skip_info: 0,
                    skip_keys: 0,
                    skip_data: 0,
                    include_highlight: 1,
                    add_narrative_info: 1,
                    add_access_group_info: 1
                },
                access_filter: {
                    with_private: 1,
                    with_public: 1
                },
                sorting_rules: sortingRules
            };
            return searchAPI.callFunc('search_objects', [param])
                .spread((result) => {
                    console.log('got search result', result);
                })
                .catch((err) => {
                    console.error('error', err);
                });
        }

        doSearch() {
            this.getGenes();
            console.log('search');
        }
    }

    const t = html.tag,
        div = t('div'),
        input = t('input'),
        button = t('button'),
        span = t('span');

    const style = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        searchBar: {
            css: {
                border: '1px silver solid'
            }
        },
        searchResults: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                border: '1px silver solid'
            }
        }
    });

    function buildSearchBar() {
        return div({}, [
            input({
                dataBind: {
                    textInput: 'searchInput'
                }
            }),
            button({
                dataBind: {
                    click: 'function(){doSearch()}'
                }
            }, 'Search')
        ]);
    }

    function template() {
        return div({
            class: style.classes.component
        }, [
            div({
                class: style.classes.searchBar
            }, buildSearchBar()),
            div({
                class: style.classes.searchResults
            }, 'search results')
        ]);
    }

    function component() {
        return {
            viewModelWithContext: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});