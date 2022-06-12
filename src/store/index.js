import { createStore } from "vuex";
import axios from "axios";

axios.defaults.baseURL = "http://quick-pos-api.test/api/v1";

const store = createStore({
  state: {
    token: localStorage.getItem("accessToken") || null,
    loggedInUser: {},
    products: [],
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null;
    },
  },
  mutations: {
    // set token
    setToken(state, token) {
      state.token = token;
    },
    // remove token
    removeToken(state) {
      state.token = null;
    },
    // get loggedIn user info
    getLoggedInUser(state, user) {
      state.user = user;
    },

    // get all products
    getProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    // logged in
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

    // logout
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

    // get logged in user info
    getLoginUser(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("/user/info", {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
            context.commit("getLoggedInUser", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get all products
    getProducts(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("/products", {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
            context.commit("getProducts", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // create new product
    createProduct(context, credential) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;
      return new Promise((resolve, reject) => {
        axios
          .post("/products", credential)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get single product
    getSingleProduct(context, productID) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/products/${productID}`, {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // update product
    updateProduct(context, updateProductDetails) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token;

      return new Promise((resolve, reject) => {
        axios
          .put(
            `/products/${updateProductDetails.productID}`,
            updateProductDetails.updateInfo
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // delete product
    deleteProduct(context, productID) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/products/${productID}`, {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
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
