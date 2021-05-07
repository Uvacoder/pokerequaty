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
      //not on table 
      availCards:[],
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
      GET_PLAYER_CARDS:state=>{
        return [state.usedCards[5],state.usedCards[6]];
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
      GET_AVAIL_CARDS: state=>{
        return state.availCards;
      }

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
      },
      SET_AVAIL_CARDS :(state,arr)=>{
        state.availCards=arr.slice();
        //console.log(state.availCards+ ' avail in set');
      },
    },
    actions: {
      FIND_STAT(context){
        //cards on table and main player cards
        let usedcards=context.getters.GET_USED_CARDS;
        let availableCards=context.getters.GET_ALL_CARDS.filter(x=>!usedcards.includes(x));
        //console.log('avail '+availableCards);
        context.commit('SET_AVAIL_CARDS',availableCards);

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
              chances.push((Straight/combinations.length*100).toFixed(2)+'%'+ ' Straight ');
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
              chances.push((StraightFlesh/combinations.length*100).toFixed(2)+'% StraightFlesh ');
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
   
      },

      FIND_PLAYER_ODDS(context){
        let availableCards=context.getters.GET_AVAIL_CARDS;
        console.log('avail in App '+availableCards);
        console.log('length is '+availableCards.length);
        let tableCards=context.getters.GET_USED_CARDS.slice(0,5);
        let playerCards=context.getters.GET_PLAYER_CARDS;

        let drawCombs={
          kicker:0,
          pair:[],
          twoPairs:0,
          set:0,
          straight:0,
          flesh:0,
          fullHouse:0,
          quad:0,
          straightFlesh:0,
          fleshRoyal:0,
        }
        
        let combinationHierarchy={
          kicker:0,
          pair:0,
          twoPairs:0,
          set:0,
          straight:0,
          flesh:0,
          fullHouse:0,
          quad:0,
          straightFlesh:0,
          fleshRoyal:0,
        }
        

        let readyCombs=[];
        
        let pair1=0,pair2=0,set=0,quad=0,fh=0;
        let RoyalFlesh=0,StrFlesh=0,Flesh=0,Straight=0;

        //pocket cards with table cards
        let pocketTableCards=[
          {value:playerCards[0],
            repeatCount:1,
            inFlesh:[playerCards[0],playerCards[1],tableCards[0],tableCards[1],tableCards[2],tableCards[3],tableCards[4]],
            inStraight:[playerCards[0].charAt(0),
                        playerCards[1].charAt(0),
                        tableCards[0].charAt(0),
                        tableCards[1].charAt(0),
                        tableCards[2].charAt(0),
                        tableCards[3].charAt(0),
                        tableCards[4].charAt(0)]},
          {value:playerCards[1],repeatCount:1,},
          {value:tableCards[0],repeatCount:1,},
          {value:tableCards[1],repeatCount:1,},
          {value:tableCards[2],repeatCount:1,},
          {value:tableCards[3],repeatCount:1,},
          {value:tableCards[4],repeatCount:1,}
        ]

       
        pocketTableCards[0].inFlesh=pocketTableCards[0]?.inFlesh.filter(x=> x!=="");
        pocketTableCards[0].inStraight=pocketTableCards[0]?.inStraight.filter(x=> x!=="");

        //sorting
        let rightOrder=['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
        pocketTableCards.sort((a,b)=>rightOrder.indexOf(a.value.charAt(0))-rightOrder.indexOf(b.value.charAt(0)));

        
        
        //console.log('after sort '+pocketTableCards);

          //check ready combs

        for (let i = 0; i < pocketTableCards.length-1; i++) {
          if (pocketTableCards[i].value!=='') {
            
            for (let j = i+1; j < pocketTableCards.length; j++) {
              if (pocketTableCards[j].value!=='') {
                
                if (pocketTableCards[i].value.charAt(0)==pocketTableCards[j].value.charAt(0)) {
                  pocketTableCards[i].repeatCount++;
                  pocketTableCards[j].repeatCount=-99;
                }
              }
            }
            //check on repeatable combs
           
            if (pocketTableCards[i].repeatCount==4) {
              quad=pocketTableCards[i].value.charAt(0);
              combinationHierarchy.quad=5;

            } else if (pocketTableCards[i].repeatCount==3 && pair1==0 && pair2==0) {
              set=pocketTableCards[i].value.charAt(0);
              combinationHierarchy.set=5;

            } else if (pocketTableCards[i].repeatCount==3 && pair2!=0) {
              fh=pocketTableCards[i].value.charAt(0)+pair2;
              combinationHierarchy.fullHouse=5;

            } else if (pocketTableCards[i].repeatCount==3 && pair1!=0) {
              fh=pocketTableCards[i].value.charAt(0)+pair1;
              combinationHierarchy.fullHouse=5;

            } else if (pocketTableCards[i].repeatCount==2 && set!=0) {
              fh=set+pocketTableCards[i].value.charAt(0);
              combinationHierarchy.fullHouse=5;

            } else if (pocketTableCards[i].repeatCount==2) {
              if (pair1==0) {
                pair1=pocketTableCards[i].value.charAt(0);
                combinationHierarchy.pair=5;
              } else if (pair1!=0) {
                if (pair2!=0) {
                  pair1=pair2;
                  pair2= pocketTableCards[i].value.charAt(0);
                  combinationHierarchy.twoPairs=5;
                } else {
                  pair2=pocketTableCards[i].value.charAt(0);
                  combinationHierarchy.twoPairs=5;
                }
              }
            } 
            
            
            
            //check on difficult combs
          if (pocketTableCards[i]?.inFlesh?.length>4) {
            pocketTableCards[i].inStraight.sort(straightSort);
            
            let tmpForStr=Array.from(new Set(pocketTableCards[i].inStraight));

           
            if (checkFlesh(pocketTableCards[i].inFlesh) && checkStraight(tmpForStr)) {
              
                  combinationHierarchy.straightFlesh=5;
                  StrFlesh=1;
                
            } 
            else if (checkFlesh(pocketTableCards[i].inFlesh)) {
              combinationHierarchy.flesh=5;
              Flesh=pocketTableCards[i].inFlesh[0];
            } 
            else if (checkStraight(tmpForStr)) {
              combinationHierarchy.Straight=5;
              Straight=1;
            }

          }
         

          }
        }
        if (RoyalFlesh!=0) {
          readyCombs.push('Флеш-Рояль')
        } else if (StrFlesh!=0) {
          readyCombs.push('Стрит-Флеш');
        } else if (quad!=0) {
          readyCombs.push('Каре '+quad);
        } else if (fh!=0) {
          readyCombs.push('Фулл-хаус'+fh.charAt(0)+fh.charAt(0)+fh.charAt(0)+fh.charAt(1)+fh.charAt(1));
        } else if (Flesh!=0) {
          readyCombs.push('Флеш');
        } else if (Straight!=0) {
          readyCombs.push('Стрит');
        } else if (set!=0) {
          readyCombs.push('Тройка '+set);
        } else if (pair1!=0 && pair2!=0) {
          readyCombs.push('Две пары '+pair1+' и '+pair2);
        } else if (pair1!=0 ) {
          readyCombs.push('Пара  '+pair1 );
        } 
        console.log('ready comb is '+readyCombs);
        console.log('hierarchy '+JSON.stringify(combinationHierarchy));

        pocketTableCards=pocketTableCards.filter(x => x.value!=="");
        for (let i = 0; i < pocketTableCards.length; i++) {
          console.log(pocketTableCards[i]);
          
        }
        ///looking for draw????
        for (let i = 0; i < pocketTableCards.length; i++) {
          //flesh draw
          if (pocketTableCards[i].inFlesh?.length>4) {
            if (checkFleshDraw(pocketTableCards[i].inFlesh)) {
              drawCombs.flesh=2*9*(7-pocketTableCards.length);
            }
          }
          //straight draw 
          if (pocketTableCards[i].inStraight?.length>0) {
            let tmpForStrDraw=Array.from(new Set(pocketTableCards[i].inStraight.slice()));
            if (tmpForStrDraw.length>3) {
              console.log(tmpForStrDraw+' tmpstrdraw');
              
            }
            
          }
          if (pocketTableCards[i].repeatCount==1) {
             
            for (let j = 0; j < pocketTableCards.length; j++) {
              //check on fh
              //console.log('pocketTableCards[j].repeatCount '+pocketTableCards[j].repeatCount)
              if (pocketTableCards[j].repeatCount==3 && j!=i)  {
                
                drawCombs.fullHouse=Number(drawCombs.fullHouse)+Number(2*3*(7-pocketTableCards.length));
              } else if (pocketTableCards[j].repeatCount==2  && j!=i) {
                
                drawCombs.twoPairs+=Number(2*3*(7-pocketTableCards.length))
              } 
              
            }
          }  else if (pocketTableCards[i].repeatCount==2) {
            let onfh=false;

            for (let k = 0; k < pocketTableCards.length; k++) {
              if (pocketTableCards[k].repeatCount==2 && k!=i) {
                onfh=true;  
                drawCombs.fullHouse=Number(2*4*(7-pocketTableCards.length))
              } 
              if (!onfh) {
                drawCombs.set=Number(2*2*(7-pocketTableCards.length));
              }
            }
   
          } else if (pocketTableCards[i].repeatCount==3) {
            drawCombs.quad=Number(2*(7-pocketTableCards.length));
          }   
        }//end for repeatable combs 
        


        console.log('draw '+JSON.stringify(drawCombs));
        
      
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
        //console.log('start: '+tmpArr[i]+', '+'end: '+tmpArr[i+4]);
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

  function checkFleshDraw(arr) {
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
    if (club==4 || pike==4 || heart==4 || diamond==4) {
      return true;  
    }
    else{
      return false;
    }
  }