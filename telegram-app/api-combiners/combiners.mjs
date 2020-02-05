import DBG from 'debug';
let debug = DBG(`${process.env.DEBUG}:combiners-debug`);
let error = DBG(`${process.env.DEBUG}:combiners-error`);
import axios from 'axios';
import filterResponse from './output-types/types-getter.mjs'
const reqUrl = `${process.env.TELEGRAM_CLIENT_PROTOCOL}://${process.env.TELEGRAM_CLIENT_CONTAINER}:${process.env.TELEGRAM_CLIENT_CONTAINER_PORT}`;
export async function getChat(id) {
  let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/getChat?chatId=${id}`))
  return filterResponse(result);
}
export async function getChats() {
     let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/getChats`))
     return result;
}
export async function searchChats() {
     let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/searchChats`))
     return result;
}
async function getSupergroupFullInfo(id) {
  let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/getSupergroupFullInfo?supergroupId=${id}`))
  return filterResponse(result);
}
function addRecentlyFoundChat(chatId) {
  return axios.get(`${reqUrl}/addRecentlyFoundChat?chatId=${chatId}`);
}
function joinChat(chatId) {
  return axios.get(`${reqUrl}/joinChat?chatId=${chatId}`);
}
async function getSupergroup(id) {
  let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/getSupergroup?supergroupId=${id}`))
  return filterResponse(result);
}
async function getChatMessageByDate(chatId, date) {
  let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/getChatMessageByDate?chatId=${chatId}&date=${date}`))
  return filterResponse(result);
}
export async function downloadFile(fileId,synchronous = 1) {
  let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/downloadFile?fileId=${fileId}&synchronous=${synchronous}`))
  return filterResponse(result);
}
async function getFile(fileId =[]) {
  let {data:{result}} = await Promise.resolve(axios.get(`${reqUrl}/getFile?fileId=${fileId}`))
  let {id, local:{path,isDownloadingActive,isDownloadingCompleted}} = filterResponse(result);
  return {id,path,isDownloadingActive,isDownloadingCompleted};
}

export async function getFilesInfo(ids = []){
  return await Promise.all(ids.map((id)=>{return getFile(id);}));
}
//let delKeys = ['_', 'local']
//  let objCopy = Object.assign({},obj);
//  delKeys.forEach(k=>delete objCopy[k]);
export function collectAndLoad(fileObj)
{
  let files = [];
  for (let [key, value] of Object.entries(fileObj)){
    if(key === '_' && value === 'file'){
      let {id, local:{path,isDownloadingActive,isDownloadingCompleted}} = fileObj;
      files.push(fileObj);
      //if(!path){
      if(!isDownloadingActive&&!isDownloadingCompleted){
        downloadFile(id,0).then((res)=>{debug(`${id} downloaded`)});
      }
    }
    if(typeof value === 'object'){
      files = files.concat(collectAndLoad(value));
    }
  }
   return files;
}
export function takeFile(obj){
  let copy = JSON.parse(JSON.stringify(obj));

  let res = collectAndLoad(copy);
  let cont = [];
  copy = JSON.stringify(copy);
  res.forEach((el)=>{
  	let {id,local:{path,isDownloadingActive,isDownloadingCompleted}} = el;
  	//console.log({id,path})
  	cont.push({id,path,isDownloadingActive,isDownloadingCompleted})
  	copy = copy.replace(JSON.stringify(el),JSON.stringify({id}))
  })
return {obj:JSON.parse(copy),files:cont};
}

export default async function getChatsAdditionalInfo(chats){
  let res = {chats:[], files:[], lastMessages:[]};
  if(chats.length > 0){
    let files = [],
        lastMessages = [],
        mergedChatsInfo = [],
        filterUsersCount = Number(process.env.FOUNDED_CHAT_MEMBERCOUNT_FOR_PROCESSING),
        addRecentlyFoundThreshold = Number(process.env.FOUNDED_CHAT_MEMBERCOUNT_FOR_ADD_TO_RECENTLYFOUND),
        addChatsListThreshold = Number(process.env.FOUNDED_CHAT_MEMBERCOUNT_FOR_ADD_TO_CHATSLIST);


       let chatsAdditionalInfo = chats.map(
        ({id,type:{supergroupId}}) => {
          return Promise.all([
                              getSupergroupFullInfo(supergroupId),
                              getSupergroup(supergroupId),
                            ]);
                          }
          );
       chatsAdditionalInfo = await Promise.all(chatsAdditionalInfo);// [[{description},{username,memberCount}],[{description},{username,memberCount}],.....]
       chats.forEach((el,index)=>{
         let getSupergroupFullInfo = chatsAdditionalInfo[index][0],
               getSupergroup = chatsAdditionalInfo[index][1],
               mCount = getSupergroup['memberCount'],
               username = getSupergroup['username'];
           if(mCount > filterUsersCount){
             if(!el.hasOwnProperty('list')){
               !username?joinChat(el.id).then((res,rej)=>{el['list'] = 'chatsList'; /*debug(`joined to private chat: ${el.id} - ${el.title}`);*/}):null;
               (username && mCount<addRecentlyFoundThreshold)?el['list'] = 'unListed':null;
               (username && mCount < addChatsListThreshold && mCount > addRecentlyFoundThreshold)?addRecentlyFoundChat(el.id).then((res,rej)=>{el['list'] = 'recentlyFound'; /*debug(`${el.id} - ${el.title} added to recently found`);*/}):null;
               (username && mCount > addChatsListThreshold)?joinChat(el.id).then((res,rej)=>{el['list'] = 'chatsList'; /*debug(`joined to public chat: ${el.id} - ${el.title}`);*/}):null;
             }
             let {files:objFiles, obj:modObject} = takeFile(el);
             files.push(...objFiles);
             lastMessages.push(el.lastMessage);
             mergedChatsInfo.push({...el,...getSupergroupFullInfo,...getSupergroup, visible: true});
           }else{
             //debug(`${el.id} - ${el.title} filtered. < ${filterUsersCount}`)
           }
       });
     //res = {chats:mergedChatsInfo,files,lastMessages};
     res['chats'] = mergedChatsInfo;
     res['files'] = files;
     res['lastMessages'] = lastMessages;
  }
  return res;
}
