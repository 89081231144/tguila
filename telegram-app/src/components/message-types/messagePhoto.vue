<template>
  <div>
  <!--  <div v-if="this.text" v-html="this.text" class="chatViewContent__message__messageText__text"></div> -->
    <photo v-if="Object.keys(this.photo).length > 0" class="chatViewContent__message__messagePhoto__photo" :photo = "this.photo" />
    <htmled-text v-if="this.caption" :text="this.caption" class="chatViewContent__message__messagePhoto__caption" />

  </div>
</template>
<script>
import photo from './photo.vue';
import text from './text.vue';
export default {
  props: ['caption', 'photo'],
  components: {
    'photo':photo,
    'htmled-text':text
  },

}
</script>
