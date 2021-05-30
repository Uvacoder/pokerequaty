<template>
    <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog" >
      <div class="modal" ref="Modal">
        <header class="modal-header">
          
            <h2>
              Статистика
            </h2>

            <button type="button" class="btn-close btn-right" @click="close" aria-label="Close modal">
              x
            </button>
        
        </header>
        
       
        
        <div class="modal-body" >
          <span class="hero-label"> Шанс на усиление</span>
            <span class="enemy-label">Kомбинации соперника</span> 
          <div class="enemy-combs">
            
            <div class="enemy-lower" v-for="(elcom,index) in enemyLower" :key="index"> 
              <span>{{elcom.name}}: {{elcom.percent}}</span>
            </div>
            <div v-if="enemyEqual" class="enemy-equal">
              <span>{{enemyEqual.name }}: {{enemyEqual.percent}} %</span>
            </div>
            <div class="enemy-stronger" style="display:flex;justify-content:center" v-for="(escom,index) in enemyStronger" :key="index"> 
              <span>{{escom.name}}: {{escom.percent}} %</span>
            </div>
          </div>
          <div class="hero-draws">
            <div v-for="(draw,index) in heroDraws" :key="index" style="display:flex;justify-content:center">
              <span>{{draw.name}}: {{draw.percent}} %</span>
            </div>
          </div>
          
        </div>
        
        <div v-if="bankChances>0" class="bank">
          <div class="bank-chances">
            <span class="chances">Шансы банка</span>
            <span  >{{bankChances}} %</span>

          </div>

          <div class="equaty">
          <span class="chances">Ожидаемая прибыль</span>
          <span v-if="bankChances>maxPercent" style="color:red">{{bankChances-maxPercent}}</span>
          <span v-if="bankChances<=maxPercent" style="color:#4aae9b">{{maxPercent-bankChances}}</span>
          </div>
        </div>


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
    name: 'ModalResults',
    props:
      ['enemyStronger','enemyLower','enemyEqual','heroComb','heroDraws','maxPercent','bankChances']
    ,

    methods:{
        close() {
            this.$emit('close');
        },
    }
    
}
</script>

<style scoped>

.bank {
  display:flex;
  justify-content: space-around;
  border-top: 1px solid #eeeeee;
  min-height: 50px;
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
  min-height: 300px;
  max-height: 600px;
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
  
}

.enemy-lower{
  color:rgb(12, 182, 12);
}

.enemy-stronger {
  color:rgb(247, 67, 67);
}

.enemy-equal {
  color:rgb(145, 145, 38);
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
  
}

.enemy-combs,
.hero-draws {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-draws {
  grid-column-start: 1;
  grid-row-start: 3;
  border-right: 1px solid #eeeeee;
  font-size: 17px;
  font-weight: 600;
  color: #319785;
  
}

.enemy-combs {
  grid-column-start: 2;
  grid-row-start: 3;
  
  
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
  display: grid;
  grid-template-columns: 50% 50%  ;
  grid-template-rows: 15% 15% 70%;
  
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
  
}

.hero-label {
  grid-column-start: 1;
  grid-row-start: 2;
}

.enemy-label {
  grid-column-start: 2;
  grid-row-start: 2;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0.1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.45s ease;
}




</style>