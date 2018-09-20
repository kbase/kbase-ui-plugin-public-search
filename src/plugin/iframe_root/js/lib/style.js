define([
    'kb_lib/html'
], function (
    html
) {
    'use strict';
    const common = html.makeStyles({
        tooltipLight: {
            css: {
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    // backgroundColor: 'rgba(0, 255, 0, 0.3)'
                    textDecoration: 'underline dashed yellow'
                }
            }
        },
        tooltipDark: {
            css: {
                cursor: 'pointer'
            },
            pseudo: {
                hover: {
                    // backgroundColor: 'rgba(0, 255, 0, 0.3)'
                    textDecoration: 'underline dashed orange'
                }
            }
        }
    });

    return common;
});