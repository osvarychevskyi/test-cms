const dirTree = require('directory-tree');
const fs = require('fs');
const p = require('path');
const sprintf = require("sprintf-js").sprintf;

class File {
    constructor(config) {
        this.baseDir = config.baseDir;
        this.tree = {
            items: null,
            indexedByPath: [],
            indexedByDir: []
        };
    }

    getBaseDir() {
        return this.baseDir;
    }

    _buildTree() {
        var tree = this.tree;
        tree.items = dirTree(this.baseDir, null, (item, PATH) => {
            var path = item.path.substr(this.baseDir.length + 1);
            var itemData = {
                path: path
            };
            var relativeDirectory = p.dirname(path);
            tree.indexedByPath[path] = itemData;
            if (typeof tree.indexedByDir[relativeDirectory] === 'undefined') {
                tree.indexedByDir[relativeDirectory] = [];
            }
            tree.indexedByDir[relativeDirectory].push(itemData);
        });
    }

    getTree() {
        if (this.tree.items === null) {
            this._buildTree();
        }
        return this.tree;
    }

    get(path) {
        var path = path.substr('cms://'.length);
        var filePath = p.join(this.getBaseDir(), path);

        return new Promise(function(resolve, reject) {
            // var lstat = fs.lstatSync(filePath);
            // if (!lstat.isFile()) {
            //     throw sprintf("Requested path: %s is not a file.", filePath);
            // }
            fs.readFile(filePath, 'utf8', function(err, data){
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }


    getFilesByDir(path) {
        var filePath = p.join(this.getBaseDir(), path);
        var lstat = fs.lstatSync(filePath);
        if (!lstat.isDirectory()) {
            throw sprintf("Requested path: %s is not a directory.", filePath);
        }
        return this.getTree().indexedByDir[path];
    }

    put(path, content) {
        fs.writeFileSync(path, content);
    }

    post(path, content) {
        fs.writeFileSync(path, content);
    }

    delete(path) {
        fs.unlinkSync(path);
    }

    commit() {

    }

    push() {

    }

    checkout(branch) {

    }
}

export default File;