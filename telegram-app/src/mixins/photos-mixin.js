import { mapGetters } from 'vuex';
export default {
  computed: {
    photosPath(){
      let setPort = process.env.APP_SERVER_PORT?`:${process.env.APP_SERVER_PORT}`:'';
      return `${process.env.APP_SERVER_PROTOCOL}://${process.env.APP_SERVER_ADDRESS}${setPort}/${process.env.PHOTOS}/`

    },
    ...mapGetters(['getFileNameById']),
  },
  methods: {
    photoSizes({sizes}){ //{"sizes":[{"type": "s","photo": {"id": 1675}},{"type": "m","photo": {"id": 1676}}]}
      let pSizes = {};
      sizes = sizes.forEach(({type,photo:{id}})=>{
        Object.assign(pSizes,{[type]:id});
      });
      return pSizes;//{s: 438, m: 429}
    }
  }
}
