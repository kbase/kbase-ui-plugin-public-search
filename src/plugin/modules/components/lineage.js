define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        a = t('a'),
        div = t('div');

    class ViewModel {
        constructor({lineage}) {
            this.lineage = ko.observableArray(ko.utils.unwrapObservable(lineage));
        }
    }

    const styles = html.makeStyles({
    });

    function buildLineage() {
        return div({
            dataBind: {
                foreach: 'lineage'
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
        return buildLineage();
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