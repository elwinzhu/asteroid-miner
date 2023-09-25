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



const socket = io("ws://localhost:1681/", {
    transports: ['websocket']
});
socket.on("connect_error", () => {
    // revert to classic upgrade
    socket.io.opts.transports = ["polling", "websocket"];
});
const listener = (data) => {
    console.log(data);
    store.dispatch("contents/updateDataList", data);
};

socket.on("connect", () => {
    console.log("ws connected");
});

socket.on('tick', listener);
