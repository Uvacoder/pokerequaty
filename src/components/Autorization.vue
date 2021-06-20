<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog" >
      <div class="modal" ref="Modal">
        <header class="modal-header">
          
            <h2 style="margin-left:auto;margin-right:auto">
              Авторизация
            </h2>
     
        </header>

        <div class="modal-body" >
         <input class="login" type="text" placeholder="Адрес электронной почты" v-model="email">
         <span v-show="incorEm>0" class="bad-data">Такого пользователя не существует</span>
         <input class="password" type="password" placeholder="Пароль" v-model="password">
         <span v-show="incorPas>0" class="bad-data">Неверный пароль</span>
         <button class="enter" @click="logIn">Вход</button>
        </div>
        
        <button class="register" @click="registration">Регистрация</button>

        <footer class="modal-footer" >
          
            <button type="button" class="btn btn-green" @click="close" aria-label="Close">
              Закрыть
            </button>
          
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
props:['incorrectData'],
data(){
  return {
    email:'',
    password:'',
    incorEm:0,
    incorPas:0,
    games:[],
  }
},
methods:{
    close() {
        this.$emit('close');
    },
    registration() {
        this.$emit('open-register');
    },
    logIn(){
      this.incorEm=0;
      this.incorPas=0;
      let data={
        password:this.password,
        email:this.email,
      }
      
      //let pass=this.password;
     // let email=this.email;
    //  this.$emit('log-in',[this.email,this.password]);
     // this.incorEm=this.incorrectData[0];
     // this.incorPas=this.incorrectData[1];

      this.$http({
          method: 'POST',
          url:'http://localhost:3000/login/', 
          data: data, 
          headers:{'Content-Type':'application/json; charset=utf-8'}
        })
      .then(response => {
          
          sessionStorage.token=response.data.token;
          console.log('auth token '+ localStorage.token);
          //document.cookie=response.data.cookie;
          this.games=response.data.games;
          const ID=response.data.message;
          this.$emit('log-in',[ID,this.games]);
          this.incorEm=false;
          this.incorPas=false;
          
      })
      .catch(err =>{
        if (err.response.status==404) {
            this.incorEm=true;
        } else if (err.response.status==401) {
          this.incorPas=true;
        } 
      })

     
      
    }
},

computed:{
  submitEnter(){
    console.log(1);
    return this.password!=='' && this.email!==''
  }
},

}
</script>

<style>

.bad-data {
  color:red;
  font-size: 12px;
}
.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.01);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width:400px;
  min-height: 350px;
  
  background: #ffffff;
  box-shadow: 2px 2px 20px 2px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  
}
    
.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  max-height: 70px;
  
  
}

.login,
.password {
    font-size: 20px;
    width: 80%;
    height: 50px;
    border-radius: 5px;
    border:1px solid gainsboro;
    padding-left: 10px;
}
.password {
     margin-top: 20px;
}



.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: royalblue;
  justify-content: space-between;
  
}

.register {
    width:80%;
    height: 40px;
    background: rgb(33, 202, 75);
    color:white;
    font-size: 17px;
    margin:10px auto;
    border-radius: 5px;
    border:1px solid transparent;
}

.register:hover {
    background: rgb(36, 160, 67);
    
}

.modal-footer {
  align-items: flex-end;
  border-top: 1px solid #eeeeee;
  justify-content: center;
}

.modal-body {
  position: relative;
  min-height: 150px;
  padding: 20px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
  
}

.enter {
    width:84%;
    height:40px;
    background: royalblue;
    color:white;
    border:1px solid royalblue;
    border-radius: 5px;
     margin-top: 20px;
     font-size: 18px;
}

.enter:hover{
    background: rgb(40, 82, 206);
    cursor: pointer;
    border:1px solid  rgb(55, 98, 224);
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: royalblue;
  background: transparent;
}


.btn {
   background: white;
  color: royalblue;
  border: 2px solid royalblue;
  border-radius: 4px;
  
}

.btn:hover {
color: white;
  background: royalblue;
   
}


.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.05s ease;
}

</style>