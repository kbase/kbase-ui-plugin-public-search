define([
    'knockout',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_knockout/lib/viewModelBase',
    'kb_common/html',
    './tooltip'
], function (
    ko,
    reg,
    gen,
    ViewModelBase,
    html,
    TooltipComponent
) {
    'use strict';

    const t = html.tag,
        div = t('div');

    const styles = html.makeStyles({
        component: {
            css: {
                position: 'absolute',
                // border: '3px red solid',
                top: '0',
                left: '0',
                zIndex: '3',
                backgroundColor: 'rgba(200,200,200,0.3)'
            }
        }
    });

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);

            const {channel} = params;

            this.channel = channel;

            this.tooltips = ko.observableArray();

            this.width = ko.observable(0);
            this.height = ko.observable(0);
            this.right = ko.observable();
            this.bottom = ko.observable();

            this.subscribe(this.tooltips, (newValue) => {
                if (newValue.length > 0) {
                    this.width(null);
                    this.height(null);
                    this.right(0);
                    this.bottom(0);
                } else {
                    this.width('0px');
                    this.height('0px');
                    this.right(null);
                    this.bottom(null);
                }
            });

            this.channel.on('add-tooltip', (payload) => {
                this.addTooltip(payload);
            });

            this.channel.send('ready');
        }

        addTooltip({title, content, top, left}) {
            const tooltip = {title, content, top, left};
            this.tooltips.push(tooltip);
            tooltip.remover = () => {
                this.removeTooltip(tooltip);
            };
        }

        removeTooltip(tooltip) {
            this.tooltips.remove(tooltip);
        }

        closeAllTooltips() {
            this.tooltips.removeAll();
        }
    }

    function buildTooltip() {
        return gen.component({
            name: TooltipComponent.name(),
            params: {
                title: 'title',
                content: 'content',
                remover: 'remover',
                top: 'top',
                left: 'left'
            }
        });
    }

    function template() {
        return div({
            class: styles.classes.component,
            dataBind: {
                style: {
                    right: 'right',
                    bottom: 'bottom',
                    width: 'width',
                    height: 'height',
                },
                click: 'closeAllTooltips'
            }
        }, gen.foreach('tooltips', buildTooltip()));
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