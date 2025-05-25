<template>
    <div class="promotions section">
        <h1 class="section-title">Current Promotions</h1>
        <div v-if="loading">
            <AppLoader />
        </div>
        <div v-else class="promotions-grid">
            <PromotionTile v-for="promotion in promotions" :key="promotion.id" :promotion="promotion" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PromotionTile from '@/components/PromotionTile.vue'
import AppLoader from '@/components/AppLoader.vue'

export default {
    name: 'PromotionsView',
    components: { PromotionTile, AppLoader },
    computed: {
        ...mapGetters({
            promotions: 'GET_PROMOTIONS_LIST',
            loading: 'GET_PROMOTIONS_LOADING',
            error: 'GET_PROMOTIONS_ERROR'
        })
    },
    created() {
        this.$store.dispatch('FETCH_PROMOTIONS')
    }
}
</script>

<style scoped>
.promotions {
    background: linear-gradient(to bottom, #fafafa, #f5f5f5);
}

.promotions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

@media (max-width: 768px) {
    .promotions-grid {
        gap: 20px;
        padding: 15px;
    }
}
</style>
