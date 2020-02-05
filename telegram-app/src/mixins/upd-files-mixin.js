export default {
  mounted(){
    this.updateFilesStatus();
  },
  methods:{
    updateFilesStatus(){
      let notLoadedFilesIds = [];
      let that = this
      setInterval(function(){
        notLoadedFilesIds = that.$store.getters.getNotLoadedFilesIds;
        if(notLoadedFilesIds.length>0){that.$store.dispatch('setFilesLoadingStatus',notLoadedFilesIds);}
        //console.log(notLoadedFilesIds)
      }, 3000);
    }
  }
};
