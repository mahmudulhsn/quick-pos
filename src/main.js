import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from 'mitt';

// declare event bus
const eventBus = mitt();
// declare event bus

const app = createApp(App);

app.use(router);
// config the event bus
app.config.globalProperties.eventBus = eventBus
// config the event bus
app.mount("#app");
