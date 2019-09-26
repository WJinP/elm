<template>
    <div>
        <mt-header fixed :title="cityname">
        <mt-button icon="back" @click="$router.go(-1)" slot="left"></mt-button>
        <router-link to="/home"  slot="right">
        <mt-button>切换城市</mt-button>
        </router-link>  
        </mt-header>

        
        <form action="" class="search" v-on:submit.prevent="">
            <div>
                <input type="search" name="city" id="" placeholder="输入学校、商务楼、地址" class="search_input input_style" required v-model="searchval">
            </div>
            <div>
                <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
            </div>
        </form>
        <div class="search_history" v-if="history">搜索历史</div>
        <ul class="citylist">
            <li v-for='(item,index) in searchcity' :key="index" @click="nextPage(index,item.geohash)">
                <h3 class="name">{{item.name}}</h3>
                <p class='address'>{{item.address}}</p>
            </li>
        </ul>
        <div class="remove_all" v-if="history&&searchcity.length" @click="removeAll">清空所有</div>
        <div class="search_none_place" v-if="searchnone">很抱歉！无搜索结果</div>
            
    </div>
</template>
<script>
import{setStore,getStore,removeStore} from '../../assets/js/mUtils.js'
export default {
    data() {
        return {
            cityname:'',
            cityid:'',
            searchval:'',
            searchcity:[],
            history:true,
            historycity:[],
            searchnone:false

        }
    },
    mounted() {
        this.cityid=this.$route.params.id;
        this.$http.get('/api/v1/cities/'+this.cityid).then((res)=>{
                //console.log(res)
                this.cityname=res.data.name
            });  
        this.initdata();
       
    },
    methods: {
        postpois(){
            if(this.searchval ){
                this.$http.get('/api/v1/pois',{params:{
                city_id:this.cityid,
                keyword:this.searchval                
            }}).then((res)=>{
                this.searchcity=res.data;
                this.history=false;
                this.searchnone=res.length?false:true;
                //console.log(this.searchcity)
            })
            }     
        },
        initdata(){
            if(getStore('historycity')){
                this.searchcity=JSON.parse(getStore('historycity'))
                //console.log(this.searchcity)
            }else{
                this.searchcity=[];
            }
        },
        nextPage(index, geohash){
            var historystr=getStore('historycity');
            var newcity=this.searchcity[index];
            if(historystr){
                var checkrepeat=false;
                this.historycity=JSON.parse(historystr);
                this.historycity.forEach(item=>{
                    if(item.geohash==geohash){
                        checkrepeat=true;
                    }
                });
                if(!checkrepeat){
                    this.historycity.unshift(newcity);
                }
            }else{
                this.historycity.unshift(newcity);
            }
            setStore('historycity',this.historycity);
           
            this.$router.push({path:'/indexpage', query:{geohash}});

        },
        removeAll(){
            removeStore('historycity');
            this.initdata();

        }
    },

    
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
.mint-header-title{
    font-weight: bold;
    font-size:18px;
    line-height: 30px
}
.search{
    margin-top: 48px;
    background: $fc;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 14px;
    div{
        width: 90%;
        margin: 0 auto;
        text-align: center;
        .input_style{
            border-radius: 2px;
            margin-bottom: 12px;
            @include wh(100%, 36px);
        }
        .search_input{
            border: 1px solid $bc;
            padding: 0 10px;
            @include sc(14px, #333);
        }
        .city_submit{
            background-color: $blue;
            @include sc(14px, #fff);
        }
    }
   
}
.citylist{
        background-color: #fff;
        border-top: 1px solid $bc;
        li{
            margin: 0 auto;
            padding-top: 18px;
            border-bottom: 1px solid $bc;
            .name{
                margin: 0 auto 8px;
                width: 90%;
               @include sc(16px, #333);
            }
            .address{
                width: 90%;
                margin: 0 auto 18px;
                @include sc(14px, #999);
            }
        }    
}
.search_history{
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 14px;
    @include font(13px, 24px);
}
.remove_all{
    @include sc(16px, #666);
    text-align: center;
    line-height: 36px;
    background-color: #fff;    
}
.search_none_place{
    margin: 0 auto;
    @include font(14px, 36px);
    color: #333;
    background-color: #fff;
    text-indent: 10px;
}
    
</style>