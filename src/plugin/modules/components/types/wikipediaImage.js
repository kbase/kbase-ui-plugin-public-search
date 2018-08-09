define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    'kb_common_ts/HttpClient',
    'kb_lib/props'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    HttpClient,
    props
) {
    'use strict';

    const t = html.tag,
        a = t('a'),
        span = t('span'),
        div = t('div'),
        img = t('img');

    const styles = html.makeStyles({
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px'
                },
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(200,200,200,1)',
                    textAlign: 'left',
                    padding: '4px'
                }
            }
        },
        sectionHeader: {
            css: {
                fontWeight: 'bold',
                fontSize: '110%',
                color: 'rgba(100,100,100,1)',
                marginTop: '8px'
            }
        },
        wikipediaImage: {
            css: {
                width: '100%'
            }
        }
    });

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {scientificName} = params;

            this.size = ko.observable(500);
            this.imageUrl = ko.observable();
            this.imageCaption = ko.observable();
            this.pageUrl = ko.observable();
            this.loaded = ko.observable(false);

            this.scientificName = scientificName;
            this.error = ko.observable();
            this.subscribe(this.error, (newValue) => {
                if (newValue) {
                    this.state('error');
                }
            });

            this.state = ko.observable('loading');

            this.subscribe(this.scientificName, (newValue) => {
                if (!newValue) {
                    return;
                }
                this.getOrganismInfo(newValue)
                    .then(({imageUrl, url}) => {
                        this.imageUrl(imageUrl);
                        this.pageUrl(url);
                        this.loaded(true);
                        this.state('loaded');
                    })
                    .catch((err) => {
                        console.error('Error getting image', err);
                        this.error(err);
                    });
            });

        }

        getOrganismInfo(scientificName) {
            return this.getPage(scientificName)
                .then((wikiResponse) => {
                    this.imageCaption(wikiResponse.parse.title);
                    return Promise.all(
                        [
                            this.getImage({size: this.size(), pageId: wikiResponse.parse.pageid}),
                            this.getPageUrl({pageId: wikiResponse.parse.pageid})
                        ]);
                })
                .spread((imageUrl, url) => {
                    return {
                        imageUrl: imageUrl,
                        url: url
                    };
                });
        }

        // see: https://www.mediawiki.org/wiki/API:Main_page
        // https://en.wikipedia.org/w/api.php?action=help&modules=parse
        getPage(scientificName) {
            const terms = JSON.parse(JSON.stringify(scientificName.split(/\s+/)));
            return new Promise((resolve, reject) => {
                const fetchPage = (terms) => {
                    if (terms.length === 0) {
                        throw new Error('No Wikipedia page found');
                        // resolve(null);
                    }
                    const http = new HttpClient.HttpClient();
                    const header = new HttpClient.HttpHeader({
                        'accept': 'application/json'
                    });
                    const pageUrl = new URL('https://en.wikipedia.org/w/api.php');
                    const query = pageUrl.searchParams;
                    query.set('action', 'parse');
                    query.set('format', 'json');
                    query.set('prop', 'text');
                    query.set('section', '0');
                    query.set('redirects', '');
                    query.set('page', terms.join(' '));
                    // must set this to enable cors
                    query.set('origin', '*');
                    // console.log('wikipedia url', pageUrl.toString());
                    http.request({
                        method: 'GET',
                        header: header,
                        withCredentials: false,
                        url: pageUrl.toString()
                    })
                        .then((result) => {
                            switch (result.status) {
                            case 200:
                                try {
                                    var wikiResponse = JSON.parse(result.response);
                                    if (wikiResponse.error) {
                                        if (wikiResponse.error.code === 'missingtitle') {
                                            terms.pop();
                                            fetchPage(terms);
                                        }
                                    } else {
                                        resolve(wikiResponse);
                                    }
                                } catch (ex) {
                                    this.error(ex);
                                    reject(new Error('Error parsing wikipedia response: ' + ex.message));
                                }
                                break;
                            default:
                                var message = 'Unexpected response from wikipedia api: ' + result.status;
                                console.error(message, result);
                                reject(new Error(message));
                            }

                        });
                };
                fetchPage(terms);
            });
        }

        getPageUrl({pageId}) {
            const apiURL = new URL('https://en.wikipedia.org/w/api.php');
            const query = apiURL.searchParams;
            query.set('action', 'query');
            query.set('pageids', pageId);
            query.set('prop', 'info');
            query.set('inprop', 'url');
            query.set('origin', '*');
            query.set('format', 'json');

            const http = new HttpClient.HttpClient();
            return http.request({
                method: 'GET',
                withCredentials: false,
                url: apiURL.toString()
            })
                .then((result) => {
                    switch (result.status) {
                    case 200:
                        try {
                            var wikiResponse = JSON.parse(result.response);
                            return props.getProp(wikiResponse, ['query', 'pages', String(pageId), 'fullurl']);
                        } catch (ex) {
                            console.error('error getting page info', ex.message);
                            this.error(ex);
                        }
                    }
                });
        }

        getImage({size, pageId}) {
            const pageUrl = new URL('https://en.wikipedia.org/w/api.php');
            const query = pageUrl.searchParams;
            query.set('action', 'query');
            query.set('format', 'json');
            query.set('prop', 'pageimages');
            query.set('pithumbsize', String(size));
            query.set('pageids', String(pageId));
            query.set('origin', '*');
            const http = new HttpClient.HttpClient();
            const header = new HttpClient.HttpHeader({
                'accept': 'application/json'
            });

            return http.request({
                method: 'GET',
                header: header,
                withCredentials: false,
                url: pageUrl.toString()
            })
                .then((result) => {
                    switch (result.status) {
                    case 200:
                        try {
                            var wikiResponse = JSON.parse(result.response);
                            // if (wikiResponse.error) {
                            // } else {
                            // }
                            // console.log('wiki response', wikiResponse);
                            return props.getProp(wikiResponse, ['query', 'pages', String(pageId), 'thumbnail', 'source'], null);
                        } catch (ex) {
                            throw new Error('Error parsing wikipedia response: ' + ex.message);
                        }
                    default:
                        var message = 'Unexpected response from wikipedia api: ' + result.status;
                        console.error(message, result);
                        throw new Error(message);
                    }
                })
                .catch((err) => {
                    const message = 'Error getting image from wikipedia: ' + err.message;
                    console.error(message, err);
                    throw new Error('Error getting image from wikipedia: ' + err.message);
                });
        }
    }

    function buildImage() {
        return div([
            gen.if('imageUrl',
                img({
                    class: styles.classes.wikipediaImage,
                    dataBind: {
                        attr: {
                            src: 'imageUrl'
                        },
                        // style: {
                        //     width: 'size'
                        // }
                    }
                }),
                div({
                    style: {
                        border: '1px silver dashed'
                    },
                    dataBind: {
                        style: {
                            width: 'size',
                            height: 'size() / 2'
                        }
                    }
                }, 'Image not found')),
            a({
                dataBind: {
                    attr: {
                        href: 'pageUrl'
                    }
                },
                target: '_blank'
            }, [
                span({
                    dataBind: {
                        text: 'imageCaption'
                    },
                    style: {
                        marginRight: '6px'
                    }
                }),
                span({
                    class: 'fa fa-wikipedia-w'
                })
            ])
        ]);
    }

    function buildError() {
        return div({
            dataBind: {
                attr: {
                    width: 'size',
                    height: 'size',
                },
                text: 'error().message'
            }
        });
    }

    function buildLoading() {
        return div({
            dataBind: {
                attr: {
                    width: 'size'
                }
            }
        }, html.loading('Locating image at Wikipedia'));
    }

    function template() {
        return div(gen.switch('state', [
            [
                '"loading"', buildLoading()
            ],
            [
                '"loaded"', buildImage()
            ],
            [
                '"error"', buildError()
            ]
        ]));
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