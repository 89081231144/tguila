<template>
  <div :class="['photo', `chatbox__info--${photoNameAccordingToWidth?'once':'loading'}-animation`]">
      <picture>
        <source v-if="getFileNameById(photoSizes(photo)['y'])" :srcset="photosPath + getFileNameById(photoSizes(photo)['y'])" :media="`(min-width: ${screens.y}px`">
        <source v-if="getFileNameById(photoSizes(photo)['x'])" :srcset="photosPath + getFileNameById(photoSizes(photo)['x'])" :media="`(min-width: ${screens.x}px`">
        <source v-if="getFileNameById(photoSizes(photo)['m'])" :srcset="photosPath + getFileNameById(photoSizes(photo)['m'])" :media="`(min-width: ${screens.m}px`">
        <img v-if="smallestPhoto" :srcset="`${photosPath}${smallestPhoto}`" alt="…">


      </picture>
  </div>
</template>
<script>
//import { mapGetters } from 'vuex';
import photosMixin from '../../mixins/photos-mixin'
export default {
  data(){
    return {
      screens:{
                y: 1080,
                x: 833,
                m: 460,
                s: 100
              }
    }
  },
  mixins: [photosMixin],
  props: ['photo'],//[{"sizes":[{"type": "s","photo": {"id": 1675}},{"type": "m","photo": {"id": 1676}}]},{....}]
  computed: {
      screenSizePhoto(){
          let innerWidth = process.browser?window.innerWidth:360;
          let screens = this.screens, comprasion = {};
          Object.keys(screens).forEach(function(key) {
              innerWidth >= screens[key]?Object.assign(comprasion,{[key]:screens[key]}):null;
              //console.log(key, screens[key]);
          });
          return Object.keys(comprasion).reduce((a, b) => comprasion[a] > comprasion[b] ? a : b);
    },
    smallestPhoto(){
      return this.getFileNameById(this.photoSizes(this.photo)[Object.keys(this.photoSizes(this.photo))[0]])
    },
    photoNameAccordingToWidth(){
      let sizesObj = this.photoSizes(this.photo);
      return sizesObj.hasOwnProperty(this.screenSizePhoto)
        ?this.getFileNameById(sizesObj[this.screenSizePhoto])
        :this.getFileNameById(sizesObj[(Object.keys(sizesObj)).pop()])

      //getFileNameById(photoSizes(photo)[screenSizePhoto]

    }
  },
  mounted() {
    //console.log(this.photoSizes(this.photo)[this.screenSizePhoto])
    //console.log(this.photoNameAccordingToWidth)
  },
  methods:{


  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.photo{
  min-height: 90px;
  position:relative;
  cursor:pointer;
  padding: $buttonBoxSlotBorder;
  background-color: $coperColor;
  >picture>img{
    width:100%;
    height:auto;
    display: block;
  }
}


</style>
