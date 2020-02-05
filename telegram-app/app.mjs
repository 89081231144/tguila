import fs from 'fs-extra';
import url from 'url';
import express from 'express';
import httpProxy from 'http-proxy';
import dotenv from 'dotenv'
//import hbs from 'hbs';
import path from 'path';
import util from 'util';
import favicon from 'serve-favicon';
import logger from 'morgan';
//import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import axios from 'axios';
import DBG from 'debug';
import rfs from 'rotating-file-stream';
var debug = DBG(`${process.env.DEBUG}:debug`);
var error = DBG(`${process.env.DEBUG}:error`);
import dirname from './dirname.js';
const {__dirname} = dirname;
const apiProxy = httpProxy.createProxyServer();
import renderer from './renderer'
const app = express();
dotenv.config()

app.use(logger('combined'))

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

apiProxy.on('proxyRes', function (proxyRes, req, res) {
        var body = Buffer.from([])
        proxyRes.on('data', function (data) {
          body = Buffer.concat([body, data]);
        });
        proxyRes.on('end', async function () {
            body = body.toString();
            if(req.params.mtd){
              body = JSON.stringify(await ((await import(`./${process.env.API_RESPONSES_FLDR}/${req.params.mtd}`))[req.params.mtd])(JSON.parse(body).result))}
              res.end(body);
        });
    });
/*
app.get('/robots.txt', (req, res) => {
      res.sendFile('dist/robots.txt');
    });
app.get('/sitemap.xml', (req, res) => {
  res.sendFile('dist/sitemap.xml');
});
*/
app.get(`/${process.env.API}/:mtd`, async function(req, res){
  res.set('Content-Type', 'application/json; charset=utf-8');
  if(await fs.exists(`./${process.env.API_REQUESTS_FLDR}/${req.params.mtd}.${process.env.APP_SCRIPT_EXT}`))
  {
      let request = await ((await import(`./${process.env.API_REQUESTS_FLDR}/${req.params.mtd}`))[req.params.mtd])(req.query);
      res.end(JSON.stringify(request));
  }
  else
  {
    let reqQuery = q => {return Object.keys(q).length!==0?`?${Object.keys(q).map(key => key + '=' + encodeURIComponent(q[key])).join('&')}`:''};
    let option = {
        target: `${process.env.TELEGRAM_CLIENT_PROTOCOL}://${process.env.TELEGRAM_CLIENT_CONTAINER}:${process.env.TELEGRAM_CLIENT_CONTAINER_PORT}/${req.params.mtd}${reqQuery(req.query)}`,
        ignorePath:true,
        selfHandleResponse : true
        };
    apiProxy.web(req, res, option);
  }
  });

app.get('*', (req, res) => {


    //context to use as data source
    //in the template for interpolation


    renderer.renderToString({ url: req.url }, function (err, html) {
      if (err) {
        error(err);
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    });
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

process.on('uncaughtException', function(err) {
  error("I've crashed!!! - "+ (err.stack || err));
});

process.on('unhandledRejection', (reason, p) => {
  error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});



export default app;
