<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key='index'></span>
    </div>
</template>
<script>
const LENGTH=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off';
export default {
    props:{
        starsize:{
            type:Number,
            default:36
        },
        score:{
            type:Number,
            default:3.7
        }
    },
    computed:{/* 计算属性，星星样式*/
        starType(){
            return 'star-'+this.starsize
        },
        itemClasses(){
            let result=[];
            let score=Math.floor(this.score*2)/2; /* 向下取0.5的倍数的值，如4.3--4星  4.6--4.5星*/
            let hasDecimal=score%1 !==0;//是否有半星 4.5或3.5这样的
            let integer=Math.floor(score); //全星个数
            for( let i=0;i<integer;i++){
                result.push(CLS_ON);
            }
            if(hasDecimal){
                result.push(CLS_HALF);
            }
            while(result.length<LENGTH){
                result.push(CLS_OFF);
            }
            return result

        }
    }
    
}
</script>
<style lang="scss">
.star{
  float: left;
  .star-item{
    display:inline-block;
    background-repeat:no-repeat;
  }
}
.star-48{
  .star-item{
    width: 20px;
    height: 20px;
    margin-right: 22px;
    background-size: 20px 20px;
    &.last-child{
      margin-right: 0;
    }
  }
  .on{
    background-image:url(star48_on@2x.png) ;
  }
  .half{
    background-image:url(star48_half@2x.png) ;
  }
  .off{
    background-image:url(star48_off@2x.png) ;
  }  
}
.star-36{
  .star-item{
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-size: 15px 15px;
    &.last-child{
      margin-right: 0;
    }
  }
  .on{
    background-image:url(star36_on@2x.png) ;
  }
  .half{
    background-image:url(star36_half@2x.png) ;
  }
  .off{
    background-image:url(star36_off@2x.png) ;
  }
}  
.star-24{
  margin-top: 4px;
  .star-item{
    width: 10px;
    height: 10px;
    margin-right: 1px;
    background-size: 10px 10px;
    &.last-child{
      margin-right: 0;
    }
  }
  .on{
    background-image:url(star24_on@2x.png) ;
  }
  .half{
    background-image:url(star24_half@2x.png) ;
  }
  .off{
    background-image:url(star24_off@2x.png) ;
  }  
}  

</style>