import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {io} from "socket.io-client";
import {dropTable} from "./utils/db";


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

        //there's no such api
        //from where i should take the initial minerals of each asteroid???
        //so take the value when the first time connecting to the server
        //to simulate as if it is the initial data
        store.commit("contents/setInitMinerals", data.asteroids);
    }
    store.dispatch("contents/updateDataList", data);
};
socket.on("connect", () => {
    if (!isInitData) {
        isInitData = true;

        //clear data each round the data is reflushed following the server logic
        //which do the reflush every 6 min
        //also for refreshing browser page
        dropTable();
    }
    console.log("ws connected", isInitData);
});
socket.on('tick', listener);
