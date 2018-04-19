<template>
  <div ref="category">
      <CategoryHeadView></CategoryHeadView>
      <CategoryMainView></CategoryMainView>
  </div>
</template>
<script>
import CategoryHeadView from './CategoryHead.vue'
import CategoryMainView from './CategoryMain.vue'
import { myMoveScroll } from '../assets/js/category.js'
export default {
    components: {
        CategoryHeadView,
        CategoryMainView
    }
}
</script>
<style>
@import '../assets/css/category.css'
</style>


