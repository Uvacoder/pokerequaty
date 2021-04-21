<template >
    <div class="table-cards" v-on:keyup.esc="removeCardList">
    <button class="slot-1" :class="[{default:!choosen1},{spade:mast[0]=='spade' && choosen1},{club:mast[0]=='club' && choosen1},{red:mast[0]=='red' && choosen1}]" 
    @click="active1=!active1,active2=false,active3=false,active4=false,active5=false">{{cardvalue1}}</button>   
    <button v-show="choosen1" @click="DeleteFirst" class="del delete-1">Удалить</button>
    
    <NewList class="list-1" v-if="active1" @choose-card="ChooseCard" :position='3' /> 

    

    <button class="slot-2" :class="[{default:!choosen2},{spade:mast[1]=='spade' && choosen2},{club:mast[1]=='club' && choosen2},{red:mast[1]=='red' && choosen2}]"
     @click="active1=false,active2=!active2,active3=false,active4=false,active5=false">{{cardvalue2}}</button>   
     <button v-show="choosen2" @click="DeleteSecond" class="del delete-2">Удалить</button>

    <NewList class="list-2" v-if="active2" @choose-card="ChooseCard" :position='4' /> 


    <button class="slot-3" :class="[{default:!choosen3},{spade:mast[2]=='spade' && choosen3},{club:mast[2]=='club' && choosen3},{red:mast[2]=='red' && choosen3}]"
     @click="active1=false,active2=false,active3=!active3,active4=false,active5=false">{{cardvalue3}}</button> 
     <button v-show="choosen3" @click="DeleteThird" class="del delete-3">Удалить</button>  

    <NewList class="list-3" v-if="active3" @choose-card="ChooseCard" :position='5' /> 


    <button class="slot-4" :class="[{default:!choosen4},{spade:mast[3]=='spade' && choosen4},{club:mast[3]=='club' && choosen4},{red:mast[3]=='red' && choosen4}]"
     @click="active1=false,active2=false,active3=false,active4=!active4,active5=false">{{cardvalue4}}</button>   
     <button v-show="choosen4" @click="DeleteFourth" class="del delete-4">Удалить</button>

    <NewList class="list-4" v-if="active4" @choose-card="ChooseCard" :position='6' /> 


    <button class="slot-5" :class="[{default:!choosen5},{spade:mast[4]=='spade' && choosen5},{club:mast[4]=='club' && choosen5},{red:mast[4]=='red' && choosen5}]"
     @click="active1=false,active2=false,active3=false,active4=false,active5=!active5">{{cardvalue5}}</button>   
     <button v-show="choosen5" @click="DeleteFifth" class="del delete-5">Удалить</button>

    <NewList class="list-5" v-if="active5" @choose-card="ChooseCard" :position='7' /> 
    </div>
</template>

<script>
import NewList from '../components/CardList.vue'

