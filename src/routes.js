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
    type: 'http',
    path: 'https://raw.githubusercontent.com/osvarychevskyi/test-cms-data/master'
});

//console.log(repository.getFilesByDir('pages'));
const cms = new Cms(repository);

/**
 * GET home page
 */
routes.get('/favicon.ico', (req, res) => {
  res.status(400);
});

routes.get('/*', (req, res) => {
    const requestUrl = url.parse(req.originalUrl);
    cms.getPage(requestUrl.href)
        .then(function(data) {
            return JSON.stringify(data);
        })
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        })
        .catch(function (e) {
            res.status(500);
            res.end(JSON.stringify(e));
        });
});


export default routes;