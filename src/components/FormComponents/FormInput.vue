<template>
    <div class="component form-input-root">
        <p class="title label-text">{{title}}</p>
        <input :value="value" class="form-input" :type="type" :min="min" :max="max"
               :class="{invalid: willShowError && !isValid}"
               @input="onInput" @blur="onBlur" @change="onChange"/>
        <p class="form-error-msg" v-if="enableValidation && willShowError">{{errorMsg}}</p>
    </div>
</template>

<script>
    import mixin from "./mixin";

    export default {
        name: "form-input",
        mixins: [mixin],
        props: {
            value: [String, Number],
            title: String,
            willShowError: Boolean,
            type: {
                default: "text",
                validator: val => ~["text", "number"].indexOf(val)
            },
            min: Number,
            max: Number
        }
    }
</script>
