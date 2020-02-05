<template>
  <div>
  <!--  <div v-if="this.text" v-html="this.text" class="chatViewContent__message__messageText__text"></div> -->
    <htmled-text v-if="text" :text="text" class="chatViewContent__message__messageText__text" />
    <web-page v-if="Object.keys(webPage).length > 0" :webPage = "webPage" class="chatViewContent__message__messageText__webPage" />
  </div>
</template>
<script>
import webPage from './webPage.vue';
import text from './text.vue';
export default {
  props: ['text', 'webPage'],
  data(){
    return {

    }
  },
  components: {
    'web-page':webPage,
    'htmled-text':text
  }
}
</script>
