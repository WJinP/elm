<template>
    <div>
        <headerView :headerTitle='headerTitle'></headerView>
        <form action="" class="search" v-on:submit.prevent="">
            <input type="search" name="search" id="" placeholder="请输入商家或美食名称" required class="foodname" v-model="searchval">
            <input type="submit" name="submit" value="提交" class="sjfood" @click='getSearch'>
        </form>
        <div>
            <h4 class="title_restaurant">商家</h4>
            <ul class="list_container">
                <li class="list_li" v-for="item in restaurantList" :key="item.id">
                    <div class="item_left">
                        <img :src="imgurl+item.image_path" class="restaurant_img">
                    </div>
                    <div class="item_right">
                        <div class="item_right_text">
                            <p>{{item.name}} </p>
                            <p>月售 {{item.month_sales||item.recent_order_num}}  单</p>
                            <p>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                        </div>                        
                    </div>
                </li>
                <li class="list_li">
                    <div class="item_left">
                        <img src="http://elm.cangdu.org/img/167e61c03c724707.png" class="restaurant_img">
                    </div>
                    <div class="item_right">
                        <div class="item_right_text">
                            <p>malat </p>
                            <p>月售 120 单</p>
                            <p>20 元起送 / 距离6</p>
                        </div>                        
                    </div>
                </li>
            </ul>
        </div>
        <div class="search_history" v-if="searchHistory">
            <div class="title_restaurant">搜索历史</div>
            <ul>
                <li class="history_list">
                    <span class="history_text ellipsis">333</span>
                    <span class="icon-close"></span>
                </li>
            </ul>
            <div class="clear_history"><strong>清空搜索历史</strong></div>
        </div>
        <div class="search_none" v-if="searchnone">很抱歉！无搜索结果</div>
        <footNav></footNav>
        
    </div>
</template>
<script>
import{setStore,getStore,removeStore} from '../../assets/js/mUtils.js'
import footNav from '../common/footNav'
import headerView from '../common/headerView'
export default {
    components:{
        footNav,
        headerView
    },
    data() {
        return {
            headerTitle:'搜索',
            geohash:'',
            searchnone:false,
            restaurantsList:[],
            searchHistory:[],
            showHistory:true,
            searchval:'',
            imgurl:'https://fuss10.elemecdn.com',
        }
    },
    mounted() {
        //console.log(this.$route.params.geohash)
        this.geohash=this.$route.params.geohash;
        //console.log(this.geohash)


        // this.$http.get('/api/v4/restaurants',{params:{
        //         geohash:this.geohash,
        //         keyword:this.searchval
        //     }}).then((res)=>{
        //         console.log(res.data);
        //     })
    },
    methods: {
        getSearch(){
            if(this.searchval){
                this.$http.get('/api/v4/restaurants',{params:{
                    geohash:this.geohash,
                    keyword:this.searchval
                }}).then((res)=>{
                    this.restaurantsList=res.data;
                    this.showHistory=false;
                    this.searchnone=res.length?false:true;
                })  
            }

        }
    },

    
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
 .myhead{
  height:40px;
  line-height:40px;
  position:fixed;
  background-color:$blue;
  width:100%;
  color:#fff;
  padding:0px 10px;
  text-align:center;
  z-index:100;
  left: 0;
  top:0;
  font-size: 14px;
  .icon-arrow_lift{
    position:absolute;
    top:15px;
    left:10px; 
    color: #fff;       
  }
  .headmain{
    display: inline-block;
    max-width:55%;
    margin:0px auto;
    font-size: 17px;
    color: #fff;
  }
}  
.search{
    margin-top: 48px;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    input{
        height: 34px;
    }
    .foodname{
        flex: 4;
        border: 1px solid $bc;
        @include sc(14px, #333);
        border-radius: 2px;
        background-color: #f2f2f2;
        font-weight: bold;
        padding: 0 10px;
    }
    .sjfood{
        flex: 1;
        border: 1px solid $blue;
        margin-left: 5px;
        @include sc(14px, #fff);
        border-radius: 2px;
        background-color: $blue;
        font-weight: bold;
        padding: 0 10px;
    }
} 

.title_restaurant{
    font-size: 16px;
    line-height: 38px;
    text-indent: 12px;
    font-weight: bold;
    color: #666;
}
.list_container{
    background-color: #fff;
}
.list_li{
    display: flex;
    justify-content: 'center';
    padding:10px;
    border-bottom:1px solid $bc;
    .item_left{
        margin-right: 5px;
        .restaurant_img{
            @include wh(50px, 50px);
        }
    }
    .item_right{
        font-size:12px;
        flex: 1;
        .item_right_text{
            padding-bottom:5px;
            border-bottom: 1px solid $bc;
            p{
                line-height: 16px;
            }
        }
    }
}
.search_history{
    .history_list{
        background-color: #fff;
        border-bottom: 1px solid $bc;
        @include font(16px, 36px);
        padding: 0 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .history_text{
            display: inline-block;
            width: 80%;
        }
        .icon-close{
            font-size: 18px;
        }
    }
    .clear_history{
        background-color: #fff;
        color: $blue;
        @include font(16px, 36px);
        text-align: center;
    }
}
.search_none{
    margin: 0 auto;
    @include font(16px, 36px);
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 10px;
}
</style>