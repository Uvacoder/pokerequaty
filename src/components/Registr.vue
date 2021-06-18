<template>
  <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal">
        <header class="modal-header">         
            <h2 style="margin-left:auto;margin-right:auto">
              Регистрация
            </h2>
        </header>

        <div class="modal-body">
            <input required  class="login" type="text" placeholder="Адрес электронной почты"  v-model="email">
            <input required class="password" type="password" placeholder="Пароль" v-model="password">
            <input required class="password" :class="{danger:isDanger}" type="password" placeholder="Подтвердите пароль" v-model="confirmPassword">
            
        </div>
        <button :disabled="isDanger" class="register" @click="registration">Зарегестрироваться</button>

        <footer class="modal-footer">
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
    methods:{
    close() {
        this.$emit('close');
    },
    registration(){
        let data={
        email:this.email,
        password:this.password,
        confirmPassword:this.confirmPassword,
        };
        
        
      
        this.$http.post('http://localhost:3000/register/',data)
          .then(response => {
          console.log(response.data)
      })
        //this.$store.dispatch('REGISTER',data)
    }
    },
    data(){
        return {
            email:'',
            password:'',
            confirmPassword:'',
            isDanger:false,
            
        }
    },
    watch:{
        confirmPassword(){
            this.password==this.confirmPassword ? this.isDanger=false : this.isDanger=true;
        }
    },
    computed:{
        submitRegistration(){
            return  (this.email==='' || this.password==='' || this.confirmPassword==='')        
    }
    }
    
    
}
</script>

<style>



.modal-backdrop {
    position:fixed;
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
  opacity: 0.1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.45s ease;
}



.danger {
    outline: none;
    border: 3px solid red;
}


</style>