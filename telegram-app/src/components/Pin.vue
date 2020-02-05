<template>
  <space :class="['pin',edges?`pinEdgeGradient-${direction}`:null]" :depth = "curDepth" ySides="true" xSides="true" >
    <space class="pin__button" slot="topLayer" :ySides="pressed" :xSides="pressed" :depth = "pressed?1:0" >
      <space class="pin__cap" slot="bottomLayer" :depth = 0 >
        <slot slot="topLayer"></slot>
        <space class="pin__pin" slot="bottomLayer" :ySides="true" :xSides="true" :depth = "pressed?curDepth - 1:curDepth" />
      </space>
    </space>
    <space class="pin__mounting" slot="bottomLayer" :ySides="true" :xSides="true" :depth = "mountDepth || 1" />
  </space>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';

import space from './3dSpace.vue';
export default {
  data(){
    return {
      //pressed: false
      curDepth: this.depth || 3
    }
  },
  props: ['depth','pressed','mountDepth','edges'],
  mixins: [directionsMixin],
  components:{
  'space': space
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.pin{
    &__button{
        > #bottomLayer{
          width: unset;
          height: unset;
          position: relative;

        }
        > #topLayer{
          position: absolute;
          top: 0;
          //border: 1px solid red;
/*
          background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient})),
                      linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
*/
        }
        > #topLayer, > #bottomLayer{
          &::after{
            //background-color: $railEdgeColor;
          }
          &::before{
            //background-color: $railEdgeColor;
          }
      }
    }
    &__pin, &__mounting{
      > #topLayer, > #bottomLayer{
        &::after{
          background-color: $railEdgeColor;
        }
        &::before{
          background-color: $railEdgeColor;
        }
    }
  }
  &__cap{
    > #bottomLayer{
      display: flex;
    }
  }
  &__pin{
    width: 50%;
    height: 50%;
    margin: auto;
  }
  &__mounting{
    height: 100%;
  }
  &__pin, &__mounting{
    > #topLayer, > #bottomLayer{
      background-color: $railMainSideColor;
    }
  }

}
.pinEdgeGradient-bottomRight,
.pinEdgeGradient-bottomLeft,
.pinEdgeGradient-topRight,
.pinEdgeGradient-topLeft{
  > #topLayer, > #bottomLayer{
    &::after{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient})),
                  linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
    &::before{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient})),
                  linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
  }
  /*
  > #bottomLayer{
    &::before{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
    &::after{
      background: linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
  }
  */
  .pin__button{
    > #topLayer{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient})),
                  linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
  }
}
/*
.pinEdgeGradient-topLeft, .pinEdgeGradient-topRight{
  > #topLayer{
    &::after{
      background: linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
    &::before{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
  }
  > #bottomLayer{
    &::before{
      background: linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
    &::after{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
  }
  .pin__button{
    > #topLayer{
      background: linear-gradient(to right, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient})),
                  linear-gradient(to bottom, $railEdgeColor $pinEdgeGradient, transparent $pinEdgeGradient, transparent calc(100% - #{$pinEdgeGradient}), $railEdgeColor calc(100% - #{$pinEdgeGradient}));
    }
  }
}
*/
</style>
