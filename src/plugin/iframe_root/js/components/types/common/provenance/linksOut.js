define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_lib/html'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html
) {
    'use strict';

    /*
    This is essentially object composition - which objects, other than this one,
    contribute to the entire data scope for this object.
    See workspace.get_objects2, the refs field in the returned ObjectData.
    */

    class ViewModel extends ViewModelBase{
        constructor(params) {
            super(params);
            const {object} = params;

            this.object = object;

        }
    }

    const t = html.tag,
        div = t('div');

    function template() {
        return div('links out here');
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});