<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { authService } from '@/api/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const message = useMessage()

const handleLogin = async () => {
  try {
    const response = await authService.login(email.value, password.value)
    localStorage.setItem('user', JSON.stringify(response.data))
    message.success('Login successful')
    router.push('/')
  } catch (error) {
    message.error('Login failed')
  }
}
</script>
