export default {
  methods: {
    swipeLeftHandler(){
        if(this.contentLength>0){
        this.$store.dispatch('shiftAlbumItem','left');
      }
    },
    swipeRightHandler(){
        if(this.contentLength>0){
        this.$store.dispatch('shiftAlbumItem','right');
      }
    },

  /*  togleControls(){
      //console.log(this.enableCloseControls)
      if(this.contentLength>1){
        this.enableWayControls?this.enableWayControls=false:this.enableWayControls=true;
      }
      this.enableCloseControls?this.enableCloseControls=false:this.enableCloseControls=true;
      return true;
    }*/


  },
};
