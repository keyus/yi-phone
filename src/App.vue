<template>
    <div id="app">
        <div class="clear" @click="clear"><button>清除</button></div>
        <div class="mi">{{mi}}</div>
        <div class="shu">
        <span v-for="it in Yi"
              @click="toggle(it)"
              :class="{
                ji: it.value === 1,
                ban: it.value === 2,
                active: it.index === active.index,
                animation: it.index === active.index,
              }">{{it.index}}</span>
        </div>
        <div class="phone">
            计算： <input type="text" v-model="inputShu"> 结果：{{sum}}
        </div>
        <div class="phone-list">
        <span v-for="it in BUY"
              :class="{
                active: it.active,
              }">
            <label>{{it.h}}</label>{{it.price}}
        </span>
        </div>

        <div class="hao-filter">
            条件：
            <input type="text" v-model="p1"/>
            <input type="text" v-model="p2"/>
            <input type="text" v-model="p3"/>
            <input type="text" v-model="p4"/>
            <input type="text" v-model="p5"/>
            <input type="text" v-model="p6"/>
            <input type="text" v-model="p7"/>
            <input type="text" v-model="p8"/>
            <input type="text" v-model="p9"/>
            <input type="text" v-model="p10"/>
            <input type="text" v-model="p11"/>
            <button @click="search">搜 索</button>
            {{pValue}}
        </div>
        <div class="hao-data">
        <span v-for="it in netData"
              :class="{
                ji: it.value === 1,
                ban: it.value === 2,
                bad: it.value === 3,
              }">
            <i>{{it.value|format}}</i>
            <label>{{it.phone}}</label>
            <em>{{it.total}}</em>
            <strong>￥{{it.price}}</strong>
        </span>
        </div>
    </div>
</template>

<script>
    import Yi from './util/yi'
    import BUY from './util/buy'
    import {searchPhone} from './api'
    const SHU_TYPE = {
        1: '上',
        2: '中',
        3: '下',
    }
    export default {
        name: 'app',
        data(){
            return {
                Yi,             //易
                BUY,            //有意向的号码
                active: {},
                inputShu: '',   //计算输入文本
                netData: [],    //远程数据

                p1: 1,
                p2: 3,
                p3: 7,
                p4: 0,
                p5: '',
                p6: '',
                p7: '',
                p8: '',
                p9: '',
                p10: '',
                p11: '',
            }
        },
        computed: {
            sum(){
                let sum = 0 ;
                for (let i of  String(this.inputShu)){
                    sum += Number(i);
                }
                const find = Yi.find(it=>it.index === sum);
                if(find) this.active = find;
                return sum;
            },
            mi(){
                return this.active.mean;
            },
            pValue(){
                const [
                    p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11
                ] = [
                    String(this.p1),
                    String(this.p2),
                    String(this.p3),
                    String(this.p4),
                    String(this.p5),
                    String(this.p6),
                    String(this.p7),
                    String(this.p8),
                    String(this.p9),
                    String(this.p10),
                    String(this.p11),
                ]
                let value = '';
                value += p1 || '_';
                value += p2 || '_';
                value += p3 || '_';
                value += p4 || '_';
                value += p5 || '_';
                value += p6 || '_';
                value += p7 || '_';
                value += p8 || '_';
                value += p9 || '_';
                value += p10 || '_';
                value += p11 || '_';
                return value;
            }
        },

        mounted(){
            document.documentElement.addEventListener('doubleclick',()=>{
                console.log(11)
            })
        },
        methods: {
            clear(){
                this.active = {}
            },
            toggle(it){
                this.active = it;
            },
            async search(){
                const res = await searchPhone(this.pValue);
                this.netData = res;
            }
        },
        filters: {
            format(value){
                return SHU_TYPE[value]
            }
        }
    }
</script>

