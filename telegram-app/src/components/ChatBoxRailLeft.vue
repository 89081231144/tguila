<template>
    <!--<div class="chatBoxRail" :style="{'z-index': zIndex}">-->
    <div class="chatBoxRail">
    <div :class="[`chatBoxRail__top-${direction}`,getChannelSearchStatus?'searching':{}]"></div>
    <div :class="[`chatBoxRail__bottom-${direction}`]"></div>
  </div>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
import { mapGetters } from 'vuex';

export default {
  mixins: [directionsMixin],
  computed:{
    ...mapGetters(['getChannelSearchStatus']),
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatBoxRail{
  width: 100%;
  height: calc(100% - (#{$gapBetweenSkewBorders}*2));
  margin: $gapBetweenSkewBorders 0;
  position:absolute;
}

@each $direction, $val in set-directions($gapBetweenLayers) {
  $bottom-box-before-transform: directionGetter-3Lvl($val,"bottom-box","before","transform");
  $bottom-box-before-transform-origin: directionGetter-3Lvl($val,"bottom-box","before","transform-origin");
  $bottom-box-before-height: directionGetter-3Lvl($val,"bottom-box","before","height");
  $bottom-box-before-width: directionGetter-3Lvl($val,"bottom-box","before","width");
  $bottom-box-before-left: directionGetter-3Lvl($val,"bottom-box","before","left");
  $bottom-box-after-transform: directionGetter-3Lvl($val,"bottom-box","after","transform");
  $bottom-box-after-transform-origin: directionGetter-3Lvl($val,"bottom-box","after","transform-origin");
  $bottom-box-after-left: directionGetter-3Lvl($val,"bottom-box","after","left");
  $bottom-box-after-top: directionGetter-3Lvl($val,"bottom-box","after","top");
  $bottom-box-after-height: directionGetter-3Lvl($val,"bottom-box","after","height");
  $bottom-box-after-width: directionGetter-3Lvl($val,"bottom-box","after","width");
  $top-box-before-transform: directionGetter-3Lvl($val,"top-box","before","transform");
  $top-box-before-transform-origin: directionGetter-3Lvl($val,"top-box","before","transform-origin");
  $top-box-before-height: directionGetter-3Lvl($val,"top-box","before","height");
  $top-box-before-width: directionGetter-3Lvl($val,"top-box","before","width");
  $top-box-after-top: directionGetter-3Lvl($val,"top-box","after","top");
  $top-box-after-transform: directionGetter-3Lvl($val,"top-box","after","transform");
  $top-box-after-transform-origin: directionGetter-3Lvl($val,"top-box","after","transform-origin");
  $top-box-after-height: directionGetter-3Lvl($val,"top-box","after","height");
  $top-box-after-width: directionGetter-3Lvl($val,"top-box","after","width");
  $top-box-before-left: directionGetter-3Lvl($val,"top-box","before","left");
  $top-box-after-left: directionGetter-3Lvl($val,"top-box","after","left");
  $top-box-position: map-get(map-get($val, "top-box"),"position");

  .chatBoxRail__top-#{$direction}{
    width: 100%;
    height: 100%;
    position:absolute;
    background-color: $railMainSideColor;
    #{nth($top-box-position,1)}: $gapBetweenLayers;
    #{nth($top-box-position,2)}: $gapBetweenLayers;
    z-index: $leftRailTopBorderZindex+2;
    &::before{
    content: '';
    display: block;
    width: $top-box-before-width;
    margin-left: $top-box-before-left;
    height: $top-box-before-height;
    transform: #{$top-box-before-transform};
    transform-origin: #{$top-box-before-transform-origin};
    background: linear-gradient(to #{$top-box-before-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
    }
     &::after{
      content: '';
      display: block;
      width: $top-box-after-width;
      height: $top-box-after-height;
      margin-top: $top-box-after-top;
      margin-left:: $top-box-after-left;
      transform: #{$top-box-after-transform};
      transform-origin: #{$top-box-after-transform-origin};
      background: linear-gradient(to #{$top-box-after-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);

    }

  }
  .chatBoxRail__bottom-#{$direction}{
    width: 100%;
    height: 100%;
    position:relative;
    background-color: $railMainSideColor;
    &::before{
    content: '';
    display: block;
    width: $bottom-box-before-width;
    height: $bottom-box-before-height;
    transform: $bottom-box-before-transform;
    transform-origin: $bottom-box-before-transform-origin;
    margin-left: $bottom-box-before-left;
    background: linear-gradient(to #{$bottom-box-before-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
    }
    &::after{
     content: '';
     display: block;
     width: $bottom-box-after-width;
     height: $bottom-box-after-height;
     margin-left: $bottom-box-after-left;
     margin-top: $bottom-box-after-top;
     transform: $bottom-box-after-transform;
     transform-origin: $bottom-box-after-transform-origin;
     background: linear-gradient(to #{$bottom-box-after-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
   }
  }
  .searching{
    animation: $animation-background-haze-infinite;
  }
}
</style>
