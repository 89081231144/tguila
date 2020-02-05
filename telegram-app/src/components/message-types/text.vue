<template>
  <div class="messageCaption" v-html="typeof this.text === 'object'?Array.from(this.text).join(''):this.text"></div>
</template>
<script>
export default {
  props: ['text'] //["caption from photo1","caption from photo2",..]
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.messageCaption{
  position: relative;
  padding: $buttonBoxSlotBorder;
  background-color: $gapBetweenSkewBordersColor;
  //min-height: calc(#{$buttonBoxSlotBorder*5} + 1em);
  min-height: $messageCaptionMinHeight;

    white-space: pre-wrap;
    color: $railMainSideColor;
    a {
      @include anchor-tag;
      }

      animation: $animation-background-haze-once;
}
</style>
