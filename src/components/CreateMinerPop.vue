<template>
    <div class="component create-miner-pop">
        <pop :width="440">
            <h3 slot="pop-header" class="pop-header title">Create a miner</h3>
            <div slot="pop-body" class="pop-body">
                <form-input title="Name" v-model="name" class="form-component"></form-input>
                <form-selector :options="planets" :key="_id" label="name" title="Planets"
                               class="form-component"></form-selector>

                <div class="assign-points">
                    <h3 class="title">Assign points</h3>
                    <div class="flex-container">
                        <form-input title="carryCapacity" v-model="carryCapacity" class="form-component"></form-input>
                        <form-input title="travelSpeed" v-model="travelSpeed" class="form-component"></form-input>
                        <form-input title="miningSpeed" v-model="miningSpeed" class="form-component"></form-input>
                    </div>
                </div>
            </div>
        </pop>
    </div>
</template>

<script>
    import Pop from "./Pop";
    import FormInput from "./FormComponents/FormInput";
    import FormSelector from "./FormComponents/FormSelector";
    import {mapState} from "vuex";

    export default {
        name: "create-miner-pop",
        components: {
            FormInput,
            Pop, FormSelector
        },
        computed: {
            ...mapState({
                planets: state => state.contents.planetsList
            })
        },
        data() {
            return {
                name: null,
                carryCapacity: 10,
                travelSpeed: 15,
                miningSpeed: 5
            }
        }
    }
</script>

<style scoped lang="scss">
    .title {
        color: #FFF;
        text-align: center;
        font-family: lato-bold;
        font-size: 16px;
        font-style: normal;
        line-height: 100%;
    }

    .pop-body {
        margin-top: 30px;

        .form-component + .form-component{
            margin-top: 16px;
        }

        .assign-points{
            margin-top: 32px;
        }
    }
</style>