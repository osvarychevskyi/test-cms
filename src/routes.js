import { Router } from 'express';
import { CmsFile } from 'radaller-core';

const path = require('path');
const routes = Router();
const basePath = path.normalize(process.env.BASE_PATH);

const client = new CmsFile({
    basePath: basePath
});

routes.options('/*', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    res.status(200);
    res.end("");
});

routes.get('/*', (req, res) => {
    client.get(req.path, req.query)
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(data);
        })
        .catch(function (e) {
            console.log(e);
            res.status(404);
            res.end(JSON.stringify(e));
        });
});

routes.post('/*', (req, res) => {
    client.post(req.path, req.body)
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            console.log(data);
            res.end(data);
        })
        .catch(function (e) {
            console.log(e);
            res.status(404);
            res.end(JSON.stringify(e));
        });
});

routes.put('/*', (req, res) => {
    client.put(req.path, req.body)
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(data);
        })
        .catch(function (e) {
            res.status(404);
            res.end(JSON.stringify(e));
        });
});

routes.delete('/*', (req, res) => {
    client.remove(req.path)
        .then(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(data);
        })
        .catch(function (e) {
            res.status(404);
            res.end(JSON.stringify(e));
        });
});

export default routes;