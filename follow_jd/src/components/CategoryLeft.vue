<template>
    <div ref="cate_left">
        <ul ref="childbox">
            <li v-for="(item, index) in leftDatas" :key="index">
                <router-link :to="'/category/'+item.category_id">{{ item.category_name }}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            leftDatas: []
        }
    },
    mounted() {
        this.getLeftDatas();
    },
    methods: {
        getLeftDatas() {
            this.$http.get('/category').then((res) => {
                this.leftDatas = res.data;
            }, (err) => {

            })
        }
    }
}
</script>

