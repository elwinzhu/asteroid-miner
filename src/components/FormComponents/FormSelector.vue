<template>
    <div class="component form-selector">
        <p class="title">{{title}}</p>

        <div class="selector-wrapper">
            <input v-model="value" class="input" @click="onSelectorClick"/>
            <img src="../../assets/images/caret.svg" class="caret"/>

            <div class="options-wrapper" :class="[showOptions ? 'show': 'hide']">
                <div class="option" v-for="option in options" @click="onOptionClick(option)">{{option[label]}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "form-selector",
        props: {
            title: String,
            options: Array,
            label: String,
            key: String
        },
        data() {
            return {
                value: null,
                showOptions: false
            }
        },
        methods: {
            onSelectorClick() {
                this.showOptions = !this.showOptions;
            },
            onOptionClick() {

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";

    .form-selector {
        .title {
            color: #9499C3;
            font-family: lato;
            font-size: 11px;
            font-style: normal;
            font-weight: 400;
            line-height: 100%;
            text-align: left;
            margin-bottom: 5px;
        }
        .input {
            background: $inputBgColor;
            color: white;
            border: 1px solid $inputBorderColor;
            border-radius: 4px;
            outline: none;
            padding: 12px;
            font-size: 12px;
            font-style: normal;
            font-weight: 700;
            line-height: 100%;
            width: calc(100% - 24px);
            cursor: pointer;
        }

        .selector-wrapper {
            position: relative;
            .caret {
                width: 8px;
                height: 5px;
                position: absolute;
                top: 18px;
                right: 16px;
                cursor: pointer;
            }
        }

        .options-wrapper {
            height: 0;
            position: absolute;
            top: 42px;
            left: 0;
            width: 100%;
            z-index: 10;
            border: 1px solid $inputBorderColor;
            background: $inputBgColor;
            border-radius: 4px;
            overflow: hidden;
            transition: height 0.2s;

            &.show {
                height: 119px;
            }
            &.hide {
                height: 0;
            }
            .option {
                color: white;
                font-family: lato;
                font-size: 12px;
                padding: 12px;
                text-align: left;
                cursor: pointer;
                &:hover {
                    background: #1A1B2F;
                }
            }
        }
    }
</style>