import filterResponse from '../api-combiners/output-types/types-getter.mjs'
import getChatsAdditionalInfo, {getChats,searchChats} from '../api-combiners/combiners.mjs'
import DBG from 'debug';
var debug = DBG('televizor:searchPublicChat-debug');
 export async function searchPublicChat(obj){
   //debug(obj);
   let ids, searchChatsIds, getChatsIds, searchPublicChat;
   ids = await Promise.all([searchChats(),getChats()]);
   searchChatsIds = ids[0]['chatIds'];
   getChatsIds = ids[1]['chatIds'];
   searchPublicChat = filterResponse(obj);
   searchPublicChat = [searchPublicChat].filter((el)=>{
     return (el.type && Object.keys(el.lastMessage).length > 0)?true:false;
   });
   //debug(searchPublicChat);
   if(searchPublicChat.length > 0){
     (searchChatsIds.includes(Number(searchPublicChat[0]['id'])))?searchPublicChat[0]['list'] = 'recentlyFound':null;
     (getChatsIds.includes(Number(searchPublicChat[0]['id'])))?searchPublicChat[0]['list'] = 'chatsList':null;
     !searchPublicChat[0].hasOwnProperty('list')?searchPublicChat[0]['list'] = 'unListed':null;
     //debug(searchPublicChat);
   }
   return getChatsAdditionalInfo(searchPublicChat);
 };
