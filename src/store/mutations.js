import getters from './getters'
const state={
    header:true,
    loading:false,
    footer:true,
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
    geohash: '31.22299,121.36025',//地址geohash值
};
const mutations={
    showHeader(state){
        state.header=true
    },
    hideHeader(state){
        state.header=false
    },
    showLoading(state){
        state.loading=true
    },
    hideLoading(state){
        state.loading=false
    },
    showFooter(state){
        state.footer=true
    },
    hideFooter(state){
        state.footer=false
    },
    saveGeohash(state,geohash){
        state.geohash=geohash;
    },
    recordAddres(state,{latitude,longitude}){
        state.latitude=latitude;
        state.longitude = longitude;
    }


};

export default{
    state,
    mutations,
    getters
}