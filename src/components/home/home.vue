<template>
    <div>
        <mt-header fixed>
        <mt-button slot="left" @click="reload">elm</mt-button>
        <mt-button slot="right">登录 |</mt-button>
        <mt-button slot="right">&nbsp;注册</mt-button>
        </mt-header>
        <div class="city-nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <strong>定位不准时，请在城市列表中选择</strong>
            </div>
            <router-link :to="'/city/'+guesscity.id"  class="city-guess">
                <span>{{guesscity.name}}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </router-link>

        </div>
        <div class="hot-city">
            <h3 class="title">热门城市</h3>
            <ul class="citylistul clear">
                <router-link :to="'/city/'+item.id" tag="li"  v-for='item in hotcity' :key="item.id">{{item.name}}</router-link>
            </ul>
        </div>
        <div class="group_city">
            <ul class="group">
                <template v-for="val in a_z" >
                   <li :key="val" class="groupcity-li"  v-if='groupcity[val]'>
                    <h3 class="title">{{val}}<span v-if="val=='A'">（按字母排序）</span></h3>
                    <ul class="citylistul clear">
                            <router-link :to="'/city/'+item.id" v-for='item in groupcity[val]' tag="li"   :key="item.id" class="group-li">{{item.name}}</router-link>
                    </ul>
                </li>      
                </template>                          
            </ul>
        </div>

        
    </div>
</template>
<script>
export default {
    data() {
        return {
            guesscity:{},
            hotcity:[],
            groupcity: {},
            a_z:'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''),
        }
    },
    mounted() {
        this.getData(); 
    },
    methods: {
        getData(){
           this.$http.all(
               [
                   this.$http.get('/api/v1/cities',{params:{type:'guess'}}),
                   this.$http.get('/api/v1/cities',{params:{type:'hot'}}),
                   this.$http.get('/api/v1/cities',{params:{type:'group'}})
           ]).then(([res1,res2,res3])=>{
               this.guesscity=res1.data;
               this.hotcity=res2.data;
               this.groupcity=res3.data
           }) 
        },
        reload(){
            window.location.reload();
        }
        
    },
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
.mint-header{
    height: 48px;
}
.city-nav{
    padding-top: 55px;
    background: $fc;
    border-bottom: 2px solid $bc;
    margin-bottom: 10px;
    .city_tip{
        @include fj;
        line-height: 40px;
        padding: 0 14px;
        border-bottom: 1px solid $bc;
        span{
            @include sc(14px,#666);
        }
        strong{
            @include sc(12px,#9f9f9f);
        }
    }
    .city-guess{
        @include fj;
        align-items: center;
        height: 45px;
        padding: 0 14px;
        @include font(18px, 24px);
        span{
            color: $blue;
        }
        i{
            font-size: 36px;
            color: #999;
        }

    }
}
.hot-city{
    background: $fc;
    margin-bottom: 10px;
}
    .title{
    color: #666;
    font-weight: 400;
    padding-left: 14px;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
    @include font(14px, 36px, "Helvetica Neue");
    }
    .citylistul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li{
            text-align: center;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            @include wh(25%,42px);
            @include font(16px,42px,"Helvetica Neue");
            color: $blue;
            &:nth-child(4n){
            border-right: none
        }
        }
    }

.group_city{
    .group{
        .groupcity-li{
             margin-bottom: 10px;
                background-color: #fff;
                border-bottom: 1px solid $bc;
                    .group-li{
                    @include wh(25%,42px);
                    color:#666;
                    padding: 0 1%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;                    
                }
        }
    }
}


</style>