<template>
  <div :class="['buttonBox','buttonBox--gradient','buttonBox--transform-'+direction]">
  <!--<div class="buttonBox__content">-->
  <div :class="['buttonBox__Edge-left','buttonBox__Edge-left--transform-'+direction]"></div>
    <div class="buttonBox__slot">
      <slot></slot>
    </div>
  <div :class="['buttonBox__Edge-right','buttonBox__Edge-right--transform-'+direction]" ></div>
  <!--</div>-->
  </div>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
export default {
  mixins: [directionsMixin],
  data() {
    return {

    }
  },
  components:{},
  methods: {}
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.buttonBox{
//  @include reset-button;
  display: flex;
  align-items: stretch;
position:relative;
height:100%;
}
.buttonBox__content{
  display: flex;
  align-items: stretch;
  height:100%;
}
.buttonBox--transform-topRight:active
{
  transform: translate(-$gapBetweenLayers/2,$gapBetweenLayers/2);
}
.buttonBox--transform-topLeft:active
{
  transform: translate($gapBetweenLayers/2,$gapBetweenLayers/2);
}
.buttonBox--transform-bottomLeft:active
{
  transform: translate($gapBetweenLayers/2,-$gapBetweenLayers/2);
}
.buttonBox--transform-bottomRight:active
{
  transform: translate(-$gapBetweenLayers/2,-$gapBetweenLayers/2);
}

.buttonBox--gradient:active > .buttonBox__Edge-left {
    //background-image: linear-gradient(-90deg,$railEdgeColor $gapBetweenLayers/2,transparent $gapBetweenLayers/2);
border-top:0;
border-bottom:0;
}
.buttonBox--gradient:active > .buttonBox__Edge-right{
//  background-image: linear-gradient(90deg,$railEdgeColor $gapBetweenLayers/2,transparent $gapBetweenLayers/2);
border-top:0;
border-bottom:0;
}

.buttonBox__slot{
//color:$railMainSideColor;
  //display:inline;
  height:100%;
  //border: $buttonBoxSlotBorder solid $railEdgeColor;
  //border-bottom: $gapBetweenLayers/2 solid $railEdgeColor;
  //background-color: $gapBetweenSkewBordersColor;
  //background-clip: padding-box;
  z-index: $skewBorderSecondZindex;
  //box-shadow: inset 1px 0px 0px 0px $gapBetweenSkewBordersColor;
  //padding: 1em;
}
.buttonBox__Edge-left,.buttonBox__Edge-right{
  //display: inline-block;
  width:$gapBetweenLayers;
  //height:$gapBetweenLayers;
  //transform-origin: top;
  //transform: skew(-45deg) rotate(180deg);
  //background-color: $railEdgeColor;
border-top: $buttonBoxSlotBorder solid $railEdgeColor;
border-bottom: $buttonBoxSlotBorder solid $railEdgeColor;
}
.buttonBox__Edge-right{

      border-left: $buttonBoxSlotBorder solid $railEdgeColor;
      margin-right:-$gapBetweenLayers;
    // box-shadow: inset $gapBetweenLayers/8 0px 0px 0px adjust-color($railEdgeColor, $alpha:1);
    /* background-image:
     linear-gradient(to bottom,$railEdgeColor $gapBetweenLayers/2,transparent $gapBetweenLayers/2,transparent calc(100% - #{$gapBetweenLayers}/2),$railEdgeColor calc(100% - #{$gapBetweenLayers}/2)),
        linear-gradient(to right,$railEdgeColor $gapBetweenLayers/2,transparent $gapBetweenLayers/2);*/
}
.buttonBox__Edge-right--transform-topLeft{
  transform-origin: left;
  transform: skewY(45deg);

}
.buttonBox__Edge-right--transform-bottomRight{
  transform-origin: left;
  transform: skewY(45deg) rotate(180deg);
}
.buttonBox__Edge-right--transform-bottomLeft{
  transform-origin: left;
  transform: skewY(-45deg) ;
}
.buttonBox__Edge-right--transform-topRight{
  transform-origin: left;
  transform: skewY(-45deg) rotate(180deg);
}
.buttonBox__Edge-left{
  /*background-image: linear-gradient(-90deg,$railEdgeColor $gapBetweenLayers/2,transparent $gapBetweenLayers/2),
  linear-gradient(180deg,$railEdgeColor $gapBetweenLayers/2,transparent $gapBetweenLayers/2,transparent calc(100% - #{$gapBetweenLayers}/2),$railEdgeColor calc(100% - #{$gapBetweenLayers}/2))
  ;*/

border-right: $buttonBoxSlotBorder solid $railEdgeColor;
    //box-shadow: inset (-$gapBetweenLayers/8) 0px 0px 0px adjust-color($railEdgeColor, $alpha:1);
    margin-left: -$gapBetweenLayers;
}
.buttonBox__Edge-left--transform-topLeft{
  transform-origin: right;
  transform: skewY(45deg) rotate(180deg);
}
.buttonBox__Edge-left--transform-bottomRight{
  transform-origin: right;
  transform: skewY(45deg);
}
.buttonBox__Edge-left--transform-bottomLeft{
  transform-origin: right;
  transform: skewY(-45deg) rotate(180deg);
}
.buttonBox__Edge-left--transform-topRight{
  transform-origin: right;
  transform: skewY(-45deg) ;
}
@each $item, $val in set-directions($skewBorderHeight) {
  .buttonBox__topEdge--boxShadow-#{$item}
  {
    $offsetX: -1;$offsetY: 1;
    @if $item == topRight {$offsetX: -1;$offsetY: 1;}
    @if $item == topLeft {$offsetX: 1;$offsetY: 1;}
    @if $item == bottomLeft {$offsetX: 1;$offsetY: -1;}
    @if $item == bottomRight {$offsetX: -1;$offsetY: -1;}

    $style: '';


    @for $i from 0 through $shadowsNum {
    $delim: ',';
    @if $i == $shadowsNum {
        $delim: '';
      }
    $style: $style +  ($offsetX*($gapBetweenLayers - ($i * ($gapBetweenLayers/10))) $offsetY*($gapBetweenLayers - ($i * ($gapBetweenLayers/10)))) +' '+ $railEdgeColor + $delim
    }


    box-shadow: unquote($style);

  }
}


</style>
