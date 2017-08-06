import fileRepository from './repository/file';
import gitRepository from './repository/git';
import gitHubRepository from './repository/github'
import httpRepository from './repository/http'

class Repository {
    constructor(config) {
        switch (config.type) {
            case 'file':
                return new fileRepository(config);
                break;
            case 'git':
                return new gitRepository(config);
                break;
            case 'github':
                return new gitHubRepository(config);
                break;
            case 'http':
                return new httpRepository(config);
            case 'bitbucket':
                break;
        }
    }

}

export default Repository;