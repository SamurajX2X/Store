<template>
  <div class="login-view">
    <h1>Login</h1>
    
    <AppLoader v-if="loading" />
    
    <div v-if="logged" class="message success">
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
      </div>

      <button type="submit" :disabled="!disabled">Login</button>
    </form>
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
  methods: {
    onSubmit(e) {
      e.preventDefault();
      
      /* po przejściu walidacji (zachowany format emaila - regex)
      uruchamiamy funkcję ze store User
      jeśli otrzymamy z serwera email zalogowanego usera
      to znaczy, że można wykonywać działania na kliencie
      np przekierować się na inny adres
      logika pozostałych komunikatów musi być oparta o serwer
      */

      this.$store.dispatch("LOGIN_USER", {email: this.email, password: this.password })
        .then(() => {
          const { email } = this.$store.getters.GET_CURRENT_USER;

          if (email) this.logged = true;
          else this.logged = false;

          //this.$router.push("/");
        })
        .catch(() => {
          this.error = "niepoprawne dane logowania";
          this.logged = false;
        });
    }
  }
};
</script>

<style scoped>
.login-view {
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
