<template>
        <mine-navbar class="header">
            <i class="iconfont icon-scan" slot="left"></i>
            <div slot="center">搜索</div>
            <i class="iconfont icon-msg" slot="right"></i>
        </mine-navbar>
</template>
<script>
import MeNavbar from 'base/navbar';
export default {
    name:'HomeHeader',
    data(){
        return{

        }
    },
    mounted(){

    },
    components:{
        'mine-navbar':MeNavbar,
    },
    methods:{

    },
    
}
</script>
<style scoped lang="scss">
@import '~assets/scss/mixins';
    .header{
        &.mine-navbar{
            background-color: transparent;
            //background-color: $header-bgc-translucent;
        }
        &.header-transition {
            background-color: $header-bgc-translucent;
        }
        .iconfont{
            color: $icon-color-default;
            font-size: $icon-font-size;
        }
    }
</style>