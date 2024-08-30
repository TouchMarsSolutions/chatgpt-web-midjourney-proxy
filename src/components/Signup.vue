<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Sign Up</button>
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

const handleSignup = async () => {
  try {
    await authService.signup(email.value, password.value)
    message.success('Signup successful. Please login.')
    router.push('/login')
  } catch (error) {
    message.error('Signup failed')
  }
}
</script>
