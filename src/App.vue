<template>
  <div id="app">
 
      <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
       city:[],
    }
  },
  mounted() {
    this.$http.get('/api/v1/cities',{params:{
      type:'group'
    }}).then((res)=>{
      this.city=res.data
    }).catch((err)=>{
      console.log(err)
    })    
  },
}
</script>

<style lang="scss">
.mint-swipe{
  height: 200px;
  .mint-swipe-item{
    background: #000;
  }
}
</style>
