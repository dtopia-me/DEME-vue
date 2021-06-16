<template>
    <div id="board-info">
        <div id="board-info-img">
            <img src="https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621948359000.jpg" :style="{width:'200px',height:'100%'}">
        </div>
        <div id="board-info-title">
            <div id="board-info-board-name">
                {{board_name}}
            </div>
            <div id="board-info-board-jump">
                <el-button type="warning" size="small" class="button" id="board-info-board-jump-button" @click="jump_in">JUMP IN</el-button>
            </div>
            <div id="board-info-board-owner">
                OWNER: {{board_owner}}
            </div>
        </div>
        <div id="board-info-size">{{board_height}} * {{board_width}}</div>
        <div id="board-info-description">
            <div id="board-info-description-name">
                DESCRIPTION
            </div>
            <div id="board-info-description-info">
                Description,Description、Description、Description、Description、Description、Description、Description、Description
            </div>
        </div>
        <div id="board-info-price">
            <div class="board-info-price-name">
                ASK PRICE
            </div>
            <div class="board-info-price-name">
                BID PRICE
            </div>
            <div class="board-info-price-info">
                {{this.ask_price}} DEME
            </div>

            <div class="board-info-price-info">
                {{bid_price}} DEME
            </div>
            <div id="board-info-board-bid">
                <el-button type="warning" size="small" class="button" id="board-info-board-bid-button" @click="Bbid">BID</el-button>
            </div>
        </div>
        <div id="board-info-history">
            <div id="board-info-history-name">
                TRANSACTION HISTORY
            </div>
        </div>
        <div id="board-info-history-info">
            <el-table
                    :data="tableData">
                <el-table-column
                        prop="from"
                        label="FROM"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="to"
                        label="TO"
                        width="350">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="PRICE"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="when"
                        label="WHEN"
                        width="300">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BOARDINFO",
        data(){
            return{
                board_name:'',
                board_owner:'',
                board_height:'',
                board_width:'',
                ask_price:"",
                bid_price:'',
                tableData:[
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"},
                    {"from":"0X213C2144510000CA...","to":'0X213C2144510000CA...',"price":"1200000 DEME","when":"2020-01-21"}
                    ]
            }
        },
        async mounted(){
            this.board_name = this.$route.params.num;
            await this.get_board_info()
        },
        methods:{
            async get_board_info() {
                const that = this;
                let boardid = await this.getBoardIdByName(this.board_name);
                let boardinfo = await this.getBoardInfo(parseInt(boardid));
                let board_price = await this.getBMarketInfo(parseInt(boardid));
                that.ask_price = parseInt(board_price[0]['_askPrice']);
                that.bid_price = parseInt(board_price[0]['_bidPrice']);
                that.board_owner = boardinfo[0]['_boardOwner'];
                that.board_height = boardinfo[0]['_height'];
                that.board_width = boardinfo[0]['_width'];
            },
            async Bbid(){
                let contract = await this.get_contract(this.board_name);
                await contract.functions.bBid("2000")
            },
            jump_in(){
                window.open('http://192.168.0.108:8080/deboard/' + this.board_name, '_blank');
            }

        }
    }
</script>

<style scoped>
    #board-info{
        height: 100%;
        width: 1500px;
        margin: 0 auto;
    }
    #board-info-img{
        height: 200px;
        background-color: #0c0c0c;
        margin-top: 50px;
        width: 100%;
    }
    #board-info-title{
        height: 100px;
    }
    #board-info-board-name{
        margin-top: 20px;
        font-size: 40px;
        float: left;
        margin-left: 100px;
    }
    #board-info-board-owner{
        margin-top: 40px;
        float: right;
        margin-right: 100px;
    }
    #board-info-board-jump,#board-info-board-bid{
        float: left;
        height: 30px;
        margin-left: 30px;
    }
    #board-info-board-jump-button{
        margin-top: 20px;
        height: 40px;
        width:100px
    }
    #board-info-size{
        font-size: 20px;
        text-align: left;
        width: 100%;
        float: left;
        margin-left: 160px;
    }
    #board-info-description,#board-info-price,#board-info-history{
        float: left;
        text-align: left;
        margin-left: 100px;
        height: 110px;
        width: 700px;
    }
    #board-info-description-name,#board-info-history-name{
        margin-top: 30px;
        float: left;
        font-size: 20px;
        height: 30px;
        width: 700px;
    }
    .board-info-price-name{
        margin-top: 30px;
        float: left;
        font-size: 20px;
        height: 30px;
        width: 300px;
    }
    #board-info-description-info{
        float: left;
        height: 50px;
        width:700px
    }
    .board-info-price-info{
        float: left;
        margin-top: 10px;
        height: 50px;
        width: 300px;
        font-size: 20px;
        font-weight: bolder;
    }
    #board-info-history{
        height: 50px;
     }
    #board-info-history-info{
        margin-top: 10px;
        float: left;
        margin-left: 100px;
        width: 1300px;
        font-size: 20px;
        font-weight: bolder;
    }
</style>