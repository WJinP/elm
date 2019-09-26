<template>
    <div>
        <headerView :headerTitle='headerTitle'></headerView>
        <div class="title">
            
        </div>
        <footNav></footNav>
    </div>
</template>
<script>
import footNav from '../common/footNav'
import headerView from '../common/headerView'
export default {
    components:{
        footNav,
        headerView
    },
    data() {
        return {
            headerTitle:'订单列表',
        }
    },
    
}
</script>
<style lang="scss">
    
</style>