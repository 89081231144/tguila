<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    serverPrefetch () {
      // return the Promise from the action
      // so that the component waits before rendering
      this.rndDirection();
    },
    methods: {
      rndDirection(){
        this.$store.dispatch('rndDirection');
      }
    }

  };
</script>
<style lang="scss">
  @import '~@/_variables.scss';


  :root {
    --baseline: #{$baseLine};
    //--mounting-bottom: #{percentage($railSpaceWidth)};
    font-size: 16px;
    line-height:1.2;
    box-sizing: border-box;
  }
  *,
  ::before,
  ::after {
    box-sizing: inherit;
  }
  body {
    line-height: calc(var(--baseline) + 1vw);
    font-size: calc(1vw + 0.6rem);
    background-color: #eee;
    font-family: Helvetica, Arial, sans-serif;
    @media screen and (min-width: $box-portrait-small-2col-min-px) {
      font-size: calc(.68vw + 0.6rem);
      line-height: calc(var(--baseline) + .68vw);
    }
    @media screen and (min-width: $box-portrait-big-1col-min-px) {
      font-size: calc(.36vw + 0.6rem);
      line-height: calc(var(--baseline) + .36vw);
    }
    @media screen and (min-width: $center-fixed-width) {
      font-size: calc(.26vw + 0.6rem);
      line-height: calc(var(--baseline) + .26vw);
    }
  }
  #app{
    height: 100%;
    width: 100%;
    position: relative;
  }
  .someBackground {
    background-color: $coperColor;
  }
  @each $direction, $val in set-directions($skewBorderHeight) {
    .left--#{$direction}{
      z-index: map-get(map-get($val, "zIndex"),"leftSide");
    }
    .center--#{$direction}{
      z-index: map-get(map-get($val, "zIndex"),"centerSide");
    }
    .right--#{$direction}{
      z-index: map-get(map-get($val, "zIndex"),"rightSide");
    }
  }
  .chatbox__info--loading-animation{
    &:after{
      @include animation-background-haze-infinite;
    }
  }

  .chatbox__info--once-animation{
    &:after{
      @include animation-background-haze-once;
    }
  }
  @keyframes animation-background-haze {
    @include keyframes-background-haze;
  }
  .playIcon{
      cursor: pointer;
      display: block;
      position: absolute;
      border-style: solid;
      border-width: 10px 0 10px 20px;
      border-color: transparent transparent transparent $railEdgeColor;
      top: calc(50% - 10px);
      left: calc(50% - 5px);
  }
  @keyframes animation-background-appear{
      @include keyframes-background-appear;
  }
  .animation-background-appear{
    @include animation-background-appear;
  }
  .notDisplay{
    display: none;
  }
</style>
