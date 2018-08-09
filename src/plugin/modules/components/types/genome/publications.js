define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html',
    'kb_common_ts/HttpClient',
    '../../table',
    '../../controls/scrollingText',
    '../../../lib/docUtils'
], function (
    bluebird,
    ko,
    reg,
    gen,
    html,
    HttpClient,
    TableComponent,
    ScrollingTextComponent,
    docUtils
) {
    'use strict';

    const t = html.tag,
        div = t('div'),
        span = t('span'),
        input = t('input'),
        label = t('label');

    class ViewModel {
        constructor({query}, context) {
            this.runtime = context.$root.runtime;

            this.queryInput = ko.observable().syncFrom(query);

            this.queryTerms = ko.pureComputed(() => {
                const terms = this.queryInput().split((/\s+/));
                return terms.join('+');
            });

            this.searchInput = ko.observable().extend({
                rateLimit: {
                    timeout: 300,
                    method: 'notifyWhenChangesStop'
                }
            });

            this.searchTerms = ko.pureComputed(() => {
                if (!this.searchInput()) {
                    return [];
                }
                return this.searchInput().split(/\s+/);
            });

            this.publications = ko.observableArray();
            this.filteredPublications = this.publications.filter((publication) => {
                if (!this.searchInput()) {
                    return true;
                }
                if (publication.title.indexof(this.searchTerms[0]) != -1) {
                    return true;
                }
                return false;
            });
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
                    // maxHeight: '20em',
                    backgroundColor: '#FFF'
                },
                sort: {
                    column: ko.observable('year'),
                    direction: ko.observable('desc')
                },
                columns: [
                    // {
                    //     name: 'realname',
                    //     label: 'Real name',
                    //     width: 45,
                    //     component: {
                    //         name: UserLinkComponent.name(),
                    //         // note params interpreted in the context
                    //         // of the row. So, username, realname are properties on the
                    //         // row, but true is the true value.
                    //         // params: {
                    //         //     username: 'username',
                    //         //     realname: 'realname',
                    //         //     newWindow: 'true'
                    //         // }
                    //         params: '{username: username, realname: realname, newWindow: true}'
                    //     },
                    //     sort: {
                    //         comparator: (a, b) => {
                    //             if (a < b) {
                    //                 return -1;
                    //             } else if (a > b) {
                    //                 return 1;
                    //             }
                    //             return 0;
                    //         }
                    //     }
                    // },
                    {
                        name: 'title',
                        label: 'Title',
                        width: 40,
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'source',
                        label: 'Source',
                        width: 10,
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'year',
                        label: 'Year',
                        width: 10,
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        }
                    },
                    {
                        name: 'abstract',
                        label: 'Abstract',
                        width: 40,
                        sort: {
                            comparator: (a, b) => {
                                if (a < b) {
                                    return -1;
                                } else if (a > b) {
                                    return 1;
                                }
                                return 0;
                            }
                        },
                        component: {
                            name: ScrollingTextComponent.name(),
                            params: '{text: abstract, maxHeight: "10em"}'
                        }
                    }
                ]
            };
            this.table.columnMap = this.table.columns.reduce((map, column) => {
                map[column.name] = column;
                return map;
            }, {});

            this.getPublications()
                .then((publications) => {
                    this.publications(publications);
                    this.loading(false);
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
                    // console.log('json doc', json);
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
                    // console.log('got abstracts!', abstractsResult);
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
            class: 'form-inline'
        }, [
            div({
                class: 'form-group'
            }, [
                label({
                    class: 'control-label'
                }, 'Filter '),
                input({
                    class: 'form-control',
                    dataBind: {
                        textInput: 'searchInput'
                    }
                })
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
        return div({
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
        });
    }

    function template() {
        return div({
            class: styles.classes.component
        }, [
            gen.if('loading',
                html.loading('Loading publications'),
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