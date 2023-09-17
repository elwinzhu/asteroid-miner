<template>
    <div class="simple-table">
        <table ref="table" class="table" :style="tableStyle">
            <thead class="tab-header">
            <td v-for="(col, i) in columns" :key="i"
                class="header-cell"
                :class="{'hidden-cell': col.hidden}"
                :style="[{width: col.width ? (col.width + 'px') : (defaultCellWidth + 'px')}]">
                {{col.label || ""}}
            </td>
            </thead>

            <div v-if="!hasData"
                 class="empty-block"
                 ref="emptyBlock">
                <span class="empty-text">
                   Loading
                </span>
            </div>

            <tbody v-if="hasData || keyFieldName" class="tab-body">
            <tr class="data-row" @click="rowClick && rowClick(row)"
                v-for="row in data" :key="row[keyFieldName]">
                <td v-for="(col, i) in columns" :key="i"
                    class="data-cell sm-txt"
                    :class="{'hidden-cell': col.hidden}"
                    :style="[{width: col.width ? (col.width + 'px') : (defaultCellWidth + 'px')},
                        col.cellStyle && col.cellStyle(row)]">

                    <slot :data="row" name="action-slot" v-if="col.isAction && (col.show && col.show(row))"></slot>
                    <template v-else>
                        {{row[col.field] }}
                    </template>
                </td>
            </tr>
            </tbody>
        </table>


    </div>
</template>

<script>
    let tableIdSeed = 1;

    export default {
        name: 'simple-table',

        props: {
            data: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            isFlex: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array,
                default() {
                    return []
                },
                required: true
            },

            rowClassName: [String, Function],
            tableStyle: {
                type: Object,
                default() {
                    return {}
                }
            },
            rowClick: {
                type: [Function, Boolean],
                default: () => {
                }
            }

            //
            // [
            //  {field: "_id", isRowKey: true, width: 50, label: "XXX", hidden: true }
            // ]
            //
        },

        methods: {
            validateColumns() {
                if (this.columns.length === 0)
                    return;

                let keyColumn = this.columns.find(col => col.isRowKey);
                if (!keyColumn) {
                    throw new Error("must have a row key field")
                }

                let count = this.columns.filter(col => col.isRowKey).count;
                if (count > 1) {
                    throw new Error("must have only one row key field")
                }


                return keyColumn;
            }
        },

        computed: {
            hasData() {
                return this.data && this.data.length > 0
            }
        },

        watch: {},

        created() {
            let keyCol = this.validateColumns();

            if (keyCol) {
                this.tableId = 'my-table_' + tableIdSeed++;
                this.keyFieldName = keyCol.field;
            }
        },

        mounted() {

        },

        destroyed() {
        },

        data() {
            return {
                keyFieldName: null,
                defaultCellWidth: 60
            };
        }
    };
</script>

<style scoped lang="scss">
    @import "../styles/variables";

    .table {
        border-collapse: collapse;

        width: 100%;
        .tab-header {
            display: flex;
            align-items: center;
            .header-cell {
                flex: 1;
                height: 40px;
                line-height: 40px;
            }
        }
        .data-row {
            width: 100%;
            display: flex;
            align-items: center;
            .data-cell {
                flex: 1;
                height: 40px;
                line-height: 40px;
            }
        }

        /*
        &.is-flex {
            width: 100%;
            .tab-header {
                display: flex;
                align-items: center;
                .header-cell {
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                }
            }
            .data-row {
                width: 100%;
                display: flex;
                align-items: center;
                .data-cell {
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                }
            }
        }
        */
    }

    .hidden-cell {
        display: none;
    }

    .tab-header {
        height: 40px;
        border-bottom: 1px solid $dimColor;
    }

    .header-cell {
        color: #FFF;
        font-family: lato-bold;
        font-size: 10px;
        line-height: 100%;
        text-align: left;
    }

    .data-row {
        height: 40px;

        .data-cell {
            color: $dimColor;
            line-height: 100%;
            text-align: left;
            border-bottom: 1px solid $dimColor;
        }
    }

    .empty-block {
        color: white;
        padding-top: 16px;
    }
</style>
