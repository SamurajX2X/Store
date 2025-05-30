<template>  <div class="login-view">
    <div class="form-container">
      <h1>Login</h1>
      
      <div v-if="logged" class="success-message">
        <h2>Logged in successfully!</h2>
        <p>You are now logged in as {{ email }}</p>
      </div>
      
      <form v-else @submit="onSubmit">
        <div v-show="error" class="error-message">{{ error }}</div>
        
        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            placeholder="Enter your email" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password:</label>
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            placeholder="Enter your password" 
            required 
          />
        </div>        <div class="form-actions">
          <button type="submit" class="btn" :disabled="!disabled || loading">
            <div v-if="loading" class="btn-loader"></div>
            <span v-if="!loading">Login</span>
            <span v-else>Logging in...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue'

export default {
  name: 'LoginView',
  components: { AppLoader },
  data() {
    return {
      error: "",
      email: "",
      password: "",
      logged: false,
      loading: false
    };
  },
  computed: {
    disabled() {
      return this.email.length > 3;
    }
  },
  methods: {    onSubmit(e) {
      e.preventDefault();
      this.loading = true;

      this.$store.dispatch("LOGIN_USER", {email: this.email, password: this.password })
        .then((response) => {
          const currentUser = this.$store.getters.GET_CURRENT_USER;

          if (currentUser && currentUser.email) {
            this.logged = true;
            setTimeout(() => {
              this.$router.push("/");
            }, 1500);
          } else {
            this.error = "Login failed - invalid credentials";
            this.logged = false;
          }
          this.loading = false;
        })
        .catch((error) => {
          this.error = "Login failed - please try again";
          this.logged = false;
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.login-view {
  padding: 2rem 1rem;
}

.form-container h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--dark);
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
