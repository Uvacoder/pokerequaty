<template>

<div class="diapason-content">
    <div class="active">
    <!---
    <input disabled class="grid-element" style="width:30px;height:30px" value="AA" :class="{'in-diapason':value>0}"><input>-->
    <div class="grid-element grid-element1" :class="{'in-diapason':value>0}">AA</div>
    <div class="grid-element suited" :class="{'in-diapason':value>2}">AKs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>4}">AQs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>6}">AJs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>=9}">ATs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>11}">A9s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>13}">A8s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>15}">A7s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>15}">A6s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>15}">A5s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>17}">A4s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>17}">A3s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>19}">A2s</div>

    <!---2-->
    <div class="grid-element unsuited" :class="{'in-diapason':value>2}">AKo</div>
    <div class="grid-element" :class="{'in-diapason':value>0}">KK</div>
    <div class="grid-element suited" :class="{'in-diapason':value>6}">KQs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>9}">KJs</div>
    <div class="grid-element suited " :class="{'in-diapason':value>13}">KTs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>19}">K9s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>23}">K8s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>29}" >K7s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>33}">K6s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>35}">K5s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>45}">K4s</div>
    <div class="grid-element suited"  :class="{'in-diapason':value>47}">K3s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>47}"> K2s</div>


    <!---3 Queens-->
    <div class="grid-element unsuited" :class="{'in-diapason':value>4}">AQo</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>9}">KQo</div>
    <div class="grid-element" :class="{'in-diapason':value>0}">QQ</div>
    <div class="grid-element suited" :class="{'in-diapason':value>13}">QJs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>17}">QTs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>21}">Q9s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>23}">Q8s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>33}">Q7s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>35}">Q6s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>45}">Q5s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>47}">Q4s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>47}">Q3s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>47}">Q2s</div>

    <!---4 Jacks-->
    <div class="grid-element unsuited" :class="{'in-diapason':value>=10}">AJo</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>17}">KJo</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>21}">QJo</div>
    <div class="grid-element" :class="{'in-diapason':value>4}">JJ</div>
    <div class="grid-element suited" :class="{'in-diapason':value>19}">JTs</div>
    <div class="grid-element suited" :class="{'in-diapason':value>23}">J9s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>27}">J8s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>33}">J7s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>43}">J6s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>49}">J5s</div>
    <div class="grid-element suited">J4s</div>
    <div class="grid-element suited">J3s</div>
    <div class="grid-element suited">J2s</div>


    <!---5 Tens-->
    <div class="grid-element unsuited" :class="{'in-diapason':value>15}">ATo</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>25}">KTo</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>25}">QTo</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>27}">JTo</div>
    <div class="grid-element" :class="{'in-diapason':value>6}">TT</div>
    <div class="grid-element suited" :class="{'in-diapason':value>19}">T9s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>27}">T8s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>35}">T7s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>37}">T6s</div>
    <div class="grid-element suited">T5s</div>
    <div class="grid-element suited">T4s</div>
    <div class="grid-element suited">T3s</div>
    <div class="grid-element suited">T2s</div>
    
    <!--- Nines -->
    <div class="grid-element unsuited" :class="{'in-diapason':value>25}">A9o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>27}">K9o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>29}">Q9o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>29}"> J9o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>29}">T9o</div>
    <div class="grid-element" :class="{'in-diapason':value>9}">99</div>
    <div class="grid-element suited" :class="{'in-diapason':value>23}">98s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>35}">97s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>37}">96s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>45}">95s</div>
    <div class="grid-element suited">94s</div>
    <div class="grid-element suited">93s</div>
    <div class="grid-element suited">92s</div>

    <!---Eights -->
    <div class="grid-element unsuited" :class="{'in-diapason':value>25}">A8o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>31}">K8o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>33}">Q8o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>37}">J8o</div>
    <div class="grid-element unsuited " :class="{'in-diapason':value>39}">T8o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>39}">98o</div>
    <div class="grid-element" :class="{'in-diapason':value>11}">88</div>
    <div class="grid-element suited" :class="{'in-diapason':value>25}">87s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>37}">86s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>45}">85s</div>
    <div class="grid-element suited">84s</div>
    <div class="grid-element suited">83s</div>
    <div class="grid-element suited">82s</div>

    <!---Sevens -->
    <div class="grid-element unsuited" :class="{'in-diapason':value>31}">A7o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>35}">K7o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>39}">Q7o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>39}">J7o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>43}">T7o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>43}">97o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>39}">87o</div>
    <div class="grid-element" :class="{'in-diapason':value>11}">77</div>
    <div class="grid-element suited" :class="{'in-diapason':value>29}">76s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>45}">75s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>49}">74s</div>
    <div class="grid-element suited">73s</div>
    <div class="grid-element suited">72s</div>

    <!---Sixs -->
    <div class="grid-element unsuited" :class="{'in-diapason':value>31}">A6o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>49}">K6o</div>
    <div class="grid-element unsuited">Q6o</div>
    <div class="grid-element unsuited">J6o</div>
    <div class="grid-element unsuited">T6o</div>
    <div class="grid-element unsuited">96o</div>
    <div class="grid-element unsuited">86o</div>
    <div class="grid-element unsuited" :class="{'in-diapason':value>41}">76o</div>
    <div class="grid-element" :class="{'in-diapason':value>11}">66</div>
    <div class="grid-element suited" :class="{'in-diapason':value>31}">65s</div>
    <div class="grid-element suited" :class="{'in-diapason':value>49}">64s</div>
    <div class="grid-element suited">63s</div>
    <div class="grid-element suited">62s</div>
    <!---Fives-->
    <div class="grid-element unsuited" :class="{'in-diapason':value>33}">A5o</div>
    <div class="grid-element unsuited">K5o</div>
    <div class="grid-element unsuited">Q5o</div>
    <div class="grid-element unsuited">J5o</div>
    <div class="grid-element unsuited">T5o</div>
    <div class="grid-element unsuited">95o</div>
    <div class="grid-element unsuited">85o</div>
    <div class="grid-element unsuited">75o</div>
    <div class="grid-element unsuited">65o</div>
    <div class="grid-element" :class="{'in-diapason':value>19}">55</div>
    <div class="grid-element suited" :class="{'in-diapason':value>41}">54s</div>
    <div class="grid-element suited">53s</div>
    <div class="grid-element suited">52s</div>

    <!---Fours -->
    <div class="grid-element unsuited" :class="{'in-diapason':value>41}">A4o</div>
    <div class="grid-element unsuited">K4o</div>
    <div class="grid-element unsuited">Q4o</div>
    <div class="grid-element unsuited">J4o</div>
    <div class="grid-element unsuited">T4o</div>
    <div class="grid-element unsuited">94o</div>
    <div class="grid-element unsuited">84o</div>
    <div class="grid-element unsuited">74o</div>
    <div class="grid-element unsuited">64o</div>
    <div class="grid-element unsuited">54o</div>
    <div class="grid-element" :class="{'in-diapason':value>21}">44</div>
    <div class="grid-element suited" :class="{'in-diapason':value>43}">43s</div>
    <div class="grid-element suited">42s</div>

    <!---TRIples-->
    <div class="grid-element unsuited" :class="{'in-diapason':value>41}">A3o</div>
    <div class="grid-element unsuited">K3o</div>
    <div class="grid-element unsuited">Q3o</div>
    <div class="grid-element unsuited">J3o</div>
    <div class="grid-element unsuited">T3o</div>
    <div class="grid-element unsuited">93o</div>
    <div class="grid-element unsuited">83o</div>
    <div class="grid-element unsuited">73o</div>
    <div class="grid-element unsuited">63o</div>
    <div class="grid-element unsuited">53o</div>
    <div class="grid-element unsuited">43o</div>
    <div class="grid-element" :class="{'in-diapason':value>21}">33</div>
    <div class="grid-element suited" :class="{'in-diapason':value>43}">32s</div>

    <!---deuces -->

    <div class="grid-element unsuited" :class="{'in-diapason':value>49}">A2o</div>
    <div class="grid-element unsuited">K2o</div>
    <div class="grid-element unsuited">Q2o</div>
    <div class="grid-element unsuited">J2o</div>
    <div class="grid-element unsuited">T2o</div>
    <div class="grid-element unsuited">92o</div>
    <div class="grid-element unsuited">82o</div>
    <div class="grid-element unsuited">72o</div>
    <div class="grid-element unsuited">62o</div>
    <div class="grid-element unsuited">52o</div>
    <div class="grid-element unsuited">42o</div>
    <div class="grid-element unsuited">32o</div>
    <div class="grid-element " :class="{'in-diapason':value>21}">22</div>
    </div>

    <button class="ten-percent"  >10%</button>
    <button class="seventeen-percent">16%</button>
    <button class="zero" @click="value=2" >Очистить</button>
    
    <input @change="changeDiapason" class="slider" type="range" min="2" max="50" step="2" v-model="value">
    <p class="slider-value">> {{value}}%</p>
