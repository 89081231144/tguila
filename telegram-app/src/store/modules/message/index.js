import Vue from 'vue';
import * as cnannels from '../../models/channels.mjs'
const state = () => ({
  messages: {}
})
const mutations = {

  UPDATE_MESSAGES (state, payload = []) {
    //console.log(payload)
    payload.forEach((el)=>{
      let obj = {[el.id]:el};
      let curState = state.messages[el.chatId] || {};
      Vue.set(state.messages,el.chatId,{...obj,...curState});
    });
  },
}
const actions = {
  async fetchMessages ({ commit },{chatId,fromMessageId,offset = 0,limit = Number(process.env.FETCHED_MESSAGES_CNT),onlyLocal = 1}) {
      let {obj:messages,files:messagesFiles} = await cnannels.getChatHistory(chatId, fromMessageId, offset, limit, onlyLocal);
      commit('UPDATE_MESSAGES', [...messages]);
      commit('UPDATE_ALBUM', [...messages]);
      commit('UPDATE_FILES', [...messagesFiles]);
  }
}
const getters = {
  getChatMessages: (state) => (chatId) => {return state.messages[chatId]},
  getChatMessagesIds: (state) => (chatId) => {return Object.keys(state.messages[chatId]);},
  getMessageContent: (state) => (chatId,msgId) => {let {content} = state.messages[chatId][msgId]; return content;},
  getMessageById: (state) => ({chatId,id:msgId}) => {return state.messages[chatId][msgId];},
  getMessagesCount: (state) => (chatId) => {return Object.keys(state.messages[chatId]?state.messages[chatId]:{}).length}
}
const messageModule = {
  state,
  mutations,
  actions,
  getters
}
export default messageModule;
