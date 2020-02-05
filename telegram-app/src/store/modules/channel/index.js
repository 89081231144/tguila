import Vue from 'vue';
import * as cnannels from '../../models/channels.mjs'
const state = () => ({
  channels: {}
})

const mutations = {
  UPDATE_CHANNELS (state, payload = []) {
    if(typeof payload === 'object'&&payload.length>0)
    {
      payload.forEach((el)=>{
        if(state.channels.hasOwnProperty(el.id)){el = Object.assign(state.channels[el.id], el)}
        Vue.set(state.channels,el.id,el);
        //Vue.set(state.messageModule.usernames,el.username,el.id);
      });
    }
  },
  DISPLAY_CHANNELS (state,{show,hide}){
    let visible = hide;
    let notVisible = show;
    visible.forEach(i=>state.channels[i].visible=false);
    notVisible.forEach(i=>state.channels[i].visible=true);
    if(visible.length===0){Object.keys(state.channels).forEach((index)=>state.channels[index].visible = true)};
  },
  RESET_VISIBILITY (state){
    let s = state.channels, info;
    (Object.keys(s)).forEach((k)=>{
      info = s[k];
      info.visible = true;
      Vue.set(state.channels,k,info);
    });
  }
/*  DELETE_CHANNEL(state,chatId){
      //delete
     //state.channels[chatId].visible = false;
     //delete state.channels[chatId];
     Vue.delete(state.channels,chatId);
  }*/

}
const actions = {
   getRecentlyFoundChats ({ commit }) {

      return cnannels.searchChats().then(({chats,files,lastMessages})=>{

        commit('UPDATE_USERNAMES', [...chats]);
        commit('UPDATE_CHANNELS', [...chats]);
        commit('UPDATE_MESSAGES', [...lastMessages]);
        commit('UPDATE_ALBUM', [...lastMessages]);
        commit('UPDATE_FILES', [...files]);
      });
  },
  getChatFullInfoById ({ commit }, chatId) {

     return cnannels.getChatFullInfoById(chatId).then(({chats,files,lastMessages})=>{

       commit('UPDATE_USERNAMES', [...chats]);
       commit('UPDATE_CHANNELS', [...chats]);
       commit('UPDATE_MESSAGES', [...lastMessages]);
       commit('UPDATE_ALBUM', [...lastMessages]);
       commit('UPDATE_FILES', [...files]);
       return chats.length;
     });
   },
  getMyChats ({ commit }) {
     return cnannels.getChats().then(({chats,files,lastMessages})=>{
       commit('UPDATE_USERNAMES', [...chats]);
       commit('UPDATE_CHANNELS', [...chats]);
       commit('UPDATE_MESSAGES', [...lastMessages]);
       commit('UPDATE_ALBUM', [...lastMessages]);
       commit('UPDATE_FILES', [...files]);
     });
  },
  searchPublicChats ({ commit },q) {

  return cnannels.searchPublicChats(q).then(({chats,files,lastMessages})=>{
        commit('UPDATE_USERNAMES', [...chats]);
        commit('UPDATE_CHANNELS', [...chats]);
        commit('UPDATE_MESSAGES', [...lastMessages]);
        commit('UPDATE_ALBUM', [...lastMessages]);
        commit('UPDATE_FILES', [...files]);
    })

 },

  searchChatByUserName ({ commit },username) {

    return cnannels.searchPublicChat(username).then(({chats,files,lastMessages})=>{
      commit('UPDATE_USERNAMES', [...chats]);
      commit('UPDATE_CHANNELS', [...chats]);
      commit('UPDATE_MESSAGES', [...lastMessages]);
      commit('UPDATE_ALBUM', [...lastMessages]);
      commit('UPDATE_FILES', [...files]);
      return chats.length;
    });

  },
  showAllChannels({ commit }){
    commit('RESET_VISIBILITY');
  }
}

const getters = {
  //getChatsState: state => state.channels.filter(chan => chan.visible),

  getChatsState: state => state.channels,
  getChatPropertyValue: (state) => ({chatId,prop}) => {
    return state.channels[chatId][prop];
  },
  getChatsSortedKeys: (state) => ({order = 'asc', key = 'memberCount'}) => {
    let {channels:list} = state;
    let keysSorted = Object.keys(list).sort(function(a,b){
      return order==='asc'?list[b][key]-list[a][key]:list[a][key]-list[b][key];
    });
    keysSorted = keysSorted.reduce((acc, elem) => {
      acc[elem] = undefined
      return acc
    }, {})
    return keysSorted;
  },
  getChatInList: (state) => (chatId) => state.channels[chatId]['list'],
  /*productItemFromId: (state) => (id) => {
    return state.channels.find(productItem => productItem.id === id)
  }*/
  getChatsVisiblityState: (state) => (searchKey) => {
    let visible = [],notVisible = [],obj = state.channels;
  //  console.log(Object.keys(obj))
    Object.keys(obj).forEach((key) => {
                                            if(obj[key].title.toLowerCase().includes(searchKey.toLowerCase())===false&&obj[key].username.toLowerCase().includes(searchKey.toLowerCase())===false)
                                            {
                                              visible.push(key);
                                            }else{
                                              notVisible.push(key)
                                            }
                                          })

    return {hide:visible,show:notVisible};
  },
  getChatById: (state) => (id) => {return state.channels[id]},

}

const channelModule = {
  state,
  mutations,
  actions,
  getters
}

export default channelModule;
