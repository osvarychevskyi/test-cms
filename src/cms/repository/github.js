const GitHubAPI = require('github-api');
const p = require('path');

class GitHub {
    constructor(config) {
        this.baseDir = config.repositoryName;
        this.tree = {
            items: null,
            indexedByPath: [],
            indexedByDir: []
        };
        this.username = config.username;
        this.gh = new GitHubAPI({
            username: config.username,
            token: config.token
        });
    }

    getBaseDir() {
        return this.baseDir;
    }

    _buildTree() {
        var tree = this.tree;
        // this.gh.listCommits().then(function({data}){
        //
        // });
        // tree.items = dirTree(this.baseDir, null, (item, PATH) => {
        //     var path = item.path.substr(this.baseDir.length + 1);
        //     var itemData = {
        //         path: path
        //     };
        //     var relativeDirectory = p.dirname(path);
        //     tree.indexedByPath[path] = itemData;
        //     if (typeof tree.indexedByDir[relativeDirectory] === 'undefined') {
        //         tree.indexedByDir[relativeDirectory] = [];
        //     }
        //     tree.indexedByDir[relativeDirectory].push(itemData);
        // });
    }

    getTree() {
        if (this.tree.items === null) {
            this._buildTree();
        }
        return this.tree;
    }

    get(path) {
        var repo = this.gh.getRepo(this.username, this.getBaseDir())
        repo.getContents('master', path, true, function (err, data) {
            var a = '123';
        }).then(function({data}){
            var a = '123';
        });
        //var lstat = fs.lstatSync(filePath);
        // if (!lstat.isFile()) {
        //     throw sprintf("Requested path: %s is not a file.", filePath);
        // }
        //var content = fs.readFileSync(filePath, 'utf8');
        return content;
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

export default GitHub;