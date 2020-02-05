<template>
  <space v-if="modalWindow" class="modalWindow" :depth = 1 >
  <space id="modalWindowContent" slot="topLayer" v-touch:tap="enableControls" v-touch:swipe.left="swipeLeftHandler" v-touch:swipe.right="swipeRightHandler">

      <msg-photo  slot="topLayer" v-if="selectedContent.hasOwnProperty('photo')" :photo = "selectedContent.photo" />
      <msg-photo  slot="topLayer" v-if="selectedContent.hasOwnProperty('webPage')" :photo = "selectedContent['webPage']['photo']" />
      <msg-video  slot="topLayer" v-if="selectedContent.hasOwnProperty('video')" :msgVideo = "selectedContent.video" />
      <msg-animation  slot="topLayer" v-if="selectedContent.hasOwnProperty('animation')" :msgAnimation = "selectedContent.animation" />

  </space>
  <mw-controls slot="topLayer"
      :style="{top: 0}"
      :toggle="enableControlsEvent"
      :contentLength="contentLength"
      />
  <mw-controls slot="topLayer"
      :style="{bottom: 0}"
      :toggle="enableControlsEvent"
      :contentLength="contentLength"
      />

  </space>
</template>
<script>
import { mapGetters } from 'vuex';
import photo from './modalWindowPhoto.vue';
import video from './message-types/video.vue';
import animation from './message-types/animation.vue';
import applyStylesMixin from '../mixins/chatview-styles-mixin.js';
import space from './3dSpace.vue';
import mWControls from './modalWindowControls.vue';
import directionsMixin from '../mixins/directions-mixin';
import controlsMixin from '../mixins/modal-window-controls-actions';
export default {

  data(){
    return {
      //enableCloseControls: false,
      //enableWayControls: false,
      enableControlsEvent: false,
      modalWindow: false
    }
  },
  mixins: [directionsMixin, applyStylesMixin, controlsMixin],
  computed: {
    ...mapGetters({
      selectedContent: 'getModalWindowData',
      contentLength: 'getModalWindowDataContentLength'
  }),
    togleWindow(){
      //console.log(this.content)
      return Object.keys(this.selectedContent).length===0?false:true
    },


  },
  methods:{
    enableControls(){
      this.enableControlsEvent = new Date().getMilliseconds();
    }
  },
  mounted(){
    //this.getModalWindowData.length===0?this.modalWindow=false:this.modalWindow=true
  },
  created () {
      //document.window.addEventListener('scroll', ()=>{});
    },
  destroyed () {
      //document.window.removeEventListener('scroll', ()=>{});
    },
  watch: {
    togleWindow: {
      immediate: true,
      handler (val, oldVal) {
        //Object.assign(this.$data,this.content);
        //console.log(this.content)
        val?this.modalWindow=true:this.modalWindow=false
        this.enableControlsEvent = false;
        //this.getModalWindowData.length===0?this.modalWindow=false:this.modalWindow=true
      }
    }
  },
  components: {
    'msg-photo':photo,
    'msg-video':video,
    'msg-animation':animation,
    'space': space,
    'mw-controls': mWControls
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
#modalWindowContent{
  //z-index: $modalWindowContent;

      //display: flex;
      //flex-direction: column;
      //justify-content: center;
      height: calc(100% - #{$leftButtonHeight*2});
      //margin: $leftButtonHeight 0 $leftButtonHeight;
      > #topLayer{
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
}


.modalWindow{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: $coperColor;
  //display: flex;
  //flex-direction: column;
  >#topLayer{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
    &__close {
      position: absolute;
      right: 0;
    }
    /*video {
      width:100%;
      height:auto;
      margin: auto;
    }*/
    picture {
      margin: auto;
    }
    img {
      max-width: 100%;
      margin: auto;
      display:block;
    }
}




.controlButtonDirection{
  height: $leftButtonHeight;
  width: $leftButtonWidth;
}
</style>
