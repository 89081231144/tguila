<template>
<div ref="containerBox" class="container">
  <div class="container__bottom" :style="container__bottom">

   <div ref="bottomBox" v-for = "(n, index) in this.boxNumberTotal" :class="[`container__bottom__box-${direction}-${rizing}`]"  :style="container__bottom__box">
     <!--<div :class="[`container__bottom__box__inner-${direction}`]"></div>-->
   </div>
  </div>
  <div class="container__top" :style="container__top">
     <div ref="topBox" v-for = "(n, index) in this.boxNumberTotal"  :class="[`container__top__box-${direction}-${rizing}`]" :style="{...container__top__box,...{'z-index': doCompute(direction)[n-1]}}">
     <div :class="['container__top__box__inner',getChannelSearchStatus?'searchInProgress':'searchComplete']"></div>
     </div>
  </div>
</div>


</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
import { mapGetters } from 'vuex';
//import {set} from 'vue';
export default {
  mixins: [directionsMixin],
  props:['centeritemLength','rizing'],
  data() {
    return {
    //centeritemLength,
    boxNumberMainAxis: 6,
    boxNumberTotal: 6,
    //directionNum: 1,
    //direction: {1: 'bottomRight',2:'bottomLeft',3:'topRight',4:'topLeft' },
    //rizing:['to-left','to-right'],
    //rizingNum: this.rizing,
    container__bottom: {},
    container__top: {},
    container__bottom__box: {},
    container__top__box: {}
    }
  },
  watch:{
    centeritemLength(val) {
      this.recalcSideFillers(this.boxHeight(),this.contHeight())
      //this.$set(this.container__bottom__box, 'height', `${this.boxHeight()}px`);
      //console.log(val + ' emited');


    }
  },
  computed:{
    ...mapGetters(['getChannelSearchStatus']),
    topRight(){
      let num = this.boxNumberMainAxis, n=0,zindexes=[],i=0;
      while(n<this.boxNum)
      {
        zindexes.push(num - i);
        i++;
        if(i===this.boxNumberMainAxis){num++;i=0}
        n++;
      }
      return zindexes;
    },
    topLeft(){
      let num = this.boxNumberMainAxis, n=0,zindexes=[],i=0;
      while(n<this.boxNum)
      {
        zindexes.push(num + i);
        i++;
        if(i===this.boxNumberMainAxis){num++;i=0}
        n++;
      }
      return zindexes;
    },

    bottomRight(){
     return [...Array(this.boxNum + 1).keys()].reverse();
    },
    bottomLeft(){
     let num = this.boxNum, n=0,zindexes=[],i=0;
      while(n<this.boxNum)
      {
        zindexes.push(num + i);
        i++;
        if(i===this.boxNumberMainAxis){num--;i=0}
        n++;
      }
      return zindexes;
    },
    //boxNum(){return Math.pow(this.boxNumberMainAxis,2)},
    boxNum(){return this.boxNumberTotal},
    flexBasis(){ return 100/this.boxNumberMainAxis; }
  },
  methods: {
   doCompute (property) {
      return this[property]
    },
   boxHeight() {
      //return this.$refs.bottomBox[0].clientWidth;

      return this.$refs.bottomBox[0].clientWidth || 100;
      //return this.$refs.bottomBox[0]?this.$refs.bottomBox[0].clientWidth:100;
    },
    contHeight(){
      return this.$refs.containerBox.clientHeight;
    },
    setHeight(prop,val){
      this.$set(prop, 'height', `${val}px`);
    },
    fillContainerslSpace(height){
      this.setHeight(this.container__bottom__box,height);
      this.setHeight(this.container__top__box,height);
    },
    recalcSideFillers(boxHeight,contHeight){

      this.fillContainerslSpace(boxHeight);
      let calculatedBoxNumber = this.boxNumberMainAxis*((contHeight/boxHeight|0));
      if(this.boxNumberTotal < calculatedBoxNumber){
        this.boxNumberTotal = calculatedBoxNumber;
      }

      //this.boxNumberTotal =  this.boxNumberMainAxis*((contHeight/boxHeight|0));
    }
  },
  mounted() {
    this.recalcSideFillers(this.boxHeight(),this.contHeight());
  }

}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.container{
  width: 100%;
  height: 100%;
  position: relative;

}

