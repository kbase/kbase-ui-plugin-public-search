define([
    'bluebird',
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html',
    'kb_lib/htmlBuilders',
    'kb_common_ts/HttpClient',
    'kb_lib/props'
], function (
    Promise,
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    build,
    HttpClient,
    props
) {
    'use strict';

    class NotFound extends Error {
        constructor(message) {
            super(message);
        }
    }

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            const {term, height} = params;

            this.height = height;
            this.size = ko.observable(500);
            this.imageUrl = ko.observable();
            this.imageCaption = ko.observable();
            this.pageUrl = ko.observable();
            this.loaded = ko.observable(false);

            this.searchTerm = this.scrubTerm(term);
            this.error = ko.observable();
            this.ready = ko.observable(false);

            // this.subscribe(this.error, (newValue) => {
            //     if (newValue) {
            //         this.state('error');
            //     }
            // });

            // this.state = ko.observable('loading');

            this.findImage();
        }

        scrubTerm(proposedTerm) {
            // convervatively, remove all non-alpha characters
            const chars = proposedTerm.split('');
            const validChar = /[\w \s]/;
            const newChars = chars.filter((char) => {
                if (validChar.exec(char)) {
                    return true;
                }
                return false;
            });
            return newChars.join('');
        }

        findImage() {
            if (!this.searchTerm) {
                return;
            }
            this.getWikipediaInfo(this.searchTerm)
                .then(({imageUrl, url}) => {
                    this.imageUrl(imageUrl);
                    this.pageUrl(url);
                    this.ready(true);
                })
                .catch(NotFound, (err) => {
                    // console.warn('not found', err);
                    this.error(err);
                })
                .catch((err) => {
                    console.error('Error getting image', err);
                    this.error(err);
                });
        }

        getWikipediaInfo(searchTerm) {
            return this.getPage(searchTerm)
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
        getPage(searchTerm) {
            const terms = JSON.parse(JSON.stringify(searchTerm.split(/\s+/)));
            return new Promise((resolve, reject) => {
                const fetchPage = (terms) => {
                    if (terms.length === 0) {
                        reject(new NotFound('No image found at Wikipedia'));
                        // resolve(null);
                        return;
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
                                            return null;
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
                        })
                        .catch((err) => {
                            reject(err);
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

    const t = html.tag,
        div = t('div'),
        img = t('img');

    const style = html.makeStyles({
        component: {
            css: {
                width: '140px',
                overflow: 'hidden'
            }
        },
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
            // width: '100%'
            }
        },
        imageCaption: {
            css: {
                height: '1em'
            }
        }
    });

    function buildImage() {
        return img({
            class: style.classes.wikipediaImage,
            dataBind: {
                attr: {
                    src: 'imageUrl'
                },
                style: {
                    height: 'height'
                }
            }
        });
    }

    function buildError() {
        return div({
            style: {
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            div({
                style: {
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px silver dashed'
                },
                dataBind: {
                    style: {
                        // width: 'height',
                        height: 'height',
                    },
                    text: 'error().message'
                }
            })
        ]);
    }

    function buildMissing() {
        return div({
            style: {
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            div({
                style: {
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: '1px silver dashed'
                },
                dataBind: {
                    style: {
                        // width: 'height',
                        height: 'height',
                    }
                }
            }, [
                div('Image not found at Wikipedia')
            ])
        ]);
    }

    function buildLoading() {
        return div({
            style: {
                display: 'flex',
                flexDirection: 'column'
            }
        }, [
            div({
                style: {
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: '1px silver dashed'
                },
                dataBind: {
                    style: {
                        // width: 'height',
                        height: 'height',
                    }
                }
            }, [
                div('Locating image at Wikipedia'),
                div({
                    fontSize: '80%'
                }, build.loading())
            ])
        ]);
    }

    // function buildLoading() {
    //     return div([
    //         div({
    //             dataBind: {
    //                 style: {
    //                     width: 'height',
    //                     height: 'height'
    //                 }
    //             }
    //         }, build.loading('Locating image at Wikipedia')),
    //         div({
    //             class: style.classes.imageCaption
    //         })
    //     ]);
    // }

    function template() {
        return div({
            class: style.classes.component
        }, gen.if('ready',
            gen.if('imageUrl',
                buildImage(),
                buildMissing()),
            gen.if('error',
                buildError(),
                buildLoading())));

        // gen.switch('state', [
        //     [
        //         '"loading"', buildLoading()
        //     ],
        //     [
        //         '"loaded"', buildDisplay()
        //     ],
        //     [
        //         '"error"', buildError()
        //     ]
        // ]));
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template(),
            stylesheet: style.sheet
        };
    }

    return reg.registerComponent(component);
});