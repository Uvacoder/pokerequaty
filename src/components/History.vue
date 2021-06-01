<template>
  <div class="analize-history">
      <h2>История анализа</h2>
      <p>Для просмотра истории необходимо  <a @click="autoOn" >войти</a>
      </p>
  </div>
</template>

<script>
export default {
    methods :{
        autoOn(){
            this.$emit('turnOnAuto');
        }
    }
}
</script>

<style scoped>
    .analize-history {
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    h2 {
        margin-left: auto;
        margin-right: auto;
        color: rgb(39, 80, 201);
    }
    p {
        align-self: center;
        font-size: 20px;
        margin-left: 30px;
        
    }
    a:hover {
        cursor: pointer;
        color: royalblue;
    }
   
</style>

