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


    displayOnlyClickedChatBox({state = 0, chatBoxNum = 1}){
      let styles = [`.chatBoxItem:not(:nth-child(${chatBoxNum})){visibility: hidden;}`], sheetName = 'displayOnlyClickedChatBox';
      this.applyStyles({styles, state, sheetName});
    },
    displaySearchField({state = 0}){
      let styles = [`.searchFieldContainer {visibility: hidden;}`], sheetName = 'displaySearchField';
      this.applyStyles({styles, state, sheetName});
    },
    bordersTranslation({state = 0, chatBoxNum = 1}){
      let styles = [`.chatBoxItem:nth-child(${chatBoxNum}) .chatBoxItem__main .border:first-child{animation: translation-top-right 15s linear 1;}`,
                    `.chatBoxItem:nth-child(${chatBoxNum}) .chatBoxItem__main .border:last-child{animation: translation-bottom-left 15s linear 1;}`], sheetName = 'bordersTranslation';
      this.applyStyles({styles, state, sheetName});
    },

    timer(ms){
      return new Promise(res => setTimeout(res, ms));
    },
    async clickAnimation({state,time,chatBoxNum,msgElementId, reverse = false}){

      let rules = [
            this.displaySearchField,
            this.displayOnlyClickedChatBox,
            //this.bordersTranslation,

        //this.displayMessageMediaBackground,
            //this.displayMsgMediaFrame,
        //this.displayMessageTrotters,
        //this.displayMessageSideBorders,
            //this.displayCentralRail

      ];
      for (let rule of reverse?rules.reverse():rules){

        await this.timer(time);
        rule({state, chatBoxNum, msgElementId});
      }
    }

  },
};