</div>
    
</template>

<script>
export default {
    name: 'Diapason',
    data(){
        return {
            value:2,
            diapasonValues:['AA','KK','QQ']
            }
    },
    methods:{
        changeDiapason(){
            let divs=document.getElementsByClassName('in-diapason');
            let tempArr=[];
            for (let el of divs) {
                tempArr.push(el.innerText);
            }
            this.diapasonValues=tempArr;
            this.$store.dispatch('UPDATE_DIAPASON',this.diapasonValues); 
            
        }
    }
}
</script>

<style scoped>
.slider{
    width:520px;
    grid-column-start: 1;
    
    grid-row-start: 10;
}



.slider-value{
    margin-left: 5px;
    grid-column-start: 2;
    grid-row-start: 10;
    font-size: 18px;
    
}
.active{
    
    display: grid;
    grid-template-columns: 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px ; 
    grid-template-rows: 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px 30px ; 
    grid-gap: 10px;
}
.grid-element{
      border:2px solid #57b5f0;
      height:35px;
      width:35px;
      color:#000000;
      text-align: center;
      border-radius: 5px;
      
    }
.diapason-content{
    display: grid;
    grid-template-columns: 540px 60px;
    grid-template-rows: 60px 60px 60px 60px 60px 60px 60px 60px 60px 60px;
}
.ten-percent{
    grid-column-start: 2;
    grid-row-start: 3;
}

.diapason-content button{
    width:80px;
    height: 40px;
}

.seventeen-percent{
    grid-column-start: 2;
    grid-row-start: 5;
    
    
}

.zero{
    grid-column-start: 2;
    grid-row-start: 7;
    
}

.suited{
    background-color: khaki;
}

.unsuited{
    background-color:rgb(214, 214, 214);
}

.choosen{
    background-color: rgb(62, 62, 221);
}
.in-diapason{
    background-color:rgb(168, 217, 247);
    color:white;
    text-align: center;
}
</style>