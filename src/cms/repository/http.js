const p = require('path');
var fetch = require('node-fetch');

class Http {
    constructor(config) {
        this.path = config.path;
        this.tree = {
            items: null,
            indexedByPath: [],
            indexedByDir: []
        };
    }

    getBaseDir() {
        return this.path;
    }

    get(path) {
        var path = path.substr('cms://'.length);
        var fullPath = this.getBaseDir() + p.sep + path;
        return fetch(fullPath).then(res => res.text());
    }

}

export default Http;