<template>
    <div class="table-content">
    <div class="in-table">   
        
        <!--<NewList @choose-card="ChooseCard" v-show="active1 " class="card-list1" />-->
        <TableCards class="slot-1" @check-findAvail="checkFindAvail" />
        
        <!--<button @click="active1=false,active2=false,active3=false,active4=false,active5=!active5" class="slot slot-5">+</button>-->
         
        <!--<NewList @choose-card="ChooseCard" v-show="active5 " class="card-list5" />-->
        
           
    </div> 
    <div class="player-slot player-slot-1">
        <button class="player player-1" :disabled="clicked1" @mouseenter="hover1=true" @mouseleave="hover1=false"  
                                :class="{active:hover1,activecards:clicked1,player:!clicked1}" 
                                @click="addInput1" >+   
                                </button>  
        <button @click="DeleteInput1" class="add add1" :class="{'no-active':!clicked1}">x</button>
        <a v-if="clicked1" style="position:relative; top:5px;padding-left:12px">Player1</a>
    </div>
    

    <div class="player-slot player-slot-2">
        <button class="player player-2" :disabled="clicked2" @mouseenter="hover2=true" @mouseleave="hover2=false" 
                                 :class="{active:hover2,activecards:clicked2,player:!clicked2}"
                                  @click="addInput2">+           
                                  </button>  
            <button @click="DeleteInput2"  class="add add2" :class="{'no-active':!clicked2}" >x</button>
            <a v-if="clicked2" style="position:relative; top:5px;padding-left:12px"> Player2</a>
    </div>

    <div class="player-slot player-slot-3" >     
        <button class="player player-3" :disabled="clicked3"  @mouseenter="hover3=true" @mouseleave="hover3=false"  :class="{active:hover3,activecards:clicked3,player:!clicked3}" 
        @click="addInput3" >+ 
        </button>  
        <button @click="DeleteInput3" class="add add3" :class="{'no-active':!clicked3}">x</button>
        <a v-if="clicked3" style="position:relative; top:5px;padding-left:12px"> Player3</a>
    </div>

        <div class="player-slot player-slot-4">
            <button class="player player-4" :disabled="clicked4" @mouseenter="hover4=true" @mouseleave="hover4=false" :class="{active:hover4,activecards:clicked4,player:!clicked4}"
                 @click="addInput4">+ 
             </button>  
             <button @click="DeleteInput4" class="add add4" :class="{'no-active':!clicked4}" >x</button>      
             <a v-if="clicked4" style="position:relative; top:5px;padding-left:12px"> Player4</a>
            </div>

        <div class="player-slot player-slot-5">
        <button class="player player-5" :disabled="clicked5" @mouseenter="hover5=true" @mouseleave="hover5=false"  :class="{active:hover5,activecards:clicked5,player:!clicked5}" 
        @click="addInput5">+
        </button>  
        <button @click="DeleteInput5"  class="add add5" :class="{'no-active':!clicked5}" >x</button>  
        <a v-if="clicked5" style="position:relative; top:5px;padding-left:12px"> Player5</a>      
        </div>    
          
    </div>
</template>

<script>

import TableCards from '../components/TableCards.vue'

