<template>
	<swiper :options="swiperOption">
		<slot></slot>
		<div class="swiper-pagination" v-if="pagination" slot="pagination">
        </div>
	</swiper>
</template>
<script>
import {Swiper,SwiperSlider} from 'vue-awesome-swiper'
export default {
    name:'MeSlider', 
    data(){
        return{
            
            
        };
    },
    watch:{
        data(newData){
            if(newData.length === 0){
                return;
            }
            this.swiperOption.loop = newData.length === 1 ? false :this.loop;
        }
    }, 
    created(){
        this.init();
    },
    mounted(){

    },
    components:{
        Swiper,
        SwiperSlider,
    },
    props:{
        direction:{
            type:String,
            default:'horizontal',
            validator(value){
                return [
                    'horizontal',
                    'vertical'
                ].indexOf(value) > -1;
            },
        },
        interval:{
            type:Number,
            default:3,
            validator(value){
                return value >=0
            },
        },
        loop:{
            type:Boolean,
            default:true,
        },
        pagination:{
            type:Boolean,
            default:true,
        },
    },
    methods:{
        init(){
            this.swiperOption = {
                watchOverflow: true,
                direction: this.direction,
                autoplay: this.interval ? {
                    delay: this.interval,
                    disableOnInteraction: false
                } : false,
                slidesPerView: 1,
                loop: this.loop,
                pagination: {
                    el: this.pagination ? '.swiper-pagination' : null
                },
                data: this.data,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,
                paginationClickable: true,
            };


        }
    },
    
}
</script>
<style scoped lang="scss">

</style>