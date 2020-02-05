<template>
  <div class="chatsContainer">
    <pin :edges = "true" :depth = 3 :pressed="pressed" @click.native="pressed=true" >
      <div class="chatbox__info">
        <chatbox-title :title = currentChat.title :chatid = currentChat.chatid />
        <chat-image :photo = "currentChat.photo" :title="currentChat.title" />
        <chatbox-description :description = currentChat.description></chatbox-description>
        <div class="summary">
          <chatbox-username :username = currentChat.username :chatid = currentChat.chatid></chatbox-username>
          <chatbox-membercount :membercount = currentChat.memberCount></chatbox-membercount>
        </div>
      </div>
    </pin>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Pin from './Pin.vue';
import ChatboxImage from './placeholders/ChatboxImage.vue';
import ChatboxUsername from './placeholders/ChatboxUsername.vue';
import ChatboxTitle from './placeholders/ChatboxTitle.vue';
import ChatboxMembercount from './placeholders/ChatboxMembercount.vue';
import ChatboxDescription from './placeholders/ChatboxDescription.vue';
export default {
  data(){
    return {
      pressed: false,
    }
  },
  computed: {
    ...mapGetters(['getChatsState','getChatById','getChatIdByUserName']),
    currentChat() {
      //return  Object.assign(this.$store.getters.getChatsSortedKeys({order:'asc'}),this.getChatsState);
      //console.log(this.getChatById(this.getChatIdByUserName(this.$route.params.username)))

      let info = this.getChatById(this.getChatIdByUserName(this.$route.params.username)); //роута еще нет
      return info;
    },
  },
  components:{
//    'chat-photo': photo,
    'chat-image': ChatboxImage,
    'chatbox-username': ChatboxUsername,
    'chatbox-title':ChatboxTitle,
    'chatbox-membercount':ChatboxMembercount,
    'chatbox-description':ChatboxDescription,
    'pin': Pin,
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
  .chatsContainer{
    display: none;
    pointer-events: none;
    margin-top: 2*$leftButtonHeight;
    .pin{
      max-width: calc(5*#{$leftButtonWidth});
      margin-left: auto;
    }

    .chatbox__info{
        &__image{
          flex: unset;
          display: block;
        }
        &__description{
          flex: unset;
          display: unset;
          color: unset;
          margin: unset;
          height: unset;
        }
        .summary{
          .chatbox__info__username, .chatbox__info__membercount{
            height: unset;
            display: unset;
            overflow: unset;
        }
      }
    }

    .chatbox__info__title,
    .chatbox__info__description,
    .summary
    {
      display: none;
    }

    @media #{$screen $chatViewSidePins-510px}{
      position: fixed;
      //height: calc(100vh - #{$chatViewSpacing*2});
      //width: calc(100% - #{$chatViewWidth + $leftButtonWidth});
      width: calc((100% - #{$chatViewWidth})/2);
      display: block;
      //left: 0;
      //min-height: $leftButtonHeight;

        display: flex;
        flex-direction: column;
        //flex: 1;
        .chatbox__info{
          picture {
            //width: 30%;
            min-width: $leftButtonHeight;
            min-height: $leftButtonHeight;
          }
        }
        .pin{
          &__mounting{
                  >#bottomLayer{
                    top: unset;
                    bottom: unset;
                    left: unset;
                    right: unset;
                  }
                    > #topLayer, > #bottomLayer{
                      &::after{
                        content: unset;
                      }
                      &::before{
                        content: unset;
                      }
                  }
                }
        }
    }
    @media #{$screen $chatView-600px}{
      .chatbox__info{

        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        &__image{
          max-width: $chatPictureMaxWidth;
        }
        &__title{
          flex: 1 0 100%;
          display: block;
          position: relative;
          //background-color: $coperColor;
          color: $railMainSideColor;
          padding: $pinEdgeGradient;
          background-clip: content-box;
        }
        .summary{

          display: flex;
          flex: 1;
          //flex-direction: row;
          flex-wrap: wrap;
          .chatbox__info__username, .chatbox__info__membercount{

            position: relative;
            flex: 1;
            //background-color: $coperColor;
            color: $railMainSideColor;
            padding: $pinEdgeGradient;
            background-clip: content-box;
          }
        }
      }

    }


    @media #{$screen $chatView-1080px}{

      .chatbox__info{
          .chatbox__info__description{
            width: calc(100% - 90px);
            display: block;
            position: relative;
            //background-color: $coperColor;
            color: $railMainSideColor;
            padding: $pinEdgeGradient;
            background-clip: content-box;
            overflow: hidden;
          }
      }
      .pin{
        margin-right: $leftButtonWidth;
      }

    }

  }
</style>
