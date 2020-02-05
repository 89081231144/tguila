export default {
  computed:{
    thumbnailPath(){
      let setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
      return `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}${setPort}/${process.env.THUMBNAILS}/`;
    },
  }
}
