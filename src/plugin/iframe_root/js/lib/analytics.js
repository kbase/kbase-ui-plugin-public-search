define([
    'kb_common_ts/HttpClient'
], function (
    HttpClient
) {
    'use strict';

    class Analytics {
        constructor({code, hostname, clientId}) {
            this.code = code;
            this.hostname = hostname;
            this.clientId = clientId;
        }

        encodeQuery(params) {
            return Object.keys(params).map((key) => {
                return [encodeURIComponent(key), encodeURIComponent(params[key])].join('=');
            }).join('&');
        }

        sendToGA(query) {
            const data = this.encodeQuery(query);
            const http = new HttpClient.HttpClient();
            return http.request({
                method: 'POST',
                url: 'https://www.google-analytics.com/collect',
                header: new HttpClient.HttpHeader({
                    'content-type': 'application/x-www-form-urlencoded'
                }),
                withCredentials: true,
                data: data
            })
                .catch((err) => {
                    //alert('boo, it failed. check the log');
                    console.error('ERROR sending to GA', err);
                });
        }

        send(path) {
            const query = {
                v: 1,
                tid: this.code,
                cid: this.clientId,
                t: 'pageview',
                ds: 'kbase-ui',
                dp: path,
                dl: encodeURIComponent(document.location.href),
                dh: this.host
            };
            return this.sendToGA(query);
        }

        sendEvent({category, action, label, value}) {
            // see https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ec
            const query = {
                v: 1,
                tid: this.code,
                cid: this.clientId,

                t: 'event',
                ec: category, // event category, required
                ea: action, // event action, required
            };
            if (label) {
                query.el = label;
            }
            if (value) {
                query.ev = value;
            }
            return this.sendToGA(query);
        }

        sendTiming({category, variable, time, label}) {
            // see https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ec
            var query = {
                v: 1,
                tid: this.code,
                cid: this.clientId,

                t: 'timing',
                utc: category,
                utv: variable,
                utt: time,
                utl: label
            };
            return this.sendToGA(query);
        }
    }
    return {Analytics};
});
