import DBG from 'debug';
//import getChatsAdditionalInfo from '../api-combiners/combiners.mjs'
//import filterResponse from '../api-combiners/output-types/types-getter.mjs'
import getChatsAdditionalInfo, {getChat} from '../api-combiners/combiners.mjs'

let debug = DBG('televizor:searchChats-debug');
let error = DBG('televizor:searchChats-error');
export async function searchChats({chatIds}){
  let chats = await Promise.all(chatIds.map( id => {
    return getChat(id);
  }));

  chats = chats.filter((el)=>{return el.type});

  chats = chats.map((chat)=>{
    chat['list'] = 'recentlyFound';
    return chat;
  });
  //debug(chats)
  chats = getChatsAdditionalInfo(chats);
  return chats;
}
