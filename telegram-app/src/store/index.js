import Vue from 'vue';
import Vuex from 'vuex';
import channel from './modules/channel';
import message from './modules/message';
import service from './modules/service';

Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    modules: {
      channel,
      message,
      service
    }
  });
}
