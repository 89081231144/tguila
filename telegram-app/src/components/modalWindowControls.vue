<template>
  <div class="modalWindowControls">
    <!--<sw-button class="modalWindowControls__leftItem" :enabled="enableWayControls" :way="'left'"  @click.native="swipeLeftHandler" />
    <sw-button class="modalWindowControls__centerItem" :enabled="enableCloseControls" :way="'stop'" @click.native="closeWindow" />
    <sw-button class="modalWindowControls__rightItem" :enabled="enableWayControls" :way="'right'" @click.native="swipeRightHandler" />-->
    <space :class="[`modalWindowControls__leftItem`,enableWayControls?`leftItem-enabled`:`leftItem-disabled`]" @click.native="swipeLeftHandler" xSides="true" ySides="true" :depth = 1 />
    <space :class="[`modalWindowControls__centerItem`,enableCloseControls?`centerItem-enabled`:`centerItem-disabled`]" @click.native="closeWindow" xSides="true" ySides="true" :depth = 1 />
    <space :class="[`modalWindowControls__rightItem`,enableWayControls?`rightItem-enabled`:`rightItem-disabled`]" @click.native="swipeRightHandler" xSides="true" ySides="true" :depth = 1 />

  </div>
</template>
<script>
import space from './3dSpace.vue';
//import sButton from './switchButton.vue';
import controlsMixin from '../mixins/modal-window-controls-actions';
import applyStylesMixin from '../mixins/chatview-styles-mixin.js';
export default {
  mixins:[controlsMixin,applyStylesMixin],
  props:['contentLength','toggle'],
  data(){
    return {
      enableCloseControls: false,
      enableWayControls: false
    }
  },
  methods:{
    closeWindow(){
        if(this.enableCloseControls){
          this.enableWayControls = false;
          this.enableCloseControls = false;
          this.$store.dispatch('setMWindowData',{});
          this.clickAnimation({state:1, time:100, reverse: true})


      }
    }
  },
  components: {
    'space': space
  },
  watch:{
    toggle: {
      immediate: true,
      handler (val, oldVal) {

        if(val){

            //this.togleControls();
            if(this.contentLength>1){
              this.enableWayControls?this.enableWayControls=false:this.enableWayControls=true;
            }
            this.enableCloseControls?this.enableCloseControls=false:this.enableCloseControls=true;
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
  .modalWindowControls{
    position: absolute;
    display: flex;
    height: $leftButtonHeight;
    width:100%;
    &>&__leftItem{
      margin-right: $gapBetweenLayers;
    }
    &>&__rightItem{
      margin-left: $gapBetweenLayers;
    }
    &>&__leftItem,&__rightItem{

      height: inherit;
      width: $leftButtonHeight;
    }

    &>&__centerItem{

      height: inherit;
      flex: 1 0 30%;
      //margin:auto;
    }
  }
  .leftItem, .centerItem, .rightItem{

    &-enabled{
      overflow: hidden;
      opacity: 1;
      >#topLayer{
        transform: scale(.8);
        transition: all .1s cubic-bezier(.68,-0.55,.27,1.55);
        &:active{
          transform: scale(1);
        }
        &::after{
          background-color: $railEdgeColor;
        }
        &::before{
          background-color: $railEdgeColor;
        }
    }
      > #bottomLayer{
        background-color: $railMainSideColor;
        &::after{
          background-color: $railEdgeColor;
        }
        &::before{
          background-color: $railEdgeColor;
        }
      }
    }
    &-disabled{
      opacity: .5;
      overflow: hidden;
      >#topLayer{
        background-color: $lightCoperColor;
      }
    }
  }
  .leftItem{
    &-enabled{
      >#topLayer{
        @include gradient-left-triangle($lightCoperColor);
      }
    }
  }
  .rightItem{
    &-enabled{
      >#topLayer{
        @include gradient-right-triangle($lightCoperColor);
      }
    }
  }
  .centerItem{
    &-enabled{
      >#topLayer{
        @include gradient-center-minimize($lightCoperColor);
      }
    }
  }
</style>
