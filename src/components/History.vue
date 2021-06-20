<template>
  <div style="text-align:center">
      <h2>История анализа </h2>
      <div v-if="ID==''" class="analize-history">
      <p>Для просмотра истории необходимо  <a @click="autoOn" >войти</a>
      </p>
      </div>
    <div v-if="ID!=''" class="analize-history">
        
        <div  class="history-list" v-for="(game,index) in games" :key="index"  @click="setGame(index)"> 
                <div class="history-el">
                <div class="game-date">Дата: {{game.date}}</div>
                <div class="players-count">Игроки: {{game.players.length}}</div>
                <div class="position">Позиция: {{game.position}}</div>
                <div class="hand-cards">Рука: {{game.handCards}}</div>
                </div>
                <button  class="delete-game" @click="deleteGame(index)">X</button>
        </div>
    </div>
      
     
  </div>
</template>

<script>
export default {
    methods :{
        autoOn(){
            this.$emit('turnOnAuto');
        },
        setGame(index){
            
            this.$emit('setGame',index);
        },
        deleteGame(number){
            this.$emit('delete-game',number);
        }
    },
    props:["ID","counter","games"],
    data(){
        return {
            userGames:[],
        }
    },
    
    watch:{ 
        counter(){
            if (this.ID!=-1) {
              console.log('ok');
            }     
            
        }
    }
    
}
</script>

<style scoped>

    .delete-game{
        height:30px;
        width: 30px;
        text-align: center;
        margin-left:5px;
        background: transparent;
        border:1px solid red;
        color:red;
        border-radius: 5px;
    }

    .delete-game:hover {
        color:white;    
        background: red;
    }

    .analize-history {
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-wrap: wrap;
        
    }

    .history-list {
        display:flex;
        justify-content: center;
        align-items: center;
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
    .history-el {
        display:flex;
        flex-wrap: wrap;
        width: 75%;
        margin-top:10px;
        justify-content: center;
        background: rgb(255, 254, 254);
        border: 1px solid #e0dfdf;
    }

    .history-el:hover {
        cursor: pointer;
        background: #eeeeee;
        box-shadow: 1px 1px 5px 1px;
    }

    .game-date,
    .players-count,
    .position,
    .hand-cards {
       
        margin:5px;
    }
   
</style>

