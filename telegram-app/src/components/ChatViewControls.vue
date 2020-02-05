<template>
  <div class="chatViewControls">


    <div v-if="enableWayControls" class="chatViewControls__toTop-Left unpinned" @click="scrollTop"></div>

    <pin
      :pressed="toTopButtonPressed"
      :edges = "true" id="toTopButton"
      v-if="enableWayControls"
      :class="['pinned',`zIndex-right--${direction}`,'top']"
      @mousedown.native="toTopButtonPressed = true"
      @mouseup.native="toTopButtonPressed = false"
      @click.native="scrollTop" ><div class="chatViewControls__toTop-Left" ></div></pin>

    <div class="chatViewControls__toHome unpinned" @click="closeWindow" ></div>
    <pin
      :pressed="closeButtonPressed"
      :edges = "true" id="closeButton"
      :class="['pinned',`zIndex-right--${direction}`]"
      @mousedown.native="closeButtonPressed = true"
      @mouseup.native="closeButtonPressed = false"
      @click.native="closeWindow" ><div class="chatViewControls__toHome"></div></pin>
    <div v-if="enableWayControls" class="chatViewControls__toBottom-Right unpinned" @click="scrollBottom" ></div>

    <pin
      :pressed="toBottomButtonPressed"
      :edges = "true" id="toBottomButton"
      v-if="enableWayControls"
      :class="['pinned',`zIndex-right--${direction}`,'bottom']"
      @mousedown.native="toBottomButtonPressed = true"
      @mouseup.native="toBottomButtonPressed = false"
      @click.native="scrollBottom" ><div class="chatViewControls__toBottom-Right" ></div></pin>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import space from './3dSpace.vue';
import Pin from './Pin.vue';
import directionsMixin from '../mixins/directions-mixin';

