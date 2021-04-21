<template>
    <button :class="{red:mast==1,club:mast==2}"  @click="ChooseCard($event)" :disabled="!clicked[index]">{{ value }}</button>  
</template>

<script>
export default {
    name:'CardButton',
    props: {
            value: String,
            index: Number,
            position: Number
  },
   data(){
       return{
            
        }
    },
    methods:{
        ChooseCard(e){
              
                this.$store.dispatch('SET_FIRST_PLAYER_CARD',[this.index,this.position]);
                    this.$emit('choose-card',[e.target.innerText,this.index]);
        }
        
    },
    computed : {
        mast() {
            var len=this.value.length-1;
            
            if (!this.clicked[this.index]) {
                return 0;
            }
            else if (this.value.charAt(len)=='♦' || this.value.charAt(len)=='♥' ){
                return 1;
            } else if (this.value.charAt(len)=='♣'){
                return 2;
            }   
            else {
                return 3;
            } 
        },
        clicked(){
            return this.$store.getters.CLICKS;
        }
    },
    
}
</script>
    

<style scoped>

    .red{
        color: red;
    }

    .club {
        color:blue;
    }


</style>