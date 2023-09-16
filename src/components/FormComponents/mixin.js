export default {
    props: {
        formProp: String
    },
    data() {
        return {
            errorMsg: null,
            isValid: true
        }
    },
    computed: {
        rules() {
            if (this.formProp && this.$parent.rules) {
                let myRules = this.$parent.rules[this.formProp];
                if (myRules) {
                    return [].concat(myRules);
                }
            }

            return null;
        },
        enableValidation() {
            return this.rules && this.rules.length > 0
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);
            if (this.enableValidation) {
                this.$parent.$emit("form-field-input", this);
            }
        },
        onBlur(event) {
            this.$emit('blur', event);
            if (this.enableValidation) {
                this.$parent.$emit("form-field-blur", this);
            }
        },
        onChange(event) {
            if (this.type === 'number') {
                this.$emit('input', this.value.trim() === "" ? 0 : parseInt(this.value));
            }

            this.$emit('change', event.target.value);
            if (this.enableValidation) {
                this.$parent.$emit("form-field-change", this);
            }
        },
        validationCallback(result, msg) {
            this.isValid = result;
            this.errorMsg = msg || "";
        }
    },
    mounted() {
        //console.log(this.$parent.rules);
    }
}