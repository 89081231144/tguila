import express from 'express';
export const router = express.Router();
import DBG from 'debug';
var debug = DBG('televizor:routes');
var error = DBG('televizor:routes-error');
/* GET home page. */

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.end(`
    123
      `)
  }
);
