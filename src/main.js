import { createApp } from 'vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faAngleDown, faArrowRight, faBullseye, faReplyAll } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleDown, faArrowRight, faBullseye, faReplyAll)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
