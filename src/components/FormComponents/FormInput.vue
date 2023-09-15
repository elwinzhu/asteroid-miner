<template>
    <div class="component form-input">
        <p class="title">{{title}}</p>
        <input v-model="value" class="input"/>
    </div>
</template>

<script>
    export default {
        name: "form-input",
        props: {
            value: String,
            title: String
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables";

    .form-input {
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
        }
    }
</style>