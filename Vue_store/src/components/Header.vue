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


                <div v-if="userLoading" class="auth-loading">
                    <!-- <div class="auth-loader"></div>
                    <span class="loading-text">Loading...</span> -->

                    <AppLoader style="width: 50px; height: 30px;"/>
                </div>
                <div v-else-if="user" class="user-actions">
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
import { getCurrentUser } from '@/api';
import { mapGetters } from 'vuex';
import AppLoader from '@/components/AppLoader.vue';
import App from '@/App.vue';

export default {
    name: 'Header',
    components: {
        AppLoader,
        
    },

    computed:  {
        user() {
            return this.$store.getters.GET_CURRENT_USER;
        },
        userLoading() {
            return this.$store.getters.GET_CURRENT_USER_LOADING;
        },
        ...mapGetters({
        GET_CURRENT_USER: 'GET_CURRENT_USER',
        GET_CURRENT_USER_LOADING: 'GET_CURRENT_USER_LOADING'
    })
    },
    methods: {
        logout() {
            this.$store.dispatch("LOGOUT_USER")
                .then(() => {
                    this.$router.push("/login");
                });
        }
    },


}
</script>

<style scoped>
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

.auth-loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.loading-text {
    font-size: 0.9rem;
    color: var(--primary);
    font-weight: 500;
}

.auth-loader {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(37, 99, 235, 0.3);
    border-top: 2px solid var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>