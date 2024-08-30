import { defineStore } from 'pinia'
import { authService } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async login(email: string, password: string) {
      const response = await authService.login(email, password)
      this.user = response.data
      localStorage.setItem('user', JSON.stringify(response.data))
    },
    async signup(email: string, password: string) {
      await authService.signup(email, password)
    },
    logout() {
      this.user = null
      authService.logout()
    },
  },
})
