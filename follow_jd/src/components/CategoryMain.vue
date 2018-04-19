<template>
    <main class="category_content">
        <CategoryLeftView></CategoryLeftView>
	    <CategoryRightView></CategoryRightView> 
    </main>
</template>
<script>
import CategoryLeftView from './CategoryLeft.vue'
import CategoryLeftView from './CategoryRight.vue'
export default {
    components: {
        CategoryLeftView,
        CategoryLeftView
    }
}
</script>

