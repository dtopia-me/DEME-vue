<template>
    <div id = "fees">
        <h1>FLIP FEES</h1>
        <div class="fees-d" id="fees-d-a">
            <h3>There will be fees charged for these actions</h3>
            <p>
                All actions require paying FLP tokens as service fees which are approximately proportional to the gas fees of actions on the blockchain. The fees for the actions are listed in the table:
            </p>
        </div>
        <div class="fees-d">
            <div id="table-d">
            <el-table
                    :data="tableData"
                    :height="500"
                    border
                    ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 480px">
                <el-table-column
                        prop="Action"
                        label="Actions"
                        width="240">
                </el-table-column>
                <el-table-column
                        prop="fees"
                        label="Fees (in FLPs) + gas fees"
                        width="240">
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fees",
        data(){
            return{
                tableData:[
                    {"Action":"Merge", "fees":250},
                    {"Action":"Split", "fees":450},
                    {"Action":"Upload (for a frame)", "fees":100},
                    {"Action":"Update (for a frame)", "fees":100},
                    {"Action":"Shallow Swap", "fees":"10(for each address)"},
                    {"Action":"Deep Swap", "fees":"100(for each address)"},
                    {"Action":"Upload (for a flipboard)", "fees":20},
                    {"Action":"Update (for a flipboard)", "fees":10},
                    {"Action":"Transfer", "fees":0},
                    {"Action":"Bid", "fees":0},
                    {"Action":"Ask", "fees":0},
                    {"Action":"Any transaction", "fees":0},
                ]
            }
        }
    }
</script>

<style scoped>
    #fees{
        width: 100%;
        background-color: #bcc2c9;
    }
    H1{
        font-family: "IndieFlower";
        width: 100%;
        text-align: center;
    }
    .fees-d{
        font-family: "IndieFlower";
        margin-left: 5%;
        width: 40%;
        margin-right: 5%;
        float: left;
        text-align: left;
    }
    #fees-d-a{
        margin-top: 100px;
        font-size: 20px;
    }
    #table-d{
        width: 100%;
        margin-left: 10%;
        margin-right: 10%;
    }
</style>