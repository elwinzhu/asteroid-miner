<template>
    <div class="component create-miner-pop" v-if="open">
        <pop-base :width="448" @close="onPopClose">
            <template v-if="workingMode">
                <h3 slot="pop-header" class="pop-header title-txt">Create a miner</h3>
                <div slot="pop-body" class="pop-body">
                    <validator :rules="validationRules" v-model="isValid" ref="validator">
                        <div class="main-info">
                            <form-input title="Name" v-model="name" class="form-component" form-prop="name"
                                        :will-show-error="true"></form-input>
                            <form-selector :options="validPlanets" data-key="_id" label-key="name"
                                           title="Planets" class="form-component"
                                           v-model="planetId" @change="onChange"></form-selector>
                        </div>

                        <div class="assign-points">
                            <h3 class="title-txt">Assign points</h3>
                            <div class="flex-container form-input-wrapper">
                                <form-input title="carryCapacity" v-model="carryCapacity" form-prop="points"
                                            class="form-component flex-extender" type="number" :min="0"
                                            :max="200"></form-input>
                                <form-input title="travelSpeed" v-model="travelSpeed" form-prop="points"
                                            class="form-component flex-extender" type="number" :min="0"
                                            :max="200"></form-input>
                                <form-input title="miningSpeed" v-model="miningSpeed" form-prop="points"
                                            class="form-component flex-extender" type="number" :min="0"
                                            :max="200"></form-input>
                            </div>
                            <label class="left-points sm-txt" :class="{exceeded: leftPoints < 0 || leftPoints > 200}">
                                Total: {{leftPoints}}/200</label>
                        </div>
                    </validator>
                </div>
                <div slot="pop-footer" class="pop-footer">
                    <button class="save-btn btn" @click="onSave">Save</button>
                </div>
            </template>
            <template v-else>
                <div slot="pop-body" class="pop-body ok-body">
                    <p class="success-msg title-txt">
                        The miner was successfully created
                    </p>
                </div>
            </template>
        </pop-base>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import PopBase from "./PopBase";
    import FormInput from "./FormComponents/FormInput";
    import FormSelector from "./FormComponents/FormSelector";
    import Validator from "./FormComponents/Validator";
    import {createMiner} from "../utils/api";
    import {logSpawnMiner} from "../utils/history";

    export default {
        name: "create-miner-pop",
        props: {
            open: {
                type: Boolean,
                default: false
            },
            data: Object
        },
        components: {
            FormInput, Validator, PopBase, FormSelector
        },
        computed: {
            ...mapState({
                planets: state => state.contents.planetsList,
                miners: state => state.contents.minersList,
                tick: state => state.contents.tick
            }),
            leftPoints() {
                return 200 - (parseInt(this.carryCapacity || 0) + parseInt(this.travelSpeed || 0) + parseInt(this.miningSpeed || 0));
            },
            validPlanets() {
                return (this.planets && this.planets.filter((x, i) => x.minerals > 1000)) || [];
            }
        },
        data() {
            const nameValidator = async () => {
                let miner = this.miners.find(m => m.name === this.name);
                return miner ? [false, "This name is already taken."] : [true];

            };
            const pointsValidator = async () => {
                if ((this.carryCapacity + this.travelSpeed + this.miningSpeed > 200) ||
                    (this.carryCapacity + this.travelSpeed + this.miningSpeed < 0)) {
                    return [false];
                }
                return [true]
            };

            return {
                name: null,
                planetId: null,
                carryCapacity: 0,
                travelSpeed: 0,
                miningSpeed: 0,

                isValid: true,
                validationRules: {
                    name: [
                        {require: true},
                        {
                            validator: nameValidator,
                            trigger: 'change'
                        }
                    ],
                    points: [
                        {
                            validator: pointsValidator,
                            trigger: 'change'
                        }
                    ]
                },
                workingMode: true
            }
        },
        methods: {
            onChange(v) {
            },
            onPopClose() {
                this.$emit("update:open", false);

                //close the popup, init data
                this.name = null;
                this.planetId = null;
                this.carryCapacity = 0;
                this.travelSpeed = 0;
                this.miningSpeed = 0;
                this.isValid = true;
                this.workingMode = true;
            },
            async onSave() {
                if (!this.isValid)
                    return;

                //might be init, should do validation
                this.isValid = await this.$refs.validator.validate();
                if (this.isValid) {
                    //should find planet instead of using prop-data
                    //because it will change due to selection
                    let planet = this.planets.find(p => p._id === this.planetId);
                    let data = {
                        "name": this.name,
                        "planet": this.planetId,
                        position: {
                            x: planet.position.x,
                            y: planet.position.y
                        },
                        "angle": 0,
                        "carryCapacity": this.carryCapacity,
                        "travelSpeed": this.travelSpeed,
                        "miningSpeed": this.miningSpeed,
                        "status": 0,
                        "minerals": 0,
                        "target": this.planetId,
                        "targetType": "Planet"
                    };

                    let response = await createMiner(data);
                    this.workingMode = !response;

                    logSpawnMiner(response, planet, this.tick);
                }
            }
        },
        watch: {
            data(planet) {
                this.planetId = planet._id;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    $marginVer: 32px;

    .pop-body {
        margin-top: $marginVer;

        .main-info {
            .form-component + .form-component {
                margin-top: 5px;
            }
        }

        .assign-points {
            margin-top: $marginVer;
            h3.title-txt {
                margin-bottom: $marginVer;
            }

            .form-component + .form-component {
                margin-left: 12px;
            }

            .left-points {
                display: block;
                margin-top: 12px;
                color: $highlightColor;
                text-align: center;
                line-height: 100%;

                &.exceeded {
                    color: $red;
                }
            }
        }

        .success-msg {
            margin: 36px 0;
            caret-color: transparent;
        }
    }

    .pop-body {
        overflow: hidden !important;
    }

    .ok-body {
        margin-top: 0;
    }

    .pop-footer {
        margin-top: $marginVer;
        margin-bottom: 8px;

        .save-btn {
            border: none;
            outline: none;
            border-radius: 8px;
            height: 28px;
            line-height: 28px;
            width: 91px;
            color: $btnColor;
            font-size: 12px;
            font-weight: 900;
            background: $btnBgColor;

            &:active {
                background: whitesmoke;
            }
        }
    }
</style>