define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_lib/html'
], function (
    ko,
    reg,
    gen,
    html
) {
    'use strict';

    const t = html.tag,
        div = t('div');
    // const {div} = html.tags(['div']);

    class ViewModel {
        constructor(params) {
            // Sorry, this component works within the view model
            // set up by the table component.
            this.selected = params.row.data.selected.value;
            this.selectedRows = params.env.selectedRows;
            this.rowId = params.row.id;
        }

        toggleSelected(data,e) {
            this.selected(!this.selected());

            if (this.selected()) {
                this.selectedRows.remove(this.rowId);
                this.selectedRows.push(this.rowId);
            } else {
                this.selectedRows.remove(this.rowId);
            }
            // Since we also listen on the row for a click to bring up the inspector,
            // we need to block that from propagating.
            // TODO: we need to also adjust the hover effect for the row to exclude
            // this column.
            e.stopPropagation();
        }
    }

    function template() {
        return div({
            style: {
                cursor: 'pointer'
            },
            class: 'fa',
            dataBind: {
                class: 'selected() ? "fa-check-square-o" : "fa-square-o"',
                click: 'function(d,e){$component.toggleSelected.call($component,d,e)}'
            }
        });
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});