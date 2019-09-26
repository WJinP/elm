<template>
        <div class="myhead">            
            <i class="icon-arrow_lift" @click="$router.go(-1)"></i>                       
            <div class="headmain">{{headerTitle}}</div>        
        </div>
</template>
<script>
export default {
    props:['headerTitle']
    
}
</script>
<style lang="scss" scoped>
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
</style>