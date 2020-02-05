import path from 'path';
import DBG from 'debug';
let debug = DBG('televizor:getChat-debug');
import filterResponse from '../api-combiners/output-types/types-getter.mjs'
export function getChat(obj){
  obj = filterResponse(obj);
  //debug(obj)
  //if(!obj.hasOwnProperty('photo')){obj.photo = {};}
  //obj.visible = true;
  return obj;
};
