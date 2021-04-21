import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default({
    state:{
        diapasonList:['AA','KK','QQ']
    },
    getters:{
        GET_DIAPASON(state){
            return state.diapasonList;
        }
    },
    mutations:{
        SET_DIAPASON(state,arr){
           state.diapasonList=arr; 
        }
    },
    actions:{
        UPDATE_DIAPASON(context,arr){
            context.commit('SET_DIAPASON',arr);
        }
    }

})