<template>
    <div>
        <headerView :headerTitle='headerTitle'></headerView>
        <div class="profile">
            <div class="profile-number">
                <div class="profile-link">
                    <img src="http://elm.cangdu.org/img/default.jpg" alt="" class="privateImage">
                    <img src="http://elm.cangdu.org/img/164ad0b6a3917599.jpg" alt="" class="privateImage">
                </div>
            </div>
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
            headerTitle:'我的',
        }
    },
    
}
</script>
<style lang="scss">
    
</style>