<template>
<div id="chatViewsContainer" :class="['chatViewsContainer',`direction-padding-${direction}`]" >
  <cv-chats v-if="getChatIdByUserName(userName)" id="chatsContainer" :class="[`zIndex-left--${direction}`]" />
  <pads id="leftPadsContainer" :left="true" :class="[`zIndex-left--${direction}-layer1`]" />
  <pads id="rightPadsContainer" :right="true" :class="[`zIndex-right--${direction}`]" />
  <cv-messages v-if="getChatIdByUserName(userName)" id="messagesContainer" :class="[`zIndex-center--${direction}`]"/>
  <cv-controls v-if="getChatIdByUserName(userName)" id="chatViewControls" :scroll="scrolled"  :class="['rightControls',`zIndex-right--${direction}`]" />
  <cv-controls v-if="getChatIdByUserName(userName)" id="chatViewControls" :scroll="scrolled"  :class="['centerControls',`zIndex-center--${direction}`]" />
  <cv-controls v-if="getChatIdByUserName(userName)" id="chatViewControls" :scroll="scrolled"  :class="['leftControls',`zIndex-left--${direction}`]" />
  <modal-window />
</div>
</template>
<script>
import ChatViewMessagesContainer from './ChatViewMessagesContainer.vue';
import ChatViewChatContainer from './ChatViewChatContainer.vue';
import Pads from './Pads.vue';
import space from './3dSpace.vue';
import modalWindow from './modalWindow.vue';
import directionsMixin from '../mixins/directions-mixin';
import updFiles from '../mixins/upd-files-mixin';
import ChatViewControls from './ChatViewControls.vue'
import { mapGetters } from 'vuex';
export default {
  data(){
    return {
      scrolled: false,
    }
  },
  mixins: [directionsMixin,updFiles],
  computed: {
  ...mapGetters(['getMessagesCount','getChatIdByUserName']),
    userName(){
      //console.log(this.$route.params.username)
      return this.$route.params.username;
    }
  },
  async serverPrefetch () {
      let usernameParam = this.userName.replace(new RegExp(process.env.TELEGRAM_USERNAME_ROUTE_MATCH_PATTERN,'g'),''),
          getChatFullInfoById,searchChatByUserName,
          userNameMinLength = Number(process.env.TELEGRAM_USERNAME_MIN_LENGTH);

      usernameParam&&usernameParam.length>=userNameMinLength
        ?Number(usernameParam)
          ?getChatFullInfoById = await this.$store.dispatch('getChatFullInfoById',this.userName)
          :searchChatByUserName = await this.$store.dispatch('searchChatByUserName',this.userName)
        :null;
      //!getChatFullInfoById&&!searchChatByUserName?this.$router.push({name: 'home'}):null;
      //console.log(`${getChatFullInfoById} ${getChatFullInfoById}`)
  },

  methods:{
    handleScroll(event){
      this.scrolled = new Date().getMilliseconds();
    }
  },
  mounted(){
    //console.log(this.getChatIdByUserName(this.userName));
    !this.getChatIdByUserName(this.userName)?this.$router.push({name: 'home'}):null;
  },
  beforeMount () {
    //window.scrollTo(0,document.body.scrollHeight);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components:{
  'cv-controls': ChatViewControls,
  'pads': Pads,
  'cv-messages': ChatViewMessagesContainer,
  'cv-chats': ChatViewChatContainer,
  'space': space,
  'modal-window':modalWindow
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
body {
  margin: 0;
  max-width: 100%;
  overflow-x: hidden;
}
.chatViewsContainer{
  position: relative;
  width: 100%;
  height:100%;
  .leftControls,
  .rightControls,
  {
    display: none;
  }
    @media #{$screen $chatView-min460px}{
      display: flex;
    }
    @media #{$screen $chatViewSidePins-510px}{
      .leftControls,
      .centerControls
      {
        display: none;
      }
      .rightControls{
        display: inherit;
      }
      #rightPadsContainer{
        margin-left: calc(50% + #{$chatViewWidth/2});
        .filler{
          //margin-right: auto;
          >#bottomLayer{
            justify-content: start;
          }
        }

      }

    }

  /*
    @media #{$screen $chatView-750px}{
      .rightControls{display: none;}
      .leftControls{display: inherit;}
    }
    */
}
@each $direction, $val in set-directions-view($skewBorderHeight) {
  .direction-padding-#{$direction}{
      @if str-index($direction,"top") {
        margin-top: $chatViewSpacing;
      } @else{
        margin-bottom: $chatViewSpacing;
      }
      @media #{$screen $chatView-1080px}{
        @if str-index($direction,"Left") {
          margin-left: $chatViewSpacing - 0.2;
        } @else{
          margin-left: -($chatViewSpacing - 0.2);
        }
    }
  }
}
</style>
