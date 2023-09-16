<template>
    <div class="component form-selector" @click.stop>
        <p class="title label-text">{{title}}</p>

        <div class="selector-wrapper">
            <input :value="label" class="form-input btn-like selector-input" @click="onSelectorClick" readonly/>
            <img src="../../assets/images/caret.svg" class="caret btn-like"
                 :class="[showOptionPanel ? 'options-show': '']"/>

            <div class="options-wrapper" :class="[showOptionPanel ? 'show': 'hide']"
                 :style="{height: optionsHeight + 'px'}">
                <template v-if="options.length > 0">
                    <div class="option option-text btn-like" v-for="option in options" :key="option._id"
                         @click="onOptionClick(option)">{{option[labelKey]}}
                    </div>
                </template>
                <template v-else>
                    <div class="empty-block flex-container flex-center option-text">
                        no available option
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import mixin from "./mixin";

    export default {
        name: "form-selector",
        mixins: [mixin],
        props: {
            title: String,
            options: Array,
            labelKey: String,
            dataKey: String,
            value: null
        },
        data() {
            return {
                eachOptionHeight: 39,
                label: null,
                showOptionPanel: false
            }
        },
        computed: {
            //for height transition, and calculate due to unfixed number of options
            //so cannot fix the display height and use css class to toggle it
            optionsHeight() {
                if (this.showOptionPanel) {
                    if (this.options.length > 0) {
                        return 10 + this.eachOptionHeight * this.options.length;
                    }
                    else {
                        return this.eachOptionHeight;
                    }
                }
                else return 0;
            }
        },
        methods: {
            onSelectorClick(e) {
                this.showOptionPanel = !this.showOptionPanel;
            },
            onOptionClick(option) {
                this.label = option[this.labelKey];
                let value = option[this.dataKey];

                this.$emit("input", value);
                this.$emit("change", value);

                this.closeOptionPanel();
            },
            closeOptionPanel() {
                this.showOptionPanel = false;
            },
            initLabel() {
                if (this.options.length > 0) {
                    let option = this.options.find(option => option[this.dataKey] === this.value);
                    if (option) {
                        this.label = option[this.labelKey];
                    }
                }
            }
        },
        mounted() {
            this.initLabel();
            this.$parent.$el.addEventListener("click", this.closeOptionPanel)
        },
        beforeDestroy() {
            this.$parent.$el.removeEventListener("click", this.closeOptionPanel)
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";

    .form-selector {
        .selector-wrapper {
            position: relative;

            .caret {
                width: 8px;
                height: 5px;
                position: absolute;
                top: 18px;
                right: 16px;
                transition: transform 0.28s;

                &.options-show {
                    transform: rotate(180deg);
                }
            }
        }

        .options-wrapper {
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

            .option {
                padding: 12px;

                &:hover {
                    background: #1A1B2F;
                }
            }

            .option:first-child {
                margin-top: 4px;
            }
            .option:last-child {
                margin-bottom: 4px;
            }

            .empty-block {
                height: 100%;
            }
        }
    }
</style>