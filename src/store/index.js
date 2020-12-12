//Encrypt point for vuex

import Vue from 'vue';
import Vuex from 'vuex';
import todos from './modules/todo';

//Load vuex 
Vue.use(Vuex);

//Create store 
export default new Vuex.Store({
    modules:{
        todos
    }
})