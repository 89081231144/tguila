<template>
  <div>
    <msg-video v-if="Object.keys(this.video).length > 0" class="chatViewContent__message__messageVideo__video" :msgVideo = "this.video" />
    <htmled-text v-if="this.caption" :text="this.caption" class="chatViewContent__message__messageVideo__caption" />

  </div>
</template>
<script>
import video from './video.vue';
import text from './text.vue';
export default {
  props: ['caption', 'video'],
  components: {
    'msg-video':video,
    'htmled-text':text
  }
}
</script>
