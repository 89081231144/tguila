<template>
  <space  :class="[`controlButton`,enabled?`${way}ControlItem enabledControl-variant-${variant || 1}`:`${way}ControlItem disabledControl-variant-${variant || 1}`]" xSides="true" ySides="true" :depth = 1></space>
</template>
<script>
import space from './3dSpace.vue';
import directionsMixin from '../mixins/directions-mixin';
export default {
  props:['way','enabled','variant'],
  mixins: [directionsMixin],
  components: {
    'space': space,
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.controlButton{
  overflow: hidden;
  > #topLayer{
    position: relative;
    &::after{
      background-color: $railEdgeColor;
    }
    &::before{
      background-color: $railEdgeColor;
    }
  }
  > #bottomLayer{
    //background-color: $railMainSideColor;
    &::after{
      background-color: $railEdgeColor;
    }
    &::before{
      background-color: $railEdgeColor;
    }
  }
}

.leftControlItem{
  #topLayer{
    background: linear-gradient(-#{$triangleGradientCathet + 180}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(#{$triangleGradientCathet}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(-90deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleBasisGradient), transparent percentage($triangleBasisGradient));
  }
}
.rightControlItem{
  #topLayer{
    background: linear-gradient(#{$triangleGradientCathet + 180}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(-#{$triangleGradientCathet}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(90deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleBasisGradient), transparent percentage($triangleBasisGradient));
  }
}
.topControlItem{
  #topLayer{
    background: linear-gradient(-#{$triangleGradientCathet + 90}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(#{$triangleGradientCathet + 90}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(0deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleBasisGradient), transparent percentage($triangleBasisGradient));
  }
}
.bottomControlItem{
  #topLayer{
    background: linear-gradient(#{$triangleGradientCathet + 270}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(-#{$triangleGradientCathet + 270}deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope)),
                linear-gradient(180deg, $lightCoperColor 0%, $lightCoperColor percentage($triangleBasisGradient), transparent percentage($triangleBasisGradient));
  }
}
.stopControlItem{
  #topLayer{
    background: linear-gradient(to bottom, $lightCoperColor 0%, $lightCoperColor percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope), transparent percentage($triangleGradientCathetSlope + (1 - $triangleGradientCathetSlope*2)), $lightCoperColor percentage($triangleGradientCathetSlope + (1 - $triangleGradientCathetSlope*2))),
                linear-gradient(to right, $lightCoperColor 0%, $lightCoperColor percentage($triangleBasisGradient), transparent percentage($triangleBasisGradient), transparent percentage(1 - $triangleBasisGradient), $lightCoperColor percentage(1 - $triangleBasisGradient) );

  }
}

.disabledControl{
  &-variant-1{
    opacity: .5;
      >#topLayer{
      background-color: $lightCoperColor;
    }
  }
  &-variant-2{
    opacity: 0;
  }
}
.enabledControl{
      &-variant-1{
      opacity: 1;
      > #bottomLayer{
        background-color: $railMainSideColor;
      }
      > #topLayer{
        transform: scale(.8);
        transition: all .1s cubic-bezier(.68,-0.55,.27,1.55);
        &:active{
          transform: scale(1);
        }
      }
    }
    &-variant-2{

    > #bottomLayer{
      opacity: .6;
      &::after{
        background-color: unset;
      }
      &::before{
        background-color: unset;
      }
      //background-color: $railMainSideColor;
    }
    > #topLayer{
      opacity: .6;
      //transform: scale(.8);
      transition: all .1s cubic-bezier(.68,-0.55,.27,1.55);
      &::after{
        background-color: unset;
      }
      &::before{
        background-color: unset;
      }
      &:active{
        transform: scale(.8);
      }
    }
  }
}

.controlButtonBL{
  bottom: 0;
  left: 0;
}
.controlButtonBR{
  bottom: 0;
  right: 0;
}
.controlButtonTL{
  top: 0;
}
.controlButtonTR{
  top: 0;
  right: 0;
}

.controlButtonClose{

  height: $leftButtonHeight;
  width: $closeButtonWidth;
}
.controlButtonBC{
  left: $leftButtonWidth + $gapBetweenLayers;
  bottom: 0;
}
.controlButtonTC{
  left: $leftButtonWidth + $gapBetweenLayers;
  top: 0;
}
</style>
