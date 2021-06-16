<template>
    <div id="board-market">
        <div id="board-market-title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Marketplace" name="first">
                    <div class="board-market-info">
                        <BOARDMARKETA></BOARDMARKETA>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="My Assets" name="second">
                    <div class="board-market-info">
                        <MYASSETS></MYASSETS>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import BOARDMARKETA from "@/components/BOARDMARKETA";
    import MYASSETS from "@/components/MYASSETS";
    export default {
        name: "BOARDMARKET",
        components: {MYASSETS, BOARDMARKETA},
        data(){
            return{
                activeName: 'first'
            }
        },
        methods:{
            handleClick(tab) {
                console.log(tab['name']);
            }
        }
    }
</script>

<style scoped>
    #board-market{
        width: 100%;
        height: 100%;
    }
    #board-market-title{
        width: 2100px;
        margin:0 auto;
        color: aliceblue;
    }
</style>