define([], function () {
    'use strict';
    /*
    docToJSON
    just makes it easier (if not efficient...)
    document is the initial object, an array, to preserve order
    all nodes have the element name, attributes, children
    all elements are in an array of objects, in which the
    */
    function docToJSON(doc) {
        const node = {
            name: null,
            attributes: [],
            children: []
        };
        for (let i = 0; i < doc.children.length; i += 1) {
            const childNode = doc.children[i];
            node.children.push(nodeToJSON(childNode));
        }
        return node;
    }

    function elementToJSON(node) {
        const n = {
            type: 'element',
            name: node.nodeName,
            attributes: {},
            children: [],
            text: null
        };
        if (node.hasChildNodes() > 0) {
            for (let i = 0; i < node.childNodes.length; i += 1) {
                const childNode = node.childNodes[i];
                n.children.push(nodeToJSON(childNode));
            }
        } else {
            n.text = node.textContent;
        }
        if (node.hasAttributes()) {
            for (let i = 0; i < node.attributes.length; i += 1) {
                const attribute = node.attributes[i];
                n.attributes[attribute.name] = attribute.value;
            }
        }
        return n;
    }

    function textToJSON(node) {
        const n = {
            type: 'text',
            name: node.nodeName,
            attributes: {},
            children: [],
            text: node.data
        };
        return n;
    }

    function nodeToJSON(node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            return elementToJSON(node);
        case Node.TEXT_NODE:
            return textToJSON(node);
        default:
            return null;
        }
    }

    function findText(doc, path, defaultValue) {
        const found = find(doc, path, null);
        if (found) {
            return found.text;
        } else {
            return defaultValue;
        }
    }

    function find(documentJSON, path, defaultValue) {
        function findit(node, path) {
            if (path.length === 0) {
                return node;
            }
            const [key, ...rest] = path;
            for (let i = 0; i < node.children.length; i += 1) {
                const child = node.children[i];
                if (child.name === key) {
                    return find(child, rest);
                }
            }
            return defaultValue;
        }
        return findit(documentJSON, path);
    }

    return {docToJSON, findText, find};
});