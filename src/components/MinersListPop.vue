<template>
    <div class="component miners-list-pop">
        <pop-base :width="550" @close="onPopClose">
            <h3 slot="pop-header" class="pop-header title-txt">List of miners of {{planet.name}}</h3>
            <div slot="pop-body" class="pop-body">
                <div v-if="loading" class="loading-wrapper">
                    <div class="loading">
                        <i class="iconfont icon-loading icon"></i>
                    </div>
                </div>
                <template v-else>
                    <simple-table :columns="columns" :data="miners">
                    </simple-table>
                </template>
            </div>
        </pop-base>
    </div>
</template>

<script>
    import PopBase from "./PopBase";
    import {MinerColumns} from "../assets/constants";
    import {getMiners} from "../utils/api";
    import SimpleTable from "../components/SimpleTable"
    import {MinerStatus} from "../assets/constants";

    export default {
        components: {PopBase, SimpleTable},
        name: "miners-list-pop",
        props: {
            open: Boolean,
            planet: Object
        },
        data() {
            return {
                columns: MinerColumns(false),
                loading: false,
                miners: null
            }
        },
        methods: {
            onPopClose() {
                this.$emit("update:open", false);
            },
            async loadList() {
                this.loading = true;
                let resp = await getMiners({planetId: this.planet._id});
                resp.forEach(miner => {
                    miner.planetName = miner.planet.name;
                    miner.displayCapacity = `${miner.carryCapacity}/200`;
                    miner.displayPosition = `${parseInt(miner.x)},${parseInt(miner.y)}`;
                    miner.displayStatus = `${MinerStatus[miner.status]}`;
                });

                this.miners = resp;
                this.loading = false;
            }
        },
        mounted() {
            this.loadList();
        }
    }
</script>

<style scoped lang="scss">
    .pop-body{
        margin-top: 10px;
    }
    .loading-wrapper {
        padding: 8px 0;
        margin-top: 24px;
        .icon {
            font-size: 32px;
            color: white;
        }
    }
</style>