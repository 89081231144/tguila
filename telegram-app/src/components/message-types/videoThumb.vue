<template>
<!--
    <video controls :width="width" :height="height" :poster="thumbnail?`${thumbnailPath}${this.getFileNameById(thumbnail.photo.id)}`:''">
      <source v-if="this.getFileNameById(video.id)" :src="`${videosPath}${this.getFileNameById(video.id)}`" :type="mimeType">
      Sorry, your browser doesn't support embedded videos.
    </video>
-->
  <div class="videoThumbnail">
    <div class="playIcon"></div>
    <img :src="thumbnail?`${thumbnailPath}${this.getFileNameById(thumbnail.photo.id)}`:''">
  </div>
</template>
<script>
import thumbPath from '../../mixins/thumb-path'
import { mapGetters } from 'vuex';
export default {
  mixins:[thumbPath],
  props: ['msgVideo'],
  data(){
    return {
      //thumbnailPath: `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}:${process.env.APP_SERVER_PORT}/${process.env.THUMBNAILS}/`,
      video:'',
      width: '',
      height: '',
      mimeType: '',
      thumbnail: ''

    }
  },
  computed: {
    ...mapGetters(['getFileNameById']),
  },
  mounted(){
    Object.assign(this.$data,this.msgVideo);
  /*  Object.keys(this.msgVideo).forEach((k)=>{
      this.$data[k] = this.msgVideo[k];
    });*/
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.videoThumbnail{
  position: relative;
  min-height: 90px;
  cursor: pointer;
  img{
    display: block;
    width: 100%;
  }
}
</style>
