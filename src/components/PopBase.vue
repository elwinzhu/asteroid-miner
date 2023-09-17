<template>
    <div class="compnent pop">
        <div class="pop-mask flex-container flex-center">
            <div class="pop-win" :style="{width: width ? (width + 'px') : '' }">
                <slot name="pop-header"></slot>
                <slot name="pop-body"></slot>
                <slot name="pop-footer"></slot>

                <div class="icon-wrapper flex-container flex-center">
                    <i class="iconfont icon icon-delete btn-like" @click="onClose"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pop",
        props: {
            width: {
                type: Number,
                default: 400
            }
        },
        methods: {
            onClose() {
                this.$emit("close")
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .pop {
        .pop-mask {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;

            background: rgba(12, 13, 33, 0.66);
        }

        .pop-win {
            padding: 24px;
            background: $popupBgColor;
            border-radius: 12px;
            margin: 0 auto;
            position: relative;
            box-shadow: 0 16px 24px 0 rgba(12, 13, 33, 0.60);

            max-height: 80vh;
        }

        .icon-wrapper {
            background: $lightColor;
            border-radius: 50%;
            height: 10px;
            width: 10px;

            position: absolute;
            right: 16px;
            top: 16px;

            .icon {
                color: #31324B;
                font-size: 24px;
            }
        }

        .pop-body {
            max-height: 560px;
            overflow: auto;
        }
    }
</style>