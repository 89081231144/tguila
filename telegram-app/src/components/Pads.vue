<template>
<div class="padsContainer">
  <space v-if="left" id="flank" :depth = 3 >
    <space :class="['flank',`zIndex-left--${direction}`]" slot="bottomLayer" :depth = 1 :xSides="true" :ySides="true"></space>
  </space>
  <space :depth= 3 :class="['filler',`zIndex-center--${direction}`]">
    <pin :style="{'z-index': doCompute(direction)[item-1], 'animation-delay':animationDelay+item/animationDelayIncrement+'s'}" v-for="(item,key, index) in boxNumberTotal" :key="key" :depth=0.5 :mountDepth=0.5 slot="bottomLayer">
      <div class="size"></div>
    </pin>
  </space>
  <space v-if="right" id="flank" :depth = 3 >
    <space :class="['flank',`zIndex-right--${direction}`]" slot="bottomLayer" :depth = 1 :xSides="true" :ySides="true"></space>
  </space>
  <!--<space :depth= 1 :xSides="true" :ySides="true" class="right-flank"></space>-->
</div>
</template>
<script>
import Pin from './Pin.vue';
import directionsMixin from '../mixins/directions-mixin';
import space from './3dSpace.vue';
export default {
  data() {
    return {
      animationDelay: 0.3,
      animationDelayIncrement: 100,
      boxNumberMainAxis: 6,
      boxNumberTotal: 120,
    }
  },
  props: ['left','right'],
  mixins: [directionsMixin],
  computed: {

    topRight() {
      let num = this.boxNumberMainAxis,
        n = 0,
        zindexes = [],
        i = 0;
      while (n < this.boxNumberTotal) {
        zindexes.push(num + i);
        i++;
        if (i === this.boxNumberMainAxis) {
          num--;
          i = 0
        }
        n++;
      }
      return zindexes;
    },
    bottomRight() {
      let num = this.boxNumberMainAxis,
        n = 0,
        zindexes = [],
        i = 0;
      while (n < this.boxNumberTotal) {
        zindexes.push(num + i);
        i++;
        if (i === this.boxNumberMainAxis) {
          num++;
          i = 0
        }
        n++;
      }
      return zindexes;
    },
    topLeft() {
      return [...Array(this.boxNumberTotal + 1).keys()].reverse();
    },
    bottomLeft() {
      let num = this.boxNumberMainAxis,
        n = 0,
        zindexes = [],
        i = 0;
      while (n < this.boxNumberTotal) {
        zindexes.push(num - i);
        i++;
        if (i === this.boxNumberMainAxis) {
          num++;
          i = 0
        }
        n++;
      }
      return zindexes;
    }
  },
  methods: {
    doCompute(property) {
      return this[property];
    }
  },
  components: {
    'pin': Pin,
    'space': space
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.padsContainer{
  display: none;
  #flank
  {
    height: 100%;
    display: none;
  }
  //@media #{$screen $chatView-750px}{
  @media #{$screen $chatViewSidePins-510px}{
    position: fixed;
    //display: block;
    display:flex;
    width: $leftButtonWidth;
    //height: 100vw;
    height: 100%;
    width: calc((100% - #{$chatViewWidth})/2);
  /*  #flank{
      flex: 1;
    }*/
    .filler{
      max-width: calc(6*#{$leftButtonWidth});
      //margin-left: auto;

      flex: 2 0 100%;
        .pin{
          top:100%;
          //animation: pads-move-to-top .3s linear 1;
          //animation-fill-mode: forwards;
          @include animation-pads-move-to-top;
        }
      >#bottomLayer{
        display: flex;
        flex-wrap: wrap;
        justify-content: end;
        //width: calc(6*#{$leftButtonWidth});
        //margin-left: auto;
      }
    }
    .pin{
      width: $leftButtonWidth;
      height: $leftButtonHeight;
    }
  }
  @media #{$screen $chatView-calcPadsFlanks}{
    #flank{
      display: block;
      flex: 1 1 0;
      //position: fixed;
      //width: calc((100% - #{$leftButtonWidth*12} - #{$chatViewWidth})/2);
      //height: 100vw;
      .flank{
        height: 100%;
        >#topLayer, > #bottomLayer{
          background-color: $railMainSideColor;
          &::after{
            background-color: $railEdgeColor;
          }
          &::before{
            background-color: $railEdgeColor;
          }
        }
      }


    }
  }
}
.size {
    width: $leftButtonWidth;
    height: $leftButtonHeight;
}
@keyframes pads-move-to-top{
  @include pads-move-to-top;
}
</style>
