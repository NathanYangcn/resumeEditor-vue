// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import locales from './i18n/'
import { Tooltip, Button, Icon } from 'element-ui'
import store from './store/index'

Vue.config.productionTip = false

// 使用 element-ui 组件 Tooltip、 Button
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Icon)

// 使用 i18n 插件，根据设置语言，控制各个属性所对应的展示内容
Vue.use(VueI18n)
Vue.config.lang = 'zh_CN'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
