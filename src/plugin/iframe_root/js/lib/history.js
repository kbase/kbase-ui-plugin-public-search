define([
    'bluebird',
    'kb_common_ts/Cookie',
    'kb_lib/jsonRpc/genericClient',
    'kb_lib/props'
], function (
    Promise,
    Cookie,
    GenericClient,
    props
) {
    'use strict';

    function sameArray(a1, a2) {
        if (a1.length !== a2.length) {
            return false;
        }
        for (let i = 0; i < a1.length; i += 1) {
            if (a1[i] !== a2[i]) {
                return false;
            }
        }
        return true;
    }

    function firstSuccess(array, fun) {
        for (var i = 0; i < array.length; i += 1) {
            var result = fun(array[i]);
            if (result) {
                return result;
            }
        }
    }

    class History {
        constructor({name, maxSize}) {
            this.name = name;
            this.maxSize = maxSize || 10;
        }

        // updateHistory(term) {
        //     // get history from cookie.
        //     return this.getHistory()
        //         .then((history) => {
        //             let newHistory;

        //             // if term is in history, remove it
        //             if (history.includes(term)) {
        //                 newHistory = history.filter((item) => {
        //                     return (item !== term);
        //                 });
        //             } else {
        //                 newHistory = history;
        //             }

        //             // add term to top
        //             newHistory.unshift(term);

        //             // if > 10 history items, remove the last one
        //             if (newHistory.length > this.maxHistoryLength) {
        //                 newHistory = newHistory.slice(0, this.maxHistoryLength);
        //             }

        //             this.setHistory(newHistory);

        //             return newHistory;
        //         });
        // }


        updateHistory(term) {
            // get history from cookie.
            return this.getHistory()
                .then((history) => {
                    let newHistory;

                    // if term is in history, remove it
                    if (history.includes(term)) {
                        newHistory = history.filter((item) => {
                            return (item !== term);
                        });
                    } else {
                        newHistory = history;
                    }

                    // add term to top
                    newHistory.unshift(term);

                    // ensure the history does not exceed the maximum
                    // allowable length.
                    if (newHistory.length > this.maxSize) {
                        console.log('truncated?', newHistory.length, this.maxSize);
                        newHistory = newHistory.slice(0, this.maxSize);
                    }

                    this.setHistory(newHistory);

                    return newHistory;
                });
        }

        getHistory() {
        }

        setHistory() {
        }

        removeHistory() {
        }
    }

    class CookieHistory extends History {
        constructor(params) {
            super(params);
            this.maxAge = params.maxAge || 60 * 60;
        }

        setHistory(history) {
            const cookieValue = encodeURIComponent(JSON.stringify(history));
            const cookie = new Cookie.Cookie(this.name)
                .setSecure(true)
                .setDomain(window.location.hostname)
                .setPath('/')
                .setMaxAge(this.maxAge)
                .setValue(cookieValue);
            const cookieManager = new Cookie.CookieManager();
            cookieManager.setItem(cookie);
        }

        getHistory() {
            return Promise.try(() => {
                const cookieManager = new Cookie.CookieManager();
                const historyString = cookieManager.getItem(this.name);
                let history;
                if (historyString) {
                    try {
                        history = JSON.parse(decodeURIComponent(historyString));
                    } catch (ex) {
                        console.warn('Corrupt history found in cookie; resetting cookie: ' + historyString, ex);
                        history = [];
                        this.setHistory(history);
                    }
                } else {
                    history = [];
                }
                return history;
            });
        }

        deleteHistory() {
        }
    }

    class ProfileHistory extends History {
        constructor(params) {
            super(params);
            this.maxAge = params.maxAge || 60 * 60;
            // username is required in order to talk to the profile service.
            // yes, it should have a mode where it uses the token to get the username...
            this.username = params.username;
            this.profileService = new GenericClient({
                url: params.url,
                token: params.token,
                module: 'UserProfile'
            });
        }

        updateUserProfile(profileUpdate) {
            return this.profileService.callFunc('update_user_profile', [profileUpdate])
                .then(() => {
                    return true;
                })
                .catch((err) => {
                    console.error('Error updating user profile', err);
                    throw new Error('Error updating profile with history: ' + err.message);
                    // return [null, {
                    //     source: 'ProfileService:update_user_profile',
                    //     code: 'error-in-call',
                    //     message: 'An error occurred attempting to update the user profile: ' + err.message,
                    //     errors: [
                    //         err
                    //     ],
                    //     info: {
                    //         profileUpdate: profileUpdate
                    //     }
                    // }];
                });
        }

        setHistory(history) {
            const key = ['public-search', 'settings', 'history'];

            return this.profileService.callFunc('get_user_profile', [[this.username]])
                .spread((profiles) => {
                    const profile = new props.Props({
                        data: profiles[0]
                    });

                    const prefs = new props.Props({
                        data: profile.getItem('profile.plugins', {})
                    });

                    if (prefs.hasItem(key)) {
                        if (sameArray(prefs.getItem(key).history, history)) {
                            return true;
                        }
                    }

                    prefs.setItem(key, {
                        history: history,
                        time: new Date().getTime()
                    });

                    // put together a profile update.
                    // note that this profile is used for "update" meaning that we don't have to replicate
                    // all of the fields ... it is not an overall replacement, but a replacement of the
                    // top level profile properties (user too?).
                    // I believe that 'user' is provided only as a means of locating the profile to update.
                    var profileUpdate = {
                        profile: {
                            profile: {
                                plugins: prefs.getRaw()
                            },
                            user: profile.getItem('user')
                        }
                    };

                    // Don't want to really replace, but update_user_profile only
                    return this.updateUserProfile(profileUpdate);
                })
                .catch((err) => {
                    console.error('ERROR setting history', err);
                    throw new Error('Error setting history: ' + err.message);
                    // return [null, {
                    //     source: 'ProfileService:get_user_profile',
                    //     code: 'error-getting-user-profile',
                    //     message: 'An error occurred attempting to save the user preferences: ' + err.message,
                    //     errors: [
                    //         err
                    //     ],
                    //     info: {
                    //         username: username
                    //     }
                    // }];
                });
        }

        getHistory() {
            const key = ['profile', 'plugins', 'public-search', 'settings', 'history'];

            return this.profileService.callFunc('get_user_profile', [[this.username]])
                .spread((profiles) => {
                    const profile = new props.Props({
                        data: profiles[0]
                    });

                    const keys = [key];

                    let history = firstSuccess(keys, (key) => {
                        return profile.getItem(key);
                    });

                    if (!history) {
                        history = {
                            history: [],
                            time: new Date().getTime()
                        };
                    } else if (!(history.history instanceof Array)) {
                        history = {
                            history: [],
                            time: new Date().getTime()
                        };
                    }
                    return history.history;
                })
                .catch((err) => {
                    console.log('Error fetching history', err);
                    throw new Error('Error fetching history: ' + err.message);
                    // return [null, {
                    //     source: 'ProfileService:get_user_profile',
                    //     code: 'error-getting-user-profile',
                    //     message: 'An error occurred attempting to get the user preferences: ' + err.message,
                    //     errors: [
                    //         err
                    //     ],
                    //     info: {
                    //         username: username
                    //     }
                    // }];
                });
        }

        deleteHistory() {
        }
    }

    return {History, CookieHistory, ProfileHistory};
});