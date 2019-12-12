import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

    state: {
        user: '',
        token: ''
    },

    mutations: {
        login: function (state,response){
            state.user = response.data.user;
            state.token = response.data.token;
            localStorage.setItem('user',response.data.user);
            localStorage.setItem('token',response.data.token);
        }
    },

    actions: {

    }




});


export default store