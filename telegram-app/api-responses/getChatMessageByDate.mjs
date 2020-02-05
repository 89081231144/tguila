import DBG from 'debug';
import filterResponse from '../api-combiners/output-types/types-getter.mjs'
let debug = DBG('televizor:getChatMessageByDate-debug');
let error = DBG('televizor:getChatMessageByDate-error');
export function getChatMessageByDate(obj){
  obj = filterResponse(obj);
  debug(obj)
  return obj;
};