//import controlsMixin from '../mixins/modal-window-controls-actions';
//import applyStylesMixin from '../mixins/chatview-styles-mixin.js';
export default {
  computed: {
    ...mapGetters(['getChatIdByUserName','getChatMessagesIds','getChatInList']),
    timesToGetOldMessages(){
      let chatId = this.getChatIdByUserName(this.$route.params.username),
          list = this.getChatInList(chatId),
          q = this.oldMessagesFetchesQuantity[list];
      return q?q:0;
    },
    isOnlyLocal(){
      let chatId = this.getChatIdByUserName(this.$route.params.username),
          list = this.getChatInList(chatId),
          q = this.getMsgsOnlyFromClientDB[list];
      return q?q:0;
    }
  },
  mixins:[directionsMixin],
  props:['scroll'],
  data(){
    return {
      closeButtonPressed: false,
      toBottomButtonPressed: false,
      toTopButtonPressed: false,
      enableCloseControls: true,
      enableWayControls: false,
      oldMessagesFetchesQuantity:{
        chatsList: Number(process.env.MAX_MSG_FETCHES_QUANTITY_CHATS_LIST_CHATS),
        recentlyFound: Number(process.env.MAX_MSG_FETCHES_QUANTITY_RECENTLY_FOUND_CHATS),
        unListed: Number(process.env.MAX_MSG_FETCHES_QUANTITY_OTHER_CHATS)
      },
      getMsgsOnlyFromClientDB:{
        chatsList: Number(process.env.ONLY_LOCAL_MSG_FETCH_CHATS_LIST_CHATS),
        recentlyFound: Number(process.env.ONLY_LOCAL_MSG_FETCH_RECENTLY_FOUND_CHATS),
        unListed: Number(process.env.ONLY_LOCAL_MSG_FETCH_RECENTLY_OTHER_CHATS)
      },
      topButtonClickedTimes: 0
    }
  },
  methods:{
    closeWindow(){
      this.closeButtonPressed = true;
      this.$router.push({name: 'home'});
      this.closeButtonPressed = false;
    },
    scrollBottom(){
      //this.toBottomButtonPressed = true;
      window.scrollTo(0,document.body.scrollHeight);
      //this.toBottomButtonPressed = false;
    },
    scrollTop(){
      this.topButtonClickedTimes = this.topButtonClickedTimes + 1;
      let chatId = this.getChatIdByUserName(this.$route.params.username),
          fetchMsgCnt = Number(process.env.FETCHED_MESSAGES_CNT),
          fromMessageId = Math.min(...this.getChatMessagesIds(chatId)),
          onlyLocal = this.isOnlyLocal;
      (this.topButtonClickedTimes<=this.timesToGetOldMessages)
        ?this.$store.dispatch('fetchMessages',{chatId,fromMessageId,onlyLocal})
        :null;
      window.scrollTo(0,0);
    }
  },
  watch:{
    scroll: {
      immediate: true,
      handler (val, oldVal) {

        if(val){
          this.enableWayControls=true;
        }
      }
    }
  },
  components: {
    'space': space,
    'pin': Pin
  },

}
</script>
<style lang="scss">
@import '~@/_variables.scss';
  .chatViewControls{
    position: fixed;
    //z-index: 200;
    display: flex;
    height: $leftButtonHeight;
    width: 100%;
    bottom: 0;
    @media #{$screen $chatView-min460px} and #{$chatView-sidePins}{
      width: $chatViewWidth;
      left: 50%;
      transform: translate(-50%);
    }
    @media #{$screen $chatViewSidePins-510px}{
      width: $leftButtonWidth;
      height: calc(100vh - #{$chatViewSpacing*2});
      flex-direction: column;
      //right: 0;
      //top: 0;
      margin-left: calc(50% + #{$chatViewWidth/2});
      bottom: unset;

      //z-index: unset;
      //margin: $chatViewSpacing 0 0;
      .pin{
        &__mounting{
                >#bottomLayer{
                  top: unset;
                  bottom: unset;
                  left: unset;
                  right: unset;
                }
                  > #topLayer, > #bottomLayer{
                    &::after{
                      content: unset;
                    }
                    &::before{
                      content: unset;
                    }
                }
              }
            }
    }
    /*
    @media #{$screen $chatView-750px}{
      display: flex;
      right: unset;
      width: calc(6*#{$leftButtonWidth});
      flex-direction: row;
      height: $leftButtonHeight;
      //z-index: $chatsContainerZindex;
      margin-right: $chatViewWidth;
      right: 0;
      .pin{
        &__mounting{
                >#bottomLayer{
                  top: unset;
                  bottom: unset;
                  left: unset;
                  right: unset;
                }pres
                  > #topLayer, > #bottomLayer{
                    &::after{
                      content: unset;
                    }
                    &::before{
                      content: unset;
                    }
                }
              }
            }
      #closeButton{margin-right: auto;}
    }
    */
  }
  .pinned{
    display: none;
  }
  .unpinned{
    display: block;
  }

  .chatViewControls__toHome{
    flex: 0 0 calc(100% - (#{2*$leftButtonWidth} + #{2*$gapBetweenLayers}));
    margin: auto;
    @include gradient-center-minimize($lightCoperColor);
  }
  .chatViewControls__toBottom-Left,.chatViewControls__toBottom-Right{
    @include gradient-bottom-triangle($lightCoperColor);
  }
  .chatViewControls__toTop-Left,.chatViewControls__toTop-Right{
    @include gradient-top-triangle($lightCoperColor);
  }
  .chatViewControls__toTop-Right,
  .chatViewControls__toTop-Left,
  .chatViewControls__toBottom-Right,
  .chatViewControls__toHome,
  .chatViewControls__toBottom-Left{
      height: $leftButtonHeight;
      width: $leftButtonWidth;
      opacity: .6;
        //transform: scale(.8);
        transition: all .1s cubic-bezier(.68,-0.55,.27,1.55);
        &:active{
          transform: scale(.8);
        }
  }

  @media #{$screen $chatViewSidePins-510px}{
      .chatViewControls__toHome{

        height: $leftButtonHeight;
        margin: unset;
        margin-bottom: auto;
        flex: unset;
        opacity: unset;
        background-color: $railMainSideColor;
      }
      .unpinned{
        display: none;
      }
      .pinned{
        //position: fixed;
        display: block;
      }
      .chatViewControls__toBottom-Left{
        margin: 0;
        display: none;
        //visibility: hidden;
      }
      .chatViewControls__toBottom-Right,
      .chatViewControls__toTop-Left{
        margin: 0;
        opacity: unset;
        background-color: $railMainSideColor;
      }
      .chatViewControls__toTop-Right,
      .chatViewControls__toTop-Left,
      .chatViewControls__toBottom-Left,
      .chatViewControls__toBottom-Right{
        height: $leftButtonHeight;
        width: $leftButtonWidth;
      }
      .bottom{
        margin-top: auto;
      }
      .top{
        margin-top: $leftButtonHeight;
        margin-bottom: auto;
      }
  }

</style>
