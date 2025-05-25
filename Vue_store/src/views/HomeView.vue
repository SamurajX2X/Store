<template>
  <div>
    <AppLoader v-show="loading" />
    <div v-if="!loading" class="promotions-grid">
      <RouterLink v-for="promotion in promotionsList" :to="`/promotion/${promotion.id}`" :key="promotion.id">
        <PromotionTile :promotion="promotion" />
      </RouterLink>
      <AppLoader v-show="loading" />
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue'
import PromotionTile from '@/components/PromotionTile.vue'
import { mapGetters } from 'vuex'


export default {
  components: { PromotionTile, AppLoader },
  created() {
    this.$store.dispatch("FETCH_PROMOTIONS");

  },
  computed: {
    promotionsList() { return this.$store.getters.GET_PROMOTIONS_LIST },
    ...mapGetters({
      loading: 'GET_PROMOTIONS_LOADING',
    })
  }
}
</script>