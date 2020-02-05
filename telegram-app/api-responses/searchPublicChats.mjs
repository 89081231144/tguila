import DBG from 'debug';
//import collectChatsFullInfo from '../api-combiners/combiners.mjs'
//const { collectChatsFullInfo } = collectChatsFullInfo;
import getChatsAdditionalInfo, {getChat} from '../api-combiners/combiners.mjs'

let debug = DBG(`${process.env.DEBUG}:searchPublicChats-debug`);
let error = DBG(`${process.env.DEBUG}:searchPublicChats-error`);


export async function searchPublicChats({chatIds}){
  let chats = await Promise.all(chatIds.map( id => {return getChat(id);}));
  //debug(chats)
  chats = chats.filter((el) => {
    return (el.type && Object.keys(el.lastMessage).length > 0)?true:false;
  });
  //debug(chats)
  chats = getChatsAdditionalInfo(chats); //chats +    getSupergroupFullInfo(supergroupId), getSupergroup(supergroupId), getChatMessageByDate(id,ts)
  return chats;
}
