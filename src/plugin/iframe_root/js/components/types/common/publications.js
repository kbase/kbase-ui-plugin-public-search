define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_common_ts/HttpClient',
    '../../table',
    // '../../controls/scrollingText',
    '../../../lib/docUtils',
    './authors',
    './pubMedLink'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    build,
    HttpClient,
    TableComponent,
    // ScrollingTextComponent,
    docUtils,
    AuthorsComponent,
    PubMedLinkComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        input = t('input'),
        label = t('label');

    class ViewModel extends ViewModelBase {
        constructor(params, context) {
            super(params);

            const {query} = params;

            this.runtime = context.$root.runtime;

            this.queryInput = ko.observable(query);

            this.queryTerms = ko.pureComputed(() => {
                const terms = this.queryInput().split((/\s+/));
                return terms.join('+');
            });

            // this.searchInput = ko.observable(query);
            // .extend({
            //     rateLimit: {
            //         timeout: 300,
            //         method: 'notifyWhenChangesStop'
            //     }
            // });

            // this.searchTerms = ko.pureComputed(() => {
            //     if (!this.searchInput()) {
            //         return [];
            //     }
            //     return this.searchInput().split(/\s+/);
            // });

            this.publications = ko.observableArray();
            // this.filteredPublications = this.publications.filter((publication) => {
            //     if (!this.searchInput()) {
            //         return true;
            //     }
            //     if (publication.title.indexof(this.searchTerms[0]) != -1) {
            //         return true;
            //     }
            //     return false;
            // });
            // this.filteredPublications = ko.pureComputed(() => {
            //     if (!this.searchInput()) {
            //         return this.publications;
            //     }
            //     const searchTerms = this.searchInput().split(/\s+/);
            //     if (searchTerms.length === 0) {
            //         return this.publications;
            //     }
            //     return this.publications.filter((publication) => {
            //         if (publication.title.indexof(searchTerms[0]) != -1) {
            //             return true;
            //         }
            //         return false;
            //     });
            // });
            this.loading = ko.observable(true);

            this.maxPublications = 50;

            this.table = {
                style: {
                    backgroundColor: '#FFF'
                },
                rowStyle: {
                    borderBottom: '1px silver solid'
                },
                sort: {
                    column: ko.observable('year'),
                    direction: ko.observable('desc')
                },
                columns: [
                    {
                        name: 'title',
                        label: 'Title',
                        width: 40,
                        html: true,
                        sort: true,
                        component: {
                            name: PubMedLinkComponent.name(),
                            params: {
                                text: 'title',
                                id: 'id'
                            }
                        }
                    },
                    {
                        name: 'source',
                        label: 'Source',
                        width: 15,
                        sort: true
                    },
                    {
                        name: 'year',
                        label: 'Year',
                        width: 10,
                        sort: true
                    },
                    {
                        name: 'authors',
                        label: 'Authors',
                        width: 35,
                        component: {
                            name: AuthorsComponent.name(),
                            params: {authors: 'authors'}
                        },
                        sort: null
                    }
                ]
            };
            this.table.columnMap = this.table.columns.reduce((map, column) => {
                map[column.name] = column;
                return map;
            }, {});

            this.subscribe(this.queryTerms, () => {
                this.fetchPublications();
            });
            this.status = ko.observable('searching');
            this.fetchPublications();
        }

        fetchPublications() {
            this.status('searching');
            this.getPublications()
                .then((publications) => {
                    this.publications(publications);
                    this.loading(false);
                    this.status('success');
                })
                .catch((err) => {
                    console.error('ERROR fetching publications', err);
                    this.status('error');
                });
        }

        getPublications() {
            return this.getPublicationIds()
                .then((ids) => {
                    return Promise.all([
                        this.getSummaries(ids),
                        this.getAbstracts(ids)
                    ]);
                })
                .spread((summaries, abstracts) => {
                    // merge them together.
                    const merged = [];
                    for (let i = summaries.length - 1; i >= 0; i -= 1) {
                        const m = Object.assign({}, summaries[i], abstracts[i]);
                        merged.push(m);
                    }
                    return merged;
                });
        }

        getPublicationIds() {
            const searchUrl = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi');
            const query = searchUrl.searchParams;
            query.set('db', 'pubmed');
            query.set('sort', 'pub+date');
            query.set('retmax', this.maxPublications);
            query.set('term', this.queryTerms());
            const http = new HttpClient.HttpClient();
            return http.request({
                method: 'GET',
                url: searchUrl.toString(),
                responseType: 'document'
            })
                .then((result) => {
                    const json = docUtils.docToJSON(result.response);
                    return docUtils.find(json, ['eSearchResult', 'IdList']).children
                        .reduce((ids, node) => {
                            if (node.name === 'Id') {
                                const id = docUtils.find(node, ['#text']).text;
                                ids.push(parseInt(id));
                            }
                            return ids;
                        }, []);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        getAbstracts(ids) {
            const searchUrl = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi');
            const query = searchUrl.searchParams;
            query.set('db', 'pubmed');
            query.set('rettype', 'abstract');
            query.set('id', ids.join(','));
            const http = new HttpClient.HttpClient();
            return http.request({
                method: 'GET',
                url: searchUrl.toString(),
                responseType: 'document'
            })
                .then((result) => {
                    const abstractsResult = docUtils.docToJSON(result.response);
                    const abstractsNode = docUtils.find(abstractsResult, ['PubmedArticleSet'], null);
                    // TODO Loop over article set, filtering for PubmedArticle...
                    if (!abstractsNode) {
                        return [];
                    }
                    const articles = abstractsNode.children.filter((node) => {
                        return (node.name === 'PubmedArticle');
                    });
                    return articles.map((article) => {
                        const citation = docUtils.find(article, ['MedlineCitation']);
                        const id = parseInt(docUtils.find(citation, ['PMID', '#text']).text);
                        const abstract = docUtils.findText(citation, ['Article', 'Abstract', 'AbstractText', '#text'], 'No abstract found for this article');
                        return {id, abstract};
                    });
                })
                .catch((err) => {
                    console.error('Error getting abstracts: ', err);
                    throw new Error('Error getting abstracts: ' + err.message);
                });
        }

        getSummaries(ids) {
            const searchUrl = new URL('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi');
            const query = searchUrl.searchParams;
            query.set('db', 'pubmed');
            query.set('id', ids.join(','));
            const http = new HttpClient.HttpClient();
            return http.request({
                method: 'GET',
                url: searchUrl.toString(),
                responseType: 'document'
            })
                .then((result) => {
                    const summariesResult = docUtils.find(docUtils.docToJSON(result.response), ['eSummaryResult']);
                    return summariesResult.children
                        .filter((summary) => {
                            return (summary.name === 'DocSum');
                        })
                        .map((summary) => {
                            const id = parseInt(docUtils.findText(summary, ['Id', '#text']));
                            // annoying, each of the summary attributes is an "Item" node with
                            // a "Name" attribute the field name, the Type attribute the data type,
                            // and the data in the #text child node.
                            const fields = summary.children
                                .reduce((fields, node) => {
                                    if (node.name !== 'Item') {
                                        return fields;
                                    }
                                    const name = node.attributes.Name;
                                    // hmm, it looks like fields with multiple values (list/array) are
                                    // encoded as a list of Item nodes...
                                    let value;
                                    if (node.children.length == 1) {
                                        value = docUtils.findText(node, ['#text'], null);
                                    } else {
                                        value = node.children.reduce((values, child) => {
                                            if (child.name === 'Item') {
                                                const value = docUtils.findText(child, ['#text'], null);
                                                values.push(value);
                                            }
                                            return values;
                                        }, []);
                                    }
                                    fields[name] = value;
                                    return fields;
                                }, {});
                            const date = fields.PubDate;
                            const dateParts = date.split(/\s+/);
                            const year = parseInt(dateParts[0]);

                            const source = fields.Source;
                            const title = fields.Title;
                            const authors = fields.AuthorList;
                            const pubTypes = fields.PubTypeList;
                            const isJournal = pubTypes.includes('Journal Article');

                            return {id, date, year, source, title, authors, pubTypes, isJournal};
                        });
                })
                .catch((err) => {
                    console.error('Error getting summaries: ', err);
                    throw new Error('Error getting summaries: ' + err.message);
                });
        }
    }

    const styles = html.makeStyles({
        component: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px'
            }
        },
        container: {
            css: {
                flex: '1 1 0px',
                display: 'flex',
                flexDirection: 'column'
            }
        }
    });

    // function buildQueryForm() {
    //     return div({
    //         class: 'form'
    //     }, [
    //         div({
    //             class: 'row'
    //         }, [
    //             div({
    //                 class: 'col-sm-4'
    //             }, 'Query'),
    //             div({
    //                 class: 'col-sm-8'
    //             }, input({
    //                 class: 'form-control',
    //                 dataBind: {
    //                     textInput: 'searchInput'
    //                 }
    //             }))
    //         ])
    //     ]);
    // }

    function buildSearchForm() {
        return div({
            class: 'form-inline',
            style: {
                marginBottom: '10px'
            }
        }, [
            div({
                class: 'form-group'
            }, [
                label({
                    class: 'control-label',
                    style: {
                        marginRight: '4px'
                    }
                }, 'PubMed Search'),
                div({
                    class: 'input-group'
                }, [
                    input({
                        class: 'form-control',
                        dataBind: {
                            value: 'queryInput'
                        },
                        style: {
                            width: '20em'
                        }
                    }),
                    div({
                        class: 'input-group-addon',
                        style: {
                            width: '3em',
                            maxWidth: '3em'
                        }
                    }, gen.switch('status', [
                        [
                            '"searching"', span({
                                class: 'fa fa-spinner fa-spin fa-fw'
                            })
                        ],
                        [
                            '"error"', span({
                                class: 'fa fa-frown-o'
                            })
                        ],
                        [
                            '"success"', span({
                                class: 'fa fa-search'
                            })
                        ]
                    ]))
                ])
            ]),

            div({
                style: {
                    display: 'inline-block',
                    marginLeft: '12px'
                }
            }, [
                gen.if('publications().length > 0',
                    [span('Loaded '), span({
                        dataBind: {
                            text: 'publications().length'
                        }
                    }), span(' publications')])
            ])
        ]);
    }

    function buildResults() {
        return gen.if('publications().length > 0',
            div({
                class: styles.classes.container,
                dataBind: {
                    component: {
                        name: TableComponent.quotedName(),
                        params: {
                            table: 'table',
                            rows: 'publications'
                        }
                    }
                }
            }),
            div({
                class: 'well',
                style: {
                    textStyle: 'italic',
                    textAlign: 'center'
                }
            }, 'No publications found in PubMed with the above search terms; you may modify and rerun the search.'));
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            gen.if('loading',
                build.loading('Loading publications'),
                div({
                    class: styles.classes.container
                }, [
                    buildSearchForm(),
                    buildResults()
                ]))
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