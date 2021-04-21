<template>
    <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog" >
      <div class="modal" ref="Modal">
        <header class="modal-header">
          
            <h2>
              Potintial combinations
            </h2>

            <button type="button" class="btn-close btn-right" @click="close" aria-label="Close modal">
              x
            </button>
        
        </header>
        
        <div class="modal-body" >
          <div class="combimation" v-for="(comb,index) in combs" :key=index>{{comb}}</div>
        </div>
        
        

        <footer class="modal-footer" >
          
            <button type="button" class="btn btn-green" @click="close" aria-label="Close modal">
              Close me!
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
      ['combs']
    ,

    methods:{
        close() {
            this.$emit('close');
        },
    }
    
}
</script>

<style scoped>

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
  min-height: 200px;
  max-height: 5м00px;
  background: #ffffff;
  box-shadow: 2px 2px 20px 2px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
    
.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
  
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  align-items: flex-end;
  border-top: 1px solid #eeeeee;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
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

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.45s ease;
}

</style>