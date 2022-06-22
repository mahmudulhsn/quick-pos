import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import print from "vue3-print-nb";

// declare event bus
const eventBus = mitt();
// declare event bus

const app = createApp(App);

app.use(VueSweetalert2);

app.use(router);
app.use(store);
app.use(print);
// config the event bus
app.config.globalProperties.eventBus = eventBus;
// config the event bus
app.mount("#app");
