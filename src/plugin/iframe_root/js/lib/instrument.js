define([
    'uuid'
], function (
    Uuid
) {
    'use strict';

    /*
        A Measure represents a single measurement of "something".
        It contains
        an id for identifying the measurement within this plugin / context
        a value for recording the measurement
        it creates a timestamp
    */
    class Measure {
        constructor({id, value, group}) {
            this.id = id;
            this.value = value;
            this.group = group;
            this.createdAt = new Date();
        }

        toJSON() {
            return {
                id: this.id,
                value: this.value,
                group: this.group,
                createdAt: this.createdAt.toISOString()
            };
        }
    }

    // an api for gathering and forwarding instrumentation measurements.
    class Instrument {
        constructor({type, name, username, bus}) {
            this.type = type;
            this.name = name;
            this.username = username;
            this.bus = bus;

            this.session = new Uuid(4).format();
            this.createdAt = new Date();

            this.measurements = [];

            this.autosendInterval = 10000;
            this.timer = null;
        }

        setUsername(username) {
            this.username = username;
        }

        record(measure) {
            this.measurements.push(measure);
            this.start();
        }

        clear() {
            this.measurements = [];
        }

        toJSON() {
            return this.measurements.map((measure) => {
                return measure.toJSON();
            });
        }

        send() {
            const measurements = this.toJSON();
            this.clear();
            this.bus.send('instrumentation', {
                type: this.type,
                name: this.name,
                session: {
                    id: this.session,
                    createdAt: this.createdAt.toISOString(),
                    username: this.username
                },
                measurements: measurements
            });
        }

        start() {
            if (this.timer !== null) {
                return;
            }
            this.timer = window.setTimeout(() => {
                this.send();
                this.timer = null;
                // handles case of measurements made during the send.
                if (this.measurements.length > 0) {
                    this.start();
                }
            }, this.autosendInterval);
        }
    }

    function createGroup() {
        return new Uuid(4).format();
    }

    return {Instrument, Measure, createGroup};
});
