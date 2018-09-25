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
        div = t('div');

    class ViewModel {
        constructor({ref, taxonomy}, context) {
            this.runtime = context.$root.runtime;

            this.ref = ref;
            this.ready = ko.observable(false);

            console.log('lineage...', ref, taxonomy);

            if (taxonomy) {
                this.taxonomy = this.parseTaxonomy(taxonomy);
                this.ready(true);
            } else {
                this.taxonomy = null;
                this.getOverviewInfo()
                    .then(({taxonomy}) => {
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
                    'taxonomy'
                ]
            }]])
                .spread(([objectData]) => {
                    const taxonomy = this.parseTaxonomy(objectData.data.taxonomy);
                    return {taxonomy};
                });
        }
    }

    const styles = html.makeStyles({
        component: {
            css: {
                // flex: '1 1 0px',
                // display: 'flex',
                // flexDirection: 'column',
                // marginTop: '10px'
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
        return div({
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
        })));
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