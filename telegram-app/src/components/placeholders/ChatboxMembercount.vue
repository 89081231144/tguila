<template>
<div :class="['chatbox__info__membercount', 'animation-background-appear']"><div class="chatbox__info__membercount-text">{{membercount?membercount.toLocaleString():membercount}}</div></div>
</template>
<script>
export default {
  props: ['membercount']
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatbox__info__membercount-text{
  margin:auto;
  //width:100%;
  display:block;
  //overflow:scroll;
  text-align: center;
}
</style>
