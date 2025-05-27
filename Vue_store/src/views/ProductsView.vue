<template>
  <div>
    <h1>Products Search</h1>
    
    <form @submit="onSubmit" class="search-form">      
      <div class="form-group">
        <label>Product Name:</label>
        <input v-model="searchName" placeholder="Search products..." />
      </div>
      
      <div class="form-group">
        <label>Category:</label>
        <select v-model="searchCategory">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Fuel Type:</label>
        <select v-model="searchFuelType">
          <option value="">All Fuel Types</option>
          <option v-for="fuelType in fuelTypes" :key="fuelType" :value="fuelType">
            {{ fuelType }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Drivetrain:</label>
        <select v-model="searchDrivetrain">
          <option value="">All Drivetrains</option>
          <option v-for="drivetrain in drivetrains" :key="drivetrain" :value="drivetrain">
            {{ drivetrain }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Transmission:</label>
        <select v-model="searchTransmission">
          <option value="">All Transmissions</option>
          <option v-for="transmission in transmissions" :key="transmission" :value="transmission">
            {{ transmission }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Min Price:</label>
        <input v-model="minPrice" type="number" placeholder="Min price" />
      </div>
      
      <div class="form-group">
        <label>Max Price:</label>
        <input v-model="maxPrice" type="number" placeholder="Max price" />
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
        <button type="submit">Search</button>
        <button type="button" @click="clearFilters">Clear Filters</button>
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
  },
  name: "ProductsView",
  data() {
    return {
      searchName: "",
      searchCategory: "",
      searchFuelType: "",
      searchDrivetrain: "",
      searchTransmission: "",
      minPrice: "",
      maxPrice: "",
      sortOption: "price_asc",
      sortOptions: [
        { label: "Price Low-High", value: "price_asc" },
        { label: "Price High-Low", value: "price_desc" },
        { label: "Name A-Z", value: "name_asc" },
        { label: "Name Z-A", value: "name_desc" },
      ],
      fuelTypes: ["Petrol", "Diesel", "Hybrid"],
      drivetrains: ["FWD", "RWD", "AWD"],
      transmissions: ["Manual", "Automatic", "CVT"]
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
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      
      const [sortField, sortDirection] = this.sortOption.split('_');
      
      const searchOptions = {
        name: this.searchName,
        category: this.searchCategory,
        fuel_type: this.searchFuelType,
        drivetrain: this.searchDrivetrain,
        transmission: this.searchTransmission,
        min_price: this.minPrice,
        max_price: this.maxPrice,
        _sort: sortField,
        _order: sortDirection
      };
      
      Object.keys(searchOptions).forEach(key => {
        if (searchOptions[key] === "" || searchOptions[key] === null || searchOptions[key] === undefined) {
          delete searchOptions[key];
        }
      });
      
      this.$store.dispatch("FETCH_PRODUCTS", searchOptions);
    },
    clearFilters() {
      this.searchName = "";
      this.searchCategory = "";
      this.searchFuelType = "";
      this.searchDrivetrain = "";
      this.searchTransmission = "";
      this.minPrice = "";
      this.maxPrice = "";
      this.sortOption = "price_asc";
      
      this.$store.dispatch("FETCH_PRODUCTS");
    }
  }
};
</script>

<style scoped>
.search-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  align-items: end;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.form-group input,
.form-group select {
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

button:hover {
  background-color: var(--secondary);
  transform: translateY(-2px);
}

button[type="button"] {
  background-color: #6b7280;
}

button[type="button"]:hover {
  background-color: #4b5563;
}

.results-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f3f4f6;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.error {
  color: #dc2626;
  text-align: center;
  padding: 2rem;
  background: #fee2e2;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .search-form {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>