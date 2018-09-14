define([
    'kb_lib/props',
    './rpc',
    './typeManager',
    'yaml!../data/types.yaml'
], function (
    props,
    rpc,
    typeManager,
    typeDefs
) {
    'use strict';

    class RPCService {
        constructor({runtime}) {
            this.runtime = runtime;
        }

        makeClient(arg) {
            let authenticated;
            if (arg.authenticated === undefined) {
                authenticated = true;
            } else {
                authenticated = arg.authenticated ? true : false;
            }
            return new rpc.RPCClient({
                runtime: this.runtime,
                module: arg.module,
                timeout: arg.timeout,
                authenticated: authenticated
            });
        }
    }

    class SessionService {
        constructor({token, username, realname, email}) {
            this.token = token;
            this.username = username;
            this.realName = realname;
            this.email = email;
        }

        getAuthToken() {
            return this.token;
        }

        getUsername() {
            return this.username;
        }

        getRealname() {
            return this.realname;
        }

        getEmail() {
            return this.email;
        }
    }

    class TypeService {
        constructor({runtime}) {
            this.runtime = runtime;

            this.typeManager = new typeManager.TypeManager({
                typeDefs: typeDefs
            });
        }

        getIcon({type, size}) {
            return this.typeManager.getIcon({type, size});
        }

        parseTypeId(type) {
            return this.typeManager.parseTypeId(type);
        }
    }

    class Runtime {
        constructor({config, token, username, realname, email}) {
            this.configDB = config;
            this.token = token;
            this.username = username;

            this.services = {
                rpc: new RPCService({
                    runtime: this
                }),
                session: new SessionService({
                    runtime: this,
                    username: username,
                    token: token,
                    email: email,
                    realname: realname
                }),
                type: new TypeService({
                    runtime: this
                })
            };
        }

        service(name) {
            switch (name) {
            case 'session':
                return this.services.session;
            case 'rpc':
                return this.services.rpc;
            case 'type':
                return this.services.type;
            }
        }

        auth({token, username, realname, email}) {
            this.services.session.token = token;
            this.services.session.username = username;
            this.services.session.realname = realname;
            this.services.session.email = email;
        }

        unauth() {
            this.services.session.token = null;
            this.services.session.username = null;
            this.services.session.realname = null;
            this.services.session.email = null;
        }

        config(propertyPath, defaultValue) {
            return props.getProp(this.configDB, propertyPath, defaultValue);
        }
    }

    return {Runtime};
});