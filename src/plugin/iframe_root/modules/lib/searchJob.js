define([
    'uuid'
], function (
    Uuid
) {
    'use strict';

    const STARTED = Symbol();
    const RUNNING = Symbol();
    const FINISHED = Symbol();
    const CANCELED = Symbol();
    const ERROR = Symbol();

    class SearchJob {
        constructor() {
            this.id = new Uuid(4).format();
            this.promise = null;
            this.state = null;
            this.error = null;
        }

        started() {
            this.state = STARTED;
        }

        running(newPromise) {
            this.promise = newPromise;
            this.state = RUNNING;
        }

        cancel() {
            if (this.state !== RUNNING) {
                return;
            }
            if (!this.promise) {
                return;
            }
            console.warn('canceling search job ' + this.id);
            this.promise.cancel();
            this.state = CANCELED;
        }

        setError(errorObject) {
            this.error = errorObject;
            this.state = ERROR;
        }

        finished() {
            this.promise = null;
            this.state = FINISHED;
        }

        isCanceled() {
            return this.state === CANCELED;
        }
    }

    return SearchJob;
});