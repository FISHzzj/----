// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import ajax from './callServer/ajax' // 引入ajax
import { Button, Table } from 'view-design'
import 'view-design/dist/styles/iview.css'
import Vant, { Dialog, Field, Toast, Uploader } from 'vant'
import 'vant/lib/index.css'

import md5 from 'blueimp-md5'
import qs from 'qs'
import $ from 'jquery'
import OrgTree from 'v-org-tree'

Vue.component('Button', Button)
Vue.component('Table', Table)
// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(OrgTree)

/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

// 某些 函数, 挂载 到 window 全局 上
window.$ajax = ajax
window.Dialog = Dialog
window.Toast = Toast
window.md5 = md5
window.qs = qs
window.$ = $


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  data() {
    return {
      
    }
  },
  mounted() {
    // 权限菜单过滤相关
        // this.$store.commit('updateMenulist');
  },
})
