<template>
  <div class="spaceContainer">
<!--
    <div id="bottomLayer" :class="['pAfter','pBefore',`pAfter-bottom-${direction}`,`pBefore-bottom-${direction}`,`pBefore-bottom-${direction}--x-size`,`pAfter-bottom-${direction}--x-size`, `bottom-${direction}--x-size-depth`]"></div>
    <div id="topLayer" :class="['pAfter','pBefore',`pAfter-top-${direction}`,`pBefore-top-${direction}`,`pBefore-top-${direction}--x-size`,`pAfter-top-${direction}--x-size`]"><slot></slot></div>
-->
    <div id="bottomLayer" :class="[`bottom-${direction}--${depthVal[depth]}-depth`,calcStyles.bottom]"><slot name="bottomLayer"></slot></div>
    <div id="topLayer" :class="calcStyles.top"><slot name="topLayer"></slot></div>
  </div>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
export default {
  props: ['xSides','ySides', 'depth','cName','switchTop'],
  data(){
    return {

      depthVal: {
        0: 'zero-size',
        0.5: 's-size',
        1: 'm-size',
        1.5: 'x-size',
        2: 'y-size',
        3: 'xx-size',
        4: 'yy-size'
      }
    }
  },
  mixins: [directionsMixin],
  //props: ['zIndex'],
  computed: {

    calcStyles(){
      let bottomBefore = `pBefore pBefore-bottom-${this.direction} pBefore-bottom-${this.direction}--${this.depthVal[this.depth]}`,
          bottomAfter = `pAfter pAfter-bottom-${this.direction} pAfter-bottom-${this.direction}--${this.depthVal[this.depth]}`,
          topBefore = `pBefore pBefore-top-${this.direction} pBefore-top-${this.direction}--${this.depthVal[this.depth]}`,
          topAfter = `pAfter pAfter-top-${this.direction} pAfter-top-${this.direction}--${this.depthVal[this.depth]}`;

      let bottom = [], top = [], invertedDirection = '';

      switch(this.direction) {
        case 'bottomRight':
          if(this.xSides){bottom.push(bottomAfter); top.push(topBefore);}
          if(this.ySides){bottom.push(bottomBefore); top.push(topAfter);}
          invertedDirection = 'topLeft';
          break;
        case 'bottomLeft':
        if(this.xSides){bottom.push(bottomAfter); top.push(topBefore);}
        if(this.ySides){bottom.push(bottomBefore); top.push(topAfter);}
        invertedDirection = 'topRight';
          break;
        case 'topLeft':
        if(this.xSides){bottom.push(bottomBefore); top.push(topAfter);}
        if(this.ySides){bottom.push(bottomAfter); top.push(topBefore);}
        invertedDirection = 'bottomRight';
          break;
        case 'topRight':
        if(this.xSides){bottom.push(bottomBefore); top.push(topAfter);}
        if(this.ySides){bottom.push(bottomAfter); top.push(topBefore);}
        invertedDirection = 'bottomLeft';
          break;
      }
      return {bottom: bottom.join(' '), top: top.join(' '), invertedDirection};
    }
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
/*
      b	    t
BL  a(r) 	b(l)
BR	a(l)	b(r)
TL	b(r)	a(l)
TR	b(l)	a(r)


*/


.spaceContainer{
  position: relative;
}
#topLayer{
  width: 100%;
  height: 100%;
  //background-color: $railMainSideColor;
  position: relative;
}
#bottomLayer{
  width: 100%;
  height: 100%;
  //background-color: $railMainSideColor;
  position: absolute;
}
.pAfter
{
  &::after
  {
    content: '';
    display: block;
    position: absolute;
  }
}
.pBefore
{
  &::before
  {
    content: '';
    display: block;
    position: absolute;
  }
}
@each $direction, $val in set-directions-view($gapBetweenLayers) {
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
  $bottom-box-position: map-get(map-get($val, "bottom-box"),"position");

  .bottom-#{$direction}{
    &--zero-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers*0;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers*0;
    }
    &--s-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers*0.5;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers*0.5;
    }
    &--m-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers;
    }
    &--x-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers*1.5;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers*1.5;
    }
    &--xx-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers*3;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers*3;
    }
    &--y-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers*2;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers*2;
    }
    &--yy-size-depth{
      #{nth($bottom-box-position,1)}: $gapBetweenLayers*4;
      #{nth($bottom-box-position,2)}: $gapBetweenLayers*4;
    }
  }

  .pAfter-bottom-#{$direction}{
    &::after{
     top: $bottom-box-after-top;
     left: $bottom-box-after-left;
     transform: #{$bottom-box-after-transform};
     transform-origin: #{$bottom-box-after-transform-origin};
     //background: linear-gradient(to #{$bottom-box-after-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
   }
   &--zero-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width*0,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height*0,$bottom-box-after-height);
     }
   }
   &--s-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width*0.5,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height*0.5,$bottom-box-after-height);
     }
   }
   &--m-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height,$bottom-box-after-height);
     }
   }
   &--x-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width*1.5,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height*1.5,$bottom-box-after-height);
     }
   }
   &--xx-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width*3,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height*3,$bottom-box-after-height);
     }
   }
   &--y-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width*2,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height*2,$bottom-box-after-height);
     }
   }
   &--yy-size{
     &::after{
       width: if($bottom-box-after-width != 100%,$bottom-box-after-width*4,$bottom-box-after-width);
       height: if($bottom-box-after-height != 100%,$bottom-box-after-height*4,$bottom-box-after-height);
     }
   }
  }
  .pBefore-bottom-#{$direction}{
    &::before{
      margin-left: $bottom-box-before-left;
      transform: #{$bottom-box-before-transform};
      transform-origin: #{$bottom-box-before-transform-origin};
      //background: linear-gradient(to #{$bottom-box-before-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
   }

         &--zero-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width*0,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height*0,$bottom-box-before-height);
           }
         }
         &--s-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width*0.5,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height*0.5,$bottom-box-before-height);
           }
         }
         &--m-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height,$bottom-box-before-height);
           }
         }
         &--x-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width*1.5,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height*1.5,$bottom-box-before-height);
           }
         }
         &--xx-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width*3,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height*3,$bottom-box-before-height);
           }
         }
         &--y-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width*2,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height*2,$bottom-box-before-height);
           }
         }
         &--yy-size{
           &::before{
             width: if($bottom-box-before-width != 100%,$bottom-box-before-width*4,$bottom-box-before-width);
             height: if($bottom-box-before-height != 100%,$bottom-box-before-height*4,$bottom-box-before-height);
           }
         }
  }

  .pAfter-top-#{$direction}{
    &::after{
      transform: $top-box-after-transform;
      transform-origin: $top-box-after-transform-origin;
      //background: linear-gradient(to #{$top-box-after-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
      top: $top-box-after-top;
      left: $top-box-after-left;
   }
   &--zero-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width*0,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height*0,$top-box-after-height);
     }
   }
   &--s-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width*0.5,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height*0.5,$top-box-after-height);
     }
   }
   &--m-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height,$top-box-after-height);
     }
   }
   &--x-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width*1.5,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height*1.5,$top-box-after-height);
     }
   }
   &--xx-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width*3,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height*3,$top-box-after-height);
     }
   }
   &--y-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width*2,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height*2,$top-box-after-height);
     }
   }
   &--yy-size{
     &::after{
       width: if($top-box-after-width != 100%,$top-box-after-width*4,$top-box-after-width);
       height: if($top-box-after-height != 100%,$top-box-after-height*4,$top-box-after-height);
     }
   }
  }
  .pBefore-top-#{$direction}{
    &::before{
      transform: $top-box-before-transform;
      transform-origin: $top-box-before-transform-origin;
      margin-left: $top-box-before-left;
      //background: linear-gradient(to #{$top-box-before-transform-origin}, $railEdgeColor 100%, $railEdgeColor 100%);
   }
     &--zero-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width*0,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height*0,$top-box-before-height);
       }
     }
     &--s-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width*0.5,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height*0.5,$top-box-before-height);
       }
     }
     &--m-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height,$top-box-before-height);
       }
     }
     &--x-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width*1.5,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height*1.5,$top-box-before-height);
       }
     }
     &--xx-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width*3,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height*3,$top-box-before-height);
       }
     }
     &--y-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width*2,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height*2,$top-box-before-height);
       }
     }
     &--yy-size{
       &::before{
         width: if($top-box-before-width != 100%,$top-box-before-width*4,$top-box-before-width);
         height: if($top-box-before-height != 100%,$top-box-before-height*4,$top-box-before-height);
       }
     }
  }
  .zIndex-left--#{$direction}-layer1{
    z-index: map-get(map-get($val, "zIndex"),"leftSide") + 19;
  }
  .zIndex-left--#{$direction}{
    z-index: map-get(map-get($val, "zIndex"),"leftSide") + 20;
  }
  .zIndex-center--#{$direction}{
    z-index: map-get(map-get($val, "zIndex"),"centerSide") + 20;
  }
  .zIndex-center--#{$direction}-layer1{
    z-index: map-get(map-get($val, "zIndex"),"centerSide") + 17;
  }
  .zIndex-center--#{$direction}-layer2{
    z-index: map-get(map-get($val, "zIndex"),"centerSide") + 14;
  }
  .zIndex-center--#{$direction}-layer3{
    z-index: map-get(map-get($val, "zIndex"),"centerSide") + 11;
  }
  .zIndex-right--#{$direction}{
    z-index: map-get(map-get($val, "zIndex"),"rightSide") + 20;
  }
}
</style>
