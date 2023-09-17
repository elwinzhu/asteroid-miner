<template>
    <div class="component history-pop">
        <pop-base :width="780" @close="onPopClose">
            <h3 slot="pop-header" class="pop-header title-txt">History of {{minerName}}</h3>
            <div slot="pop-body" class="pop-body">
                <div v-if="loading" class="loading-wrapper">
                    <div class="loading">
                        <i class="iconfont icon-loading icon"></i>
                    </div>
                </div>
                <template v-else>
                    <simple-table :columns="columns" :data="histories">
                    </simple-table>
                </template>
            </div>
        </pop-base>
    </div>
</template>

<script>
    import SimpleTable from "./SimpleTable";
    import {select} from "../utils/db";
    import {HistoryColumns} from "../assets/constants";
    import PopBase from "../components/PopBase"

    export default {
        components: {SimpleTable, PopBase},
        name: "history-pop",
        props: {
            open: Boolean,
            minerName: String
        },
        data() {
            return {
                loading: true,
                columns: HistoryColumns,
                histories: null
            }
        },
        methods: {
            onPopClose() {
                this.$emit("update:open", false);
            },
            loadHistory() {
                select(this.minerName, this.process)
            },
            process(tx, list) {
                this.histories = list;
                this.loading = false;
            }
        },
        mounted() {
            this.loadHistory();
        }
    }
</script>

<style scoped lang="scss">
    .pop-body {
        margin-top: 10px;
    }
</style>