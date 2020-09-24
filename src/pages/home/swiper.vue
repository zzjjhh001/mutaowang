<template>
    <div class="slider-wapper"  >
        <me-loading v-if="!sliders.length" indicator="on"></me-loading>
        <me-slider 
        :data="sliders"
        :direction="direction"
        :loop="loop"
        :interval="interval"
        :pagination="pagination"
        v-else
        >
            <swiper-slide v-for="(item ,index) in sliders" :key="index">
                <a :href="item.linkUrl" class="slider-link">
                    <img :src="item.picUrl" alt="失败" class="slider-img" />
                </a>
            </swiper-slide>
        </me-slider>
    </div>
</template>
<script>
import {sliderOptions} from 'pages/home/config.js';
import MeSlider from "base/slider/index.vue";
import {getHomeSlider} from 'api/home.js';
import { Swiper,SwiperSlide} from "vue-awesome-swiper";
import MeLoading from 'base/loading'
export default {
	name: "HomeSwiper",
	data() {
		return {
			sliders: [],
            direction: sliderOptions.direction,
            loop: sliderOptions.loop,
            interval: sliderOptions.interval,
            pagination: sliderOptions.pagination,
            // direction: sliderOptions.direction,
            // loop: sliderOptions.loop,
            // interval: sliderOptions.interval,
            // pagination: sliderOptions.pagination,
		};
    },
    created(){
        this.getSliders();
    },
	mounted(){},
	components: {
		MeSlider,
		Swiper,
        SwiperSlide,
        'me-loading':MeLoading,
        getHomeSlider,
	},
	methods: {
        update() {
            return this.getSliders();
        },
        getSliders(){
            return getHomeSlider().then(data=>{
                this.sliders = data;
            })
        },
    },
};
</script>
<style scoped lang="scss">
.slider-wapper {
	width: 100%;
	height: 183px;
}

.slider-link {
	display: block;
}

.slider-link,
.slider-img {
	overflow: hidden;
	width: 100%;
	height: 100%;
}
</style>