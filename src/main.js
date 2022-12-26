import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

// Vuetify
import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, fa } from "vuetify/iconsets/fa";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});

// Layout
import Default from "./layouts/DefaultLayout.vue";
import UploadLayout from "./layouts/UploadLayout.vue";
app.component("default-layout", Default);
app.component("upload-layout", UploadLayout);

// Styles
import "./styles/index.scss";

app.use(store);
app.use(router);
app.use(vuetify);

app.mount("#app");
