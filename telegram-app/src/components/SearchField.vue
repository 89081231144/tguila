<template>
<div class="searchFieldContainer">
  <chatboxrail-left/>
  <xyz-border/>
  <mount-point>
<!--<form class="searchField" @submit="formSubmit">-->
  <form class="searchField">

<input type="text" @input="onInputChange($event)" class="searchField__input" >
<div class="searchField__button"@click="onInputChange($event)" >
  <button-box><search-button></search-button></button-box>
</div>
<!--<input type="button" @click = "formSubmit">-->
</form>
</mount-point>
<xyz-border/>
</div>

</template>
<script>
//import router from '../js/router';
import { mapGetters } from 'vuex';
import ButtonBox from './ButtonBox.vue';
import SearchButton from './SearchButton.vue';
import MountPoint from './MountPoint.vue';
import directionsMixin from '../mixins/directions-mixin';
import ChatBoxRailLeft from './ChatBoxRailLeft.vue';
import XyzBorder from './XyzBorder.vue';

export default {
  mixins: [directionsMixin],
  data() {
    return {
      minQueryLength: Number(process.env.TELEGRAM_USERNAME_MIN_LENGTH),
      maxQueryLength: 0,
      //directionNum: 1,
      //direction: {1: 'bottomRight',2:'bottomLeft',3:'topLeft',4:'topRight' },
      //searchFieldQuery: ''
    }
  },
  computed:{
    ...mapGetters(['getChatsVisiblityState']),
  },
  components:{MountPoint,
  'chatboxrail-left': ChatBoxRailLeft,
  'button-box': ButtonBox,
  'search-button': SearchButton,
  'xyz-border': XyzBorder
},
  methods: {
    click(){
    //router.push({ name: 'test', params: {testid: '1223'}});
    //console.log(serverData);
    this.serverData = '';
    },
    formSubmit(){
    //router.push({ name: 'find', params: {t_username: this.searchField}});

  },
  onInputChange(event) {

        let input = event.target.value.replace(new RegExp(process.env.TELEGRAM_REGULAR_SEARCH_MATCH_PATTERN,'g'),''); // /[^a-zA-Z0-9_]/g
        let queryStringByUsername =  input.replace(new RegExp(process.env.TELEGRAM_USERNAME_SEARCH_MATCH_PATTERN,'g'),'');
        //console.log(queryStringByUsername)
        event.target.value = input;
        if(input.length>=this.minQueryLength){

          Promise.all([
            this.$store.dispatch('setSearchStatus',true),
            this.$store.dispatch('searchPublicChats', input),
            (queryStringByUsername.length>=this.minQueryLength)?this.$store.dispatch('searchChatByUserName', queryStringByUsername):null
          ]).then((res,rej)=>{
            this.$store.dispatch('setSearchStatus',false);
            this.$store.commit('DISPLAY_CHANNELS',this.getChatsVisiblityState(input))
          });
        }else{
          this.$store.commit('DISPLAY_CHANNELS',this.getChatsVisiblityState(input))
        }

    }
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
.searchFieldContainer{
  //display: inline-block;
  position: relative;
  //width: 100%;
  //height: 3em;
  margin-top:$skewBorderHeight;
}
.searchField{
  //font: inherit;
  display:flex;
  position:relative;
  //width: $chatboxWidth;
  align-items: stretch;
  //font-size: 2em;
  height: $searchFieldHeight;
  width: 80%;
  margin: auto;
}
.searchField__input{
  font:inherit;
  position:relative;
  border: $gapBetweenLayers/2 solid $railEdgeColor;
  background-color: transparent;
flex: 1 1 60%;
//  border: 0;
  //margin: $gapBetweenLayers;
  //padding: $gapBetweenLayers;
  //display:inline-block;
  border-radius: $gapBetweenLayers/2;
}

.searchField__button{
  //flex: 1 1 40%;
}



</style>
