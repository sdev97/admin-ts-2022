import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import i18n from '@/lang'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: App, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value)
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
