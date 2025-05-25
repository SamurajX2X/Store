<template>
  <div>
    <h1>Products List</h1>
    <form @submit="onSubmit">      
      <input v-model="name" />
      <select v-model="categories" />
      <select v-model="sort" />
      <button type="submit">Search</button>  
</form>

    <ul>
        <li v-if="loading">
            <AppLoader />
        </li>
        <li v-else-if="error">
            <p>Error loading products: {{ error }}</p>
        </li>
        <div class="products-grid">
            <ProductTile v-for="product in vuexProducts" :key="product.id" :product="product" />
        </div>
    </ul>
  </div>
</template>

<script>
import { getProducts } from "@/api";
import { mapGetters } from "vuex";
import ProductTile from "@/components/ProductTile.vue";
import AppLoader from "@/components/AppLoader.vue";

export default {
  components: {
    AppLoader,
    ProductTile
  },
    name: "ProductsView",
    data() {
        return {
            error: null
        };
    },
    computed: {
        ...mapGetters({
            vuexProducts: "GET_PRODUCTS",
            loading: "GET_PRODUCTS_LOADING",
            categories: "GET_CATEGORIES",
            error: "GET_PRODUCTS_ERROR"
        })
    },
    created() {
        this.$store.dispatch("FETCH_PRODUCTS")
            .catch((err) => {
                this.error = err;
            });
          
    },

};
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