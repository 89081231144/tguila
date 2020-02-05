<template>

    <video class="animation" controls :width="width" :height="height" :poster="thumbnail?`${thumbnailPath}${this.getFileNameById(thumbnail.photo.id)}`:''">
      <source v-if="this.getFileNameById(animation.id)" :src="`${animationsPath}${this.getFileNameById(animation.id)}`" :type="mimeType">
      Sorry, your browser doesn't support embedded videos.
    </video>

</template>
<script>
import { mapGetters } from 'vuex';
import thumbPath from '../../mixins/thumb-path'
export default {
  mixins:[thumbPath],
  props: ['msgAnimation'],
  data(){
    return {
      //animationsPath: `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}:${process.env.APP_SERVER_PORT}/${process.env.ANIMATIONS}/`,
      //thumbnailPath: `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}:${process.env.APP_SERVER_PORT}/${process.env.THUMBNAILS}/`,
      //fileName: '',
      animation:'',
      width: '',
      height: '',
      mimeType: '',
      thumbnail: ''

    }
  },
  computed: {
    animationsPath(){
      let setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
      return `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}${setPort}/${process.env.ANIMATIONS}/`;
    },
    ...mapGetters(['getFileNameById']),
  },
  mounted(){

    Object.assign(this.$data,this.msgAnimation);
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.animation{
  width:100%;
  margin: auto;
  max-height: calc(100% - #{$leftButtonHeight*2});
}
</style>
