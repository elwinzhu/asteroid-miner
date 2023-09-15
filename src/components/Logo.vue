<template>
    <div class="logo flex-container flex-y-center">
        <i class="iconfont icon-logo icon"></i>
        <h5>Backend Miner</h5>
    </div>
</template>

<script>
    export default {
        name: "logo"
    }
</script>

<style scoped lang="scss">
    .logo {
        .icon {
            color: #f2f2f2;
            font-size: 24px;
        }

        h5 {
            color: #FFF;
            font-family: poppins;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%; /* 14px */
            letter-spacing: 2.8px;
            text-transform: uppercase;
            margin-left: 8px;
        }
    }
</style>