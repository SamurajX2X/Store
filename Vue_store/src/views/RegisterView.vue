<template>  <div class="register-view">
    <div class="form-container">
      <h1>Register</h1>

      <div v-show="exists" class="info-message">
        <h2>User Already Exists</h2>
        <p>A user with this email already exists.</p>
        <router-link to="/register" class="btn">Try Again</router-link>
      </div>

      <div v-show="registered" class="success-message">
        <h2>Registration Successful!</h2>
        <p>Your account has been created successfully.</p>
        <router-link to="/login" class="btn">Go to Login</router-link>
      </div>

      <form @submit="onSubmit" v-show="!exists && !registered">
        <div v-show="error" class="error-message">{{ error }}</div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="email" type="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" placeholder="Enter your password" required />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
        </div>        <div class="form-actions">
          <button type="submit" class="btn" :disabled="!disabled || loading">
            <div v-if="loading" class="btn-loader"></div>
            <span v-if="!loading">Register</span>
            <span v-else>Creating account...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/api";
import AppLoader from '@/components/AppLoader.vue'

export default {
  name: 'RegisterView',
  components: { AppLoader },
  data() {
    return {
      error: "",
      email: "",
      password: "",
      confirmPassword: "",
      exists: false,
      registered: false,
      loading: false
    };
  },
  computed: {
    disabled() {
      return this.email.length > 3;
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (this.password.length < 3) {
        this.error = "hasło musi mieć minimum 3 znaki";
      } else if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match";
      } else {
        this.error = "";        this.loading = true;        registerUser({ email: this.email, password: this.password })
          .then((data) => {
            if (data.status === "exists") {
              this.exists = true;
              this.registered = false;
            } else if (data.status === "registered") {
              this.registered = true;
              this.exists = false;
            }          })
          .catch((err) => {
            this.registered = false;
            this.exists = false;
            this.error = "user nie zarejestrowany";
          })          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.register-view {
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
