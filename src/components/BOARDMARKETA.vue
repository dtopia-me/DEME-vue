<template>
    <div id="board-market-place">
        <div id="board-market-place-search">
            <div id="board-market-place-select-input-t">
                <el-input
                        placeholder="Enter boardname to search..."
                        v-model="input"
                        :disabled="true">
                </el-input>
            </div>
            <div id="board-market-place-select-input-s">
                <el-button type="primary" icon="el-icon-search" :style="{background:'#C3A5A5',border:0}" @click="search"></el-button>
            </div>
        </div>
        <div class="market-board-list">
            <el-row>
                <!--eslint-disable-next-line-->
                <el-col v-for="each in boardlist" class="market-board-list-each">
                    <div :style="{cursor: 'pointer'}" @click="gotoboard_info(each.board_name)">
                        <el-card :body-style="{ padding: '0px',height:'380px'}">
                            <img src="" :style="{height: '230px',width:'100%'}">
                            <div class="market-board-list-each-board-name" v-text="each.board_name"></div>
                            <div class="market-board-list-each-board-size" v-text="each.board_size"></div>
                            <div class="market-board-list-each-board-price" v-text="each.board_price"></div>
                            <el-button type="warning" size="small" class="button" id="market-board-list-each-button-buy">BUY</el-button>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BOARDMARKETA",
        data(){
            return{
                input:'',
                boardlist:[],
            }
        },
        mounted(){
            this.get_sale()
        },
        methods:{
            gotoboard_info(board_name){
                this.$router.push('/BOARDINFO/' +board_name)
            },
            async get_sale(){
                let num = await this.listBTokenForSale();
                const that = this;
                console.log(num);
                for(let i=0;i<num.length;i++) {
                    let tokenid = parseInt(num[i]);
                    console.log(tokenid);
                    let boardinfo = await this.getBoardInfo(parseInt(tokenid));
                    let board_price = await this.getBMarketInfo(parseInt(tokenid));
                    let each = {
                        "board_name":boardinfo[0]['_boardName'],
                        "board_size":boardinfo[0]['_width'] + '*' + boardinfo[0]['_height'],
                        "board_price": parseInt(board_price) + " DEME",
                        "board_address":boardinfo[0]['_boardAddr'],
                        "board_owner":boardinfo[0]['_boardOwner']
                    }
                    that.boardlist.push(each);
                }
            },
            async Bask(){
                let res = await this.bAsk("1","2000");
                console.log(res)
            },
            search(){
            }
        }
    }
</script>

<style>
    #board-market-place{
        width: 100%;
        height: 100%;
    }
    #board-market-place-search{
        width: 100%;
        height: 100px;
        float: left;
    }
    #board-market-place-select-input-t{
        width: 250px;
        height: 100px;
        float: left;
    }
    #board-market-place-select-input-s{
        width: 50px;
        height: 100px;
        float: left;
    }
    .market-board-list-each{
        height: 400px;
        float: left;
        width: 280px !important;
        margin-left: 10px;
        margin-right: 10px;
    }
    .market-board-list-each-board-name{
        margin-left: 20px;
        text-align: left;
        line-height: 50px;
        font-size: 40px;
        font-weight: bolder;
    }
    .market-board-list-each-board-size{
        margin-left: 20px;
        line-height: 30px;
        text-align: left;
        font-size: 20px;
    }
    #market-board-list-each-button-buy{
        margin-top: 20px;
        float: right;
        margin-right: 10px;
        height: 30px;
    }
    .market-board-list-each-board-price{
        float: left;
        margin-left: 20px;
        height: 30px;
        font-size: 15px;
        font-weight: bolder;
        margin-top: 25px;
    }
    .el-tabs__nav-scroll{
        height: 100px;
    }
    .el-tabs__nav{
        margin-top: 50px;
    }
    .el-tabs__item{
        height: 60px;
        color: white !important;
        text-align: center;
        padding-top: 10px;
        font-size: 20px !important;
    }
    .is-active{
        color: #bba0a0 !important;
    }
</style>