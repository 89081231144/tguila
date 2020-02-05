<template>
<div :class="['chatBoxItem',isVisibile]" :style="{'z-index': this.index}">
<chatboxrail-left/>
<div class="chatBoxItem__main">
<xyz-border :class="translateTopBorder" />
<mount-point :class="translateLeft" >
  <button-box>
    <div :id="boxIndex" class="chatbox" @mousedown = "dismount(boxIndex)" @mouseup = "navigate" >
           <chatbox-image
            :chatid = chatid
            :title = title
            :photo = photo>
            <div class="chatbox__image-username-membercount">
            <chatbox-username :username = username :chatid = chatid></chatbox-username>
            <chatbox-membercount :membercount = membercount></chatbox-membercount>
          </div>
          </chatbox-image>

        <div class="chatbox__info__body">
            <chatbox-title :title = title :chatid = chatid></chatbox-title>
            <chatbox-description :description = description></chatbox-description>
            <div class="chatbox__info-username-membercount">
            <chatbox-username :username = username :chatid = chatid></chatbox-username>
            <chatbox-membercount :membercount = membercount></chatbox-membercount>
            </div>


        </div>
  </div>
</button-box>

</mount-point>
<xyz-border :class="translateBottomBorder" />

</div>
</div>
</template>
<script>
import XyzBorder from './XyzBorder.vue';
import MountPoint from './MountPoint.vue';
import { mapGetters } from 'vuex';

import ChatboxImage from './placeholders/ChatboxImage.vue';
import ChatboxUsername from './placeholders/ChatboxUsername.vue';
import ChatboxTitle from './placeholders/ChatboxTitle.vue';
import ChatboxMembercount from './placeholders/ChatboxMembercount.vue';
import ChatboxDescription from './placeholders/ChatboxDescription.vue';
import ButtonBox from './ButtonBox.vue';
import ChatBoxRailLeft from './ChatBoxRailLeft.vue';
import directionsMixin from '../mixins/directions-mixin';
import chatBoxStylesMixin from '../mixins/chatbox-styles-mixin.js';

export default {
  mixins: [directionsMixin,chatBoxStylesMixin],
  props: [
            'description',
            'index',
            'boxIndex',
            'visibilityCheck',
            'username',
            'chats',
            'title',
            'photo',
            'chatid',
            'membercount',
            'groupid'
            ],
  data() {
    return {
      boxSelected: false,
      railZindexStart: 10
    }
  },
  computed: {
    ...mapGetters(['getDemountChatBoxStatus']),
    translateTopBorder(){
      return this.getDemountChatBoxStatus === this.boxIndex?'translation-top-right':{}
    },
    translateBottomBorder(){
      return this.getDemountChatBoxStatus === this.boxIndex?'translation-bottom-left':{}
    },
    isVisibile(){
      let s = this.getDemountChatBoxStatus;
      return (s !== undefined && s !== this.boxIndex)?'visibilityHidden':{}
    },
    translateLeft(){
      return this.getDemountChatBoxStatus === this.boxIndex?'translation-left':{}
    },
  },
  components:{
  'mount-point':MountPoint,
  'chatboxrail-left': ChatBoxRailLeft,
  'button-box': ButtonBox,
  'chatbox-image':ChatboxImage,
  'chatbox-username':ChatboxUsername,
  'chatbox-title':ChatboxTitle,
  'chatbox-membercount':ChatboxMembercount,
  'chatbox-description':ChatboxDescription,
  'xyz-border': XyzBorder

},
  methods: {
  navigate(event){
    //this.$emit('selected-chatbox',this.boxIndex);
    //this.boxSelected = true;
    //let targetId = Number(event.currentTarget.id) + 1;
    //this.$set(this.$data,'boxSelected',true);
    let username = this['username']?this['username']:this['chatid'];
    this.$router.push({name: 'chatView', params: {username} });


    //this.clickAnimation({state:0, time:100, chatBoxNum: targetId});




    /*
    Promise.resolve(
      //this.clickAnimation({state:0, time:100, chatBoxNum: targetId})
    ).then(()=>{
      //this.$router.push({name: 'chatView', params: { username: this.username } });
    })*/

  },
  dismount(boxIndex){
    this.$store.dispatch('setDemountChatBoxStatus',boxIndex);
  }
  },

  mounted(){
    //this.$set(this.$data,'boxSelected',false);
    //console.log(JSON.stringify(this.$data))
    /*
  let that = this;

  this.groupid || new Promise(function(resolve,reject){resolve(that.$store.dispatch('getChatInfo',that.chatid))}).then((res)=>{

    if(res){
    let gId = that.$store.getters.getChatPropertyValue({chatid:that.chatid, prop:'groupid'});

    that.$store.dispatch('getSupergroupInfo',{chatid:that.chatid,groupid:gId});
    that.$store.dispatch('getSupergroupFullInfo',{chatid:that.chatid,groupid:gId});
  }

  });

*/
},
    destroyed(){
      this.$store.dispatch('showAllChannels');
    }
  }
