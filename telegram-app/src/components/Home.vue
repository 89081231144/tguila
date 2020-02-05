<template>

  <div class="main">
  <div class="underlay">
    <side-filler
          v-if="homePage"
          :centeritemLength = "this.centeritemLength"
          :rizing = "'toLeft'"
          />
          <side-filler
                v-if="homePage"
                :centeritemLength = "this.centeritemLength"
                :rizing = "'toRight'"
                />
        </div>
    <!--<div :class="['left',`left--${direction}`]"></div>-->
<!--      <div :class="['left',`left--${direction}`]"><side-filler

        :centeritemLength = "this.centeritemLength"
        :rizing = "'toRight'"
        /></div>-->
      <div ref="central" :class="['center',`center--${direction}`]">
        <search-field :class="isVisibile" />
        <chatbox-mount @selected-chatbox123="hideSearchField" v-on:itemsProcessing="itemLength($event)"/>
      </div>
    <!--  <div :class="['right',`right--${direction}`]"></div>-->
<!--    <div :class="['right',`right--${direction}`]"><side-filler

      :centeritemLength = "this.centeritemLength"
      :rizing = "'toLeft'"
      /></div>-->
  </div>
</template>
<script>
import directionsMixin from '../mixins/directions-mixin';
//import ThreeDBox from './ThreeDBox.vue';
import { mapGetters } from 'vuex';

import SearchField from './SearchField.vue';
import ChatBoxMount from './ChatBoxMount.vue';
import SideFiller from './SideFiller.vue';
export default {
    mixins: [directionsMixin],
    data(){
    return{
      visibilitySearchField: undefined,
      centeritemLength: 0,
    }
  },
  computed:{
    ...mapGetters(['getDemountChatBoxStatus']),
    homePage(){
      return this.$route.name === 'home'?true:false;
    },
    isVisibile(){
      let s = this.getDemountChatBoxStatus;
      return s !== undefined?'visibilityHidden':{}
    }
  //  scren(){
  //    return screen.width+'x'+screen.height;
  //  }
  },
  mounted(){
    this.$store.dispatch('setDemountChatBoxStatus',undefined);

    //console.log(this.$refs.central.clientHeight)
  },
  beforeMount () {
    //window.scrollTo(0,document.body.scrollHeight);
    window.addEventListener('resize', this.itemLength);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.itemLength);
  },
  methods: {
    itemLength(e){
      this.centeritemLength = e?e:new Date();
    //console.log(this.centeritemLength);
  },
  hideSearchField(chatboxIndex){
    this.visibilitySearchField = chatboxIndex
  }
  },
/*  beforeRouteLeave  ( {name,params:{username}}, from, next ) {

      if(name === "chatView")
      {
      this.$store.dispatch('searchChatByUserName',username);
      }

   next()
 },*/
  components:{'search-field':SearchField,
              'chatbox-mount':ChatBoxMount,
              'side-filler':SideFiller,
              //'Xyz-box':ThreeDBox
            }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.underlay{
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  z-index: $underlayZindex;
  @media #{$screen $side-fillers-landscape $landscape}{
    display: flex;
  }
}
.main{
  position: relative;
  display:flex;
  //flex-direction: column;
  //align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: $skewBorderHeight;
}
.left, .right{
  display: none;
  //visibility: hidden;
  margin-top:$skewBorderHeight;
  width: 0%;
  //z-index: $aSidesZindex;
  @media #{$screen $side-fillers-landscape $landscape}{
    display: block;
    //visibility: visible;
    flex: 1;
  }
}
/*.left{
  position: relative;
  bottom: $skewBorderHeight;
  background-color: $railMainSideColor;
  right: $skewBorderHeight;
}
.left::before{
  content: '';
  display: block;
  background-color: $railEdgeColor;
  height: $skewBorderHeight;
  width: 100%;
  //margin-left: calc(100% - #{$skewBorderHeight});
transform-origin: top;
transform: skew(45deg);
}
.left::after{
  content: '';
  display: block;
  background-color: $railEdgeColor;
  height: 100%;
  width: $skewBorderHeight;
  margin-top: -$skewBorderHeight;
  margin-left: calc(100% - #{$skewBorderHeight});
  transform-origin: right;
  transform: rotate(180deg) skewY(45deg);
}*/

.center{
  width: 100%;
  z-index: $centerSideZindex;
  @media #{$screen $center-landscape-fixed-width $landscape}{
    width: $center-fixed-width;
  }
}
.visibilityHidden{
  visibility: hidden;
}
</style>
