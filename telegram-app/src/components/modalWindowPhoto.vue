<template>
  <img :src="photosPath + getFileNameById(photoSizes(photo)[Object.keys(photoSizes(photo)).pop()])">
</template>
<script>
import photosMixin from '../mixins/photos-mixin'
export default {
  mixins: [photosMixin],
  props: ['photo'],//[{"sizes":[{"type": "s","photo": {"id": 1675}},{"type": "m","photo": {"id": 1676}}]},{....}]
}
</script>
