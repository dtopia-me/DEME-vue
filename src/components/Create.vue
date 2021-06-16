<template>
    <div id="create-board">
        <div id="create-board-i">
            <div id="create-board-i-i">
            <div class="input-d" id="set-size">
                <div class="input-d-d" >Set the size:</div>
                <el-select v-model="width" clearable placeholder="width(range: 1-10)" class="input-d-d">
                    <el-option
                            v-for="item in options_width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="length" clearable placeholder="length(range: 1-10)" class="input-d-d">
                    <el-option
                            v-for="item in options_length"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="input-d">
                <div class="input-d-d">Theme:</div>
                <el-select v-model="theme" clearable placeholder="theme" class="input-d-d">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="input-d">
                <div class="input-d-d">Description:</div>
                <el-input v-model="Description" placeholder="Description" class="input-d-d"></el-input>
            </div>
            <div class="input-d">
                <div class="input-d-d" >BoardName:</div>
                <el-input v-model="boardname" placeholder="board_name"
                          class="input-d-d"></el-input>
            </div>
            <div>
                <el-button type="warning" @click="create" class="genarate">{{wallet_status}}</el-button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    // const Web3 =require('web3');
    const aaa = require('../config.json');
    import { Loading } from 'element-ui';
    export default {
        name: "Create",
        data() {
            return {
                options_width: [
                    {
                    value: '1',
                    label: '1'
                }, {
                        value: '2',
                        label: '2'
                    },
                    {
                        value: '3',
                        label: '3'
                    },
                    {
                        value: '4',
                        label: '4'
                    },
                    {
                        value: '5',
                        label: '5'
                    },
                    {
                        value: '6',
                        label: '6'
                    },
                    {
                        value: '7',
                        label: '7'
                    },
                    {
                        value: '8',
                        label: '8'
                    },
                    {
                        value: '9',
                        label: '9'
                    },
                    {
                        value: '10',
                        label: '10'
                    },
                ],
                options_length: [
                    {
                        value: '1',
                        label: '1'
                    }, {
                        value: '2',
                        label: '2'
                    },
                    {
                        value: '3',
                        label: '3'
                    },
                    {
                        value: '4',
                        label: '4'
                    },
                    {
                        value: '5',
                        label: '5'
                    },
                    {
                        value: '6',
                        label: '6'
                    },
                    {
                        value: '7',
                        label: '7'
                    },
                    {
                        value: '8',
                        label: '8'
                    },
                    {
                        value: '9',
                        label: '9'
                    },
                    {
                        value: '10',
                        label: '10'
                    },
                ],
                options: [{
                    value: '1',
                    label: 'Black'
                }, {
                    value: '2',
                    label: 'Red'
                }, {
                    value: '3',
                    label: 'Yellow'
                }, {
                    value: '4',
                    label: 'Green'
                }, {
                    value: '5',
                    label: 'Blue'
                }],
                value: '',
                width: '',
                length:'',
                radio:'',
                theme:'',
                governance:'',
                boardname:'',
                Description:'',
                wallet_status:''
            }
        },
        mounted(){
            this.get_connect();
            this.getapproved();
        },
        methods:{
            async getapproved(){
                let myaccount_d = await this.getmyaccount();
                console.log(myaccount_d);
                const that = this;
                that.myaccount = myaccount_d[0]; //获取当前地址
                console.log(aaa['auction']);
                // try{
                    let isapproved = await this.isApprovedForAll(that.myaccount,aaa['tokenrouter']);
                    let isapproved_f = await this.isApprovedForAll_f(that.myaccount,aaa['tokenrouter']);
                    console.log(isapproved);
                    if(isapproved[0]===true&&isapproved_f[0]===true){
                        console.log('isapproved');
                    }else{
                        await this.approve(aaa['tokenrouter'],"100000000");
                        await this.setApprovalForAll(aaa['tokenrouter'],true);
                        await this.setApprovalForAll_f(aaa['tokenrouter'],true);
                    }
                // }catch (e) {
                //     this.$alert("Maybe your BNB isn't enough to pay for gas")
                // }

            },
            async get_connect(){
                const that = this;
                let status = await this.getmyaccount();
                let statuss = status.length;
                if(statuss===0){
                    that.wallet_status = "Connect";
                }else {
                    that.wallet_status = "Generate"
                }
            },
            async create(){
                if(this.wallet_status === "Connect"){
                    await this.onClickConnect().then((res)=>{
                        console.log(res);
                        location.reload();
                    })
                }else {
                    console.log(this.width,this.length,this.theme,this.boardname);
                    let res = await this.createBoard(this.width,this.length,this.theme,this.boardname);
                    let loadingInstance1 = Loading.service({text:"Waiting for board generation......"});
                    console.log(res);
                    let aa = this.factory_c();
                    (await aa).on("BoardCreated", (owner,newBoardAddr,boardName) =>{
                        console.log(boardName,newBoardAddr);
                        loadingInstance1.close();
                        let routeData = this.$router.resolve({path:'/YBoard'});
                        window.open(routeData.href, '_blank');
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #create-board{
        height: 500px;
        width: 100%;
        margin-top: 200px;
    }
    #create-board-i{
        height: 500px;
        width: 1000px;
        margin: 0 auto;
        background-color: #f3e5db
    }
    #create-board-i-i{
        height: 400px;
        width: 1000px;
        margin-top: 100px;
        float: left;
    }
    .input-d{
        width: 50%;
        height: 50px;
        margin-left: 25%;
        margin-right: 25%;
        line-height: 50px;
        color: black;
        font-weight: bolder;
        text-align: right;
    }
    span{
        float: left;
        width: 20px;
        text-align: center;
        line-height: 50px;
    }
    .input-d-d{
        float: left;
        width: 150px;
        margin-right: 10px;
    }
    .genarate{
        background-color: #ec7620;
        height: 50px;
        border: 0;
        margin-top: 10px;
    }
</style>