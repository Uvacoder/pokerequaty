<template>
<div class="all-conten" id="app">
  
  <header class="app-header" >
      
    <button v-if="ID<0" class="lk" @click="activeAutorization=true">
    
      <unicon name="user-circle" fill="white" ></unicon>
      <div style="font-size:15px;vertical-align:center"> Авторизация</div>
    
     </button>
     
     <button v-if="ID>=0" class="lk" @click="logOut">
      
      <unicon name="user-circle" fill="white"  ></unicon>
      <div style="font-size:15px;vertical-align:center" > Выход</div>
      </button>
    </header>
  
  

  <div  class="main-content">
    
    <Diapason class="diap"  />
    <MainPlayer class="cards" />
   
    <Bets class="bets" :inputs="inputs" :positions="positions" :checks="checks"  @change-pos="ChangePosition"  />
    <Table class="table" @add-input="AddInput" @delete-input="DeleteInput" />

    
    

    <button class="clear" @click="ClearAll" >Очистить все</button>
    <button disabled class="find" @click="FindStat" >Расчет</button>
    
    <Autorization class="autorization" :incorrectData="incorrectData" v-if="activeAutorization"  @log-in="logIn"  @open-register="openRegister" @close="closeModal" />
    
    <Registr class="reg" v-if="activeRegister" @close="closeRegister" />
    <ModalResults class="results" v-if="activeModal" :enemyStronger="enemyStronger" :enemyLower="enemyLower"
     :enemyEqual="enemyEqual" :heroComb="heroComb" :heroDraws="heroDraws" :ID="ID" @close="closeModal" :bankChances="bankChances" :maxPercent="maxPercent" />
  </div>
  <History :counter="counter" :ID="ID" @turnOnAuto="turningOnAvto" @setGame="setHistoryGame" class="history-content" />
  </div>
</template>

<script>

import Autorization from './components/Autorization.vue'
import Bets from './components/Bets.vue'
import Diapason from './components/Diapason.vue'
import MainPlayer from './components/MainPlayer.vue'
import ModalResults from './components/ModalResults.vue'
import Table from './components/Table.vue'
import History from './components/History.vue'
import Registr from './components/Registr.vue'

//import axios from 'axios'

