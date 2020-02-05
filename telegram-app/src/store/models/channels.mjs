
import axios from 'axios';
//let setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
const reqUrl = `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}/${process.env.API}`;
export async function searchPublicChats(query) {
     let {data} = await Promise.resolve(axios.get(`${reqUrl}/searchPublicChats?query=${query}`))
     //console.log(`${reqUrl}/searchPublicChats?query=${query}`)
     return data;
}
export async function searchChats() {
     let {data} = await Promise.resolve(axios.get(`${reqUrl}/searchChats`))
     //console.log(`${reqUrl}/searchChats`)
     return data;
}
export async function getChats() {
     let {data} = await Promise.resolve(axios.get(`${reqUrl}/getChats`))
      //console.log(`${reqUrl}/getChats`)
     return data;
}
export async function getChatFullInfoById(chatId) {
     let {data} = await Promise.resolve(axios.get(`${reqUrl}/getChatFullInfoById?chatId=${chatId}`))
       //console.log(`${reqUrl}/getChatFullInfoById?chatId=${chatId}`)
     return data;
}
export async function searchPublicChat(username) {
     let {data} = await Promise.resolve(axios.get(`${reqUrl}/searchPublicChat?username=${username}`))
     //console.log(`${reqUrl}/searchPublicChat?username=${username}`)
     return data;
}
export async function getChat(id) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/getChat?chatId=${id}`))
  //console.log(`${reqUrl}/getChat?chatId=${id}`)
  return data;
}
/*
export async function getChatMessageByDate(chatId, date) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/getChatMessageByDate?chatId=${chatId}&date=${date}`))
  return data;
}
*/
export async function downloadFile(fileId,synchronous = 1) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/downloadFile?fileId=${fileId}&synchronous=${synchronous}`))
  return data;
}
export async function getSupergroupFullInfo(id) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/getSupergroupFullInfo?supergroupId=${id}`))
  return data;
}
export async function getSupergroup(id) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/getSupergroup?supergroupId=${id}`))
  return data;
}
export async function getChatHistory(chatId,fromMessageId = 0,offset = 0,limit = 0,onlyLocal = 0) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/getChatHistory?chatId=${chatId}&fromMessageId=${fromMessageId}&offset=${offset}&limit=${limit}&onlyLocal=${onlyLocal}`))
  return data;
}
export async function getFiles(ids = []) {
  let {data} = await Promise.resolve(axios.get(`${reqUrl}/getFiles?fileIds=${JSON.stringify(ids)}`))
  return data;
}
