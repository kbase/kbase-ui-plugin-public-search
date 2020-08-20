define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html',
    'kb_lib/htmlBuilders'
], function (
    ko,
    reg,
    gen,
    html,
    build
) {
    'use strict';

    const t = html.tag,
        a = t('a'),
        div = t('div'),
        table = t('table'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    class ViewModel {
        constructor({ref, scientificName, taxonomy}, context) {
            this.runtime = context.$root.runtime;

            this.ref = ref;
            this.ready = ko.observable(false);

            if (scientificName && taxonomy) {
                this.scientificName = scientificName;
                this.taxonomy = this.parseTaxonomy(taxonomy);
            } else {
                this.scientificName = null;
                this.taxonomy = null;
                this.getOverviewInfo()
                    .then(({scientificName, taxonomy}) => {
                        this.scientificName = scientificName;
                        this.taxonomy = taxonomy;
                        this.ready(true);
                    })
                    .catch((err) => {
                        console.error('ERROR', err);
                    });
            }
        }

        parseTaxonomy(taxonomyString) {
            if (!taxonomyString) {
                return [];
            }

            if (taxonomyString instanceof Array) {
                return taxonomyString;
            }
        
            let taxList;
            if (taxonomyString.indexOf(';') !== -1) {
                taxList = taxonomyString.split(';');
            } else {
                taxList = taxonomyString.split(',');
            }
            return taxList;
        }

        getOverviewInfo() {
            const workspace = this.runtime.service('rpc').makeClient({
                module: 'Workspace',
                timeout: 10000,
                authorization: false
            });
            return workspace.callFunc('get_object_subset', [[{
                ref: this.ref,
                included: [
                    'scientific_name',
                    'taxonomy'
                ]
            }]])
                .spread(([objectData]) => {
                    const scientificName = objectData.data.scientific_name;
                    const taxonomy = this.parseTaxonomy(objectData.data.taxonomy);
                    return {scientificName, taxonomy};
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
        table: {
            css: {

            },
            inner: {
                td: {
                    padding: '4px',
                    verticalAlign: 'top'
                },
                th: {
                    fontWeight: 'bold',
                    color: 'rgba(200,200,200,1)',
                    textAlign: 'left',
                    padding: '4px',
                    verticalAlign: 'top'
                },
                'td:nth-child(1)': {
                    width: '10em'
                },
                'th:nth-child(1)': {
                    width: '10em'
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
        }
    });

    function buildLineage() {
        return table({
            class: styles.classes.table
        }, [
            tr([
                th('Scientific name'),
                td({
                    dataBind: {
                        text: 'scientificName'
                    }
                })
            ]),
            tr([
                th('Taxonomic Lineage'),
                td(div({
                    dataBind: {
                        foreach: 'taxonomy'
                    }
                }, div(a({
                    dataBind: {
                        attr: {
                            href: '"http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=" + $data'
                        },
                        text: '$data'
                    },
                    target: '_blank'
                }))))
            ]),
        ]);
    }
    // http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?name=Enterobacteriaceae
    function template() {
        return div({
            class: styles.classes.component
        },
        gen.if('ready',
            buildLineage(),
            build.loading('Loading taxonomy data')
        ));
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