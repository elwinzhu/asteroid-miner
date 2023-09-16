<template>
    <div class="validator-root">
        <slot></slot>
    </div>
</template>

<script>
    import {debounce} from 'throttle-debounce';

    export default {
        name: "validator",
        props: {
            rules: Object,
            value: Boolean
        },
        data() {
            return {
                validating: false,
                //inputValidator: null,
            }
        },
        methods: {
            // onFieldInput(fieldComponent) {
            //     this.inputValidator(fieldComponent);
            // },
            onFieldBlur(fieldComponent) {
                this.validateOneField("blur", fieldComponent)
            },
            onFieldChange(fieldComponent) {
                this.validateOneField("change", fieldComponent)
            },
            bindEvents() {
                //this.$on('form-field-input', this.onFieldInput);
                this.$on('form-field-blur', this.onFieldBlur);
                this.$on('form-field-change', this.onFieldChange);
            },
            removeEvents() {
                //this.$off('form-field-input', this.onFieldInput);
                this.$off('form-field-blur', this.onFieldBlur);
                this.$off('form-field-change', this.onFieldChange);
            },

            async validateBase(trigger, field, finishValidating) {
                //console.log(1, trigger, field);

                let valid = true, msg = null;
                const rules = field.rules.filter(x => x.trigger === trigger);
                let requireRule = field.rules.filter(x => x.require)[0];
                if (requireRule) {
                    valid = !!(field.value && field.value.trim());
                    if (!valid) {
                        msg = requireRule.message || "Required";
                        field.validationCallback && field.validationCallback(valid, msg);
                        this.$emit("input", false);

                        finishValidating && setTimeout(() => {
                            this.validating = false;
                        }, 50);

                        return false;
                    }
                }

                if (rules.length > 0) {
                    for (let i = 0; i < rules.length; ++i) {
                        let rule = rules[i];
                        [valid, msg] = rule.validator && (await rule.validator());

                        if (!valid) {
                            field.validationCallback && field.validationCallback(valid, msg);
                            this.$emit("input", false);

                            return false;
                        }
                    }
                }

                field.validationCallback && field.validationCallback(true);
                this.$emit("input", true);
                return true;
            },
            async validateOneField(trigger, field) {
                if (this.validating)
                    return;

                this.validating = true;
                await this.validateBase(trigger, field, true);
                setTimeout(() => {
                    this.validating = false;
                }, 50)
            },
            async validate() {
                //console.log(this.$children.filter(x=>x.formProp));
                this.validating = true;
                let fields = this.$children.filter(x => x.formProp);
                for (let i = 0; i < fields.length; ++i) {
                    let field = fields[i];
                    let valid = await this.validateBase('change', field);
                    if (!valid) {
                        this.validating = false;

                        return false;
                    }
                }

                this.validating = false;
                return true;
            }
        },
        // created() {
        //     this.inputValidator = debounce(100, (fieldComponent) => {
        //         this.validate("input", fieldComponent);
        //     });
        // },
        mounted() {
            this.removeEvents();
            this.bindEvents();
        },
        beforeDestroy() {
            this.removeEvents();
        }
    }
</script>