<template>
  <space :class="['railsContainer',`railsContainer__${msgNum<=1?'fetching':'fetched'}Messages`]" :depth = 1 >
    <space :class="['railSpace',`zIndex-center--${direction}`,'widthIncrease-b']" slot="topLayer" :ySides="true" :xSides="true" :depth = 1 />
      <space class="railsSubContainer" slot="bottomLayer" :depth = 1 >
        <space :class="['railSpace',`zIndex-center--${direction}-layer1`,'widthIncrease-m']" slot="topLayer" :ySides="true" :xSides="true" :depth = 1 />
            <space class="railsSubContainer" slot="bottomLayer" :depth = 1 >
              <space :class="['railSpace',`zIndex-center--${direction}-layer2`,'widthIncrease-x']" slot="topLayer" :ySides="true" :xSides="true" :depth = 1 />
            <!--    <space id="railsContainer" slot="bottomLayer" :depth = 1 >
                  <space id="railSpace" :class="[`zIndex-center--${direction}-layer3`,'widthIncrease-y']" slot="topLayer" :ySides="true" :xSides="true" :depth = 1 />
                </space> -->
            </space>
      </space>

  </space>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
import space from './3dSpace.vue';
import { mapGetters } from 'vuex';

  export default {
    mixins: [directionsMixin],
    computed: {
      ...mapGetters(['getMessagesCount','getChatIdByUserName']),
      msgNum(){
        return this.getMessagesCount(this.getChatIdByUserName(this.$route.params.username));
      }
    },
    components:{
    'space': space
    }
  }
  //:class="['railsContainer',`railsContainer__${msgNum<=1?'fetching':'fetched'}Messages`]"
</script>
<style lang="scss">
@import '~@/_variables.scss';
.railsContainer{
  width: 100%;
  &__fetchedMessages{
    height: 100%;
  }
  &__fetchingMessages{
    height: calc(100vh - #{$chatViewSpacing});
  }
  .railsSubContainer{
    width: 100%;
    height: 100%;
  }
  .railSpace {

    height: 100%;
    margin: auto;
    > div{
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
/*
.railsContainer{
  &__fetchedMessages{
    height: 100%;
  }
  &__fetchingMessages{
    height: calc(100vh - $chatViewSpacing);
  }
}
*/
.widthIncrease-b{
  width: percentage($railSpaceWidth);
}
.widthIncrease-s{
  width: percentage($railSpaceWidth + ((1 - $railSpaceWidth)/4));
}
.widthIncrease-m{
  width: percentage($railSpaceWidth + ((1 - $railSpaceWidth)/3));
  @media #{$screen $chatView-510px}{width: percentage($railSpaceWidth + 0.18);}
}
.widthIncrease-x{
  width: percentage($railSpaceWidth + ((1 - $railSpaceWidth)/2));
    @media #{$screen $chatView-510px}{width: percentage($railSpaceWidth + 0.52);}
}
.widthIncrease-y{
  width: percentage($railSpaceWidth + (1 - $railSpaceWidth));
}
</style>