export default {
    name: 'Table',
    components:{
        TableCards
    },
    props:{
        
    },
    data(){
        return{
            hover1:false,
            hover2:false,
            hover3:false,
            hover4:false,
            hover5:false,
            clicked1:false,
            clicked2:false,
            clicked3:false,
            clicked4:false,
            clicked5:false,
            players:[]

        }
    },
    watch :{
        clearing(){ 
            //console.log('in table '+this.clear);
            this.clicked1=false;
            this.clicked2=false;
            this.clicked3=false;
            this.clicked4=false;
            this.clicked5=false;
            this.DeleteInput1();
            this.DeleteInput2();
            this.DeleteInput3();
            this.DeleteInput4();
            this.DeleteInput5();
            //this.clear=false;
            
            
        }
    },
    computed:{
        clearing(){
            return this.$store.getters.GET_CLEAR;
        }
    },
    methods:{     
        checkFindAvail(value){
            this.$emit('check-findAvail',value);
        },
        addInput1(){
            this.clicked1=true;
            this.hover1=false;
            this.$emit('add-input',1);
            
           
        },
        addInput2(){
            this.clicked2=true;
            this.hover2=false;
            this.$emit('add-input',2);
            
           
        },
        addInput3(){
            this.clicked3=true;
            this.hover3=false;
            this.$emit('add-input',3);
            
           
        },
        addInput4(){
            this.clicked4=true;
            this.hover4=false;
            this.$emit('add-input',4);
        },
        addInput5(){
            this.clicked5=true;
            this.hover5=false;
            this.$emit('add-input',5);
            
        },
        DeleteInput1(){
            this.clicked1=false;
            this.$emit('delete-input',1);
        },
        DeleteInput2(){
            this.clicked2=false;
            this.$emit('delete-input',2);
        },
        DeleteInput3(){
            this.clicked3=false;
            this.$emit('delete-input',3);
            
        },
        DeleteInput4(){
            this.clicked4=false;
            this.$emit('delete-input',4);
        },
        DeleteInput5(){
            this.clicked5=false;
            this.$emit('delete-input',5);
        }
    }

    }

</script>

<style scoped>
    
    .table-content{
        position:static;
        background: transparent;

        }
    
    .in-table{     
        width:588px;
        height:400px;
        display:grid;
        grid-template-columns: repeat(10,60px);
        grid-template-rows: 145px 60px 30px 25px 150px;
        background: url('../images/Screen1.jpg') no-repeat center center;
        grid-gap:10px; }

    
    

    .card-list1{
        grid-row-start: 3;
        grid-column-start: 2;
        z-index:10;
    }

    .card-list2{
        grid-row-start: 3;
        grid-column-start: 3;
        z-index:10;
    }


    .card-list3{
        grid-row-start: 3;
        grid-column-start: 4;
        z-index:10;
    }

    .card-list4{
        grid-row-start: 3;
        grid-column-start: 5;
        z-index:10;
    }

.card-list5{
        grid-row-start: 3;
        grid-column-start: 6;
        z-index:10;
    }

.table-card1{
        width: 60px;
        height: 80px;
        grid-row-start: 2;
        grid-column-start: 3;
        background-color: burlywood;
    }

    .bank{
        max-width:150px;
        height:20px;
        grid-column-start: 4;
        grid-column-end:7;
        grid-row-start: 3;
        margin-top: 25px;
        margin-left: auto;
        margin-right: auto;
    }

    
    .slot-1{
        grid-row-start: 2;
        grid-column-start: 3;
        grid-column-end:8;
        z-index: 10;
           
    }
    
    .player-slot{
        height: 90px;
        width:90px;
        
        
    }   
    .player-slot-1{
        position: relative;
        bottom:100px;
        left: 20px;   
    }
    .player-slot-2{
        position: relative;
        bottom:500px;
        left: 20px; 
    }
    .player-slot-3{
        position: relative;
        bottom:643px;
        left: 265px; 
    }
    .player-slot-4{
        position: relative;
        bottom: 680px;
        left:500px;
    }
    .player-slot-5{
        position: relative;
        bottom: 460px;
        left:500px;
        
    }
    
    .player{
        height: 80px;
        width:80px;
        border:2px solid rgb(0, 132, 255);
        border-radius: 5px;
        font-size: 55px;
        background-color: white;
        color: rgb(0, 132, 255);
        text-align: center;
        position: relative;
        left:5%;
        top:5%;
       
    }
    
    .active{
        background-color:rgb(17, 167, 167);
        color:white;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
    .activecards{
        width:120px;
        height:100px;
        background: url('../images/cards.jpg') no-repeat center center;
        border:1px black solid;
        font-size: 0;
    }
    .add{
        background:red ;
        border-radius:15px;
        text-align: center;
        border:1px solid black;
        position: relative;
        bottom: 115%;
        
    }
    .add1{
        left:-5%;
        bottom: 120%;
    }
    
    .no-active{
        display: none;
    }

    .spade{
        color:black;
        background-color: white;
        border-color: black;
        
    }
    .red{
        color:red;
        background-color: white;
        border-color: black;
    }
    .club{
        color:blue;
        background-color: white;
        border-color: black;
    }
    
</style>