<template>
<div v-if="!photo" :class="['chatbox__info__image','chatBoxImagePlaceholder',`chatbox__info--${this.pathAvailable?'once':'loading'}-animation`]">
  <slot></slot>
</div>
<div v-else :class="['chatbox__info__image']">
<!--
<img v-if="photo.hasOwnProperty('big')" :src="imgpathBig" class="chatbox__info__image-big"/>
<img v-if="photo.hasOwnProperty('small')" :src="imgpathSmall" class="chatbox__info__image-small"/>
-->
<picture v-if="Object.keys(photo).length !== 0" :class="[`chatbox__info--${this.pathAvailable?'once':'loading'}-animation`]">
<source  :srcset="imgpathBig" media="(min-width: 800px)">
<img class="chatbox__info__image" v-if="photo.hasOwnProperty('small')" :srcset="imgpathSmall" alt="…">
</picture>
<div v-if="Object.keys(photo).length === 0" class="chatBoxImagePlaceholder chatBoxImageAcronym"><div class = "acronym">{{acronym}}</div></div>
<slot class="chatbox__info-username-membercount"></slot>
</div>

</template>
<script>
export default {
  props: ['photo','title','chatid'],
  data(){return {
    //bigId
    //bigPath: this.$store.getters.getFileNameById(bigId)
  }},
  computed: {
    fileSize(id)
    {
      //return this.$store.getters.getFileSizeById(id);
    },
    acronym(){
      return this.title.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
    },
    chatPhoto(){
      if(typeof(photo)==='object'){return photo};
    },
    photoSmall(){
      //photo.hasOwnProperty('small')?photo.small.local.path:false;
    },
    pathAvailable(){
    if(Object.keys(this.photo).length === 0) {return false;}
      let {big:{id:bigId},small:{id:smallId}} = this.photo;
      let bigPath = this.$store.getters.getFileNameById(bigId);
      let smallPath = this.$store.getters.getFileNameById(smallId);
      return smallPath||bigPath?true:false;
    },
    imgpathBig(){
    if(Object.keys(this.photo).length === 0) {return false;}
    let {big:{id}} = this.photo;
    let path = this.$store.getters.getFileNameById(id),
        setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
    return `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}${setPort}/${process.env.PROFILE_PHOTOS}/${path}`;

    },
    imgpathSmall(){
      if(Object.keys(this.photo).length === 0) {return false;}
      let {small:{id}} = this.photo;
      let path = this.$store.getters.getFileNameById(id),
        setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
    return `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}${setPort}/${process.env.PROFILE_PHOTOS}/${path}`;

    }

  },
    mounted(){
      /*
      if(typeof(this.photo)==='object'){
        if(Object.keys(this.photo).length>0)
        {
          let {big:{local:{path:bigPath}},small:{local:{path:smallPath}}} = this.photo;
          if (!bigPath || !smallPath){
            this.$store.dispatch('downloadFile',{chatid:this.chatid,photo:this.photo})
          }
        }
      }
      */
    }

}
</script>
<style lang="scss">
@import '~@/_variables.scss';



.chatBoxImagePlaceholder{

  min-width: $chatboxWidth*$chatBoxInfoImageFlexBasis;
  min-height: $chatboxWidth*$chatBoxInfoImageFlexBasis;
  position:relative;
}
.chatbox__info__image{
  display: flex;
  width:100%;
  /*  @media screen and (max-width: $break-small) {
      display: block;
      width:100%;
    }*/
    & picture{
      //flex: 0 0 50%;
      //background-color: $coperColor;
      min-width: $chatboxWidth*$chatBoxInfoImageFlexBasis;
      min-height: $chatboxWidth*$chatBoxInfoImageFlexBasis;
      display: block;
      position: relative;
    }
}
.chatbox__info__image-big{
  display: none;
  /*@media screen and (min-width: $break-small+1px) {
    display: block;
    width:100%;
  }*/
}




.chatBoxImageAcronym{
    border: $boxFoldingPadding solid $railEdgeColor;
  display: flex;

  background-color: $gapBetweenSkewBordersColor;
  color: $railEdgeColor;
  background-clip: padding-box;
  font-weight: bold;
  text-transform: uppercase;
}
.chatBoxImageAcronym::after{
  content: '';
  display: block;
  position: absolute;
  border: $boxFoldingPadding/2 solid $railEdgeColor;
  width: 76%;
  height: 76%;
  top: 12%;
  left: 12%;
}
.acronym{
  margin:auto;
  transform: scale(1.4);
}
</style>
