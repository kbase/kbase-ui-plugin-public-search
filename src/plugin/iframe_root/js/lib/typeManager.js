define([
    'kb_lib/props'
],
function (props) {
    'use strict';

    function getColor(type) {
        const colors = [
            '#F44336',
            '#E91E63',
            '#9C27B0',
            '#3F51B5',
            '#2196F3',
            '#673AB7',
            '#FFC107',
            '#0277BD',
            '#00BCD4',
            '#009688',
            '#4CAF50',
            '#33691E',
            '#2E7D32',
            '#AEEA00',
            '#03A9F4',
            '#FF9800',
            '#FF5722',
            '#795548',
            '#006064',
            '#607D8B'
        ];

        let code = 0;
        for (let i = 0; i < type.name.length; i += 1) {
            code += type.name.charCodeAt(i);
        }

        return colors[code % colors.length];
    }

    class TypeManager {
        constructor({typeDefs}) {

            this.types = new props.Props({data: {}});

            typeDefs.types.forEach((typeSpec) => {
                const module = typeSpec.type.module;
                const name = typeSpec.type.name;
                this.types.setItem([module, name], typeSpec);
            }, {});

            this.defaultIcon = {
                type: 'fontAwesome',
                classes: ['fa-file-o']
            };
        }

        getIcon({type, size}) {
            const icon = this.types.getItem([type.module, type.name, 'icon']) || this.defaultIcon;
            const classes = icon.classes.map(function (x) {
                return x;
            });
            console.log('got icon!', icon, classes);
            switch (icon.type) {
            case 'kbase':
                classes.push('icon');
                if (size) {
                    switch (size) {
                    case 'small':
                        classes.push('icon-sm');
                        break;
                    case 'medium':
                        classes.push('icon-md');
                        break;
                    case 'large':
                        classes.push('icon-lg');
                        break;
                    }
                }
                break;
            case 'fontAwesome':
                classes.push('fa');
                break;
            }
            if (classes) {
                return {
                    classes: classes,
                    type: icon.type,
                    color: icon.color || getColor(type),
                    html: '<span class="' + classes.join(' ') + '"></span>'
                };
            }
        }

        setIcon(type, iconDef) {
            var typeDef = this.types.getItem([type.module, type.name]);
            if (typeDef === undefined || typeDef === null) {
                this.types.setItem([type.module, type.name], {
                    icon: iconDef
                });
            } else {
                this.types.setItem([type.module, type.name, 'icon'], iconDef);
            }
        }

        makeTypeId(type) {
            return type.module + '.' + type.name + '-' + type.version.major + '.' + type.version.minor;
        }
        parseTypeId(typeId) {
            var matched = typeId.match(/^(.+?)\.(.+?)-(.+?)\.(.+)$/);
            if (!matched) {
                throw new Error('Invalid data type ' + typeId);
            }
            if (matched.length !== 5) {
                throw new Error('Invalid data type ' + typeId);
            }

            return {
                module: matched[1],
                name: matched[2],
                version: {
                    major: matched[3],
                    minor: matched[4]
                }
            };
        }

        makeType() {
            if (arguments.length === 1) {
                // make from an object.
                var spec = arguments[0];
                if (spec.version) {
                    var version = spec.version.split('.');
                    return {
                        module: spec.module,
                        name: spec.name,
                        version: {
                            major: version[0],
                            minor: version[1]
                        }
                    };

                }
            }
        }

        makeVersion(type) {
            return type.version.major + '.' + type.version.minor;
        }

    }

    return {TypeManager};
});