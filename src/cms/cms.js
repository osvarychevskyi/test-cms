var yaml = require('js-yaml');
var yamlinc = require('yaml-include');

class Cms {
    constructor(repository) {
        this.repository = repository;
        this.pagesDir = 'pages';
        this._configureYamlinc();
    }

    /**
     *
     * @param path
     * @returns {*}
     */
    getPage(path) {
        var pagePath = this.pagesDir + path + '.yaml';
        var content = this.repository.get(pagePath);
        var page = yaml.load(content, { schema: yamlinc.YAML_INCLUDE_SCHEMA });

        return page;
    }

    /**
     * Sets the correct calculation of base path
     * Injects into yamlinc a possibility to load files content from different repositories types
     *
     * @private
     */
    _configureYamlinc() {
        var repository = this.repository;
        yamlinc.getBasePath = function () {
            return repository.getBaseDir();
        };
        yamlinc.YamlIncludeFileType.construct = function (fileRelativePath)
        {
            var src = repository.get(fileRelativePath, 'utf8');
            var included = yaml.load(src, { schema: yamlinc.YAML_INCLUDE_SCHEMA });

            return included;
        }
    }
}

export default Cms;