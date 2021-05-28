<template> <div class="main">
               <!-- <div class="available-cards av1">
                    <button  @click="ChooseCard($event,index)" v-for="(card,index) in cards" :key=index  :disabled="!clicked[index]" >{{card}}</button>
                </div>-->

                <div class="available-cards av2">
                    <CardButton @choose-card="ChooseCard($event,index)" v-for="(card,index) in cards" :key='index' :value='card' :index='index' :position='position' />
                </div>
                
            </div>
</template>

<script>
import CardButton from './CardButton.vue';


export default {
    name: 'CardList',
    data(){
        return{
            cards:['A♠','K♠','Q♠','J♠','T♠','9♠','8♠','7♠','6♠','5♠','4♠','3♠','2♠','A♣','K♣','Q♣','J♣','T♣','9♣','8♣','7♣','6♣','5♣','4♣','3♣','2♣',
      'A♦','K♦','Q♦','J♦','T♦','9♦','8♦','7♦','6♦','5♦','4♦','3♦','2♦','A♥','K♥','Q♥','J♥','T♥','9♥','8♥','7♥','6♥','5♥','4♥','3♥','2♥'],
            
        }
    },
    props:{
        position:Number,
    },
    methods:{
        ChooseCard(arr){
            
            //this.$store.commit('SET_CLICK',arr[1]);
            //console.log(this.$store.getters.CLICKS);
            //console.log(this.position);
            this.$emit('choose-card',arr);
            
        },
        
    },
    components:{
        CardButton
       
    },
    computed:{
        clicked (){
            return this.$store.getters.CLICKS;
        },
        
        },
    
    
}
</script>

<style scoped>

    .available-cards button{
        
        width: 35px;
        height: 20px;
        background-color: white;
        border:1px solid black;
        margin-left:auto;
        margin-right: auto;
        
        
    }
    
    .available-cards {
        background-color: rgb(245, 243, 226);
        width:150px;
        height:275px;
        display: flex;
        flex-wrap:wrap;
        flex-direction: column;
        justify-content: space-around;
        
        
        /** 
        grid-template-columns: 38px 38px 38px 38px;
       grid-template-rows: 20px 20px 20px 20px 20px 20px 20px 20px 20px 20px 20px 20px 20px;
       grid-gap: 1px;
       */           
    }
    

</style>