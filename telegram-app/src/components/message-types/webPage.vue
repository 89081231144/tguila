<template>

    <div class="messageWebPage">
        <div class="messageWebPage__content">
          <div v-if="siteName" class="messageWebPage____content__siteName">{{this.siteName}}</div>
          <div v-if="title" class="messageWebPage____content__title">{{this.title}}</div>
          <div v-if="description" class="messageWebPage____content__description" v-html="this.description"></div>
      <!--
        <div v-if="Object.keys(webPage.photo).length > 0" class="chatViewContent__message__webPage__content__photo">
          <picture class="[`chatbox__info--${this.pathAvailable?'once':'loading'}-animation`]">
              <source v-if="this.getFileNameById(this.sizes['m'])" :srcset="photosPath + this.getFileNameById(this.sizes['m'])" media="(min-width: 601px)">
              <source v-if="this.getFileNameById(this.sizes['x'])" :srcset="photosPath + this.getFileNameById(this.sizes['x'])" media="(min-width: 833px)">
              <source v-if="this.getFileNameById(this.sizes['y'])" :srcset="photosPath + this.getFileNameById(this.sizes['y'])" media="(min-width: 1080px)">
              <img v-if="this.getFileNameById(this.sizes['s'])" class="chatbox__info__image" :srcset="photosPath + this.getFileNameById(this.sizes['s'])" alt="…">
          </picture>
        </div>
      -->
          <photo v-if="webPage.hasOwnProperty('photo')&&Object.keys(webPage.photo).length>0" class="chatViewContent__message__webPage__content__photo" :photo = "webPage.photo" />
      </div>
    </div>

</template>
<script>
import photo from './photo.vue';
import { mapGetters } from 'vuex';
export default {
  props: ['webPage'],
  data(){
    return {
    }
  },
  computed: {
    siteName(){
      return this.webPage.siteName;
    },
    title(){
      return this.webPage.title;
    },
    description(){
      return this.webPage.description;
    }
  },
  components: {
    'photo': photo
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.messageWebPage{
  color: $railMainSideColor;
  position: relative;
  background-color: $coperColor;
  animation: $animation-background-haze-once;
  a {
    @include anchor-tag;
    }


  &__content{
    margin-left: $buttonBoxSlotBorder;
    border-left: $buttonBoxSlotBorder solid $railEdgeColor;
    padding-left: $buttonBoxSlotBorder;
    &__siteName{
      min-height: 1em;
    }
    &__title{
      min-height: 1em;
      font-weight: bold;}
    &__description{
      min-height: 1em;
    }
  }
}
</style>