export default {
  
  name: 'App',
  components: {
    MainPlayer,
    Diapason,
    Table,
    Bets,
    ModalResults,
    Autorization,
    History,
    Registr
    
       
  },
  
  data(){
    return {
      info:null,
      clear:false,
      inputs:['Hero'],
      positions:['BB'],
      numbers: new Set(this.inputs),
      checks:[0,0,0,0,0,0],
      enemyCombs:[],
      enemyStronger:[],
      enemyEqual:'',
      enemyLower:[],
      heroComb:[],
      heroDraws:[],
      activeModal:false,
      activeAutorization:false,
      activeRegister:false,
      bankChances:0,
      maxPercent:0,
      url:'https://pokerequatyapi.netlify.app/.netlify/functions/api',
      ID:-1,
      name:'',
      incorrectData:[0,0],
      counter:0,
    }
  },
   created(){
     this.$http.get(this.url)
     .then(response => {
     console.log(response.data)
      })
    
   },
  methods :{
    setHistoryGame(index){
      //console.log('ind '+index);
      //console.log('ID '+this.ID);
      const user=this.$store.getters.GET_USERS[this.ID];
      //console.log('user '+JSON.stringify(user))
      const game=user.games[index];
      console.log(JSON.stringify(game));
    },

    turningOnAvto(){
      this.activeAutorization=true; 
    },
    closeModal(){
      this.activeModal=false;
      this.activeAutorization=false;
    },
    openRegister(){
      this.activeAutorization=false;
      this.activeRegister=true;
      
    },
    closeRegister() {
      this.activeRegister=false;
      //this.activeAutorization=true;
    },
    FindStat(){
      
      this.$store.dispatch('FIND_STAT');
      this.$store.dispatch('FIND_PLAYER_ODDS');
      
      this.heroComb=this.$store.getters.GET_HERO_COMB;
      this.heroDraws=this.$store.getters.GET_OUTPUT_DRAWS;

      this.enemyStronger=this.$store.getters.GET_STRONGER_ENEMY_COMBS;
      

      this.maxPercent=this.heroDraws.reduce((a,b)=>Number(a.percent)>Number(b.percent) ? a.percent : b.percent);
      console.log('max '+this.maxPercent);
      const bank=this.$store.getters.GET_BANK;
      const playerBet=this.$store.getters.GET_HERO_TO_CALL;

      this.bankChances=Number(playerBet/bank*100).toFixed(2);
      

    
      this.enemyEqual=this.$store.getters.GET_EQUAL_ENEMY_COMB;
      this.enemyLower=this.$store.getters.GET_LOWER_ENEMY_COMB;

      
     
     if (this.ID>=0) {
       const Pos=this.inputs.indexOf('Hero');
       const UsedCards=this.$store.getters.GET_USED_CARDS;
      let data={
        date:new Date().getDate()+'.'+new Date().getMonth()+'.'+new Date().getFullYear(),
        players:this.inputs.slice(),
        pos:this.positions[Pos],
        handCards:UsedCards[5]+UsedCards[6]+' ',
        tableCards:UsedCards[0]+UsedCards[1]+UsedCards[2]+UsedCards[3]+UsedCards[4],
        diapson:'10',
        bank:bank,
        
      }; 
      this.$store.commit('ADD_GAME',[this.ID,data]);
      
       }
      this.counter++;

      //const heroToCall=this.$store.getters.GET_HERO_TO_CALL;
      

    //  this.enemyCombs[0]=this.$store.getters.GET_LOWER_ENEMY_COMBS;
     // this.enemyCombs[1]=this.$store.getters.GET_EQUAL_ENEMY_COMB;
    //  this.enemyCombs[2]=this.$store.getters.GET_STRONGER_ENEMY_COMBS;


      this.activeModal=true;
    },
    

    ClearAll(){
      this.$store.dispatch('CLEAR_ALL');
      this.clear=this.$store.getters.GET_CLEAR;  
      this.$store.commit('SET_OFFSET',0);

      
      for (let i = 0; i < this.checks.length; i++) {
        this.checks[i]=0;
      }

    },
    
    

    ChangePosition(value){
      
      var prevOffset=this.$store.getters.GET_OFFSET;
      var curOffset=this.inputs.length-value;
      this.$store.commit('SET_OFFSET',this.inputs.length-value);

      if (curOffset==0) {
        this.inputs.sort().reverse();
      }
      else if (prevOffset==0 && curOffset!=0) {
        this.inputs=this.inputs.concat(this.inputs.splice(0,curOffset));
      }
      else if (prevOffset!=0 && curOffset!=0) {
        this.inputs=this.inputs.concat(this.inputs.splice(0,this.inputs.length-prevOffset));
        this.inputs=this.inputs.concat(this.inputs.splice(0,curOffset));
      }
      console.log('pos '+this.positions);
      console.log('check '+this.checks);
      console.log('inputs '+this.inputs);
    },

    AddInput(index){
      //index , value
      this.$store.dispatch('SET_INPUTS',[index-1,true]);

      this.numbers.add("p"+index);
      this.numbers.add('Hero');
      this.inputs=(Array.from(this.numbers)).sort().reverse();
      //console.log(this.inputs.reverse());
      if (this.inputs.length==2) {
        this.positions.push('Btn');
      } else if (this.inputs.length==3){
        this.positions.splice(1, 0, 'SB');
      }
      else if (this.inputs.length==4){
        this.positions.push('CO');
      }
      else if (this.inputs.length==5){
        this.positions.push('HJ');
      }
      else if (this.inputs.length==6){
        this.positions.push( 'UTG');
      }
        
      for (let i = 0; i < this.checks.length; i++) {
        this.checks[i]=0;
      }
      this.$store.commit('SET_OFFSET',0);
      this.checks[this.inputs.length-1]=1;
      //console.log('inputs '+this.inputs);
    },
     logOut(){
       this.ID=-1;
       this.incorrectData[0]=0;
       this.incorrectData[1]=0;
    },
    logIn(arr){
      this.incorrectData[0]=0;
       this.incorrectData[1]=0;
      const email=arr[0];
      const password=arr[1];
      const users=this.$store.getters.GET_USERS;
      let isExist=false;
      
      for (let i = 0; i < users.length; i++) {
        if (users[i].email==email) {
          isExist=true;
          if (users[i].password==password){
            this.ID=i;
            this.name=email;
            this.activeAutorization=false;
            this.incorrectData[0]=0;
            this.incorrectData[1]=0;
          } else {
            
            this.incorrectData[1]=11;
          }
        }
      }

      
      if (!isExist) {
        this.incorrectData[0]=11;
      }
      console.log('incoorect email '+this.incorrectData[0]+' incorrect passs '+this.incorrectData[1])
    },
    

    DeleteInput(index){
      
      this.$store.dispatch('SET_INPUTS', [(index-1),false]);
     
      this.numbers.delete("p"+index);
      this.inputs=Array.from(this.numbers).sort().reverse();

      if (this.positions.length==3) {
        this.positions.splice(1,1);
      } 
      else if(this.positions.length>3 || this.positions.length==2){
        this.positions.pop();
      }
      
      this.$store.commit('SET_OFFSET',0);
      for (let i = 0; i < this.checks.length; i++) {
        this.checks[i]=0;
      }
      this.checks[this.inputs.length-1]=1;

    }
  }
}
</script>

