<template>
  <div>
    <div id="media" :class="['chatViewContent__message__media',content.length>3?'mediaGroupping':{}]">
      <div v-for="(item,key, index) in content" :key="setKeyAndCaption(item)" :class="[`chatViewContent__message__${item._}`]">
        <htmled-text v-if="item.hasOwnProperty('text')" :text="item.text" />
        <msg-photo v-if="item.hasOwnProperty('photo')" :id="key" :photo = "item.photo" @click.native="modalOpen"/>
        <msg-video-thumb v-if="item.hasOwnProperty('video')" :id="key" :msgVideo = "item.video" @click.native="modalOpen" />
        <msg-animation-thumb v-if="item.hasOwnProperty('animation')" :id="key" :msgAnimation = "item.animation" @click.native="modalOpen" />
        <web-page v-if="item.hasOwnProperty('webPage')&&Object.keys(item.webPage).length>0" :id="key" :webPage = "item.webPage" @click.native="modalOpen" />
        </div>
    </div>

    <div :class="['chatViewContent__message__caption',!caption?'notDisplay':{}]">
      <htmled-text :text="caption" />
    </div>

    <div class="chatViewContent__message__date">
      <msg-timestamp v-if="msgDate" :unixTime ="msgDate" />
    </div>

</div>
</template>
<script>
//import messageText from './message-types/messageText.vue';
//import messagePhoto from './message-types/messagePhoto.vue';

import photo from './message-types/photo.vue';
import video from './message-types/video.vue';
import videoThumb from './message-types/videoThumb.vue';
import animationThumb from './message-types/animationThumb.vue';
import text from './message-types/text.vue';
import webPage from './message-types/webPage.vue';
import MessageDateTime from './MessageDateTime.vue';
//import video from './message-types/video.vue';

//import messageVideo from './message-types/messageVideo.vue';
import { mapGetters } from 'vuex';
import applyStylesMixin from '../mixins/chatview-styles-mixin.js';
import directionsMixin from '../mixins/directions-mixin';
export default {
  mixins: [directionsMixin,applyStylesMixin],
  props: ['content','mountIndexNum','chatId','msgDate'], //[{"_":"messagePhoto",....},{"_":"messageVideo",....}]
  data(){
    return {
      _: '',
      text: '',
      webPage: '',
      caption: '',
      //photo: '',
      //video: ''
    }
  },
  computed: {
    ...mapGetters(['getChatMessages'])
  },
  methods:{
    setKeyAndCaption(item){
      item['caption']?this.caption = item['caption']:null;
      return item['id'];
    },
    log(item) {
      console.log(item)
    },
     modalOpen(event){
      let targetId = Number(event.currentTarget.id);
        Promise.resolve(
          this.clickAnimation({state:0, time:100, msgNum: this.mountIndexNum, msgElementId: targetId})
        ).then(()=>{

          this.$store.dispatch('setMWindowData',{selected: targetId, content: this.content})
        })





    }
  },
  watch: {
    content: {
      immediate: true,
      handler (val, oldVal) {
        //console.log(this.mountIndexNum)
        //Object.assign(this.$data,this.content);

      }

    }
  },
  mounted(){
    //console.log(this.content)
    //Object.assign(this.$data,this.content);

  },
  components:{
    //'message-text': messageText,
    //'message-photo': messagePhoto,
    'msg-photo':photo,
    //'msg-video':video,
    'msg-video-thumb':videoThumb,
    'msg-animation-thumb':animationThumb,
    'htmled-text':text,
    'web-page':webPage,
    'msg-video':video,
    'msg-timestamp': MessageDateTime
    //'message-video': messageVideo
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatViewContent{

  flex: 0 0 #{percentage($chatViewContentFlexBasis)};
  position:relative;

  &__message{
    position: relative;
    //padding: $buttonBoxSlotBorder;
    background-color: $railEdgeColor;
    z-index: $chatViewContentZindex;
    > div {
      padding: $buttonBoxSlotBorder $buttonBoxSlotBorder 0 $buttonBoxSlotBorder;
      &:last-of-type {
        padding-bottom: $buttonBoxSlotBorder;
      }
    }

    &__media {
      display: flex;
      flex-wrap: wrap;

      //min-height: $messageMediaMinHeight;
/*        picture>img{
          width:100%;
          height:auto;
          display: block;
        }*/
        >div:nth-child(n):not(:nth-child(4n)):not(:only-of-type){
          flex: 1 0 33%;
          //max-height: 90px;
          //overflow: hidden;
        }
    }
    &__caption, &__media{
      //padding: $buttonBoxSlotBorder $buttonBoxSlotBorder $buttonBoxSlotBorder/2;

      //min-height: $messageCaptionMinHeight;
    }
    &__messageAnimation, &__messagePhoto, &__messageText, &__messageVideo{
      width: 100%;
    }
    &__messagePhoto{
      background-color: $coperColor;
    }
    &__messageVideo{
      //padding: $buttonBoxSlotBorder;
      background-color: $coperColor;

      /*  & video {
          width:100%;
          height:auto;
      }*/

    }


}
}
.mediaGroupping{
  >div:nth-child(n):not(:nth-child(4n)):not(:only-of-type){
    max-height: 90px;
    overflow: hidden;
  }
}
</style>
