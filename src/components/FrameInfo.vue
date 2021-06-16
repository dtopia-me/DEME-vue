<template>
    <div id="frame-info">
            <div id="frame-info-img">
                <img src="https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621948359000.jpg" :style="{width:'200px',height:'100%'}">
            </div>
            <div class="frame-info-a">
                <div id="frame-info-coordinate" class="frame-info-each">
                    <div class="frame-info-each-name">
                        COORDINATE
                    </div>
                    <div class="frame-info-each-info">
                        (2,4)
                    </div>
                </div>
                <div id="frame-info-size" class="frame-info-each">
                    <div class="frame-info-each-name">
                        SIZE
                    </div>
                    <div class="frame-info-each-info">
                        height * width
                    </div>
                </div>
                <div id="frame-info-board-name" class="frame-info-each">
                    <div class="frame-info-each-name">
                        HOME BOARD
                    </div>
                    <div class="frame-info-each-info">
                        {{board_name}}
                    </div>
                </div>
            </div>
            <div class="frame-info-a">
                <el-button @click="ask" :style="{backgroundColor:'#f1bc72'}">Sell</el-button>
                <el-button :style="{backgroundColor:'#f1bc72'}">Send</el-button>
            </div>
        <div id="frame-info-board-operate">
            <div id="frame-info-board-operate-name">
                OPERATE
            </div>
            <div id="frame-info-board-operate-info">
                <el-button @click="split" :style="{backgroundColor:'#f1bc72'}">Split</el-button>
                <el-button @click="uploadd" :style="{backgroundColor:'#f1bc72'}">Upload board</el-button>
                <el-button @click="upload_site" :style="{backgroundColor:'#f1bc72'}">Upload site-board</el-button>
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
                            width="450">
                    </el-table-column>
                    <el-table-column
                            prop="to"
                            label="TO"
                            width="450">
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
    const ethers = require('ethers');
    export default {
        name: "FrameInfo",
        data(){
            return{
                board_name:'',
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
        mounted(){
            this.board_name = this.$route.params.num
        },
        methods:{
            async upload_site(){
                let frame_id = "36";
                let contract = await this.get_contract(this.board_name);
                let newCID = "https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621948359000.jpg";
                let slotid = 1;
                await contract.functions.setSideboardCID(frame_id,slotid,newCID,{
                    gasLimit: 5000000,
                    gasPrice: ethers.utils.parseUnits("20", "gwei")
                })
            },
            async uploadd(){
                let frame_id = "36";
                let contract = await this.get_contract(this.board_name);
                let newCID = "https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621948359000.jpg";
                await contract.functions.update(frame_id,newCID,{
                    gasLimit: 5000000,
                    gasPrice: ethers.utils.parseUnits("20", "gwei")
                })
            },
            async split(){
                let contract = await this.get_contract(this.board_name);
                console.log(contract);
                await contract.functions.split("214",!!parseInt("1"),"1")
            },
            async ask(){
                let contract = await this.get_contract(this.board_name);
                console.log(contract);
                await contract.functions.ask("36","100")
            },
        }

    }
</script>

<style scoped>
    #frame-info{
        height: 100%;
        width: 1500px;
        margin: 0 auto;
    }
    #frame-info-img{
        height: 200px;
        background-color: #0c0c0c;
        margin-top: 50px;
        width: 100%;
    }
    .frame-info-each{
        font-size: 20px;
        text-align: left;
        width: 200px;
        float: left;
    }
    .frame-info-each-name{
        height: 40px;
    }
    .frame-info-each-info{
        height: 40px;
    }
    .frame-info-a{
        margin-top: 20px;
        width: 750px;
        height: 80px;
        float: left;
    }
    #frame-info-board-operate{
        width: 750px;
        height: 100px;
        margin-top: 20px;
        float: left;
    }
    #frame-info-board-operate-name,#frame-info-board-operate-info{
        width: 750px;
        height: 50px;
        float: left;
        text-align: left;
        font-size: 20px;
    }
    #board-info-history{
        width: 100%;
        height: 50px;
        float: left;
        text-align: left;
        font-size: 20px;
        margin-top: 20px;
    }
</style>