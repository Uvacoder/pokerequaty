import Vue from 'vue'
import Vuex from 'vuex';
import diapason from './modules/diapason.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      positionsCard:[99,99,99,99,99,99,99],
      clicked:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      clearInStore:false,
      activeInputs:[0,0,0,0,0,0],
      offset:0,
      deleteCheck: false,
      betToCall:20,
      bigBlind:20,
      usedCards:['','','','','','',''],
      allCards:['A♠','K♠','Q♠','J♠','10♠','9♠','8♠','7♠','6♠','5♠','4♠','3♠','2♠','A♣','K♣','Q♣','J♣','10♣','9♣','8♣','7♣','6♣','5♣','4♣','3♣','2♣',
      'A♦','K♦','Q♦','J♦','10♦','9♦','8♦','7♦','6♦','5♦','4♦','3♦','2♦','A♥','K♥','Q♥','J♥','10♥','9♥','8♥','7♥','6♥','5♥','4♥','3♥','2♥'],

      aces:['A♠','A♦','A♣','A♥'],
      kings:['K♠','K♦','K♣','K♥'],
      queens:['Q♠','Q♦','Q♣','Q♥'],
      jacks:['J♠','J♦','J♣','J♥'],
      tens:['10♠','10♦','10♣','10♥'],
      nines:['9♠','9♦','9♣','9♥'],
      eights:['8♠','8♦','8♣','8♥'],
      sevens:['7♠','7♦','7♣','7♥'],
      sixs:['6♠','6♦','6♣','6♥'],
      fives:['5♠','5♦','5♣','5♥'],
      fours:['4♠','4♦','4♣','4♥'],
      triples:['3♠','3♦','3♣','3♥'],
      deuces:['2♠','2♦','2♣','2♥']
    },
    getters: {
      GET_ALL_CARDS: state=>{
        return state.allCards;
      },
      GET_USED_CARDS :state =>{
        return state.usedCards;
      },
      GET_BIGBLIND: state=>{
        return state.bigBlind;
      },
      GET_BET_TO_CALL: state =>{
        return state.betToCall;
            },
      GET_DELETE_CHECK:state =>{
        return state.deleteChecks;
      },
      CLICKS: state => {
        return state.clicked;
      },
      GET_POSITIONS: state =>{
        return state.positionsCard;
      },
      GET_CLEAR: state=>{
        return state.clearInStore;
      },
      GET_INPUTS: state =>{
        return state.activeInputs;
      },
      GET_OFFSET: state=>{
        return state.offset;
      },

      GET_ACES(state){
        return state.aces;
      },
      GET_KINGS(state){
        return state.kings;
      },
      GET_QUEENS(state){
        return state.queens;
      },
      GET_JACKS(state){
        return state.jacks;
      },
      GET_TENS(state){
        return state.tens;
      },
      GET_NINES(state){
        return state.nines;
      },
      GET_EIGHTS(state){
        return state.eights;
      },
      GET_SEVENS(state){
        return state.sevens;
      },
      GET_SIXS(state){
        return state.sixs;
      },
      GET_FIVES(state){
        return state.fives;
      },
      GET_FOURS(state){
        return state.fours;
      },
      GET_THREES(state){
        return state.triples;
      },
      GET_TWOS(state){
        return state.deuces;
      },
    },
    mutations: {
      
      SET_USED_CARD(state,arr){
        let index=arr[0];
        let value=arr[1];
        state.usedCards[index]=value;
        console.log(state.usedCards);
        
      },   
      SET_BIGBLIND(state,value){
        state.bigBlind=value;
      },
      SET_BET_TO_CALL(state,value){
        state.betToCall=value;
      },
      SET_OFFSET :(state,value)=>{
        state.offset=value; 
      },
      SET_DELETE_CHECK :(state,value)=>{
        state.deleteCheck=value;
        
      },
      SET_INPUT :(state,arr)=>{    
        state.activeInputs[arr[0]]=arr[1];
      },
      SET_CLICK : (state,payload)=>{
        state.clicked[payload]=0;
      },
      SET_ACTIVE :(state,index)=> {
        state.clicked[index]=1;
        
       },
       SET_INDEX_ON_POSITION :(state,arr) => {
        state.positionsCard[arr[1]-1]=arr[0];
      },
      CLEAR_IN_STORE:(state)=>{
        state.clearInStore=true;
      },
      SET_CLEAR:(state,value)=>{
        state.clearInStore=value;
        //console.log('clear in commit '+state.clearInStore)
      }
      
      },
    actions: {
      FIND_STAT(context){
        let usedcards=context.getters.GET_USED_CARDS;
        let availableCards=context.getters.GET_ALL_CARDS.filter(x=>!usedcards.includes(x));
        console.log(availableCards);

        let diap=context.getters.GET_DIAPASON;
        
        let combinations=[];
        //let drawCombs=[];
       let combReady=[];

      let tableCards=[{value:usedcards[2],inPair:1,inFlesh:[],inStraight:[]},
      {value:usedcards[3],inPair:1,inFlesh:[],inStraight:[]},
      {value:usedcards[4],inPair:1,inFlesh:[],inStraight:[]},
      {value:usedcards[5],inPair:1,inFlesh:[],inStraight:[]},
      {value:usedcards[6],inPair:1,inFlesh:[],inStraight:[]},
      ]

       //looking table cards 
        for (let i = 0; i< usedcards.length-1; i++){
            if (usedcards[i]!='' ) {
              
              if (usedcards[i].length>2) {
                tableCards[i].inStraight.push('10');
                tableCards[i].inFlesh.push(usedcards[i].substr(2,1));
                
              } else {
                tableCards[i].inStraight.push(usedcards[i].charAt(0));
                tableCards[i].inFlesh.push(usedcards[i].charAt(1));
              }

            for (let j = i+1; j < usedcards.length; j++) { 
              
                ///check on pairs set 
                if (tableCards[i].value.charAt(0)==usedcards[j].charAt(0)) {
                  tableCards[i].inPair++;
                }
                if (usedcards[j].length>2) {
                  tableCards[i].inStraight.push('10');
                  tableCards[i].inFlesh.push(usedcards[j].substr(2,1));
                  
                } else if (usedcards[j].length>1)  {
                  tableCards[i].inStraight.push(usedcards[j].charAt(0));
                  tableCards[i].inFlesh.push(usedcards[j].charAt(1));
                }
                
                
            } 

            if (tableCards[i].inPair==2) {
              combReady.push('pair of '+tableCards[i].value.substr(0,tableCards[i].value.length-1));
            }
            tableCards[i].inStraight.sort();
            console.log('current '+ JSON.stringify(tableCards[i]));
          }
        }
        //const uniqueCombs = Array.from(new Set(combReady));
       console.log(combReady);

         let availAces=availableCards.filter(x => x.charAt(0)=='A');
        if (availAces.length<2) {
          diap.splice(0,1);
        }
        console.log(diap);
       
        for (let el of diap) {
          let c1=el.charAt(0);
          let c2=el.charAt(1);
          let kindOf=el.charAt(2);
          let availForCurrent=availableCards.filter(x => x.charAt(0)==c1 || x.charAt(0)==c2 );
          
          if (kindOf=='s') {  
            let pike=availForCurrent.filter(x=>x.charAt(1)=='♠');
            let club=availForCurrent.filter(x => x.charAt(1)=='♣');
            let heart=availForCurrent.filter(x => x.charAt(1)=='♥');
            let diam=availForCurrent.filter(x => x.charAt(1)=='♦');
            availForCurrent=[];
            if (pike.length>1) {
              pike=pike[0]+pike[1];
              availForCurrent=availForCurrent.concat(pike);
            }
            if (club.length>1) {
              club=club[0]+club[1];
              availForCurrent=availForCurrent.concat(club);
            }
            if (heart.length>1) {
              heart=heart[0]+heart[1];
              availForCurrent=availForCurrent.concat(heart);
            }
            if (diam.length>1) {
              diam=diam[0]+diam[1];
              availForCurrent=availForCurrent.concat(diam);
            }

            combinations=combinations.concat(availForCurrent);
          }
          else if (kindOf=='o'){
            availForCurrent.sort();
              let tmp=[];
              for (let i = 0; i < availForCurrent.length-1; i++) {
                for (let j = i+1; j < availForCurrent.length; j++) {
                   if (availForCurrent[i].charAt(0)!=availForCurrent[j].charAt(0) && availForCurrent[i].charAt(1)!=availForCurrent[j].charAt(1)) {
                     tmp.push(availForCurrent[i]+availForCurrent[j]);
                   }
                }
              }
           
              combinations=combinations.concat(tmp);
          } else{
            let tmp=[];
            for (let i = 0; i < availForCurrent.length-1; i++) {
              for (let j = i+1; j < availForCurrent.length; j++) {         
                   tmp.push(availForCurrent[i]+availForCurrent[j]);           
              }
            }
            
            combinations=combinations.concat(tmp);
          }
          
        }
        console.log('all combs '+combinations);

        for (let i = 0; i< tableCards.length; i++) {
          if (tableCards[i].value!='') {
            let pair=0;
            for (let j = 0; j < combinations.length; j++) {
              if ((tableCards[i].value.charAt(0)===combinations[j].charAt(0) && tableCards[i].value!==combinations[j].charAt(2)) || 
              (tableCards[i].value.charAt(0)!==combinations[j].charAt(0) && tableCards[i].value.charAt(0)===combinations[j].charAt(2))){         
                pair++;
              }
              
            }
          
         console.log('for '+tableCards[i].value+' number for stronger on pair '+pair+' percent for stronger '+pair/combinations.length);
        }
        }

        /*
        let availKings=availableCards.filter(x => x.charAt(0)=='K');
        let availQueens=availableCards.filter(x => x.charAt(0)=='Q');
        let availJacks=availableCards.filter(x => x.charAt(0)=='J');
        let availTens=availableCards.filter(x => x.charAt(0)=='10');
        let availNines=availableCards.filter(x => x.charAt(0)=='9');
        let availEights=availableCards.filter(x => x.charAt(0)=='8');
        let availSevens=availableCards.filter(x => x.charAt(0)=='7');
        let availSixs=availableCards.filter(x => x.charAt(0)=='6');
        let availFives=availableCards.filter(x => x.charAt(0)=='5');

        let availFours=availableCards.filter(x => x.charAt(0)=='4');
        let availThrees=availableCards.filter(x => x.charAt(0)=='3');
        let availTwos=availableCards.filter(x => x.charAt(0)=='2');
        */
        //let kings=new Set(context.getters.GET_KINGS);

        

      },

      UPDATE_USED_CARDS(context,arr){
        context.commit('SET_USED_CARD',arr);
      },
      SET_INPUTS(context,arr){
        context.commit('SET_INPUT',arr);
      },
      CLEAR_ALL(context){
        context.positionsCard=[99,99,99,99,99,99,99];
        context.clicked=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
        context.commit('SET_CLEAR',true);
        //console.log('instore '+context.getters.GET_CLEAR);

      },
      SET_FIRST_PLAYER_CARD : (context,arr) =>{
        switch (arr[1]) {
          case 1:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[0]);
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);
            context.commit('SET_CLICK',arr[0]); 
            break;
          }
          case 2:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[1]);
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);   
            context.commit('SET_CLICK',arr[0]); 
            break;
          }
          case 3:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[2]);            
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);           
            context.commit('SET_CLICK',arr[0]); 

            
            break;
          }
          case 4:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[3]);
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);           
            context.commit('SET_CLICK',arr[0]); 

           
            break;
          }
          case 5:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[4]);
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);          
            context.commit('SET_CLICK',arr[0]); 
            break;
          }
          case 6:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[5]);
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);       
            context.commit('SET_CLICK',arr[0]); 
            break;
          }
          case 7:{
            context.commit('SET_ACTIVE',context.getters.GET_POSITIONS[6]);
            context.commit('SET_INDEX_ON_POSITION',[arr[0],arr[1]]);            
            context.commit('SET_CLICK',arr[0]); 
            break;
          }
        }
      },
  },
  modules:{
    diapason
  }
  });