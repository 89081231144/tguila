<template>
<div :class="['chatbox__info__title', 'animation-background-appear']"><strong
  :ref="'title-'+this.chatid"
   class="chatbox__info__title-text"
   :style ="{
     position:'relative',
     right: this.overflowScrollX+'px',
     bottom: this.overflowScrollY+'px',
     animation: 'overflow-scroll-x 2s cubic-bezier(0,.75,.44,1.11) infinite'
   }"
   >{{title}}</strong></div>
</template>
<script>
export default {
  props: ['title','chatid'],
  data(){
    return {
      //uName: this.username
      overflowScrollX: 0,
      overflowScrollY: 0
    }
  },
  methods:{
  overflow(){
    if (this.overflowScrollX > 0 || this.overflowScrollY > 0)
    {
      return {
        position:'relative',
        right: this.overflowScrollX+'px',
        bottom: this.overflowScrollY+'px',
        animation: 'overflow-scroll-x 2s cubic-bezier(0,.75,.44,1.11) infinite'
      }
    }
  }
  },
  mounted(){
    let clientWidth = this.$refs[`title-${this.chatid}`].parentNode.clientWidth;
    let scrollWidth = this.$refs[`title-${this.chatid}`].scrollWidth;

    let clientHeight = this.$refs[`title-${this.chatid}`].parentNode.clientHeight;
    let scrollHeight = this.$refs[`title-${this.chatid}`].clientHeight;

    if(scrollWidth > clientWidth) {this.overflowScrollX = scrollWidth - clientWidth;}
    if(scrollHeight > clientHeight) {this.overflowScrollY = scrollHeight - clientHeight;}
    //console.log(`${scrollWidth}-${clientWidth}`)
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatbox__info__title-text{
  margin:auto;
  display:block;
  //width:100%;
  text-align: center;
}
</style>
