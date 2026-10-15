import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({ user: null, token: "", loading: false, error: "" }),
  getters: {
    isLoggedIn: (state) => state.token !== "",
  },
  actions: {
    async login(username, password) {
      this.loading = true;
      this.error = "";
      try {
        const data = await api.login(username, password);
        this.token = data.accessToken;
        this.user = {
          id: data.id,
          username: data.username,
          firstName: data.firstName,
          image: data.image,
        };
        return true;
      } catch (e) {
        this.error = e.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = "";
    },
  },
  persist: true,
});
