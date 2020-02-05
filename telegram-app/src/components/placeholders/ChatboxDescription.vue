<template>
<!-- <div :class="['chatbox__info__description',`chatbox__info--${description?'once':'loading'}-animation`,'animation-background-appear']"> -->
<div :class="['chatbox__info__description','animation-background-appear']">

  <!--<div class="chatbox__info__description-text">{{description}}</div>-->
  <div class="chatbox__info__description-text" v-html="description"></div>
</div>
</template>
<script>
export default {
  props: ['description']
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.chatbox__info__description-text{
  margin:auto;
  display:block;
  text-align: start;
  padding: $buttonBoxSlotBorder;
  //animation: $animation-background-haze-once;
  //width:100%;
  a {
    @include anchor-tag;
    }
}
</style>
