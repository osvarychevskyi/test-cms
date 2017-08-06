import fileRepository from './repository/file';
import gitRepository from './repository/git';
import gitHubRepository from './repository/github'

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
            case 'bitbucket':
                break;
        }
    }

}

export default Repository;