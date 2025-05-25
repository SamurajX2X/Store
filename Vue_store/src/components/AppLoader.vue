<template>
    <div class="loader-container">
        <LoaderSvg class="loader-svg" />
        <p>Loading...</p>
    </div>
</template>

<script>
import LoaderSvg from '@/assets/loader.svg?component'

export default {
    name: 'AppLoader',
    components: {
        LoaderSvg
    }
}
</script>

<style scoped>
.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.loader-svg {
    width: 200px;
    height: 200px;
    /* color: #2563eb; */
    margin-bottom: 1rem;
    /* animation: spin 2s linear infinite; */
}
</style>