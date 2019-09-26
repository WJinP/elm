<template>
    <div class="shoplist-wrapper">
        <ul>
            <router-link :to="{path:'shop',query:{geohash,id:item.id}}" tag="li" class="shoplist-li" v-for="(item, index) in shoplists" :key="index">
                <div class="shoplist-left">
                    <img :src="imgurl+item.image_path" alt="">
                </div>
                <div class="shoplist-right">
                    <div class="title clear">
                        <h3 class="name ellipsis">
                        <strong>品牌</strong>
                        <strong class="">{{item.name}}</strong>
                        </h3>
                        <ul class="supports" v-if='item.supports.length!=0'>
                            <li v-for="support in item.supports" :key='support.id'>{{support.icon_name}}</li>
                        </ul>
                    </div>                    
                    <div class="detail">
                        <div class="detail-left">
                            <star :score="item.rating" :starsize='starsize'></star><span class="score">{{item.rating}}</span><span class="count">月售{{item.recent_order_num}}单</span>
                        </div>
                        <ul class="detail-right">
                            <li class="delivery_mode" v-if="item.delivery_mode">{{item.delivery_mode.text}}</li>
                            <li class="zsda" v-if="zhunshi(item.supports)">准时达</li>
                        </ul>                        
                    </div>
                    <div class="price-distance">
                        <span class="qsprice">￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span>
                        <span class="time" v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}/<em>{{item.order_lead_time}}</em></span>
                        <span class="time">{{item.distance}}/<em>{{item.order_lead_time}}</em></span>
                    </div>
                </div>
            
            </router-link>
        </ul>
       
    </div>
</template>
<script>
import {mapState} from 'vuex'
import star from './star/star'
export default {
    components:{
        star,
    },
    props:{
        shoplists:{
            type:[Array,Object]
        }

    },
    computed: {
        ...mapState({geohash:state=>state.mutations.geohash})
    },
    data() {
        return {
            imgurl:'http://elm.cangdu.org/img/',
            starsize:24,
        }
    },
    methods: {
        zhunshi(supports){
            let zhunStatus;
            if((supports instanceof Array)&&(supports.length)){
                supports.forEach(item=>{
                    if(item.icon_name==='准'){
                        zhunStatus=true;
                    }
                })
            }else{
                zhunStatus=false;
            }
            return zhunStatus;
        }
    },
    
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
.shoplist-wrapper{
    background-color: #fff;
    margin-bottom: 65px;
    .shoplist-li{
        display: flex;
        border-bottom: 1px solid $bc;
        padding: 22px 14px;
        &:last-child{
            border: none;
        }
        
        .shoplist-left{
            flex: 0 0 80px;
            width: 80px;
            margin-right: 10px;
            img{
                width: 80px;
                height: 80px;
            }
        }
        .shoplist-right{
            flex: 1;
            width: 70%;
            .title{
                .name{
                    color: #333;
                    float: left;
                    max-width: 70%;
                    strong{
                         &:nth-child(1){
                        font-size: 16px;
                        background: #ffd930;
                        padding:0 3px;
                        border-radius: 2px;
                        }
                        &:nth-child(2){
                            font-size: 18px;
                        }
                    }                   
                }
                .supports{
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: flex-end;
                    li{
                        @include sc(10px, #999);
                        border: 1px solid #f1f1f1;
                        padding: 0 2px;
                        border-radius: 1px;
                        margin-right: 2px;
                        margin-top: 8px;
                        &:last-child{
                            margin-right: 0;
                        }                    
                    }
                }
            }
            .detail{
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 16px;
                margin-top: 10px;
                .detail-left{
                    .score{
                        color: #ff9900;
                        font-size: 14px;
                        padding: 0 2px;
                    }
                    .count{
                        @include sc(10px, #666);
                    }                   
                }
                .detail-right{
                    display: flex;
                    justify-content: flex-end;
                    li{
                        font-size: 9px;
                        line-height: 10px;
                        text-align: center;
                        padding: 0 2px;
                        border-radius: 2px;
                        border: 1px solid $blue;
                        margin-right: 2px;      
                        &.delivery_mode{
                            background-color: $blue;                        
                            color: #fff;
                            display: inline-block;
                                              
                        }
                        &.zsda{
                            color:$blue;
                            margin-right: 0
                        }
                    }
                }
            }
            .price-distance{
                display: flex;
                justify-content: space-between;
                @include sc(14px,#666);
                line-height: 14px;
                margin-top: 12px;
                .time{
                    em{
                        color: $blue;
                        font-style: normal;
                    }
                }
            }
        }
    }
    
}   
</style>