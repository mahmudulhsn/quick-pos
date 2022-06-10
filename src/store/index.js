import { createStore } from "vuex";
import axios from "axios";

axios.defaults.baseURL = "http://quick-pos-api.test/api/v1";

const store = createStore({
  state: {
    token: localStorage.getItem("accessToken") || null,
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    removeToken(state) {
      state.token = null;
    },
  },
  actions: {
    login(context, credential) {
      return new Promise((resolve, reject) => {
        axios
          .post("/login", {
            email: credential.email,
            password: credential.password,
          })
          .then((response) => {
            localStorage.setItem("accessToken", response.data.data.token);
            context.commit("setToken", response.data.data.token);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logout(context) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .post("/logout")
          .then((response) => {
            localStorage.removeItem("accessToken");
            context.commit("removeToken");
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default store;
