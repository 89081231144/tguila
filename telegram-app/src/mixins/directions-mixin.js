export default {
  data() {
    return {
      //directionNum: 1,
      //directions: ['bottomRight','bottomLeft','topLeft','topRight'],
      //choice: 0
    }
  },
  computed:{
    //direction(){return this.directions[Math.floor(Math.random() * 3)]}
    direction(){
      //console.log(this.$store.getters.getDirection)
      return this.$store.getters.getDirection;
  }
}
};
