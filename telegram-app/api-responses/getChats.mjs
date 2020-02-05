import path from 'path';
import DBG from 'debug';
let debug = DBG('televizor:getChats-debug');
import getChatsAdditionalInfo, {getChat} from '../api-combiners/combiners.mjs'
export async function getChats({chatIds}){
  let chats = await Promise.all(chatIds.map( id => {
    return getChat(id);
  }));
//  debug(chats)
  chats = chats.filter((el)=>{return el.type});
  chats = chats.map((chat)=>{
    chat['list'] = 'chatsList';
    return chat;
  });
  chats = getChatsAdditionalInfo(chats);
  return chats;
};