$boxNumberX: 6;
$shifting: $skewBorderHeight;
$coperColor: $gapBetweenSkewBordersColor;
$mainColor: $railMainSideColor;
$edgeColor: $railEdgeColor;
//$mainColor: $coperColor;
//$edgeColor: #494b50;

$top-box-inner-w: 80%;
$top-box-inner-h: $top-box-inner-w;
$top-box-inner-correction: 1;
$top-box-inner-pos-top: 50% - $top-box-inner-w/2;
$top-box-inner-pos-left: 50% - $top-box-inner-w/2;

@keyframes search-in-progress{
  0%{
    top: $top-box-inner-pos-top - 3%;
    right: $top-box-inner-pos-left - 3%;
  }
  20%{
  top: calc(#{$top-box-inner-pos-top*2} + #{$top-box-inner-correction}px);
  left: calc(#{$top-box-inner-pos-left/2} + #{$top-box-inner-correction}px);
  }
  45%{
    top: calc(#{$top-box-inner-pos-top/2} + #{$top-box-inner-correction}px);
    left: calc(#{$top-box-inner-pos-left*2} + #{$top-box-inner-correction}px);
  }
   70%{
    top: 0;
    left: calc(#{$top-box-inner-pos-left/2} + #{$top-box-inner-correction}px);
  }
  85%{
    top: calc(#{$top-box-inner-pos-top*2} + #{$top-box-inner-correction}px);
    left: 0;
  }
  100%{
    top: $top-box-inner-pos-top - 3%;
    right: $top-box-inner-pos-left - 3%;
  }
}

@mixin top-box-inner{
//  $w: 80%;
//  $h: $w;
  width: calc(#{$top-box-inner-w} - #{$top-box-inner-correction}px);
  height: calc(#{$top-box-inner-h} - #{$top-box-inner-correction}px);
  top: $top-box-inner-pos-top;
  left: $top-box-inner-pos-left;
  background-color: #3a3c40;
  //border: 1px solid $edgeColor;
  //display: none;
}
@mixin container-param {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
@mixin container-box-background {
$val: 10%;

//background-color: none;
background:
  linear-gradient(90deg, $mainColor $val, transparent $val),
  linear-gradient(180deg, $mainColor $val, transparent $val),
  linear-gradient(270deg, $mainColor $val, transparent $val),
  linear-gradient(360deg, $mainColor $val, transparent  $val);
}
@mixin container-box-param {
  flex: 0 0 percentage((100/$boxNumberX)/100);
  background-color: $mainColor;
  height: 100%;
  width: 100%;
  /*position: relative;*/
  /*height: percentage((100/$boxNumberX)/100);*/
}




.container__top{
  position: relative;
  @include container-param;
  }

.container__bottom{
  position: absolute;
  @include container-param;
  }

$rising: ("toLeft":0,"toRight":$boxNumberX);
@each $direction, $val in set-directions($skewBorderHeight) {
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
//$top-box-z-index: map-get(map-get($val, "top-box"),"z-index-first-column");


$index: 1;
@each $rise, $riseVal in $rising {

       @keyframes rise-#{$direction}-#{$rise} {
      from {
        #{nth($top-box-position,1)}:0;
        #{nth($top-box-position,2)}:0;
      }
      to {
        #{nth($top-box-position,1)}:$shifting;
        #{nth($top-box-position,2)}:$shifting;
      }
    }

  .container__bottom__box__inner-#{$direction}{
    @include top-box-inner;
    position: absolute;
  //#{nth($top-box-position,1)}: $shifting/2;
  // #{nth($top-box-position,2)}: $shifting/2;
  }


  .container__top__box-#{$direction}-#{$rise}{

    @include container-box-param;
    //@include container-box-background;
    position: relative;

    //animation: rise-#{$direction}-#{$rise} 1s linear 1;
   //display: none;
    &::before{
    content: '';
    //position: absolute;
    display: block;
    width: $top-box-before-width;
    //top: calc(100% - #{$shifting});
    //height: $shifting;
    margin-left: $top-box-before-left;
    height: $top-box-before-height;
    transform: #{$top-box-before-transform};
    transform-origin: #{$top-box-before-transform-origin};
    }

     &::after{
      content: '';
      //position: relative;
      display: block;
      width: $top-box-after-width;
      height: $top-box-after-height;
      margin-top: $top-box-after-top;
      margin-left:: $top-box-after-left;
      transform: #{$top-box-after-transform};
      transform-origin: #{$top-box-after-transform-origin};
    }
     /*&:nth-child(#{$boxNumberX}n + 1) {
       //transform: translate(-$shifting, -$shifting);
       #{nth($top-box-position,1)}:$shifting;
       #{nth($top-box-position,2)}: $shifting;
       z-index: abs($top-box-z-index);
     }*/

     /*
     &:nth-child(#{$boxNumberX}n + 1):before  { background: linear-gradient(to #{$top-box-before-transform-origin}, transparent 0, $edgeColor  0); }
     &:nth-child(#{$boxNumberX}n + 1):after   { background: linear-gradient(to #{$top-box-after-transform-origin}, transparent 0, $edgeColor  0); }
    */

    @for $box from 1 through $boxNumberX {
         &:nth-child(#{$boxNumberX}n + #{$box}) {
             #{nth($top-box-position,1)}:($shifting - ($shifting/$boxNumberX)*abs($riseVal - $box)) + ($shifting/$boxNumberX);
            #{nth($top-box-position,2)}:($shifting - ($shifting/$boxNumberX)*abs($riseVal - $box)) + ($shifting/$boxNumberX);
            //z-index: abs($top-box-z-index - $box);
          }
          /* &:nth-child(n+#{$boxNumberX*($box - 1)+1}):nth-child(-n+#{$box*$boxNumberX}) {
            z-index: abs($top-box-z-index - $box);
           }*/


            $valX: ($shifting/$boxNumberX)*abs($riseVal - $box) - + ($shifting/$boxNumberX);
            &:nth-child(#{$boxNumberX}n + #{$box}):before {
            background: linear-gradient(to #{$top-box-before-transform-origin}, transparent $valX, $edgeColor $valX);
          }
            &:nth-child(#{$boxNumberX}n + #{$box}):after {
            background: linear-gradient(to #{$top-box-after-transform-origin}, transparent $valX, $edgeColor $valX);
          }
     }
        /*&:nth-child(n + 1):nth-child(-n + 8) {
            z-index: abs($top-box-z-index);
          }*/

  }


  .container__bottom__box-#{$direction}-#{$rise}{
     @include container-box-param;
     position: relative;

     //display:flex;
     /*background-color: #3a3c40;*/
      &::before{
      content: '';
      //position: absolute;
      display: block;
      width: $bottom-box-before-width;
      height: $bottom-box-before-height;
      transform: $bottom-box-before-transform;
      transform-origin: $bottom-box-before-transform-origin;
      margin-left: $bottom-box-before-left;
      }
       &::after{
        content: '';
        //position: relative;
        display: block;
        width: $bottom-box-after-width;
        height: $bottom-box-after-height;
        //left: $bottom-box-after-left;
        margin-left: $bottom-box-after-left;
        margin-top: $bottom-box-after-top;
        transform: $bottom-box-after-transform;
        transform-origin: $bottom-box-after-transform-origin;
      }

      // &:nth-child(#{$boxNumberX}n + 1):before  { background: linear-gradient(to #{$bottom-box-before-transform-origin}, transparent 0, $edgeColor 0); }
       //&:nth-child(#{$boxNumberX}n + 1):after   { background: linear-gradient(to #{$bottom-box-after-transform-origin}, transparent 0, $edgeColor 0); }

         @for $box from 1 through $boxNumberX {
            $valX: ($shifting/$boxNumberX)*abs($riseVal - $box);
              &:nth-child(#{$boxNumberX}n + #{$box}):before {
              background: linear-gradient(to #{$bottom-box-before-transform-origin}, transparent $valX, $edgeColor $valX);
            }
            &:nth-child(#{$boxNumberX}n + #{$box}):after {
              background: linear-gradient(to #{$bottom-box-after-transform-origin}, transparent $valX, $edgeColor $valX);
            }
        }

    }

 }

}
.container__top__box__inner, .container__bottom__box__inner{
  @include top-box-inner;
  //animation: 3s linear  both search-in-progress infinite;
  background:
    linear-gradient(90deg, $mainColor 0%, $mainColor 100%),
    linear-gradient(180deg, $coperColor 0%, $coperColor 100%);
    //linear-gradient(270deg, $mainColor $val, transparent $val),
    //linear-gradient(360deg, $mainColor $val, transparent  $val);
  position: absolute;
}
.searchInProgress{
  animation: 2s linear  alternate search-in-progress infinite;
}
.searchComplete{
  animation: unset;
}
</style>
