<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    @import "./styles/index";

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;

        //border: 1px solid red;
        max-width: 1440px;
        margin: 0 auto;
        padding: 24px 24px 84px 24px;
    }
</style>
