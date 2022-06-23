import { createStore } from "vuex";
import axios from "axios";

axios.defaults.baseURL = "http://quick-pos-api.test/api/v1";

const store = createStore({
  state: {
    token: localStorage.getItem("accessToken") || null,
    loggedInUser: {},
    analytics: {},
    products: [],
    customers: [],
    orders: [],
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

    // get all customers
    getCustomers(state, customers) {
      state.customers = customers;
    },

    // get all orders
    getOrders(state, orders) {
      state.orders = orders;
    },

    // get all Analytics
    getAllAnalytics(state, analytics) {
      state.analytics = analytics;
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
    createProduct(context, formData) {
      // axios.defaults.headers.common["Authorization"] =
      //   "Bearer " + context.state.token;

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + context.state.token,
        },
      };
      return new Promise((resolve, reject) => {
        axios
          .post("/products", formData, config)
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
      // axios.defaults.headers.common["Authorization"] =
      //   "Bearer " + context.state.token;
      // axios.defaults.headers.common["content-type"] = "multipart/form-data";
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + context.state.token,
        },
      };

      return new Promise((resolve, reject) => {
        axios
          .post(
            `/products/${updateProductDetails.productID}`,
            updateProductDetails.updateInfo,
            config
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

    // get all customers
    getCustomers(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("/customers", {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
            context.commit("getCustomers", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // create new product
    createCustomer(context, customer) {
      const config = {
        headers: {
          Authorization: "Bearer " + context.state.token,
        },
      };
      return new Promise((resolve, reject) => {
        axios
          .post("/customers", customer, config)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get single customer
    getSingleCustomer(context, customerID) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/customers/${customerID}`, {
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

    // update customer
    updateCustomer(context, updateCustomerDetails) {
      const config = {
        headers: {
          Authorization: "Bearer " + context.state.token,
        },
      };

      return new Promise((resolve, reject) => {
        axios
          .put(
            `/customers/${updateCustomerDetails.customerID}`,
            updateCustomerDetails.updateInfo,
            config
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // delete customer
    deleteCustomer(context, customerID) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/customers/${customerID}`, {
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

    // get all orders
    getOrders(context) {
      return new Promise((resolve, reject) => {
        axios
          .get("/orders", {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
            context.commit("getOrders", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // create order
    createOrder(context, order) {
      const config = {
        headers: {
          Authorization: "Bearer " + context.state.token,
        },
      };
      return new Promise((resolve, reject) => {
        axios
          .post("/orders", order, config)
          .then((response) => {
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get single order
    getSingleOrder(context, orderID) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/orders/${orderID}`, {
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

    // get analytics
    getAnalytics(context, orderID) {
      return new Promise((resolve, reject) => {
        axios
          .get("/analytics", {
            headers: {
              Authorization: "Bearer " + context.state.token,
            },
          })
          .then((response) => {
            context.commit("getAllAnalytics", response.data.data);
            resolve(response.data.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default store;
