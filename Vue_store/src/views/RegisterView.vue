<template>
  <div class="register-view">
    <h1>Register</h1>

    <AppLoader v-if="loading" />

    <div v-show="exists" class="message">
      <h1>Info</h1>
      <p>User już istnieje</p>
    </div>

    <div v-show="registered" class="message success">
      <h1>Success</h1>
      <p>User został zarejestrowany</p>
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

      <button type="submit" :disabled="!disabled">Register</button>
    </form>
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
      } else {
        this.error = "";
        this.loading = true;

        // do funkcji przekazujemy obiekt z danymi usera
        registerUser({ email: this.email, password: this.password })
          .then((data) => {
            /* tu kluczowa sprawa, do zsynchronizowania z odpowiedzią serwera:
            na jej podstawie decydujemy czy formularz ma pozostać czy zniknąć
            bo user istnieje już lub nie 
            */
            if (data.status === "exists") {
              this.exists = true;
              this.registered = false;
            } else if (data.status === "registered") {
              this.registered = true;
              this.exists = false;
            }
          })
          .catch((err) => {
            // w wypadku błędu zakładamy, że user się nie zarejestrował
            this.registered = false;
            this.exists = false;
            this.error = "user nie zarejestrowany";
          })
          .finally(() => {
            // w obu wypadkach zatrzymujemy loader
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.register-view {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fee2e2;
  border-radius: 4px;
}

.message {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #f3f4f6;
}

.success {
  background-color: #ecfdf5;
  border-color: #10b981;
}
</style>
