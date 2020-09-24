<template>
    <div class="home">
        <header class="g-header-container" v-show="isShow">
            <home-header  :class="{'header-transition':isHeaderTransition}" />
        </header>
        <scroll :scrollbar='true' 
        :data="recommends"
        pullDown
        @pull-down="pullToRefresh"
        @pull-up="pullToRefresh1"
        @scroll-end="scrollEnd"
        @scroll="scroll"
        @pull-down-end="changeHeader"
        ref="scroll"
        >
            <home-swiper ref="homeswiper"/>
            <home-nav/>
            <home-recommend ref="homerecommend" @loaded='getRecommends'/>
        </scroll>
        <div class="g-backtop-container">
            <backtop
            :visible="isBackTopVisible"
            @backtop="backToTop"
            ></backtop>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import HomeHeader from './header'
import HomeSwiper from './swiper'
import Scroll from 'base/scroll'
import HomeNav from 'pages/home/nav'
import HomeRecommend from 'pages/home/recommend'
import BackTop from 'base/backtop'

export default {
    name:'',
    data(){
        return{
            recommends:[],
            isBackTopVisible:false,
            isHeaderTransition:false,
            isShow:true
        }
    },
    created(){
    },
    props:{
        data:{
            type :Array,
        },
    },
    watch:{

    },
    mounted(){

    },
    components:{
        HomeHeader,
        HomeSwiper,
        Scroll,
        HomeNav,
        HomeRecommend,
        'backtop':BackTop,
    },
    methods:{
        updataeScroll(){},
        getRecommends(recommends){
            this.recommends=recommends
        },
        pullToRefresh(end){
            this.$refs.homeswiper.update().then(end);
        },
        pullToRefresh1(up){
            this.$refs.homerecommend.update().then(up)
            .catch(err=>{
                if(err){
                    console.log(err)
                }
                up();
            });
        },
        scrollEnd(translate,scroll){
            this.isBackTopVisible = translate < 0 && -translate > scroll.height;
        },
        backToTop(){
            this.$refs.scroll && this.$refs.scroll.scrollToTop();
            this.isHeaderTransition=false
        },
        scroll(translate,swiper){
            if(translate>0){
                this.isShow = false
            }
            if(translate<-50){
                this.isHeaderTransition=true
            }else if(translate>-50){
                this.isHeaderTransition=false
            }
        },
        changeHeader(){
            setTimeout(()=>{
                this.isShow=true;
            },100)
            
        }
    },
    
}
</script>
<style scoped lang="scss">
@import '~assets/scss/mixins';
.home {
    overflow:hidden;
    width:100%;height:100%;
    background-color: $bgc-theme;
}

</style>