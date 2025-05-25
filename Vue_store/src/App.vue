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
  beforeCreate() {
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


.navbar {
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2563eb;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #1e293b;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-links a:hover {
  background: #f8fafc;
  color: #2563eb;
}

.nav-links a.router-link-active {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.1);
}

/* Responsive styles */
@media (max-width: 768px) {
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