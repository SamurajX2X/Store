<template>
    <RouterLink :to="`/product/${product.id}`" class="product-tile">
        <div class="product-image">
            <img :src="productImage" :alt="product.name">
        </div>
        <div class="product-info">
            <div class="product-name">{{ product.name || 'Product Name' }}</div>
            <div class="product-price">{{ formatPrice(product.price) || '$0.00' }}</div>
            <AppRating v-if="product.rate" :rating="product.rate" />
        </div>
    </RouterLink>
</template>

<script>
import AppRating from '@/components/AppRating.vue'

export default {
    name: 'ProductTile',
    components: { AppRating },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        productImage() {
            if (!this.product || !this.product.image) {
                return '/src/assets/phateon.jpg'
            }
            return `/src/assets/${this.product.image}`
        }
    },
    methods: {
        formatPrice(price) {
            if (!price) return '€0.00'
            return `€${Number(price).toFixed(2)}`
        }
    }
}
</script>

<style scoped>
.product-tile {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    color: inherit;
    display: block;
}

.product-tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.product-image {
    height: 200px;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-tile:hover .product-image img {
    transform: scale(1.05);
}

.product-info {
    padding: 15px;
}

.product-name {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.product-price {
    font-size: 1.2rem;
    color: #2563eb;
    font-weight: 700;
    margin-bottom: 8px;
}
</style>
