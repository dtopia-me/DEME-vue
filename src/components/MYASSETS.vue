<template>
    <div id="my-assets">
        <div class="my-assets-list">
            <el-row>
                <!--eslint-disable-next-line-->
                <el-col v-for="each in boardlist" class="my-assets-list-each">
                    <div :style="{cursor: 'pointer'}">
                        <el-card :body-style="{ padding: '0px',height:'380px'}">
                            <img src="" :style="{height: '230px',width:'100%'}">
                            <div class="my-assets-list-each-board-name" v-text="each.board_name"></div>
                            <div class="my-assets-list-each-board-size" v-text="each.board_size"></div>
                            <el-button type="warning" size="small" class="button" id="my-assets-list-each-button-ask" @click="ask(each.board_name)">ASK</el-button>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MYASSETS",
        data(){
            return{
                boardlist:[
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                    {"board_name":"uytrertyu","board_size":"100 * 100","board_price":"1200000 DEME"},
                ],
            }
        },
        methods:{
            ask(){
                this.$alert("Waiting for develop...",{
                    confirmButtonText:'OK'
                })
            }
        }
    }
</script>

<style scoped>
    #my-assets{
        height: 100%;
        width: 100%;
        margin-top: 20px;
    }
    .my-assets-list-each{
        height: 400px;
        float: left;
        width: 280px !important;
        margin-left: 10px;
        margin-right: 10px;
    }
    .my-assets-list-each-board-name{
        margin-left: 20px;
        text-align: left;
        line-height: 50px;
        font-size: 40px;
        font-weight: bolder;
    }
    .my-assets-list-each-board-size{
        margin-left: 20px;
        line-height: 30px;
        text-align: left;
        font-size: 20px;
    }
    #my-assets-list-each-button-ask{
        margin-top: 20px;
        float: right;
        margin-right: 10px;
        height: 30px;
    }
</style>