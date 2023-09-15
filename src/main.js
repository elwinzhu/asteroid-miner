import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {io} from "socket.io-client";


import "./assets/fonts/iconfont/iconfont.css";
import "./assets/fonts/index.css";

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');


let isInitData = false;
const socket = io("wss://asteroids.dev.mediasia.cn", {
    transports: ['websocket']
});
socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});
const listener = (data) => {
    if (isInitData) {
        isInitData = false;
        store.commit("contents/setInitMinerals", data);
    }
    store.dispatch("contents/updateDataList", data);
};
socket.on("connect", () => {
    if (!isInitData) {
        isInitData = true;
    }
    console.log("ws connected", isInitData);
});
socket.on('tick', listener);
