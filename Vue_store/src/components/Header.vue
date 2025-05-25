<template>
    <header class="navbar">
        <div class="nav-wrapper">
            <div class="nav-brand">Vue Store</div>
            <nav class="nav-links">
                <router-link to="/" class="nav-link" exact-active-class="router-link-active">Home</router-link>
                <router-link to="/about" class="nav-link" active-class="router-link-active">About</router-link>
                <router-link to="/products" class="nav-link"
                active-class="router-link-active">Products</router-link>
                <router-link to="/promotions" class="nav-link"
                    active-class="router-link-active">Promotions (in Progress)</router-link>
                <router-link to="/notFound" class="nav-link"
                    active-class="router-link-active">notFoundPage</router-link>


                <div v-if="user" class="user-actions">
                    <span class="welcome-message">Welcome, {{ user.email }}</span>
                    <button @click="logout" class="logout-btn">Logout</button>
                </div>
                <div v-else class="auth-links">
                    <RouterLink to="/login">Login</RouterLink>
                    <RouterLink to="/register" class="register-btn">Register</RouterLink>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.GET_CURRENT_USER;
        },
        userLoading() {
            return this.$store.getters.GET_CURRENT_USER_LOADING;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("LOGOUT_USER")
                .then(() => {
                    this.$router.push("/login"); // redirect
                });
        }
    }
}
</script>

<style scoped>
/* Auth-specific styles */
.register-btn {
    background-color: var(--primary);
    color: white !important;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.2s;
}

.register-btn:hover {
    background-color: var(--secondary);
    transform: translateY(-2px);
}

.user-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.welcome-message {
    font-size: 0.9rem;
    color: var(--dark);
}

.logout-btn {
    background-color: #ef4444;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
}

.logout-btn:hover {
    background-color: #dc2626;
}

.auth-links {
    display: flex;
    gap: 1rem;
}
</style>