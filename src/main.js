import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faAngleDown,
  faArrowRight,
  faBullseye,
  faReplyAll,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

import "./assets/main.scss";

library.add(faAngleDown, faArrowRight, faBullseye, faReplyAll, faRepeat);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
