<template>
	<swiper :options="swiperOption" ref='swiper'>
		<div class="mine-scroll-pull-down" v-if="pullDown">
			<me-loading :text="pullDownText" ref="pullDownMeLoading" inline></me-loading>
		</div>
		<swiper-slide>
			<slot></slot>
		</swiper-slide>
		<div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
        <div class="mine-scroll-pull-up" v-if="pullUp">
            <me-loading :text="pullUpText" ref="pullUpMeLoading" inline></me-loading>
        </div>
        
	</swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import MeLoading from "base/loading"; 
import {PULL_DOWN_HEIGHT,PULL_DOWN_TEXT_INIT,
        PULL_DOWN_TEXT_START,PULL_DOWN_TEXT_ING,
        PULL_DOWN_TEXT_END,
        PULL_UP_HEIGHT,PULL_UP_TEXT_INIT,
        PULL_UP_TEXT_START,PULL_UP_TEXT_ING,
        PULL_UP_TEXT_END} from './config.js'
export default {
	name: "Scroll",
	components: {
		'swiper':Swiper,
		SwiperSlide,
		MeLoading,
	},
	props: {
		scrollbar: {
			type: Boolean,
			default: false,
		},
		pullDown: {
			type: Boolean,
			default: false,
        },
        pullUp:{
            type: Boolean,
			default: true,
        }
	},
	data() {
		return {
			swiperOption: {
				direction: "vertical",
				slidesPerView: "auto",
				freeMode: true,
				setWrapperSize: true,
				scrollbar: {
					el: this.scrollbar ? ".swiper-scrollbar" : null,
					hide: true,
                },
                on:{
                    sliderMove:this.scroll,
                    touchEnd:this.touchEnd,
                    transitionEnd: this.scrollEnd,
                },
            },
            
            pullDownText: PULL_DOWN_TEXT_INIT,
            pullUpText:PULL_UP_TEXT_INIT,
            pulling:false,
		};
	},
	computed: {},
	watch: {
        data(){
        },
	},
	methods: {
		update() {
			this.$refs.swiper && this.$refs.swiper.$swiper.update();
        },
        //滚动就触发
		scroll() {
            const swiper = this.$refs.swiper.$swiper;
            this.$emit('scroll', swiper.translate, this.$refs.swiper);
            if(this.pulling){
                return;
            }
            this.pulling=true
            //下拉
			if (swiper.translate > 0) {
				if (!this.pullDown) {
					return;
				}
				if (swiper.translate > PULL_DOWN_HEIGHT) {
					this.$refs.pullDownMeLoading.setText(PULL_DOWN_TEXT_START);
				}else{
                    this.$refs.pullDownMeLoading.setText(PULL_DOWN_TEXT_INIT);
                }
            }
            //上拉
            if(swiper.isEnd){
                const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
                const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
                if(!this.pullUp){
                    return;
                }
                if(isPullUp){
                    this.$refs.pullUpMeLoading.setText(PULL_UP_TEXT_START);
                }else{
                    this.$refs.pullUpMeLoading.setText(PULL_UP_TEXT_INIT);
                }
            }
            this.pulling = false
        },

        touchEnd(){
            if(this.pulling){
                return;
            }
            const swiper = this.$refs.swiper.$swiper;
            const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
            const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
            if(swiper.translate>PULL_DOWN_HEIGHT){
                swiper.allowTouchMove = false;// 禁止触摸
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate(PULL_DOWN_HEIGHT);
                swiper.params.virtualTranslate = true;// 定住不给回弹
                this.$refs.pullDownMeLoading.setText(PULL_DOWN_TEXT_ING);
                this.$emit('pull-down', this.pullDownEnd);// 触发一个事件
            }else if(isPullUp){
                swiper.allowTouchMove = false;// 禁止触摸
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
                swiper.params.virtualTranslate = true;// 定住不给回弹
                this.$refs.pullUpMeLoading.setText(PULL_UP_TEXT_ING);
                this.$emit('pull-up', this.pullUpEnd);// 触发一个事件
            }
            this.pulling = false
        },
        pullDownEnd() {
            const swiper = this.$refs.swiper.$swiper;
            this.pulling = false;
                this.$refs.pullDownMeLoading.setText(PULL_DOWN_TEXT_END);
                swiper.params.virtualTranslate = false;
                swiper.allowTouchMove = true;
                swiper.setTransition(swiper.params.speed);
                swiper.setTranslate(0);
                this.$emit("pull-down-end")
        },
        //上拉
        pullUpEnd() {
            const swiper = this.$refs.swiper.$swiper;
            this.pulling = false;
            this.$refs.pullUpMeLoading.setText(PULL_UP_TEXT_END);
            swiper.params.virtualTranslate = false;
            swiper.allowTouchMove = true;
        },
        scrollEnd(){
            const swiper = this.$refs.swiper.$swiper;
            this.$emit('scroll-end', swiper.translate, swiper);
            this.pulling = false
        },

        scrollToTop(speed, runCallbacks) {
            this.$refs.swiper && this.$refs.swiper.$swiper.slideTo(0, speed, runCallbacks);
        },
	},
	created() {
	},
	mounted() {},
	beforeCreate() {},
	beforeMount() {},
	beforeUpdate() {},

	beforeDestroy() {},
	destroyed() {},
	activated() {},
};
</script>
    <style lang='scss' scoped>
.swiper-container {
	overflow: hidden;
	width: 100%;
	height: 100%;
}

.swiper-slide {
	height: auto;
}
.mine-scroll-pull-up,
.mine-scroll-pull-down {
	position: absolute;
	left: 0;
	width: 100%;
}
.mine-scroll-pull-down {
	bottom: 100%;
	height: 80px;
}

.mine-scroll-pull-up {
	top: 100%;
	height: 30px;
}
</style>