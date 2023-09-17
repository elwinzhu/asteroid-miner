<template>
    <div class="main-screens">
        <logo></logo>

        <div class="container flex-container">
            <section class="left flex-extender">
                <nav-bar class="nav-bar" @change-item="onTabItemChanged"></nav-bar>

                <div class="divider"></div>

                <div class="table-wrapper">
                    <simple-table :columns="columns" :data="dataList" :table-style="tableStyle"
                                  :row-click="rowClickHandler">
                        <template slot-scope="row" slot="action-slot">
                            <div class="action-cell" @click.stop="onCreateMiner(row)">
                                <label>
                                    <i class="iconfont icon icon-add-miner"></i>
                                    <span class="action-txt">Create a miner</span>
                                </label>
                            </div>
                        </template>
                    </simple-table>
                </div>
            </section>

            <section class="right">
                <p class="years-txt title-txt">{{tickTxt}}</p>
                <div class="img-wrapper">
                </div>
            </section>
        </div>

        <create-miner-pop :open.sync="showCreateMinerPop" :data="planet"></create-miner-pop>
        <miners-list-pop v-if="showMinerListPop" :open.sync="showMinerListPop"
                         :planet="planet"></miners-list-pop>
        <history-pop v-if="showHistoryPop" :open.sync="showHistoryPop" :miner-name="minerName"></history-pop>
    </div>
</template>

<script>
    import Table from "../components/SimpleTable";
    import Logo from "../components/Logo";
    import NavBar from '../components/NavBar';
    import {mapState, mapMutations} from "vuex";
    import {MinerColumns, PlanetsColumns, AsteroidColumns} from "../assets/constants";
    import CreateMinerPop from "../components/CreateMinerPop";
    import MinersListPop from "../components/MinersListPopRT";
    import HistoryPop from "../components/HistoryPop";

    export default {
        name: "main-screens",
        components: {
            HistoryPop,
            SimpleTable: Table,
            MinersListPop,
            Logo, NavBar, CreateMinerPop
        },
        data() {
            return {
                currentListType: 1,
                showCreateMinerPop: false,
                showMinerListPop: false,
                showHistoryPop: false,

                planet: null,
                minerName: null,
                tableStyle: {
                    minWidth: '380px'
                }
            }
        },
        computed: {
            ...mapState({
                asteroidsList: state => state.contents.asteroidsList,
                minersList: state => state.contents.minersList,
                planetsList: state => state.contents.planetsList,
                tick: state => state.contents.tick
            }),

            columns() {
                if (this.currentListType === 1) {
                    return MinerColumns();
                }
                else if (this.currentListType === 2) {
                    return AsteroidColumns;
                }
                else {
                    return PlanetsColumns;
                }
            },
            dataList() {
                if (this.currentListType === 1) {
                    return this.minersList;
                }
                else if (this.currentListType === 2) {
                    return this.asteroidsList;
                }
                else {
                    return this.planetsList;
                }
            },
            tickTxt() {
                return `${this.tick} Year${this.tick > 1 ? "s" : ""}`;
            },
            rowClickHandler() {
                return this.currentListType === 3 ? this.onPlanetRowClick :
                    this.currentListType === 1 ? this.onMinerRowClick : undefined;
            }
        },
        methods: {
            onCreateMiner(row) {
                this.showCreateMinerPop = true;
                this.planet = row.data;
            },
            onTabItemChanged(item) {
                //console.log(item);
                this.currentListType = item;
            },
            onPlanetRowClick(row) {
                this.planet = row;
                this.showMinerListPop = true;
            },
            onMinerRowClick(row) {
                this.minerName = row.name;
                this.showHistoryPop = true;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .container {
        .left {
            //border: 1px solid cyan;
            padding-right: 24px;
            .nav-bar {
                margin-top: 32px;
            }
            max-width: 588px;
        }

        .divider {
            height: 1px;
            border-bottom: 1px solid #33344B;
            margin: 24px -24px 0 -24px;
        }

        .table-wrapper {
            //border: 1px solid red;
            //height: 750px;
            //max-height: 750px;

            .action-cell {
                color: $actionColor;
                cursor: pointer;
                .icon {
                    font-size: 12px;
                }
                .action-txt {
                    display: inline-block;
                    padding-left: 5px;
                }
            }
        }

        .right {
            //border: 1px solid red;
            padding-top: 36px;
            flex: 1;

            .years-txt {
                text-transform: uppercase;
                text-align: left;
            }
            .img-wrapper {
                margin-top: 12px;

                background: url("../assets/images/main-screen-bg.png");
                background-position: center top;
                background-repeat: no-repeat;
                background-size: contain;

                width: 100%;
                max-width: 800px;
                height: 800px;
                flex-shrink: 0;
            }
        }
    }

</style>