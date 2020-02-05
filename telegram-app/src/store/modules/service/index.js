import Vue from 'vue';
import * as cnannels from '../../models/channels.mjs'
const state = () => ({
  usernames: {},//{name:id}
  direction: {choice:0,directions:['bottomRight','bottomLeft','topLeft','topRight']},
  files: {},//{fileId:FileName}
  mediaAlbums: {}, //{chatId:[{albumId:[msgId]}]}
  modalWindowData: {}, //{content:[],selected: Number}
  searchInProgress: false, //channels search
  demountChatBox: undefined
})
const mutations = {
  UPDATE_USERNAMES (state, payload = []) {
    payload.forEach((el)=>{
      let username = el['username']?el['username']:el['id'];
      Vue.set(state.usernames,username,el.id);
    });
  },
  UPDATE_FILES (state, payload = []) {

    payload.forEach(({id,path,isDownloadingActive,isDownloadingCompleted})=>{

      //if(typeof path === 'string'){
      if(!isDownloadingCompleted||isDownloadingActive){
        //path = path.length===0?false:path;
        path='';
      }
      Vue.set(state.files,id,path);

    });
  },
  UPDATE_DIRECTION(state){
    Vue.set(state.direction,'choice',Math.floor(Math.random() * (state.direction.directions.length)));
  },
  UPDATE_ALBUM(state, payload = []){
    payload = payload.filter(el=>el.content);//[{"id":23184015360,"chatId":-1001096463945,"date":1577211813,"mediaAlbumId":"0","content":false}]
    payload.forEach((el)=>{
        let {chatId, id, mediaAlbumId} = el;
        let chatIdState = state.mediaAlbums.hasOwnProperty(chatId)?state.mediaAlbums[chatId]:[];
        let index = '';
        index = chatIdState.findIndex((el)=>{return el.hasOwnProperty([mediaAlbumId])&&mediaAlbumId.length>1});
        if(index !== -1){
          chatIdState[index] = {[mediaAlbumId]:[...new Set([id,...chatIdState[index][mediaAlbumId]])]};
        }else{
          let newAlbum = {[mediaAlbumId]:[id]};
          if((JSON.stringify(chatIdState)).indexOf(JSON.stringify(newAlbum)) === -1){
            chatIdState.unshift(newAlbum);
          }
      }
          Vue.set(state.mediaAlbums,chatId,chatIdState);
    });
  },
  UPDATE_MWINDOWDATA(state,{selected = '',content = ''}){

    let contentCopy = [];
    if(Object.keys(content).length>0&&typeof selected !== undefined ){
      contentCopy = JSON.parse(JSON.stringify(content));
      //console.log(photoCopy)
      //photoCopy[selected].selected = true;
      Vue.set(state,'modalWindowData',{selected, content:contentCopy});
    }else{
      Vue.set(state,'modalWindowData',{});
    }

  },
  SHIFT_MWINDOWITEM(state,direction = 'left'){
    let length = state['modalWindowData']['content'].length, selected = state['modalWindowData']['selected'];
    if(direction === 'left'){
      selected<length-1
      ?Vue.set(state['modalWindowData'],'selected', selected+1)
      :Vue.set(state['modalWindowData'],'selected', 0);
    }else{
      selected>0
      ?Vue.set(state['modalWindowData'],'selected', selected-1)
      :Vue.set(state['modalWindowData'],'selected', length-1);
    }


  },
  UPDATE_SEARCH_STATUS(state, status = false){
    Vue.set(state,'searchInProgress',status);
  },
  UPDATE_DEMOUNTCB_STATUS(state, status = undefined){
    Vue.set(state,'demountChatBox',status);
  },

}
const actions = {
  rndDirection({ commit }){
    commit('UPDATE_DIRECTION');
  },
  async setFilesLoadingStatus({commit},ids = []){
    commit('UPDATE_FILES', [...await cnannels.getFiles(ids)]);

  },
  setMWindowData({commit}, data = {}){
    commit('UPDATE_MWINDOWDATA', data);
  },
  shiftAlbumItem({commit},direction){
    commit('SHIFT_MWINDOWITEM',direction);
  },
  setSearchStatus({commit},status){
    commit('UPDATE_SEARCH_STATUS',status);
  },
  setDemountChatBoxStatus({commit},status){
    commit('UPDATE_DEMOUNTCB_STATUS',status);
  }
}
const getters = {
  getDirection: ({direction:{choice,directions}} = state) => {return directions[choice]},
  getChatIdByUserName: (state) => (username) => {return state.usernames[username]?state.usernames[username]:false;},
  getFileNameById: (state) => (id) => {return state.files[id]},
  getNotLoadedFilesIds: (state) => {
    let res = [];
    for (let [key, value] of Object.entries(state.files)){

      if(!value){res.push(key)}
    }
      return res;
    },
  getMediaAlbumsMsgIds: (state) => (mediaAlbum) => {return state.mediaAlbums[mediaAlbum]},
  getChatMediaAlbums: (state) => (chatId) => {return state.mediaAlbums[chatId]},
  getModalWindowData: (state) => {
    let res = {};
    if(Object.keys(state.modalWindowData).length>0){
      let content = state.modalWindowData.content, selected = state.modalWindowData.selected;
      res = content[selected];
    }
    return res;
  },
  getModalWindowDataContentLength: (state) => {
    return state.modalWindowData.hasOwnProperty('content')?state.modalWindowData['content'].length:0;
  },
  getChannelSearchStatus: (state) => {return state.searchInProgress},
  getDemountChatBoxStatus: (state) => {return state.demountChatBox},
}
const serviceModule = {
  state,
  mutations,
  actions,
  getters
}
export default serviceModule;
