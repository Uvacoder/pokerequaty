import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex);

export default {
    state:{
        status: '',
        token: localStorage.getItem('token') || '',
        users :[{
            email:'123',
            password:'123',
            games:[],
        }]
    },
    getters:{ 
        GET_STATUS: state => state.status,
        GET_USERS: state=> state.users,
    },
    mutations:{
        ADD_USER(state,value){
            state.users.push({email:value.email,password:value.password});
        },
        ADD_GAME(state,data){
            //data[0]-id, data[1]-gameinfo
            state.users[data[0]].games.push(data[1])
        }
    },
    actions :{ 
        async REGISTER (context,data){
            //const password=data.password;
            const email=data.email;
            const users=context.getters.GET_USERS;
            if (users.indexOf(email)!=-1 ){
                context.commit('ADD_USER',data);
            } 
        },     
        LOGIN(context,data){
            const users=context.getters.GET_USERS;
            const password=data[1];
            const email=data[0];
            //console.log(email+' '+password)
            if (users.indexOf(email)!=-1 ){
                let i=users.indexOf(email);
                if (users[i].password==password) {
                    return "ok";
                }
            }  
            
        }

    }
}

