import { Router } from 'express';
import Cms from './cms/cms';
import Repository from './cms/repository'

const url = require('url');
const routes = Router();
const path = require('path');
var appDir = path.dirname(require.main.filename);


// const repository = new Repository({
//     type: 'file',
//     baseDir: path.join(appDir, '/../data')
// });

const repository = new Repository({
    type: 'github',
    repositoryName: 'test-cms-data',
    username: 'username',
    //password: 'NotFoo'
    token: 'tcken'
});

//console.log(repository.getFilesByDir('pages'));
const cms = new Cms(repository);

/**
 * GET home page
 */
routes.get('/*', (req, res) => {
  const requestUrl = url.parse(req.originalUrl);
  const page = cms.getPage(requestUrl.href);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(page));
});


export default routes;