export default {
    name: 'TableCards',
    components: {
        NewList
    },
    data (){
        return{
            active1: false,
            active2: false,
            active3: false,
            active4: false,
            active5: false,
            cardvalue1:'+',
            cardvalue2:'+',
            cardvalue3:'+',
            cardvalue4:'+',
            cardvalue5:'+',
            choosen1:false,
            choosen2:false,
            choosen3:false,
            choosen4:false,
            choosen5:false,
            mast:['0','0','0','0','0'],
            indexes:['99','99','99','99','99'],
           

        }
    },
    props:{
        
    },
    watch:{
        clearing(){
            
            this.removeCardList();
           //console.log('clear in tablecards '+this.clear)
            this.DeleteFirst();
            this.DeleteSecond();
            this.DeleteThird();
            this.DeleteFourth();
            this.DeleteFifth();
            this.$store.commit('SET_CLEAR',false);
            //this.clear=false;
            //  console.log(this.$store.getters.GET_CLEAR);
            
        },
    },
    computed:{
        clearing(){
            return this.$store.getters.GET_CLEAR;
        }
    },
    methods:{
        removeCardList(){
            this.active1=false;  
            this.active2=false;  
            this.active3=false;  
            this.active4=false;  
            this.active5=false;  
           
            
        },
        ChooseCard(arr){
            var value=arr[0];
            var index=arr[1];
            //console.log(index);
            
           if (this.active1){
                this.cardvalue1=value;
                this.choosen1=true;
                this.indexes[0]=index;
                if (index<13){
                    this.mast[0]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[0]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[0]="red";
                }
                
                 this.$store.dispatch('UPDATE_USED_CARDS',[0,value]); 
            } else if (this.active2){
                this.cardvalue2=value;
                this.choosen2=true;
                this.indexes[1]=index;
                if (index<13){
                    this.mast[1]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[1]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[1]="red";
                }
                 this.$store.dispatch('UPDATE_USED_CARDS',[1,value]); 
            } else if (this.active3){
                this.cardvalue3=value;
                this.choosen3=true;
                this.indexes[2]=index;
                if (index<13){
                    this.mast[2]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[2]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[2]="red";
                }
                this.$store.dispatch('UPDATE_USED_CARDS',[2,value]);
                  
            } else if (this.active4){
                this.cardvalue4=value;
                this.choosen4=true;
                this.indexes[3]=index;
                if (index<13){
                    this.mast[3]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[3]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[3]="red";
                }
                this.$store.dispatch('UPDATE_USED_CARDS',[3,value]);
                  
            }
            else if (this.active5){
                this.cardvalue5=value;
                this.choosen5=true;
                this.indexes[4]=index;
                if (index<13){
                    this.mast[4]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[4]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[4]="red";
                }
                 this.$store.dispatch('UPDATE_USED_CARDS',[4,value]); 
            }
            this.active1=false;
            this.active2=false; 
            this.active3=false;
            this.active4=false; 
            this.active5=false; 
            
        },
        DeleteFirst(){
            this.isRed1=false;
            this.isClub1=false;
            this.isSpade1=false;
            this.choosen1=false;
            this.cardvalue1='+'
            this.$store.commit('SET_ACTIVE',this.indexes[0]);
            this.$store.dispatch('UPDATE_USED_CARDS',[0,'']);

        },
        DeleteSecond(){
            this.isRed2=false;
            this.isClub2=false;
            this.isSpade2=false;
            this.choosen2=false;
            this.cardvalue2='+'
            this.$store.commit('SET_ACTIVE',this.indexes[1]);
            this.$store.dispatch('UPDATE_USED_CARDS',[1,'']);

        },
        DeleteThird(){
            this.isRed3=false;
            this.isClub3=false;
            this.isSpade3=false;
            this.choosen3=false;
            this.cardvalue3='+'
            this.$store.commit('SET_ACTIVE',this.indexes[2]);
            this.$store.dispatch('UPDATE_USED_CARDS',[2,'']);

        },
        DeleteFourth(){
            this.isRed4=false;
            this.isClub4=false;
            this.isSpade4=false;
            this.choosen4=false;
            this.cardvalue4='+'
            this.$store.commit('SET_ACTIVE',this.indexes[3]);
            this.$store.dispatch('UPDATE_USED_CARDS',[3,'']);
        },
        DeleteFifth(){
            this.isRed5=false;
            this.isClub5=false;
            this.isSpade5=false;
            this.choosen5=false;
            this.cardvalue5='+'
            this.$store.commit('SET_ACTIVE',this.indexes[4]);
            this.$store.dispatch('UPDATE_USED_CARDS',[4,'']);

        }
    }
    
}
</script>

<style scoped>
    .table-cards{
        display: grid;
        grid-template-columns: repeat(5,60px);
        grid-template-rows: 80px 20px 285px;
        grid-gap: 5px;
    }
    
    .del{
        
        width:60px;
        height: 20px;
        margin-top:auto;
        text-align: center;
        font-size: 12px;
        border-radius: 5px;
        border:1px solid;
        grid-column-start: 1;
        grid-row-start: 2;

    }

    .delete-1{
        grid-column-start: 1;
        grid-row-start: 2;

    }

    .delete-2{
        grid-column-start: 2;
        grid-row-start: 2;

    }

    .delete-3{
        grid-column-start: 3;
        grid-row-start: 2;

    }

    .delete-4{
        grid-column-start: 4;
        grid-row-start: 2;

    }

    .delete-5{
        grid-column-start: 5;
        grid-row-start: 2;

    }

    .slot-1{
        grid-column-start: 1;
        grid-row-start: 1;
        
        
    }

    .slot-2{
        grid-column-start: 2;
        grid-row-start: 1;
    }
    .slot-3{
        grid-column-start: 3;
        grid-row-start: 1;
    }
    .slot-4{
        grid-column-start: 4;
        grid-row-start: 1;
    }
    .slot-5{
        grid-column-start: 5;
        grid-row-start: 1;
    }

    .list-1{
        grid-column-start: 1;
        grid-row-start: 3;
    }
    .list-2{
        grid-column-start: 2;
        grid-row-start: 3;
    }
    .list-3{
        grid-column-start: 3;
        grid-row-start: 3;
    }
    .list-4{
        grid-column-start: 4;
        grid-row-start: 3;
    }

    .list-5{
        grid-column-start: 5;
        grid-row-start: 3;
    }
    
    .default{
        height:50px;
        width:50px;
        background: transparent;
    }
    
    .table-cards button:nth-of-type(odd){
        border: 2px solid rgb(43, 41, 41);
        font-size: 28px;    
        text-align: center;   
        border-radius: 5px;
        margin-left: auto;
        margin-right: auto;
        margin-top:auto;
        margin-bottom: auto;
        
         
             
    }

    .spade{
        color:black;
        background-color: white;
        border-color: black;
        width:60px;
        height:80px;
        
    }
    .red{
        color:red;
        background-color: white;
        border-color: black;
        width:60px;
        height:80px;
    }
    .club{
        color:blue;
        background-color: white;
        border-color: black;
        width:60px;
        height:80px;
    }

</style>