</script>

<style lang="scss">
@import '~@/_variables.scss';

  @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
.chatbox__image-username-membercount{
  display: flex;
  flex: 1;
  flex-direction: column;
  //height:33.3%;
  .chatbox__info__membercount{
    //margin-top: $buttonBoxSlotBorder;
    flex:1;
    height:auto;
    display:block;
    height: auto;
  }
  .chatbox__info__username{
    margin-top: $buttonBoxSlotBorder;
    height:auto;
    flex:initial;
    display:block;
    height: auto;
  }
}
.chatbox__info-username-membercount{
  display:none;
}
}

@media #{$screen $chat-portrait-disable-image-info $portrait} {
.chatbox__image-username-membercount{
display:none;
}
.chatbox__info-username-membercount{
  display: flex;
  flex-direction: column;
  height: 50%;
}
}

.chatBoxItem
{
  flex: 1 0 50%;
  display: flex;
  justify-content: center;
  @media #{$screen $chat-portrait-info} and #{$chat-portrait-info-reset-flex-position $portrait}, #{$screen $chat-landscape-info} and #{$chat-landscape-info-reset-flex-position $landscape} {
  &:nth-child(even){
    &__main {
      margin-right: $skewBorderHeight*1.5;
    }
    .chatbox{
      .chatbox__info__body{
        margin-right: $buttonBoxSlotBorder;
      }
      flex-direction: row-reverse;
    }
    justify-content: flex-end;
  }
  &:nth-child(odd){
      &__main {
        margin-left: $skewBorderHeight*1.5;
      }
     justify-content: flex-start;
  }
  }
  &__main{
    position:relative;
    display: flex;
    flex-direction: column;
  }
  &:nth-child(odd)
  &__main {@include animation-from-left-to-right;}
  &:nth-child(even)
  &__main {@include animation-from-right-to-left;}
  margin-top: $skewBorderHeight*1.5;
  position:relative;
}
@keyframes animation-from-left-to-right {
  @include keyframes-animation-from-left-to-right;
}
@keyframes animation-from-right-to-left {
  @include keyframes-animation-from-right-to-left;
}








.button--transform-bottomRight:active
{
  transform: translate(-$gapBetweenLayers,-$gapBetweenLayers);
}
.button--transform-bottomLeft:active
{
  transform: translate($gapBetweenLayers,-$gapBetweenLayers);
}
.button--transform-topLeft:active
{
  transform: translate($gapBetweenLayers,$gapBetweenLayers);
}
.button--transform-topRight:active
{
  transform: translate(-$gapBetweenLayers,$gapBetweenLayers);
}


.chatbox{
  min-height:$chatBoxInfoImageFlexBasis*$chatboxWidth;
  padding: $buttonBoxSlotBorder;
  display: flex;
  align-items: stretch;
  height: 100%;
  width: $chatboxWidth;
  @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
  width: $chatboxWidth*2;
  }
  background-color: $railEdgeColor;
  &__info__membercount{
    background-clip: content-box;
    color: transparent;
    display:flex;
    position: relative;
    min-height: 1em;
    flex:1;
    @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
      flex: 0 0 50%;
      height:15%;
    }
  }
  &__info__body{
     flex: 0 1 45%;
      max-width: calc(#{$chatboxWidth * (1 - $chatBoxInfoImageFlexBasis)} - #{$boxFoldingPadding});
      @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
        display: flex;
        flex: 0 1 72.5%;
        flex-direction: column;
        max-width: 100%;
        width: 100%;
        margin-right:0;
        margin-left: $buttonBoxSlotBorder;
      }
      &::after{
        content:'';
        width: .1em;
      }
  }
  &__info__description{
    display: none;
    position: relative;

    @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
      flex: 1;
      display: flex;
      color: transparent;
      margin-top: $buttonBoxSlotBorder;
      height:auto;


    }
  }
  &__info__image{
    flex: 0 0 percentage($chatBoxInfoImageFlexBasis);

    margin-right: $buttonBoxSlotBorder;
    @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
      flex: 0 0 percentage($chatBoxInfoImageFlexBasis/2);
      margin-right:0;
      display: flex;
      flex-direction: column;
    }
    position: relative;
  }
  &__info__title{
    background-clip: content-box;
    color: transparent;
    display:flex;
    position: relative;
    min-height: 1em;
    height:50%;
    overflow:hidden;
    @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
      height:auto;
    }
  }
  &__info__username{
    background-clip: content-box;
    color: transparent;
    display:flex;
    position: relative;
    min-height: 1em;
    overflow: hidden;
    @media #{$screen $chat-portrait-info $portrait}, #{$screen $chat-landscape-info $landscape} {
      flex: 0 0 50%;
      height:auto;
      height:15%;
    }
  }
}


@keyframes overflow-scroll-x {
  50% {
    right: 0;
    bottom: 0;
  }
}

</style>
