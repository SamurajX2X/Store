<template>
  <div>
    <h1>Products Search</h1>
      <form @submit="onSubmit" class="search-form">      
      <div class="form-group">
        <label>Product Name:</label>
        <input v-model="name" placeholder="Search products..." />
      </div>
      
      <div class="form-group">
        <label>Category:</label>
        <select v-model="category">
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Fuel Type:</label>
        <select v-model="fuelType">
          <option value="">All Fuel Types</option>
          <option v-for="fuel in fuelTypes" :key="fuel" :value="fuel">
            {{ fuel }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Drivetrain:</label>
        <select v-model="drivetrain">
          <option value="">All Drivetrains</option>
          <option v-for="drive in drivetrains" :key="drive" :value="drive">
            {{ drive }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Transmission:</label>
        <select v-model="transmission">
          <option value="">All Transmissions</option>
          <option v-for="trans in transmissions" :key="trans" :value="trans">
            {{ trans }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Sort by:</label>
        <select v-model="sortOption">
          <option v-for="option in sortOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
        <div class="form-actions">
        <button type="submit" class="btn">Search</button>
        <button type="button" class="btn btn-secondary" @click="clearFilters">Clear Filters</button>
      </div>
    </form>

    <div class="results-info" v-if="!loading">
      <p>Found {{ vuexProducts.length }} products</p>
    </div>

    <div v-if="loading">
      <AppLoader />
    </div>
    <div v-else-if="error">
      <p class="error">Error loading products: {{ error }}</p>
    </div>
    <div v-else class="products-grid">
      <ProductTile v-for="product in vuexProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductTile from "@/components/ProductTile.vue";
import AppLoader from "@/components/AppLoader.vue";

export default {
  components: {
    AppLoader,
    ProductTile
  },  name: "ProductsView",  data() {
    return {
      name: "",
      category: "",
      fuelType: "",
      drivetrain: "",
      transmission: "",
      sortOption: "name_asc",
      sortOptions: [
        { label: "Name A-Z", value: "name_asc" },
        { label: "Name Z-A", value: "name_desc" },
        { label: "Price Low-High", value: "price_asc" },
        { label: "Price High-Low", value: "price_desc" },
      ],
      fuelTypes: ["Petrol", "Diesel", "Hybrid"],
      drivetrains: ["FWD", "RWD", "AWD"],
      transmissions: ["Manual", "Automatic"]
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
    this.$store.dispatch("FETCH_CATEGORIES");
    this.$store.dispatch("FETCH_PRODUCTS");
  },  methods: {
    onSubmit(e) {
      e.preventDefault();
      
      const [sortField, sortDirection] = this.sortOption.split('_');
      
      const searchOptions = {
        name: this.name,
        category: this.category,
        fuel_type: this.fuelType,
        drivetrain: this.drivetrain,
        transmission: this.transmission,
        _sort: sortField,
        _order: sortDirection
      };
      
      Object.keys(searchOptions).forEach(key => {
        if (searchOptions[key] == null || searchOptions[key] === "") {
          delete searchOptions[key];
        }
      });
      
      this.$store.dispatch("FETCH_PRODUCTS", searchOptions);
    },
    clearFilters() {
      this.name = "";
      this.category = "";
      this.fuelType = "";
      this.drivetrain = "";
      this.transmission = "";
      this.sortOption = "name_asc";
      this.$store.dispatch("FETCH_PRODUCTS");
    }
  }
};
</script>

<style scoped>
.search-form .form-actions {
  grid-column: 1 / -1;
  flex-direction: row;
  gap: 1rem;
}

@media (max-width: 768px) {
  .search-form .form-actions {
    flex-direction: column;
  }
}
</style>