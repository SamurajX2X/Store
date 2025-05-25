<template>
    <div>
        <AppLoader v-show="loading" />
        <div v-if="!loading" class="promotion-preview">
            <h2>{{ promotion.header }}</h2>
            <p>{{ promotion.description }}</p>
            <p v-if="promotion.longDescription" class="long-description">{{ promotion.longDescription }}</p>

            <div class="products-grid" >
                <ProductTile v-for="product in promotion.items" :key="product.id" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLoader from '@/components/AppLoader.vue'
import ProductTile from '@/components/ProductTile.vue'

export default {
    name: 'PromotionView',
    components: { AppLoader, ProductTile },
    computed: {
        ...mapGetters({
            promotion: 'GET_PROMOTION_OBJECT',
            loading: 'GET_PROMOTION_LOADING',
            error: 'GET_PROMOTION_ERROR'
        })
    },
    created() {
        this.$store.dispatch('FETCH_PROMOTION', this.$route.params.id)
    }
}
</script>

<style scoped>
.promotion-preview {
    padding: 20px;
}

.long-description {
    margin: 20px 0;
    line-height: 1.6;
    color: #64748b;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.error {
    color: #dc2626;
    text-align: center;
    padding: 2rem;
    background: #fee2e2;
    border-radius: 8px;
}
</style>