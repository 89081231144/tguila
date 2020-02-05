<template>
  <div class="border ">
    <div :class="['gapBetweenSkewBorders--positioning-'+this.direction,'gapBetweenSkewBorders', 'gapBetweenSkewBorders--color','absolute' ]"></div>
    <div :class="['skewBorders-bottom','skewBorders-bottom--transform-'+this.direction,'gapBetweenSkewBorders', 'gapBetweenSkewBorders--color' ]"></div>
  </div>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
export default {
mixins: [directionsMixin],
//props:['direction'],
data() {return {

}},
  computed: {
  },
  methods: {

  },
  components: {

  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.gapBetweenSkewBorders
{
height: $gapBetweenSkewBorders;
width:100%
}
.border{
position:relative;
width: 100%;
//height: 100%;
}

.skewBorders-bottom--transform-topLeft,
.skewBorders-bottom--transform-topRight,
.skewBorders-bottom--transform-bottomRight,
.skewBorders-bottom--transform-bottomRight
{
  //width:100%;
}
.skewBorders-bottom::after{
@include skewBorders;
}
.skewBorders-bottom::before{
@include skewBorders;
}
.gapBetweenSkewBorders--positioning-topLeft{
  bottom: $skewBorderHeight;
  right: $skewBorderHeight;
  z-index: $gapBetweenSkewBordersZindex;
}
.gapBetweenSkewBorders--positioning-topRight{
  bottom: $skewBorderHeight;
  left: $skewBorderHeight;
  z-index: $gapBetweenSkewBordersZindex;
}
.gapBetweenSkewBorders--positioning-bottomRight{
  top: $skewBorderHeight;
  left: $skewBorderHeight;
  z-index: $gapBetweenSkewBordersZindex;
}
.gapBetweenSkewBorders--positioning-bottomLeft{
  top: $skewBorderHeight;
  right: $skewBorderHeight;
  z-index: $gapBetweenSkewBordersZindex;
}
.gapBetweenSkewBorders--color{background-color:$gapBetweenSkewBordersColor;}
.absolute{
position: absolute;
}
.skewBorders-bottom--transform-topLeft::after{
transform-origin: top;
transform: skew(45deg) rotate(180deg);
margin-top: $gapBetweenSkewBorders - $skewBorderHeight;
}
.skewBorders-bottom--transform-topRight::after{
transform-origin: top;
transform: skew(-45deg) rotate(180deg);
margin-top: $gapBetweenSkewBorders - $skewBorderHeight;
}
.skewBorders-bottom--transform-bottomRight::after{
transform-origin: top;
transform: skew(45deg);
margin-top: $gapBetweenSkewBorders - $skewBorderHeight;
position: relative;
z-index: $leftRailTopBorderZindex+6;
}
.skewBorders-bottom--transform-bottomLeft::after{
transform-origin: top;
transform: skew(-45deg);
margin-top: $gapBetweenSkewBorders - $skewBorderHeight;
z-index: $leftRailTopBorderZindex+6;
position: relative;
}


.skewBorders-bottom--transform-topLeft::before{
transform-origin: top;
transform: skew(45deg) rotate(180deg);
z-index: $skewBorderSecondZindex;
position: relative;
}
.skewBorders-bottom--transform-topRight::before{
transform-origin: top;
transform: skew(-45deg) rotate(180deg);
z-index: $skewBorderSecondZindex;
position: relative;
}
.skewBorders-bottom--transform-bottomRight::before{
transform-origin: top;
transform: skew(45deg);
z-index: $leftRailTopBorderZindex+1;
}
.skewBorders-bottom--transform-bottomLeft::before{
transform-origin: top;
transform: skew(-45deg);
z-index: $leftRailTopBorderZindex;
}
</style>
