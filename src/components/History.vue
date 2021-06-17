<template>
  <div style="text-align:center">
      <h2>История анализа </h2>
      <div v-if="ID<0" class="analize-history">
      <p>Для просмотра истории необходимо  <a @click="autoOn" >войти</a>
      </p>
      </div>
    <div v-if="ID>-1">
        
        <div  class="history-list" v-for="(game,index) in games" :key="index"> {{game.handCards}} </div>
      </div>
  </div>
</template>

<script>
export default {
    methods :{
        autoOn(){
            this.$emit('turnOnAuto');
        }
    },
    props:{
        ID:Number,
        counter:Number,
    },
    data(){
        return {
            games:[],
        }
    },
    
    watch:{ 
        counter(){
            const users=this.$store.getters.GET_USERS;
            this.games=users[this.ID].games.slice();
            console.log(this.games);
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

