var $RefParser = require('json-schema-ref-parser');

class Cms {
    constructor(repository) {
        this.repository = repository;
        this.pagesDir = 'pages';
    }

    /**
     *
     * @param path
     * @returns {*}
     */
    getPage(path) {
        var pagePath = 'cms://' + this.pagesDir + path + '.yaml';
        var cmsResolver = this.getResolver();
        return $RefParser
            .dereference(pagePath,
                {
                    resolve: {
                        cms: cmsResolver
                    }
                })
            .then(function(schema) {
                return schema;
            });
    }

    getResolver() {
        var repository = this.repository;
        return {
            order: 1,
            canRead: /^cms:/i,
            read: function(file) {
                return repository.get(file.url)
                .then(function(data) {
                    if (data) {
                        return data;
                    } else {
                        throw new Error("No data!");
                    }
                });
            }
        };
    }
}

export default Cms;