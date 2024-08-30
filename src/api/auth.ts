import axios from 'axios'

const API_URL = '/api/auth/' // Adjust this to your backend API URL

export const authService = {
  login(email: string, password: string) {
    return axios.post(API_URL + 'login', { email, password })
  },
  
  signup(email: string, password: string) {
    return axios.post(API_URL + 'signup', { email, password })
  },
  
  logout() {
    // Remove user from local storage
    localStorage.removeItem('user')
  }
}
