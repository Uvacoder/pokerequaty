
    <template>
    <div class="cards" v-on:keyup.esc="removeCardList">
        <button @click="clicked1=!clicked1,clicked2=false"  class="card card-1" 
        :class="[{clicked:clicked1},{spade:mast[0]=='spade' && choosen1},{club:mast[0]=='club' && choosen1},{red:mast[0]=='red' && choosen1},{big:choosen1}]"><p>{{card1}}</p>
        </button>
        <button @click="clicked2=!clicked2,clicked1=false" class="card card-2" 
        :class="[{clicked:clicked2},{spade:mast[1]=='spade' && choosen2},{club:mast[1]=='club' && choosen2},{red:mast[1]=='red' && choosen2},{big:choosen2}]"><p>{{card2}}</p>
        </button>
        <!--delete-cards-->
        <button @click="DeleteFirst" @mouseenter="delActive1=true" @mouseleave="delActive1=false" v-show="choosen1" class="del delete-1" :class="{'del-clicked':delActive1}">Удалить</button>
        <button @click="DeleteSecond" @mouseenter="delActive2=true" @mouseleave="delActive2=false" v-show="choosen2" class="del delete-2" :class="{'del-clicked':delActive2}">Удалить</button>
        
        <!--show all cards-->
        <div v-if="clicked1" class="available">
                <CardList @choose-card="ChooseCard" :position='1' />
                </div>

        <div v-if="clicked2" class="available">
                <CardList @choose-card="ChooseCard" :position='2' />      
            
        </div>
    </div>  
</template>

<script>
import CardList from '../components/CardList.vue'


export default {
    name:'MainPlayer',
    components:{
        CardList,
    },
    data(){
        return{
            clicked2:false,
            clicked1:false,
            card1: 'Card 1',
            card2: 'Card 2',
            mast:['0','0'],
            indexes:['99','99'],
            choosen1:false,
            choosen2:false,
            delActive1:false,
            delActive2:false,
            clicked:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            temporary:1,
        }
    },
    watch:{
        clearing(){
            this.removeCardList();
            this.DeleteFirst();
            this.DeleteSecond();
        }
    },
    computed:{
        clearing(){
            return this.$store.getters.GET_CLEAR;
        }
    },
    methods:{
        removeCardList(){
            //console.log('esc clicked');
            this.clicked2=false;
            this.clicked1=false;
        },
        ChooseCard(arr){
            
            //var classname=arr[0];
            var value=arr[0];
            var index=arr[1];
            
            
           if (this.clicked1){
                
                this.indexes[0]=index;
                
                this.card1=value;
                this.choosen1=true;
                if (index<13){
                    this.mast[0]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[0]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[0]="red";
                }
                 this.$store.dispatch('UPDATE_USED_CARDS',[5,value]); 
            }
            else if(this.clicked2){
                this.indexes[1]=index;
                this.card2= value;
                this.choosen2=true;
                if (index<13){
                    this.mast[1]="spade";
                } else if (index>12 && index<=25) {
                    this.mast[1]="club"; 
                }
                else if (index>25 && index< 52) {
                    this.mast[1]="red";
                }
                this.$store.dispatch('UPDATE_USED_CARDS',[6,value]);
            
           }
            this.clicked1=false;
            this.clicked2=false; 
        },
        DeleteFirst(){
            this.mast[0]="0"
            this.card1="Card 1";
            this.choosen1=false;
            this.$store.commit('SET_ACTIVE',this.indexes[0]);
            this.$store.dispatch('UPDATE_USED_CARDS',[5,'']);
        },
        DeleteSecond(){
            this.mast[1]="0"
            this.card2="Card 2";
            this.choosen2=false;
            this.$store.commit('SET_ACTIVE',this.indexes[1]);
            this.$store.dispatch('UPDATE_USED_CARDS',[6,'']);
        }
        
    }
    
}
</script>

<style scoped>
    .card{
        height:100px;
        width:70px;
        border:rgb(130, 128, 235) 2px solid;
        text-align: center;
        border-radius: 5px;
        color:blue ;
    }

    .del{
    height:25px;
    width:70px;
    background-color: white;
    color:red;
    border:2px rgb(240, 67, 67) solid;
    border-radius: 5px;
    }

    .delete-2{
        grid-column-start: 2;
        grid-row-start: 2;
    }

    .plus{
        
        font-size: 25px;
        color:rgb(130, 128, 235) ;
    }
    .cards{
        display:grid;
        grid-template-columns: 80px 80px;
        grid-template-rows: 110px  30px 275px;
        margin-left:55px;
    }
    
    .available-cards {
        background-color: khaki;
        width:300px;
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
    
    .available{
        display: grid;
        grid-row-start: 3;
        
    }
    
    .big{
        font-size: 30px;
    }
    
    .available-cards button{
        
        width: 35px;
        height: 20px;
        background-color: white;
        border:1px solid black;
        margin-left:auto;
        margin-right: auto;
        
    }
    
    .clicked{
        background-color: white;
    }
    
    .del-clicked{
        background-color: rgb(240, 67, 67);
        color:white;
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