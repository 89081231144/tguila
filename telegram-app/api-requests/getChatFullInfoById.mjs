import DBG from 'debug';
import filterResponse from '../api-combiners/output-types/types-getter.mjs'
import getChatsAdditionalInfo, {getChat,getChats,searchChats} from '../api-combiners/combiners'
var debug = DBG('televizor:req-getChatFullInfoById-debug');
var error = DBG('televizor:req-getChatFullInfoById-error');
export async function getChatFullInfoById({chatId}){
  let ids,searchChatsIds,getChatsIds,getChatInfo;
  ids = await Promise.all([searchChats(),getChats(),getChat(chatId)]);
  //debug(ids)
  searchChatsIds = ids[0]['chatIds'];
  getChatsIds = ids[1]['chatIds'];
  getChatInfo = ids[2];
  (searchChatsIds.includes(Number(chatId)))?getChatInfo['list'] = 'recentlyFound':null;
  (getChatsIds.includes(Number(chatId)))?getChatInfo['list'] = 'chatsList':null;
  !getChatInfo.hasOwnProperty('list')?getChatInfo['list'] = 'unListed':null;
  return getChatsAdditionalInfo([getChatInfo]);
};
