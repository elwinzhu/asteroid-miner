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
    import SimpleTable from "../components/SimpleTable"
    import {mapState} from "vuex";

    export default {
        components: {PopBase, SimpleTable},
        name: "miners-list-pop",
        props: {
            open: Boolean,
            planet: Object
        },
        computed: {
            ...mapState({
                minerFullList: state => state.contents.minersList
            }),
            miners() {
                return this.minerFullList.filter(x => x.planet === this.planet._id)
            }
        },
        data() {
            return {
                columns: MinerColumns(false),
                loading: true
            }
        },
        methods: {
            onPopClose() {
                this.$emit("update:open", false);
            }
        },
        mounted() {
            setTimeout(() => {
                this.loading = false;
            }, 1200);
        }
    }
</script>

<style scoped lang="scss">
    .pop-body{
        margin-top: 10px;
    }
</style>