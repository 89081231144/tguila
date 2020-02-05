<template>

    <video class="video" controls :width="width" :height="height" :poster="thumbnail?`${thumbnailPath}${this.getFileNameById(thumbnail.photo.id)}`:''">
      <source v-if="this.getFileNameById(video.id)" :src="`${videosPath}${this.getFileNameById(video.id)}`" :type="mimeType">


      Sorry, your browser doesn't support embedded videos.
    </video>

</template>
<script>
import { mapGetters } from 'vuex';
import thumbPath from '../../mixins/thumb-path'

export default {
  mixins:[thumbPath],
  props: ['msgVideo'],
  data(){
    return {
      //videosPath: `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}:${process.env.APP_SERVER_PORT}/${process.env.VIDEOS}/`,
      //thumbnailPath: `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}:${process.env.APP_SERVER_PORT}/${process.env.THUMBNAILS}/`,
      //fileName: '',
      video:'',
      width: '',
      height: '',
      mimeType: '',
      thumbnail: ''

    }
  },
  computed: {
    videosPath(){
      let setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
      return `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}${setPort}/${process.env.VIDEOS}/`;
    },
    ...mapGetters(['getFileNameById']),
  },
  mounted(){

    Object.assign(this.$data,this.msgVideo);
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.video{
  width:100%;
  margin: auto;
  max-height: calc(100% - #{$leftButtonHeight*2});
}
</style>
