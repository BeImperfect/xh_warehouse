<template>
    <div ref="cate_right">
        <div class="category_right">
            <div class="category_banner">
                <a href="#">
                    <img src="../assets/images/banner_1.png" alt="">
                </a>
            </div>
            <div class="category_detail">
                <h3 class="category_n">Hot Category Goods</h3>
                <ul>
                    <li class="category_detail_item" v-for="(item, index) in cateGoodsData" :key="index">
                        <router-link :to="'/detail/'+item.product_id" class="category_detail_item_link">
                            <img v-lzay="item.product_img_url" alt="" class="category_detail_item_pic">
                            <p class="category_detail_item_name">{{ item.product_name }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            cateGoodsData: []
        }
    },
    mounted() {
        this.fetchData(this.$route.params.id);
    },
    watch: {
        $router(to) {
            var reg = /category\/\d+/;
            if (reg.test(to.path)) {
                var categoryId = this.$route.params.id || 0;
                this.fetchData(categoryId);
            }
        }
    },
    methods: {
        fetchData(id) {
            this.$http.get('/categorygoods',{ params: { mId: id} }).then((res) => {
                this.cateGoodsData = res.data;
            }, (err) => {

            })
        }
    }
}
</script>

