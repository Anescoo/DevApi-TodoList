import { defineStore } from 'pinia'
import { LocalStorage, SessionStorage } from 'quasar'
import { register, login } from 'src/services/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),
  getters: {

  },
  actions: {
    getJwtToken () {
      return LocalStorage.getItem('token') || SessionStorage.getItem('token')
    },
    async handleRegister (params) {
      try {
        console.log(params)
        const res = await register(params)
        console.log(res)
        LocalStorage.set('token', res.data.token)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    },
    async handleLogin (params) {
      try {
        const res = await login(params)
        LocalStorage.set('token', res.data.token)
      } catch (e) {
        LocalStorage.clear()
        throw new Error(e)
      }
    }
  }
})
