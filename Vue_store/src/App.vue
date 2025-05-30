<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script>
import '@/styles/main.css'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
  components: { Footer, Header },
  mounted() {
    this.$store.dispatch("FETCH_CURRENT_USER");
  }
}
</script>

<style>
.main-content {
  min-height: calc(100vh - 140px);
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-content {
    padding: 15px;
  }

  .nav-wrapper {
    height: 60px;
    padding: 0 15px;
  }

  .nav-links {
    gap: 1rem;
  }

  .nav-links a {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}
</style>