<template>
<div class="content">
    <div class="blinds" style="font-size:20px;margin-top:23px">
      Блайнды:
      <select style="height:26px;" name="" id="" v-model="BigBlind" >
        <option value="20">10/20</option>
        <option value="40">20/40</option>
        <option value="60">30/60</option>
        <option value="80">40/80</option>
        <option value="100">50/100</option>
        <option value="200">100/200</option>
        <option value="300">150/300</option>
        <option value="400">200/400</option>
        <option value="600">300/600</option>
        <option value="800">400/800</option>
        <option value="1000">500/1000</option>
        <option value="4000">2000/4000</option>
        <option value="6000">3000/6000  </option>
        <option value="8000">4000/8000 </option>
        <option value="10000">5000/10000 </option>
      </select>
      
    </div>
  
  <div class="bank" > 
    <div class="bank-1">
    <p>Общий банк</p>
    <input  type="text" v-model="bank">
    </div>
    <div class="bank-2">
     <p>Банк круга</p>
    <input disabled type="text" v-model="bank">
    </div>
  </div>
    
  <div class="inps">
   <div v-for="(inp,index) in inputs" :key="index" class="input">
      <label> {{inp}}: </label>
      <input :class="{warning:warningOn}" :disabled="action[index]=='fold' || action[index]=='call' || action[index]===0" type="number"  class="bets"  :value="betSizes[index]" >
      <select style="height:25px" @change="choosenAction($event,index)" v-model="action[index]" >
        <option  value="0">...</option>
        <option  value="call">Call</option>
        <option value="raise" >Raise</option>
        <option value="fold" >Fold</option>
      </select>
      
       
    </div>
    

  </div>

  <div class="queue">
    <div class="turns"  v-for="(turn,index) in playerTurns" :key="index+10" :class="{active:playerTurns[index]}" > 

    </div>
    </div>

    <div class="radio-buttons" >
      <div v-for="(pos,index) in positions" :key="index" class="position">
      <input  :checked="checks[index]"  type="radio" name="pos" :value=index @input="changePosition">
      
      <span class="pos-name">{{pos}}</span>   
      </div>
    </div>
    
    

</div>

    
</template>

<script>
export default {
    name: 'Bets',
     props:
      ['inputs','positions','checks',]
    ,
    data(){
        return{
          activeInput1:false,
          activeInput2:false,
          activeInput3:false,
          activeInput4:false,
          activeInput5:false,
          BigBlind:20,
          notRaise:true,
          queueOfPlayer:0,
          wasRaise:false,
          betCounter:0,
          // 1-call 2-raise 3-fold 
          action:[0,0,0,0,0,0],
          playerTurns:[false,false,false,false,false,false],
          betSizes:[20,10,0,0,0,0,0],
          bank:30,

        }
    },
   
    methods:{

      bet(index){
          var BigBlind=Number(this.$store.getters.GET_BIGBLIND);
          var BetToCall=Number(this.$store.getters.GET_BET_TO_CALL)
          console.log(this.$store.getters.GET_BIGBLIND);

          //BB
          if (this.positions[index]=='BB' && this.action[index]=='fold') {
            return BigBlind;
          }
          else if (this.positions[index]=='BB' && this.action[index]=='call') {
            console.log(BetToCall+' in bb');
            return BetToCall;
          }
          else if (this.action[index]=='raise'){
            this.$store.commit('SET_BET_TO_CALL',BigBlind+BetToCall);

            return BigBlind+BetToCall;
          }
          
          else if (this.inputs.length==2 && index==1) {
            return BigBlind/2
          }
          else if (this.positions[index]=='SB' && this.action[index]!='call' ) {
            return BigBlind/2;
          }
          else if (this.positions[index]=='SB' && this.action[index]=='call' ) {
            return BetToCall;
          }
          else if (this.action[index]=='call') {
            return BetToCall;  
          } else if (this.action[index]==0){
            return 0;
          } 
          
      },
      
      changePosition(e){
        this.$emit('change-pos',Number(e.target.value)+1);
      },
      choosenAction(e,index){
        
        this.action[index]=e.target.value;
       
        if (e.target.value=='raise') {
          if (index!==this.positions.length-1) { 
            this.wasRaise=true;
            this.betCounter=0;
          }
        
          for (let i = 0; i <this.action.length; i++) {
            if (i!=index) {
              this.action[i]=0;
            }
          }
        } 


     
        this.betSizes[index]=this.bet(index);
        this.bank=Number(this.betSizes.reduce((a,b)=>Number(a)+Number(b),0));

        if (index==0) {
          if (this.wasRaise) {
            console.log('lol');
            this.wasRaise=false;
            this.playerTurns[this.positions.length-1]=true;
          }
          this.playerTurns[index]=false;
          
        } else{ 
          if (this.action[index-1]=='raise') {
            this.playerTurns[index]=false;
            // /this.playerTurns[index-1]=true;
         } else{
            this.playerTurns[index]=false;
            this.playerTurns[index-1]=true;
         }
        }
      },

    },
   watch:{
     BigBlind(){
       this.$store.commit('SET_BIGBLIND', this.BigBlind);
       this.$store.commit('SET_BET_TO_CALL',this.BigBlind);
       console.log('bb in watch '+this.BigBlind);
       this.betSizes[0]=this.BigBlind;
       this.betSizes[1]=this.BigBlind/2;
       this.bank=Number(this.betSizes.reduce((a,b)=>Number(a)+Number(b),0)) ;
     },
     positions(){
       for (let i = 0; i < this.playerTurns.length; i++) {
         this.playerTurns[i]=false;
         
       }
       this.queueOfPlayer=this.positions.length-1;
       this.playerTurns[this.queueOfPlayer]=true;
     }
   },
   computed:{
     warningOn() {
       for (let index = 0; index < this.action.length; index++) {
          if (this.action[index]==2 && this.betSizes[index]<2*this.BigBlind) {
            return true;
          } else{
            return false;
          }
       }
       return false; 
     }    
    }  
}
</script>

<style scoped>

.turns {
 margin-top: 7px;
  height: 10px;
  width: 10px;
  border-radius: 10px;
 
}
.active {
  border:4px solid rgb(241, 76, 76);
}

.queue {
   grid-column-start: 3;
  grid-row-start: 3;
  display:grid;
  height: 280px;

  grid-gap: 20px;
  grid-template-rows: repeat(6,30px);
}

.content{
  display:grid;
  grid-template-rows:50px 20px 300px ;
  grid-template-columns: 60px 350px 50px ;
  grid-gap: 20px;
  width:460px;
}

.warning{
  border:0.2em solid red;
  color: red;
}

.position{ 
   height:30px;
   display:flex;
   align-items: center;
}

.input{
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}

.input input  {
  width: 150px;
}

.bank{
  grid-column-start: 2;
  grid-row-start: 1;
 
  display: flex;
  justify-content: space-around;
}

.bank-1{
  margin-left: 70px;
}

.bank-1, .bank-2 {
width: 100px;
height: 40px;
}

.bank input {
  width:100px;
}

.bank p{
  max-height: 20px;
  
}

.inps {
  grid-column-start: 2;
  grid-row-start: 3;
  height:280px;
  display:grid;
  grid-template-rows: repeat(6,30px);
  grid-gap: 20px;
  
}

.radio-buttons{
  
  grid-column-start: 1;
  grid-row-start: 3;
  
  width:30px;
  height: 280px;

  display:grid;
  grid-gap: 20px;
  grid-template-rows: repeat(6,30px);
}



.bets{
  max-width: 150px;
  height:20px;
}

</style>