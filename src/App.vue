<template>
  <div id="app" class="main-content">
    <Diapason class="diap"  />
    <MainPlayer class="cards" />
   
    <Bets class="bets" :inputs="inputs" :positions="positions" :checks="checks"  @change-pos="ChangePosition"   />
    <Table class="table" @add-input="AddInput" @delete-input="DeleteInput" />
  
    

    <button class="clear" @click="ClearAll" >Очистить все</button>
    <button class="find" @click="FindStat" >Расчет</button>
    
    <ModalResults v-if="activeModal" :combs="outputChancesModal" @close="closeModal" />
  </div>
</template>

<script>
import Bets from './components/Bets.vue'
import Diapason from './components/Diapason.vue'
import MainPlayer from './components/MainPlayer.vue'
import ModalResults from './components/ModalResults.vue'
import Table from './components/Table.vue'




export default {
  name: 'App',
  components: {
    MainPlayer,
    Diapason,
    Table,
    Bets,
    ModalResults,
       
  },
  
  data(){
    return {
      clear:false,
      inputs:['Hero'],
      positions:['BB'],
      numbers: new Set(this.inputs),
      checks:[0,0,0,0,0,0],
      outputChancesModal:[],
      activeModal:false
    }
  },
  

  methods :{
    closeModal(){
      this.activeModal=false;
    },
    FindStat(){
      this.$store.dispatch('FIND_STAT');
      this.$store.dispatch('FIND_PLAYER_ODDS');
      this.outputChancesModal=this.$store.getters.GET_OUTPUT_CHANCES;
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
.bets{
  grid-row-start: 10;
  grid-column-start: 13;
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

.main-content{
  display:grid;
  grid-template-columns: repeat(25,50px);
  grid-template-rows:repeat(20,50px);
  grid-gap:10px;
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
