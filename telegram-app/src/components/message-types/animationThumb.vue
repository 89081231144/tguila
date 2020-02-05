<template>
  <div v-if="thumbnail" :class="['animationThumbnail',!getFileNameById(thumbnail.photo.id)?'noIcon chatbox__info--loading-animation':'chatbox__info--once-animation']">
    <div v-if="getFileNameById(thumbnail.photo.id)" class="playIcon"></div>
    <img v-if="getFileNameById(thumbnail.photo.id)" :src="`${thumbnailPath}${getFileNameById(thumbnail.photo.id)}`">
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import thumbPath from '../../mixins/thumb-path'
export default {
  //chatbox__info--${this.pathAvailable?'once':'loading'}-animation
  mixins:[thumbPath],
  props: ['msgAnimation'],
  data(){
    return {
      //thumbnailPath: `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}:${process.env.APP_SERVER_PORT}/${process.env.THUMBNAILS}/`,
      animation:'',
      width: '',
      height: '',
      mimeType: '',
      thumbnail: '',
    }
  },
  computed: {
    ...mapGetters(['getFileNameById']),
/*    fileName(){
      return this.getFileNameById(this.thumbnail.photo.id);
    }*/
  },
  mounted(){
    Object.assign(this.$data,this.msgAnimation);
    /*Object.keys(this.msgAnimation).forEach((k)=>{
      this.$data[k] = this.msgAnimation[k];
    });*/

  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.animationThumbnail{
  width: 100%;
  height: 100%;
  padding: $buttonBoxSlotBorder;
  background-color: $coperColor;
  cursor: pointer;
  min-height: $messageMediaMinHeight;
  position: relative;
  img {
    //width: 100%;
    //width: 90px;
    //height: 60px;

    display: block;
    margin: auto;
  }
}

.noIcon{
  background-color: $railEdgeColor;
}
</style>
