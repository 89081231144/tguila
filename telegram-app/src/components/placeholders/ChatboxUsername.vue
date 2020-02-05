<template>
<div
:class="['chatbox__info__username', 'animation-background-appear']">
  <div :ref="'username-'+this.chatid" class="chatbox__info__username-text"
  :style ="{
    position:'relative',
    right:this.overflowScrollX+'px',
    animation: 'overflow-scroll-x 2s cubic-bezier(0,.75,.44,1.11) infinite'
  }"
  >{{username}}</div>
</div>
</template>
<script>
export default {
  props: ['username','chatid'],
  data(){
    return {
      //uName: this.username
      overflowScrollX: 0
    }
  },
  computed:{
    //text(){return this.$refs.usernameText.clientWidth}
  },
  mounted(){
  //console.log(this.$refs.dolboebtv)
  //console.log(`${this.username} - ${this.$refs[this.username].scrollWidth}`)
  },
  updated(){
    //console.log(`${this.$refs.chatboxText.clientWidth} - ${this.$refs.usernameText.clientWidth}`)
    //console.log(this.$refs.scrollText.scrollWidth)
    //this.$refs.scrollText.scrollRight=-300;
    //this.$refs.usernameText.scrollRight = this.$refs.usernameText.clientWidth;

    //console.log(`${this.username} - displayWidth:${this.$refs[this.username].clientWidth}, scrollWidth:${this.$refs[this.username].scrollWidth}`)
    let clientWidth = this.$refs[`username-${this.chatid}`].parentNode.clientWidth;
    let scrollWidth = this.$refs[`username-${this.chatid}`].scrollWidth;
    if(scrollWidth > clientWidth) {this.overflowScrollX = scrollWidth - clientWidth;}
    //console.log(this.overflowScrollX)
  },
  watch: {
      username() {
      //console.log(`${this.$refs.chatboxText.clientWidth} - ${this.$refs.usernameText.clientWidth}`)
      //console.log(this.username)
      //console.log(this.$refs)
      //console.log(`${this.username} - displayWidth:${this.$refs[this.chatid].clientWidth}, scrollWidth:${this.$refs[this.chatid].scrollWidth}`)

    }
  }

}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatbox__info__username-text{
  margin:auto;
  //width:100%;
  display:block;
  //overflow:scroll;
  text-align: center;
}

</style>
