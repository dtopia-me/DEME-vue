<template>
    <div id="yboard">
        <div class="yboard-info">
            <div class="yboard-info-info">
            <el-row>
                <!--eslint-disable-next-line-->
                <el-col v-for="each in boardlist" class="yboard-each">
                    <div :style="{cursor: 'pointer'}" @click="gotoboard(each.board_name)">
                    <el-card :body-style="{ padding: '0px',height:'120px'}">
                        <div class="board-name" v-text="each.board_name"></div>
                        <div class="board-size" v-text="each.board_size"></div>
                    </el-card>
                    </div>
                    <div style="padding: 14px;">
                        <div class="bottom clearfix">
                            <el-button type="warning" size="small" class="button" id="button-s" @click="setboard(each.board_name)">SETTING</el-button>
                            <el-button type="warning" size="small" class="button" id="button-sell" @click="ask(each.board_name)">SELL</el-button>
                            <el-button type="warning" size="small" class="button" id="button-link" @click="previewaddress(each.board_name)">LINK</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "YBoard",
        data(){
            return{
                boardlist:[
                    {"board_name":"test3","board_size":"(100 * 100)"},
                    {"board_name":"test1","board_size":"(100 * 100)"},
                    {"board_name":"test4","board_size":"(100 * 100)"},
                    {"board_name":"test1","board_size":"(100 * 100)"},
                    {"board_name":"afsddhg","board_size":"(100 * 100)"},
                ],
            }
        },
        mounted(){
            this.get_yboard()
        },
        methods:{
            async get_yboard(){
                    let myaccount = await this.getmyaccount();
                    let account = myaccount[0];
                    console.log('myaccount' + account);
                    let boardlist = await this.listAllBoardParticipated(account);
                    console.log('boardlist' + boardlist);
            },
            previewaddress(address){
                this.$alert("http://flipnfts.cn/deboard/" + address,{
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'OK',
                    center: true
                })
            },
            gotoboard(address){
                let routeData = this.$router.resolve({path:'/deboard/' + address});
                window.open(routeData.href, '_blank');
            },
            setboard(address){
                let routeData = this.$router.resolve({path:'/SetBoard/' + address});
                window.open(routeData.href, '_blank');
            },
            async ask(board_name) {
                let contract = await this.get_contract(board_name);
                console.log(contract)
                await contract.functions.bAsk("4000");
            }
    }
    }
</script>

<style scoped>
    #yboard{
        width: 100%;
        height: 100%;
    }
    .yboard-info{
        width: 2000px;
        margin: 0 auto;
    }
    .yboard-info-info{
        width: 2000px;
        margin-top: 200px;
    }
    .yboard-each{
        width: 21%;
        margin-right: 2%;
        margin-left: 2%;
        float: left;
        height: 220px;
        margin-top: 30px;
    }
    .board-name{
        font-family: Inconsolata-B;
        font-size: 40px;
        color: #995f07;
        margin-top: 30px;
    }
    .board-size{
        font-family: Inconsolata-B;
        font-size: 10px;
        color: #995f07;
        margin-top: 10px;
    }
    #button-s,#button-link{
        float: left;
        border-radius:5px 5px 5px 5px;
    }
    #button-sell{
        float: right;
        border-radius:5px 5px 5px 5px;
    }
</style>