<style>

.all-conten {
  display:flex;
  justify-content: center;
  flex-wrap: wrap;
}



.autorization,
.reg {
  z-index:10;
}



.app-header{
  background-color:royalblue;
  height: 40px;
  display: flex;
  
  color:white;
  
  width: 100%;
  margin-top: -10px;
 
}

header div{
  display: flex;
  
}

.bets{
  grid-row-start: 10;
  grid-column-start: 13;
  margin-top:20px;
}
.diap{
  margin-top:50px ;
  margin-left: 50px;
  grid-row-start:1 ;
  grid-row-end: 5;
  grid-column-start: 1;
  grid-column-end:5;
}

.clear{
    grid-column-start: 24;
    grid-row-start: 10;
    width:100px;
    margin-top:16px;
    height:30px;
   
}

.find{
  grid-column-start: 24;
    grid-row-start: 11;
    width:100px;
    margin-top:16px;
    height:30px;
    
}

.find:disabled {
  color: white;
  background-color:rgb(117, 173, 226);
}

.history-content{
  width:19.89%;
  border-left: 1px solid #c2c0c0;
  
}


.main-content{
  display:grid;
  grid-template-columns: repeat(25,50px);
  grid-template-rows:repeat(21,50px);
  grid-gap:10px;
  margin-top:20px;
  width:80%;

}

.clear, 
.find {
  border-radius: 5px;
  border:2px solid rgb(0, 132, 255);
  -webkit-transition-duration: 0.1s; /* Safari */
  transition-duration: 0.1s;
  background-color: white;
  color:rgb(0, 132, 255);
}

.clear:hover,
.find:hover:not([disabled="disabled"]) {
  background-color: rgb(0, 132, 255); /* Green */
  color: white;
  box-shadow: 0 6px 8px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.lk {
  background-color: transparent;
  color:white;
  border:0px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  min-width: 140px;
}

.lk:hover{
  background-color: rgb(132, 158, 230);
}

.bets{
  margin-left:5px;
  height:20px;
}

.player-bets{
  display: flex;
  justify-content: center;
  grid-column-start: 20;
    grid-row-start: 10;
    margin-right: 35px;
    margin-top:18px;

}

button:hover{
  cursor: pointer;
}


.inp{
  grid-column-start: 12;
  grid-column-end: 14;
  display:flex;
  font-size: 20px;
}

.inp select{
  height: 26px;
}

.results{
  z-index:10;
}

.table{
    grid-row-start:2;
    grid-row-end: 7;
    grid-column-start: 15;
    grid-column-end:20;
}
.cards{
    /*position: absolute;
    left:1090px;
    top:500px;*/
    padding-right:10px;
    grid-column-start: 18;
    grid-row-start: 8;
    z-index: 5;
}


</style>
