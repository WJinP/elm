<template>
    <div>
        <div class="myhead">
            <i class="icon-search"></i>
            <router-link to="/home" class="headmain ellipsis">
                {{selectname}}
            </router-link>        
            <div class="headright">
                <a href="">登录</a>|
                <a href="">注册</a>
            </div>
        </div>       
        <mt-swipe :auto="10000">
        <mt-swipe-item>
            <ul class="swip_wrapper">
                <li v-for="item in foodtype1" :key="item.id">
                    <img :src="imgurl+item.image_url" >
                    <p class="text">{{item.title}}</p>
                </li>
            </ul>
        </mt-swipe-item>
        <mt-swipe-item>
            <ul class="swip_wrapper">
                <li v-for="item in foodtype2" :key="item.id">
                    <img :src="imgurl+item.image_url" >
                    <p class="text">{{item.title}}</p>
                </li>
            </ul>
        </mt-swipe-item>
        </mt-swipe>
        <!-- <div class="shop-list-wrapper">
           <div class="shop-header">
                <i class="icon-office"></i>
                <span class="title">附近商家</span>
            </div>
            <shop-list :shoplists='shoplists'></shop-list>
        </div>  
        <footNav :selectgeohash='selectgeohash'></footNav> -->

    </div>
</template>
<script>
import shopList from '../common/shopList'
import footNav from '../common/footNav'
export default {
    components:{
        shopList,
        footNav
    },
    data() {
        return {
            selectname:'',
            selectgeohash:'',
            foodtypes:[],
            imgurl:'https://fuss10.elemecdn.com',
            foodtype1:[],
            foodtype2:[],
            shoplists:[]
        }
    },
    mounted() {
        if(!this.$route.query.geohash){
            //alert(1);
            
                this.$http.get('/api/v1/cities',{params:{
            type:'guess'}}).then((res)=>{               
              this.selectgeohash= res.data.latitude+','+res.data.longitude;
              //_this.$store.dispatch('saveGeohash',_this.selectgeohash);
            //console.log(this.selectgeohash)
            this.$store.dispatch('saveGeohash',this.selectgeohash);
            console.log(this.$store.state.mutations.geohash);

            })
            
            
            
        }else{
            this.selectgeohash=this.$route.query.geohash;
            this.$store.dispatch('saveGeohash',this.selectgeohash);
            //console.log(this.$route.query.geohash)
        }

         console.log(this.$store.state.mutations.geohash);

        

        
        


       
        

        
        // this.$http.get('/api/v2/pois/'+this.selectgeohash).then((res)=>{
        //    // console.log(res.data.name);
        //     this.selectname=res.data.name;
        // }),
        // this.$http.get('/api/v2/index_entry').then((res)=>{
        //     this.foodtypes=res.data;
        //     //console.log(this.foodtypes)
        //     this.foodtype1=this.foodtypes.slice(0,8);
        //     this.foodtype2=this.foodtypes.slice(8);
        //     //console.log(this.foodtype2)
        // }),
        // this.$http.get('/api/shopping/restaurants',{params:{
        //     latitude:this.selectgeohash[0],
        //     longitude:this.selectgeohash[1]
        // }}).then((res)=>{
        //     this.shoplists=res.data;
        //     //console.log(this.shoplists)
        // })
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
  div{
      display: inline-block;
  }
  .icon-search{
    position:absolute;
    top:15px;
    left:10px;        
  }
  .headmain{
    display: inline-block;
    max-width:55%;
    margin:0px auto;
    font-size: 17px;
    color: #fff;
  }
  .headright{
    position:absolute;
    right:10px;
    color: #fff;
    a{
        color: #fff;
    }
    }    
}
.mint-swipe{
    height: 260px;
    margin-top: 48px;
    .mint-swipe-item{
        background:$fc;
        .swip_wrapper{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-top: 10px;
            li{
                width: 25%;
                padding: 10px 14px;
                img{
                    display: block;
                    margin: 0 auto 10px;
					@include wh(60px, 60px);
                }
                
                .text{
                    text-align: center;
                    @include sc(14px, #666);

                }
            }
        }

    }
    .mint-swipe-indicator{
        background:#ddd;
        opacity: 1;
    }
    .mint-swipe-indicator.is-active{
        background: $blue;
    }
}
.shop-list-wrapper{
    background: $fc;
    margin-top: 15px;
    border-top:2px solid $bc;
    .shop-header{
        color: #999;
         @include font(14px, 32px);
        .icon-office{
            display: inline-block;
            vertical-align:middle;
            margin: 0 4px 0 14px;
            // font-size: 14px;
           
            
        }
        .title{
            display: inline-block;
            vertical-align: middle;
           
        }
    }
}   
</style>