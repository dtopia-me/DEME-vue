import Vue from 'vue'
import App from './App.vue'
import router from './route'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import eth from './eth'
import './lib/font/font.css'
import { vueBaberrage } from 'vue-baberrage'
import VuevideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import Chat from 'vue-beautiful-chat'

/* 在 0.2.041 之前的版本需要引入 css */
// import 'jwchat/lib/JwChat.css';
Vue.use(Chat)


Vue.use(VuevideoPlayer);


ElementUI.Dialog.props.lockScroll.default = false;

Vue.use(vueBaberrage)
Vue.use(ElementUI)
Vue.use(eth)
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
