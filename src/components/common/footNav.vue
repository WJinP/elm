<template>
    <div class="footnav">
        <ul>
            <li @click="goAddress({path:'/indexpage', query:{geohash}})" :class="{'on':this.$route.path.indexOf('indexpage') !== -1}">
            <i class="icon-edge" slot="icon" ></i>
            <p>外卖</p>
        </li>
        <li @click="goAddress({path:`/search/${geohash}`})" :class="{'on':this.$route.path.indexOf('search') !== -1}">
            <i class="icon-search" slot="icon" ></i>
            <p>搜索</p>
        </li>
        <li @click="goAddress('/order')" :class="{'on':this.$route.path.indexOf('order') !== -1}">
           <i class="icon-file-text2" slot="icon" ></i>
            <p>订单</p>
        </li>        
        <li @click="goAddress('/profile')" :class="{'on':this.$route.path.indexOf('profile') !== -1}">
            <i class="icon-user" slot="icon" ></i>
            <p>我的</p>
        </li>
        
        </ul>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {

    // computed:mapState({ geohash:state=>state.mutations.geohash}),
    computed: {
        ...mapState({geohash:state=>state.mutations.geohash})
        
    },
    // mounted() {
    //     console.log(this.$store.state.mutations)
    // },
        
    methods: {
        goAddress(path){
            this.$router.push(path)

        }
    },
    
}
</script>
<style lang="scss">
@import '../../assets/style/mixin.scss';
.footnav{
    width: 100%;
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: $fc;
    border-top: 1px solid $bc;
    padding: 10px 0;
    ul{
        display: flex;
        li{
            flex: 1;
            width: 25%;
            color: #666;
            text-align: center;
            i{
                font-size: 20px;
                margin: 0 auto;
            }
            p{
                font-size: 16px;
                margin-top: 3px;
            }
            &.on{
                color: $blue;
            }
        }
    }
}

</style>