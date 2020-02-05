export default {
  methods: {
    createOrReturnStyleElement(id){
      let element = document.getElementById(id);
      if(!element){
        element = document.createElement('style');
        element.id = id;
        element.type = "text/css";
        document.head.appendChild(element);
        element.disabled = true;
      }
      return element;
    },
    insertStyles({element,styles = []}){
      //let element = document.getElementById(elementId), sheet;
      styles.forEach((s) => {
        element.sheet.insertRule(s);
      });
      return element;
    },
    applyStyles({styles = [],state, sheetName}){
      let element = this.createOrReturnStyleElement(sheetName);
      element.style.length?null:this.insertStyles({element, styles});
      state?element.remove():element.disabled = false;
    },
    stopBodyScroll({state}){
      let styles = ['body {max-height: 100%; overflow-y: hidden;}'], sheetName = 'stopBodyScroll';
      this.applyStyles({styles, state, sheetName});
    },
     displayCentralRail({state}){
          let styles = ['#app .chatBoxRail {visibility: hidden;}'], sheetName = 'displayCentralRail';
          this.applyStyles({styles, state, sheetName});
        },
    displayOnlyClickedMessage({state = 0, msgNum = 0}){
      let styles = [`#viewSpace:not(:nth-child(${msgNum + 1})){visibility: hidden;} `], sheetName = 'displayOnlyClickedMessage';
      this.applyStyles({styles, state, sheetName});
    },
    displayMessageSideBorders({state = 0, msgNum = 0}){
      let styles = [`#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(odd) {visibility: hidden;}`], sheetName = 'displayMessageSideBorders';
      this.applyStyles({styles, state, sheetName});
    },
    displayMessageCaptionText({state = 0, msgNum = 0}){
      let styles = [`#viewSpace:nth-child(${msgNum + 1}) #caption {color: transparent;}`], sheetName = 'displayMessageCaptionText';
      this.applyStyles({styles, state, sheetName});
    },
    displayMessageTrotters({state = 0, msgNum = 0}){
      let styles = [`#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(even) > div:nth-child(odd) {visibility: hidden;}`], sheetName = 'displayMessageTrotters';
      this.applyStyles({styles, state, sheetName});
    },
    displayChatsContainer({state = 0, msgNum = 0}){
      let styles = [`#app #chatsContainer {visibility: hidden;}`], sheetName = 'displayChatsContainer';
      this.applyStyles({styles, state, sheetName});
    },
    displayChatViewControls({state = 0, msgNum = 0}){
      let styles = [`#app #chatViewControls {visibility: hidden;}`], sheetName = 'displayChatViewControls';
      this.applyStyles({styles, state, sheetName});
    },
    displayNotSelectedMsgMedia({state = 0, msgNum = 0, msgElementId = 0}){
      let styles = [`#viewSpace:nth-child(${msgNum + 1}) #media > div:not(:nth-child(${parseInt(msgElementId) + 1})){visibility: hidden;}`], sheetName = 'displayNotSelectedMsgMedia';
      this.applyStyles({styles, state, sheetName});
    },
    displayMsgMediaFrame({state = 0, msgNum = 0}){
      let styles = [`#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(even) > div:nth-child(even) {background: transparent;}`], sheetName = 'displayMsgMediaFrame';
      this.applyStyles({styles, state, sheetName});
    },
    displayMessageCaptionBackground({state = 0, msgNum = 0}){
      let styles = [`#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(even) > div:nth-child(even) > div:nth-child(even) {background: transparent;}`], sheetName = 'displayMessageCaptionBackground';
      this.applyStyles({styles, state, sheetName});
    },
    displayMessageMediaBackground({state = 0, msgNum = 0}){
      let styles =  [
                      `#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(even) > div:nth-child(even) > div:nth-child(even) {background: transparent;}`,
                      `#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(even) > div:nth-child(even) > div:nth-child(odd) {background: transparent;}`,
                      `#app div[class=chatView]:nth-child(${msgNum + 2}) > div:nth-child(even) > div:nth-child(even) {background: transparent;}`
                    ],
                   sheetName = 'displayMessageMediaBackground';
      this.applyStyles({styles, state, sheetName});
    },
    timer(ms){
      return new Promise(res => setTimeout(res, ms));
    },
    async clickAnimation({state,time,msgNum,msgElementId, reverse = false}){

      let rules = [
        this.stopBodyScroll,
        this.displayChatsContainer,
        this.displayChatViewControls,
        this.displayOnlyClickedMessage,
        this.displayMessageCaptionText,
        this.displayNotSelectedMsgMedia

            //this.displayMessageCaptionBackground,
        //this.displayMessageMediaBackground,
            //this.displayMsgMediaFrame,
        //this.displayMessageTrotters,
        //this.displayMessageSideBorders,
            //this.displayCentralRail

      ];
      for (let rule of reverse?rules.reverse():rules){

        await this.timer(time);
        //sheet.insertRule(rule);
        rule({state, msgNum, msgElementId});
      }
      //this.stopBodyScroll({state});
    }

  },
/*
  mounted(){
    for (let [key, value] of Object.entries(this.sheets)) {
      this.createStyleElement(value).disabled = true;
    }
  }
*/
};
