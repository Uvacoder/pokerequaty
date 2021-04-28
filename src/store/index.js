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
      allCards:['A♠','K♠','Q♠','J♠','T♠','9♠','8♠','7♠','6♠','5♠','4♠','3♠','2♠','A♣','K♣','Q♣','J♣','T♣','9♣','8♣','7♣','6♣','5♣','4♣','3♣','2♣',
      'A♦','K♦','Q♦','J♦','T♦','9♦','8♦','7♦','6♦','5♦','4♦','3♦','2♦','A♥','K♥','Q♥','J♥','T♥','9♥','8♥','7♥','6♥','5♥','4♥','3♥','2♥'],
     
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
      deuces:['2♠','2♦','2♣','2♥'],

      outputChances:[]
    },
    getters: {
      GET_OUTPUT_CHANCES: state=>{
        return state.outputChances;
      },
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
      CLEAR_OUTPUT_CHANCES(state){
        state.outputChances=[];
      },
      SET_OUTPUT_CHANCES(state,arr){
        state.outputChances=arr.slice(0);
      },
      SET_USED_CARD(state,arr){
        let index=arr[0];
        let value=arr[1];
        state.usedCards[index]=value;
        //console.log(state.usedCards);    
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
        //cards on table and main player cards
        let usedcards=context.getters.GET_USED_CARDS;
        let availableCards=context.getters.GET_ALL_CARDS.filter(x=>!usedcards.includes(x));
        //console.log(availableCards);

        let diap=context.getters.GET_DIAPASON;
        
        let combinations=[];
        //let drawCombs=[];
        let combReady=[];
        let chances=[];
      
      //only cards on table 
        let tableCards=[{value:usedcards[0],inPair:1,inFlesh:[],inStraight:[]},
        {value:usedcards[1],inPair:1,inFlesh:[],inStraight:[]},
        {value:usedcards[2],inPair:1,inFlesh:[],inStraight:[]},
        {value:usedcards[3],inPair:1,inFlesh:[],inStraight:[]},
        {value:usedcards[4],inPair:1,inFlesh:[],inStraight:[]},
        ];

        let chancesOfCombs={
          Flesh:0,
          Straight:0,
          StraightFlesh:0,
        };
        //сonsole.log(chancesOfCombs);

        let set=0,pair1=0,pair2=0,quad=0;
      

       //looking table cards 
        for (let i = 0; i< 4; i++){
            if (usedcards[i]!='') {
              
                tableCards[i].inStraight.push(usedcards[i].charAt(0));
                tableCards[i].inFlesh.push(usedcards[i]);
                
            for (let j = i+1; j < 4; j++) { 
              if (usedcards[j]!='') {
              tableCards[i].inStraight.push(usedcards[j].charAt(0));
              tableCards[i].inFlesh.push(usedcards[j]);

                ///check on pairs set 
                if (tableCards[i].value.charAt(0)==usedcards[j].charAt(0)) {
                  tableCards[i].inPair++;
                  tableCards[j].inPair=-99;
                }
              }
            }
            
            

            if (tableCards[i].inPair==4) {
              
              quad=tableCards[i].value.charAt(0)
              combReady.pop();
              combReady.push('quad of '+quad);
            }

            if (tableCards[i].inPair==3 && quad==0 ) {
              //console.log('break, pair1: '+pair1+' pair2: '+pair2);
              
              if (pair1!=0) {
                combReady=[];
                combReady.push('full house');
                set=tableCards[i].value.charAt(0)
              } else if (pair2==0) {
                set=tableCards[i].value.charAt(0)
                combReady.pop();
                combReady.push('set of '+set);
              }
              
            }
            if (tableCards[i].inPair==3 && tableCards[i].value.charAt(0)==pair2 && quad==0) {
                combReady=[];
                combReady.push('full house');   
                set=tableCards[i].value.charAt(0)
            }


            if (tableCards[i].inPair==2 && set==0 && quad==0
              ) {
              if (pair1===0) {
                pair1=tableCards[i].value.charAt(0);
              }
              else if (pair2==0){
                pair2=tableCards[i].value.charAt(0);
              }
              combReady.push('pair of '+tableCards[i].value.charAt(0));
            }
            
            if (tableCards[i].inStraight.length>4) {
              tableCards[i].inStraight.sort(straightSort);
              let tmpArr=tableCards[i].inStraight.slice(0);

            //check on straight 
 
            //check on flesh

            if (checkFlesh(tableCards[i].inFlesh) && checkStraight(tmpArr) && tableCards[i].inStraight[4]=='A') {
              combReady.push('Flesh Royal');
            }
            else if (checkFlesh(tableCards[i].inFlesh) && checkStraight(tmpArr)) {
              combReady.push('Straight Flesh from '+tmpArr[0] +' to '+tableCards[i].inStraight[4]);
            } 
            else if (checkFlesh(tableCards[i].inFlesh)) {
              combReady.push('Flesh of ' +tableCards[i].value.charAt(1));
            } 
            else if (checkStraight(tmpArr)) {
              combReady.push('Staright from '+tmpArr[0] +' to '+tableCards[i].inStraight[4]);
            }
            
          }
             
          }
 
        }
        
       console.log(combReady);

        ///=========== END TABLE CHECK===========


        //=======START WORK WITH DIAPASON========

        let availAces=availableCards.filter(x => x.charAt(0)=='A');
        if (availAces.length<2) {
          diap.splice(0,1);
        }
        //console.log(diap);
       
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
       // console.log('all combs '+combinations);
       // console.log('comb len '+combinations.length);

        for (let i = 0; i< tableCards.length; i++) {
          if (tableCards[i].value!='') {
            let pair=0,SET=0,QUAD=0,Flesh=0,RoyalFlesh=0,StraightFlesh=0,Straight=0,FullHouse=0;
            let StraightStart=0,StraightEnd=0;

            for (let j = 0; j < combinations.length; j++) {

              if (tableCards[i].inPair==1 &&( (tableCards[i].value.charAt(0)==combinations[j].charAt(0) && tableCards[i].value.charAt(0)!=combinations[j].charAt(2)) 
              || (tableCards[i].value.charAt(0)!=combinations[j].charAt(0) && tableCards[i].value.charAt(0)==combinations[j].charAt(2)) )){         
                pair++;
              } 

              if (tableCards[i].inPair==2 &&( (tableCards[i].value.charAt(0)==combinations[j].charAt(0) && tableCards[i].value.charAt(0)!=combinations[j].charAt(2)) 
              || (tableCards[i].value.charAt(0)!=combinations[j].charAt(0) && tableCards[i].value.charAt(0)==combinations[j].charAt(2)) )){         
                SET++;
              }

              if (tableCards[i].inPair==1 && tableCards[i].value.charAt(0)==combinations[j].charAt(0) && tableCards[i].value.charAt(0)==combinations[j].charAt(2)){         
                SET++;
              } 

              if (tableCards[i].inPair==2 && tableCards[i].value.charAt(0)==combinations[j].charAt(0) && tableCards[i].value.charAt(0)==combinations[j].charAt(2)){         
                QUAD++;
              } 

              

              let tmpForFlesh=tableCards[i].inFlesh.slice(0);
              tmpForFlesh.push(combinations[j].substr(0,2));
              tmpForFlesh.push(combinations[j].substr(2,2));
 
              let tmpForStr=tableCards[i].inStraight.slice(0);
              tmpForStr.push(combinations[j].charAt(0));
              tmpForStr.push(combinations[j].charAt(2));
              let tmpForFullHouse=tmpForStr.slice(0);

              if (tmpForStr.length>4) {
                
              tmpForStr=Array.from(new Set(tmpForStr));  
              
              tmpForStr.sort(straightSort);
              
              
              if (checkFullHouse(tmpForFullHouse)) {
                FullHouse++;
              }

              //console.log('tmp str '+tmpForStr);
              if (checkFlesh(tmpForFlesh) && checkStraight(tmpForStr) && tmpForStr[tmpForStr.length-1]=='A') {
                RoyalFlesh++;
              }
              else if (checkFlesh(tmpForFlesh) && checkStraight(tmpForStr)) {
                StraightFlesh++;
                
                
              } 
              else if (checkFlesh(tmpForFlesh) ) {
                Flesh++;
              } 
              else if (checkStraight(tmpForStr)) {
                
                Straight++;
                
              }
            }
            } 
            if (pair>0) {
              console.log('pair of '+tableCards[i].value+' percent: '+(pair/combinations.length*100).toFixed(2));
              chances.push((pair/combinations.length*100).toFixed(2)+'%'+' Pair of '+tableCards[i].value);
            }
            if (SET>0) {
              console.log('set of '+tableCards[i].value+' percent: '+(SET/combinations.length*100).toFixed(2));
              chances.push((SET/combinations.length*100).toFixed(2)+'%'+' Set of '+tableCards[i].value);
            }
            if (Straight>0) {
              console.log('Straight from '+ StraightStart+' to ' +StraightEnd +': '+(Straight/combinations.length*100).toFixed(2));
              chances.push((Straight/combinations.length*100).toFixed(2)+'%'+ ' Straight from '+ StraightStart+' to ' +StraightEnd);
            }
            if (Flesh>0 && Number(Flesh/combinations.length)>Number(chancesOfCombs.Flesh)) {
              console.log('Flesh : '+(Flesh/combinations.length).toFixed(2)+'%');
              chancesOfCombs.Flesh=Number(Flesh/combinations.length*100).toFixed(2)
            }
            if (FullHouse>0) {
              console.log('FullHouse of '+tableCards[i].value +' ' +(FullHouse/combinations.length*100).toFixed(2))
              chances.push((FullHouse/combinations.length*100).toFixed(2)+'%'+' Full-house')
            }
            if (QUAD>0) {
              console.log('quad of '+tableCards[i].value+' percent: '+(QUAD/combinations.length).toFixed(2));
              chances.push((QUAD/combinations.length*100).toFixed(2)+'%'+' Quad of '+tableCards[i].value);
            }
            if (StraightFlesh>0) {
              console.log('StraightFlesh from '+ StraightStart+' to  ' +StraightEnd +': '+(StraightFlesh/combinations.length).toFixed(2));
              chances.push((StraightFlesh/combinations.length*100).toFixed(2)+'%'+ ' StraightFlesh from '+ StraightStart+' to ' +StraightEnd);
            }
            if (RoyalFlesh>0) {
              console.log('RoyalFlesh : '+(RoyalFlesh/combinations.length).toFixed(2));
              chances.push((RoyalFlesh/combinations.length*100).toFixed(2)+'%'+' RoyalFlesh');
            }

        
        }
        }if (chancesOfCombs.Flesh>0) {
          chances.push(chancesOfCombs.Flesh+'%'+' Flesh');
        }
        
        context.commit('SET_OUTPUT_CHANCES',chances);
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

  function checkStraight(tmpArr) {
    
    if (tmpArr.length>4) {
 
    for (let i = 0; i < tmpArr.length; i++) {
      switch (tmpArr[i]) {
        case 'A':
          tmpArr[i]=14;
          break;

        case 'K':
          tmpArr[i]=13;
          break;

        case 'Q':
          tmpArr[i]=12;
          break;

        case 'J':
          tmpArr[i]=11;
          break;

        case 'T':
          tmpArr[i]=10
          break;
          
        default:
          break;
      }
      
    }

    let k=0;
    
    for (let i = 0; i < tmpArr.length-4; i++) {  
      
      if (Number(tmpArr[i])+1==tmpArr[i+1] && Number(tmpArr[i])+2==tmpArr[i+2] && Number(tmpArr[i])+3==tmpArr[i+3] && Number(tmpArr[i])+4==tmpArr[i+4] ) {
        console.log('start: '+tmpArr[i]+', '+'end: '+tmpArr[i+4]);
        k++;
        //this.StraightStart=tmpArr[i];
       // this.StraightEnd=tmpArr[i+4];
      }  
    }
   
  if (k>0) {
    return true;
  }
  else{
    return false;
  }
  }
  else{
    return false;
  }
}

  function checkFlesh(arr) {
    
    let pike=0,heart=0,diamond=0,club=0;
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i].charAt(1)) {
        case '♠':
          pike++;
          break;

        case '♦':
          diamond++;
          break;

        case '♥':
          heart++;
          break;

        case '♣':
          club++;
          break;

        default:
          break;
      }
    }
    if (club>4 || pike>4 || heart>4 || diamond>4) {
      return true;  
    }
    else{
      return false;
    }
  }

  function checkFullHouse(arr) {
    arr.sort(straightSort);
    //console.log('fh arr '+arr);
    let fhpair=false,fhset=false;
    for (let i = 0; i < arr.length-2; i++) {
     if (arr[i]==arr[i+2]) {
        //console.log(arr[i]+'-i, '+arr[i+1]+' -i+2');
         fhset=true;
     }
    }
    //check any triples
    
    if (fhset) {
      let i=0;
      while (i<arr.length-2) {
        if (arr[i]==arr[i+2]) {
          i+=2;
        } else if (arr[i]!=arr[i+2] && arr[i]==arr[i+1]) {
          fhpair=true;
        }
        i++;
      }
      
    } else {
      return false;
    }

    if (fhset && fhpair) {
      return true;
    }
    else{
      return false;
    }
  }

  function straightSort(a,b){
    let rightOrder=['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
    return rightOrder.indexOf(a) - rightOrder.indexOf(b);
  }