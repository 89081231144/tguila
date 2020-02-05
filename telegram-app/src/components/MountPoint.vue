<template>
<!--<div class="mPointContainer">-->

<!--
<div class="content">

<xyz-border
:direction = this.direction
/>
-->
<div class="contentInner"><div :class="['contentInner--transform-'+direction+'-Middle', 'contentInnerMiddle--color']" ><div :class="['contentInner--transform-'+direction]"><slot></slot></div></div></div>
<!--
<xyz-border
:direction = this.direction
/>

</div>
-->
<!--</div>-->
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
//import XyzBorder from './XyzBorder.vue';
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
    //'xyz-border': XyzBorder
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';






.skewBorder--color{background-color: $skewBorderColor;
  //border: 1px solid $skewBorderColor;
}
/*
.mPointContainer{
position:relative;
//display: inline;
}
*/


.contentInner{
position: relative;
flex: 1;
}
.contentInner--transform-topRight{height: 100%; transform: translate($skewBorderHeight/2,-$skewBorderHeight/2);}
.contentInner--transform-topRight-Middle{height: 100%; transform: translate($skewBorderHeight/2,-$skewBorderHeight/2);z-index: $leftRailTopBorderZindex+2;position: relative;}
.contentInner--transform-topLeft{height: 100%; transform: translate(-$skewBorderHeight/2,-$skewBorderHeight/2);}
.contentInner--transform-topLeft-Middle{height: 100%; transform: translate(-$skewBorderHeight/2,-$skewBorderHeight/2);z-index: $leftRailTopBorderZindex+3;position:relative;}
.contentInner--transform-bottomLeft{height: 100%; transform: translate(-$skewBorderHeight/2,$skewBorderHeight/2);}
.contentInner--transform-bottomLeft-Middle{height: 100%; position: relative;transform: translate(-$skewBorderHeight/2,$skewBorderHeight/2); z-index: $skewBorderSecondZindex - 5;}
.contentInner--transform-bottomRight{
  height: 100%;
  transform: translate($skewBorderHeight/2,$skewBorderHeight/2);

}
.contentInner--transform-bottomRight-Middle{height: 100%; position: relative;transform: translate($skewBorderHeight/2,$skewBorderHeight/2); z-index: $skewBorderSecondZindex - 5;}


//.contentInner--color{/*background-color:$contentInnerColor;*/}
.contentInnerMiddle--color{background-color:$contentInnerMiddleColor  ;
}




.content{

position: relative;
//display: inline-block;
}


</style>
