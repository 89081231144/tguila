<template>
  <div class="messageTimeStamp">
    <div :class="((messageMondayDaysCount + weekDays.indexOf(n)) >= toThisDayUnixDaysCount)?'restOfWeek':{}" v-for="(n) in weekDays">
      <span :title="new Date(unixTimeProp).toLocaleDateString('en-US', options)" >
        {{(unixTimeProp.getDay() === n)?printPropTime:null}}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['unixTime'],
  data(){
    return {
      weekDays: [1,2,3,4,5,6,0],//mon-sun
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    }
  },
  computed: {
    messageMondayDaysCount(){
      let messageDate = new Date(this.unixTime*1000),
          messageDateDaysCount = Math.trunc(this.unixTime/86400),
          messageMonday = messageDateDaysCount - this.weekDays.indexOf(messageDate.getDay());
        return messageMonday;
    },
    unixTimeProp(){
      return new Date(this.unixTime*1000);
    },
    toThisDayUnixDaysCount(){
      return Math.trunc((Date.now()/1000)/86400);
    },
    printPropTime(){
      let hours = this.getTwoDigitDateFormat(this.unixTimeProp.getHours()),
          minutes = this.getTwoDigitDateFormat(this.unixTimeProp.getMinutes());
      return `${hours}:${minutes}`;
    }
  },
  methods: {
  getTwoDigitDateFormat(monthOrDate){
    return (monthOrDate < 10) ? '0' + monthOrDate : '' + monthOrDate;
  }
  }
}
</script>
<style lang="scss">
@import '~@/_variables.scss';
$daysMargins: $buttonBoxSlotBorder;
.messageTimeStamp{
  display: flex;
  width: 100%;
  color: $railMainSideColor;
  > div {
    animation: $animation-background-haze-once;
    flex: 1 1 14%;
    background-color: $coperColor;
    margin: 0 $daysMargins 0 0;
    text-align: center;
    &:last-of-type {
      margin: 0;
    }
  }
  .restOfWeek{
    background: unset;
    border: $daysMargins solid $coperColor;
    color: $coperColor;
  }


}
</style>
