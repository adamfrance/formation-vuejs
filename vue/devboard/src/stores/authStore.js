import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
  },
  actions: {
    login(username) {
      this.user = { username };
    },
    logout() {
      this.user = null;
    },
  },
  persist: true
});
