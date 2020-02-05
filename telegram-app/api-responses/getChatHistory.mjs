import DBG from 'debug';
import {takeFile} from '../api-combiners/combiners.mjs'
let debug = DBG('televizor:getChatHistory-debug');
let error = DBG('televizor:getChatHistory-error');
import filterResponse from '../api-combiners/output-types/types-getter.mjs'
 export async function getChatHistory(obj){

   obj = filterResponse(obj);
   //debug(obj);
  let {messages} = obj;
   messages = messages.filter(({content})=>content);
   messages = takeFile(messages);
   return messages;
 }
