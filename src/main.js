import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
Vue.prototype.axios = axios;
Vue.config.productionTip = false

Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
});

Vue.use(MintUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')