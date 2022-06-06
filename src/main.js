import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from 'mitt';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// declare event bus
const eventBus = mitt();
// declare event bus

const app = createApp(App);

app.use(VueSweetalert2);

app.use(router);
// config the event bus
app.config.globalProperties.eventBus = eventBus
// config the event bus
app.mount("#app");
