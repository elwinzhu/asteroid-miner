<template>
    <div class="nav-bar component flex-container">
        <div class="item-wrapper flex-container" :class="{active: active === 1}" @click="onItemSelected(1)">
            <i class="iconfont icon-miner icon"></i>
            <p class="name">
                Miners
            </p>
        </div>

        <div class="item-wrapper flex-container" :class="{active: active === 2}" @click="onItemSelected(2)">
            <i class="iconfont icon-asteroid icon"></i>
            <p class="name">
                Asteroids
            </p>
        </div>

        <div class="item-wrapper flex-container" :class="{active: active === 3}" @click="onItemSelected(3)">
            <i class="iconfont icon-planet icon"></i>
            <p class="name">
                Planets
            </p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "nav-bar",
        data() {
            return {
                active: 1
            }
        },
        methods: {
            onItemSelected(item) {
                this.active = item;
                this.$emit("change-item", item)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .item-wrapper {
        flex-direction: column;
        justify-content: center;

        color: $lightColor;
        width: 70px;
        height: 66px;

        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 8px;

        transition: border 0.32s, box-shadow 0.32s;

        .name {
            color: $dimColor;
            font-family: Lato;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            margin-top: 6px;
        }
        .icon {
            font-size: 32px;
            flex-shrink: 0;
        }

        &.active {
            border-color: $iconBorderColor;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
            .icon {
                color: $activeIconColor;
            }
        }
    }

    .item-wrapper + .item-wrapper {
        margin-left: 30px;
    }

</style>