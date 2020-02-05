<template>

          <space id="viewSpace" :depth = 0>
            <view-content slot="topLayer" class="chatViewContent__message"
            :content = "mergeMediaAlbumMessages"
            :mountIndexNum = "mountIndexNum"
            :chatId = "chatId"
            :msgDate = "mediaAlbumMessagesDate"
            />
          <space id="viewSpaceBottom" slot="bottomLayer" :depth = 2>

            <space slot="topLayer" :xSides="true" :class="[`zIndex-left--${direction}`]"  id="middleSpaceLeft" :depth = 2 />
            <space slot="topLayer" class="widthIncrease-b" id="middleSpaceCenter" :depth = 2 />
            <space slot="topLayer" :xSides="true" :class="[`zIndex-right--${direction}`]"  id="middleSpaceRight" :depth = 2 />

          </space>
          </space>

</template>
<script>
import { mapGetters } from 'vuex';
import directionsMixin from '../mixins/directions-mixin';
import ChatViewBorder from './ChatViewBorder.vue';
import ChatViewContent from './ChatViewContent.vue';
import space from './3dSpace.vue';

export default {
  props: ['mediaAlbum','chatId','mountIndexNum'],
  mixins: [directionsMixin],
  computed: {
    ...mapGetters(['getMessageContent','getMessageById']),
    mergeMediaAlbumMessages(){
        //obj = {12556738216705898:[msgId,msgId]} || {0:[msgId,msgId]}
        let obj = this.mediaAlbum;

        let merged = {};
        let msgIdsArr = Object.values(obj);//[[msgId,msgId]]
        msgIdsArr = msgIdsArr.reduce((acc, val) => acc.concat(val), []);//[msgId,msgId]
        msgIdsArr = msgIdsArr.map((msgId)=>{
          return this.getMessageContent(this.chatId,msgId);//{"_":"messagePhoto","photo":{"sizes":[{"type":"s","photo":{"id":338}}]},"caption":"smth"}
        }); //[{"_":"messagePhoto",....},{"_":"messageVideo",....}]
/*
          msgIdsArr.forEach((obj)=>{//[{"_":"messagePhoto",....},{"_":"messagePhoto",....}]
            (Object.keys(obj)).forEach((key)=>{
              if(key !== '_'){
                if(merged.hasOwnProperty(key)){
                  merged[key] = [...merged[key],obj[key]]
                }else
                {
                  merged[key] = [obj[key]];

                }
              }else
              {
                merged[key]=obj[key];
              }
            })
          });
        return merged; //{_:'smth',photo:[{id:1},{id:2}]}],video:[{id:500}]}
  */

        return msgIdsArr;
    },
    mediaAlbumMessagesDate(){
      let msgIdsArr = Object.values(this.mediaAlbum), messagesDates;//[[msgId,msgId]]
      msgIdsArr = msgIdsArr.reduce((acc, val) => acc.concat(val), []);//[msgId,msgId]
      messagesDates = msgIdsArr.map((id)=>{
        let {date} = this.getMessageById({chatId:this.chatId,id});
        return date;
      });
      return Math.max(...messagesDates);
    }
  },
  methods: {

  },
  components:{
  'view-border': ChatViewBorder,
  'view-content': ChatViewContent,
  'space': space

  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.ahref{
  text-decoration: line-through;
}
.chatView{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: $skewBorderHeight*1.5;
}
#viewSpace{
  //top: -100%;
  //@include animation-top-increase;
  //margin-top: $skewBorderHeight*1.5;

  //margin-top: $gapBetweenLayers*4;
}
#viewSpace:nth-child(n):not(:last-child){
  margin-bottom: $chatViewSpacing;
}
#viewSpaceBottom{
  $sideMargin: (1 - $railSpaceWidth)/2;
  $thickness: 0.01;
  //margin-top: $skewBorderHeight*1.5;
  display: block;
  height:100%;
  //z-index: $chatViewContentZindex;
  > div{
    //background-color: $railMainSideColor;

    &::after{
      //background-color: $coperColor;

      //background: linear-gradient(to right,transparent 0%,transparent percentage($sideMargin), $railEdgeColor percentage($sideMargin), $railEdgeColor percentage($sideMargin + $thickness), transparent percentage($sideMargin + $thickness), transparent percentage($sideMargin + $railSpaceWidth - $thickness), $railEdgeColor percentage($sideMargin + $railSpaceWidth - $thickness), $railEdgeColor percentage($sideMargin + $railSpaceWidth),transparent percentage($sideMargin + $railSpaceWidth));

    }
    &::before{
      //background: linear-gradient(to right,transparent 0%,transparent percentage($sideMargin), $railEdgeColor percentage($sideMargin), $railEdgeColor percentage($sideMargin + $thickness), transparent percentage($sideMargin + $thickness), transparent percentage($sideMargin + $railSpaceWidth - $thickness), $railEdgeColor percentage($sideMargin + $railSpaceWidth - $thickness), $railEdgeColor percentage($sideMargin + $railSpaceWidth),transparent percentage($sideMargin + $railSpaceWidth));


    }
  }

  #topLayer {
    display: flex;
  	>#middleSpaceLeft {
  		width: $gapBetweenLayers*4;
  		height: 100%;
      margin-left: auto;
      div {
        background-color: $coperColor;
        &::before{
          background-color: $lightCoperColor;
        }
        &::after{
          background-color: $lightCoperColor;
        }
      }
  	}
  	>#middleSpaceRight {
  		width: $gapBetweenLayers*4;
  		height: 100%;
      margin-right: auto;
      div {
        background-color: $coperColor;
        &::before{
          background-color: $lightCoperColor;
        }
        &::after{
          background-color: $lightCoperColor;
        }
      }
  	}
  	>#middleSpaceCenter {
  		//width: percentage($railSpaceWidth);
  		height: 100%;
  	}
    //background: linear-gradient(to right,transparent 0%,transparent percentage($sideMargin), $railEdgeColor percentage($sideMargin), $railEdgeColor percentage($sideMargin + $thickness), transparent percentage($sideMargin + $thickness), transparent percentage($sideMargin + $railSpaceWidth - $thickness), $railEdgeColor percentage($sideMargin + $railSpaceWidth - $thickness), $railEdgeColor percentage($sideMargin + $railSpaceWidth),transparent percentage($sideMargin + $railSpaceWidth));

  }
}
@each $direction, $val in set-directions-view($skewBorderHeight) {
  .direction-margin-#{$direction}{
    @if str-index($direction,"top") {
      padding-top: $chatViewSpacing;
    } @else{
      padding-bottom: $chatViewSpacing;
    }
  }
}
@keyframes animation-top-increase {
  @include keyframes-animation-top-increase;
}
</style>
