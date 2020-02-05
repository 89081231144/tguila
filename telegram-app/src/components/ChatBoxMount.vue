<template>
<!--<div class="chatbox-mount-border-top-right" :style = "{left: initGridBoxLeftShifting + '%'}">-->
<div class="chatBoxesContainer">


     <chat-box
        v-for="(item,key, index) in listChats"
        :key="item.type.supergroupId"
        :title="item.title"
        :username="item.username"
        :description="item.description"
        :photo="item.photo"
        :chatid="item.id"
        :groupid="item.type.supergroupId"
        :membercount="item.memberCount"
        v-show = "item.visible"
        :index = "direction.includes('Left')?index:Object.keys(listChats).length - index"
        :boxIndex = "index"
        :visibilityCheck = "(visibilityChatBox !== undefined)?visibilityChatBox:index"
        ></chat-box>


</div>
<!--</div>-->
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
import updFiles from '../mixins/upd-files-mixin';
//import chatBoxStylesMixin from '../mixins/chatbox-styles-mixin.js';

//import MountPoint from './MountPoint.vue';
//import router from '../router/';
//import boxesMixin from '../js/boxes-mixin';
import { mapGetters } from 'vuex';
import ChatBox from './ChatBox.vue';
export default {
  mixins: [directionsMixin,updFiles],
  //mixins: [boxesMixin],
  data() {
  return {
    visibilityChatBox: undefined
  //emitedTUsername: ''
  }
  },
  computed: {
    ...mapGetters(['getChatsState']),
    listChats() {
      return  Object.assign(this.$store.getters.getChatsSortedKeys({order:'asc'}),this.getChatsState);
    }
  },
  watch: {
    visibilityChatBox: {
      immediate: true,
      handler (val, oldVal) {
        //console.log(`${val} ${oldVal}`)
        //Object.assign(this.$data,this.content);

      }

    }
  },
   async serverPrefetch () {
    //await this.$store.dispatch('getRecentlyFoundChats');
    //await this.$store.dispatch('getMyChats');
    await Promise.all([
                  this.$store.dispatch('getMyChats'),
                  this.$store.dispatch('getRecentlyFoundChats')
                ]);
  },
  mounted(){
    //this.clickAnimation({state:1, time:100, reverse: true})
    if (Object.keys(this.listChats).length <= 1) {

      //this.$store.dispatch('getRecentlyFoundChats');
      this.$store.dispatch('getMyChats');
    }
  },
  updated(){
    //console.log(Date.now())
    //this.visibilityChatBox = undefined;
    this.$emit('itemsProcessing',new Date());
  },
  destroyed(){

  },
  methods:{
    doCompute (property) {
      return this[property]
    }
  },
  components:{ChatBox}
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatBoxesContainer{

display: flex;
//@media screen and (orientation: landscape)                {
//  display: block;
//}
flex-wrap: wrap;

/*
@media screen and (max-width: $break-medium) {
  &:nth-child(even)
  .chatBoxItem {margin-left: -$skewBchatBoxRail__toporderHeight/2;}
}*/
//display: flex;
//justify-content:center;
//align-self:center;
//flex-direction: column;
}
.chatBoxesContainer .chatBoxItem{

  @media #{$screen $chat-rail-edge-transparent-portrait $portrait},
         #{$screen $chat-rail-edge-transparent-big-portrait $portrait},
         #{$screen $chat-rail-edge-transparent-landscape $landscape}

         {
/*
    &:nth-child(even)
  .chatBoxRail__top-topRight {z-index: $leftRailTopBorderZindex+1;}
  &:nth-child(even)
  .chatBoxRail__bottom-topLeft {z-index: $leftRailTopBorderZindex+1;}
  &:nth-child(even)
  .chatBoxRail__bottom-bottomLeft {z-index: $leftRailTopBorderZindex+1;}
  &:nth-child(even)
  .chatBoxRail__top-bottomRight {z-index: $leftRailTopBorderZindex+1;}
/*
  &:nth-child(odd)
  .chatBoxRail__bottom-topRight::after {background: unset;}
  &:nth-child(odd)
  .chatBoxRail__top-topLeft::before {background: unset;}
  &:nth-child(odd)
  .chatBoxRail__top-bottomLeft::after {background: unset;}
  &:nth-child(odd)
  .chatBoxRail__bottom-bottomRight::before {background: unset;}
*/
}

}
@keyframes translation-top-right{
  @include translation-top-right;
}
@keyframes translation-bottom-left{
  @include translation-bottom-left;
}
@keyframes translation-left{
  @include translation-left;
}
.translation-top-right{
  animation: $translation-top-right;
}
.translation-bottom-left{
  animation: $translation-bottom-left;
}
.translation-left{
  z-index: $decomposeWhenTranslationLeftZindex;
  animation: $translation-left;

}
</style>
