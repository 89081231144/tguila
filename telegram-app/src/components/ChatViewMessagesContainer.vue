<template>
  <space class="messagesContainer" :depth = 1>
<!--    <modal-window slot="topLayer" /> -->
    <chat-view
        slot="topLayer"
        :chatId = "getChatIdByUserName($route.params.username)"
        v-for="(item,key, index) in mediaAlbums"
        :key = "key"
        :mediaAlbum = "item"
        :mountIndexNum = "key"
    />
    <bottom-mounting slot="bottomLayer" />
  </space>
</template>
<script>
import { mapGetters } from 'vuex';
import ChatView from './ChatView.vue';
//import modalWindow from './modalWindow.vue';
import bottomMounting from './chatViewBottomMounting.vue'
import space from './3dSpace.vue';
export default {
  computed: {
    ...mapGetters([
      'getChatIdByUserName',
      'getChatMediaAlbums',
      'getMessagesCount',
      'getChatMessages',
      'getChatPropertyValue'
    ]),
    mediaAlbums(){
      let chatId = this.getChatIdByUserName(this.$route.params.username);
      return this.getChatMediaAlbums(chatId);
    },
  },
  mounted(){
    let chatId = this.getChatIdByUserName(this.$route.params.username),
                  fromMessageId,
                  onlyLocal,
                  recentlyFound = this.getChatPropertyValue({chatId,prop:'recentlyFound'}),
                  inChatsList = this.getChatPropertyValue({chatId,prop:'list'}),
                  messages = this.getChatMessages(chatId),
                  messagesCount = this.getMessagesCount(chatId),
                  initMsgCnt = Number(process.env.INITIAL_FETCHED_MESSAGES_CNT),
                  fetchMsgCnt = Number(process.env.FETCHED_MESSAGES_CNT);
    if(messagesCount){
      if(messagesCount === initMsgCnt){
        onlyLocal = 0;
        fromMessageId = Math.max(...Object.keys(messages));
        this.$store.dispatch('fetchMessages',{chatId,fromMessageId,onlyLocal})
      }
      if(messagesCount > initMsgCnt){
        onlyLocal = inChatsList === 'chatsList'|| recentlyFound?1:0;
        fromMessageId = Math.max(...Object.keys(messages));
        let offset = -fetchMsgCnt;
        Promise.resolve(this.$store.dispatch('fetchMessages',{chatId,fromMessageId,offset,onlyLocal}));
      }
    }else{
      this.$router.push({name: 'home'});
    }


    window.scrollTo(0,document.body.scrollHeight);
  },
  components:{
//  'chatboxrail-left': ChatBoxRailLeft,
  'chat-view': ChatView,
//  'modal-window':modalWindow,
  'space': space,
  'bottom-mounting': bottomMounting,
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.messagesContainer{
  @media #{$screen $chatView-min460px}{
      margin: auto;
      max-width: $chatViewWidth;
      min-width: $chatViewWidth;
  }
  @media #{$screen $chatViewSidePins-510px}{
      //margin-left: auto;
      //margin-right: $leftButtonWidth;
  }
  /*
  @media #{$screen $chatView-750px}{
      margin: unset;
      margin-left: auto;
  }
  */
}
</style>
