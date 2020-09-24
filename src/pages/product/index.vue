<template>
    <div>Product</div>
</template>
<script>
export default {
    name:'',
    data(){
        return{

        }
    },
    created(){
        this.getC();
    },
    mounted(){

    },
    components:{

    },
    methods:{
        getC(){
            console.log(this.$route.params.id)
        },
    },
    
}
</script>
<style scoped lang="scss">

</style>