<template>
    <div class="rating">
        <div class="stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ 'filled': n <= rating }">★</span>
        </div>
        <span class="rating-number">{{ rating }}/5</span>
    </div>
</template>

<script>
export default {
    name: 'AppRating',
    props: {
        rating: {
            type: Number,
            required: true,
        }
    }
}
</script>

<style scoped>
.rating {
    display: flex;
    align-items: center;
}

.stars {
    display: flex;
    margin-right: 5px;
}

.star {
    color: #d1d5db;
    font-size: 1.2rem;
}

.star.filled {
    color: #fbbf24;
}

.rating-number {
    font-size: 0.9rem;
    color: #64748b;
}
</style>
