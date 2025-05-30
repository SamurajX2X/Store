<template>
    <div class="promotion-tile" :style="contStyle">
        <div class="content">
            <h3>{{ promotion.header }}</h3>
            <h2>{{ promotion.description }}</h2>
        </div>
    </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue'
export default {
    name: "PromotionTile",
    components: {
        AppLoader
    },
    props: {
        promotion: {
            type: Object,
            required: true
        }
    },
    computed: {
        contStyle() {
            const { image } = this.promotion
            console.log(image);

            const imageUrl = image ? `/src/assets/${image}` : '/src/assets/default.jpg'
            return {
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }
        }
    }
}
</script>

<style scoped>
.promotion-tile {
    min-height: 300px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.promotion-tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.content {
    padding: 30px;
    background: rgb(215, 212, 212);
    opacity: 0.8;
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

h3 {
    font-size: 1.5rem;
    margin: 0 0 10px 0;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

h2 {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
    font-weight: 400;
}
</style>