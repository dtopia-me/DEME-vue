<template>
    <div class="package">
    <h1>You can merge, split frames and upload pictures of frames here!</h1>
    <div class="button-merge">
        <el-button type="text" @click="merged" id="merged">Merge</el-button>
    </div>
    <div class="tablett">
        <el-table
                :data="tableData"
                :row-class-name="tableRowClassName"
                :height="500"
                border
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="tokenid"
                    label="id"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="board_name"
                    label="board_name"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="coordinate"
                    label="coordinate"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="length"
                    label="length"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="width"
                    label="width"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="uri"
                    label="uri"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="uri"
                    label="uri_preview"
                    width="120">
                <template slot-scope="scope">
                    <img style="margin-left: 30px;margin-right: 30px;height: 40px;width: 40px" :src="scope.row.uri ">
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="Operations"
                    width="500">
                <template slot-scope="scope">
                    <el-button type="text" @click="slpitd(scope.row)">Split</el-button>
                    <el-upload
                            action="#"
                            :http-request="httpRequest"
                            :show-file-list="false"
                            :limit="1"
                            :data="scope.row"
                            accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG">
                        <el-button size="small" type="text">Upload Board</el-button>
                    </el-upload>
                    <el-upload
                            action="#"
                            :http-request="setflip"
                            :show-file-list="false"
                            :limit="1"
                            :data="scope.row"
                            accept=".gif,.jpg,.jpeg,.png,.GIF,.JPG,.PNG">
                        <el-button size="small" type="text">Upload Flipboard</el-button>
                    </el-upload>
                    <el-button type="text" @click="send(scope.row)">Send</el-button>
                    <el-button type="text" @click="sell(scope.row)">Sell</el-button>
                    <!--                <el-button type="text" @click="swap(scope.row)">Swap</el-button>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
    </div>
</template>

<script>
    const aaa = require('../config.json');
    export default {
        name: "Package",
        data() {
            return {
                af:"",
                att:'',
                tid:"",
                multipleSelection: [],
                tableData: [],
                myaccount:'',
                fileBase64:'',
                re_data:''
            }
        },
        mounted(){
            this.getmynft()
        },
        methods:{
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    let fileResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        fileResult = reader.result;
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                    reader.onloadend = function() {
                        resolve(fileResult);
                    };
                });
            },
            async httpRequest(data) {
                console.log(data);
                let tokenid = data["data"]["tokenid"];

                // 将图片上传至ipfs（infura的公开节点）
                const {create} = require('ipfs-http-client');
                const  client  = create(new URL("https://ipfs.infura.io:5001"));

                // 获取上传成功后的ipfs cid
                const { cid } = await client.add(data["file"]);
                let cidd = cid["string"];

                // 将图片的ipfs连接上传到board
                this.updateuri(tokenid,"https://ipfs.io/ipfs/" + cidd)

            },
            async setflip(data) {
                console.log(data);
                let tokenid = data["data"]["tokenid"];
                let frameid = await this.getFrameIdByTokenId(tokenid);
                const {create} = require('ipfs-http-client');
                const  client  = create(new URL("https://ipfs.infura.io:5001"));
                const { cid } = await client.add(data["file"]);
                console.log(cid["string"]);
                let cidd = cid["string"];
                let res = await  this.setFlipboardCID(frameid,0,"https://ipfs.io/ipfs/" + cidd);
                console.log(res)
            },
            async sell(row){
                console.log(row);
                let tokenid_o = row['tokenid'];
                console.log(tokenid_o);
                this.$prompt('Enter the ask price', 'Input', {
                    confirmButtonText: 'YES',
                    cancelButtonText: 'NO',
                }).then(({ value }) => {
                    let res = this.ask(tokenid_o,value * 100 + '')
                    console.log(res)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel'
                    });
                });
            },
            async getapproved(){
                let myaccount_d = await this.getmyaccount();
                console.log(myaccount_d);
                const that = this;
                that.myaccount = myaccount_d[0]; //获取当前地址
                console.log(aaa['auction']);
                try{
                    let isapproved = await this.isApprovedForAll(that.myaccount,aaa['auction']);
                    let isapproved_f = await this.isApprovedForAll_f(that.myaccount,aaa['auction']);
                    console.log(isapproved);
                    if(isapproved[0]===true&&isapproved_f[0]===true){
                        console.log('isapproved');
                    }else{
                        await this.approve(aaa['auction'],"100000000");
                        await this.setApprovalForAll(aaa['auction'],true);
                        await this.setApprovalForAll_f(aaa['auction'],true);
                    }
                }catch (e) {
                    this.$alert("Maybe your BNB isn't enough to pay for gas")
                }

            },
            async getmynft() {
                const that =this;
                let myaccount_d = await this.getmyaccount();
                that.myaccount = myaccount_d[0]; //获取当前地址
                let mybalance_d = await this.balanceOf(that.myaccount);
                let mybalance = mybalance_d[0].toNumber(); //获取当前地址NFT余额
                if(mybalance>0){
                    await this.getapproved();
                }
                for(let i=0;i<mybalance;i++){
                    let tokenid = await this.tokenOfOwnerByIndex(that.myaccount,i);
                    //按顺序获取当前地址的NFT的tokenid、frame信息、cid等
                    let frameid = await this.getFrameIdByTokenId(tokenid[0].toString(10));
                    let frame = await this.getFrame(frameid[0]);
                    let uri = await this.getCID(frameid[0]);

                    let x1 = frame[0]["_x1"];
                    let y1 = frame[0]["_y1"];
                    let x2 = frame[0]["_x2"];
                    let y2 = frame[0]["_y2"];
                    let width = parseInt(x2) - parseInt(x1);
                    let height = parseInt(y2) - parseInt(y1);

                    let each = {
                        "coordinate": '(' + x1 + ',' + y1 + ');' + '(' + x2 + ',' + y2 + ')',
                        "length": height,
                        "width": width,
                        "uri":uri[0],
                        "tokenid": tokenid[0].toString(10)
                    };
                    that.tableData.push(each);
                }
            },
            async send(row){
                console.log(row);
                let tokenid = row["tokenid"];
                console.log(tokenid);
                this.$prompt('Enter the address', 'Input', {
                    confirmButtonText: 'YES',
                    cancelButtonText: 'NO',

                }).then(({ value }) => {
                    let res = this.transfer(value,tokenid);
                    console.log(res)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel'
                    });
                });
            },
            async slpitd(row){
                console.log(row);
                let tokenid = row["tokenid"];
                console.log(tokenid);
                this.$prompt('This operation will split this frame. Do you want to continue?Please enter Inx & Units(Format: INX,Units)', 'info', {
                    confirmButtonText: 'YES',
                    cancelButtonText: 'NO',
                }).then(({value}) => {
                    let valuelist = value.split(',');
                    console.log(valuelist);
                    let inx = valuelist[0];
                    let inx_f = !!parseInt(inx);
                    let unit = valuelist[1];
                    console.log(typeof parseInt(tokenid),typeof inx_f,typeof parseInt(unit));
                    console.log(parseInt(tokenid),inx_f,parseInt(unit))
                    this.split(parseInt(tokenid),inx_f,parseInt(unit));
                    this.$message({
                        type: 'success',
                        message: 'OK, waiting for confirmation... '
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'CANCEL!'
                    });
                });
            },
            // async swap(row){
            //     console.log(row);
            //     let tokenid = row["tokenid"];
            //     console.log(tokenid);
            //     this.$prompt('This operation will split this frame. Do you want to continue?Please enter Inx & Units(Format: tokenid1,tokenid2)', 'info', {
            //         confirmButtonText: 'YES',
            //         cancelButtonText: 'NO',
            //     }).then(({ value }) => {
            //         let valuelist = value.split(',');
            //         console.log(valuelist);
            //         let tokenid1 = valuelist[0];
            //         console.log(tokenid1);
            //         let tokenid2 = valuelist[1];
            //         console.log(tokenid2);
            //         this.shallowSwap(tokenid1,tokenid2);
            //         this.$message({
            //             type: 'success',
            //             message: 'OK, waiting for confirmation... '
            //         });
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: 'CANCEL!'
            //         });
            //     });
            // },
            // async uploadd(row){
            //     await axios({
            //         method: 'post',
            //         url: "./test.json",
            //         dataType: "json",
            //         crossDomain: true,
            //         cache: false
            //     }).then(res => {
            //         that.res = res['data']['points'];
            //         that.res.sort(this.compare('tokenid'))
            //     });
            //     console.log(row);
            //     let tokenid = row["tokenid"];
            //     console.log(tokenid);
            //     this.$prompt('Enter the URI', 'Input', {
            //         confirmButtonText: 'YES',
            //         cancelButtonText: 'NO',
            //     }).then(({ value }) => {
            //         console.log(tokenid);
            //         console.log(value);
            //         let res = this.updateuri(tokenid,value);
            //         console.log(res)
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: 'cancel'
            //         });
            //     });
            // },
            merged: function () {
                if (this.multipleSelection.length === 2) {
                    this.$confirm('This operation will merge the two frames. Do you want to continue?', 'Message', {
                        confirmButtonText: 'YES',
                        cancelButtonText: 'NO',
                        type: 'warning'
                    }).then(() => {
                        let tokenid1 = this.multipleSelection[0]['tokenid'];
                        let tokenid2 = this.multipleSelection[1]['tokenid'];
                        this.merge(tokenid1, tokenid2);
                        this.$message({
                            type: 'success',
                            message: 'OK, waiting for confirmation...'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'CANCEL!'
                        });
                    });
                } else {
                    this.$message({
                        type: 'warning',
                        message: 'Please select two frames to merge! No less or more than two!'
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            tableRowClassName({rowIndex}) {
                if (rowIndex%2 === 0) {
                    return 'two-row';
                } else if (rowIndex%3 === 0) {
                    return 'three-row';
                } else {
                    return 'one-row';
                }
            }
        }
    }
</script>

<style scoped>
    .package{
        height: 80%;
        width: 80%;
        margin-right: 10%;
        margin-left: 10%;
        font-family: Inconsolata-B;
    }
    #merged{
        float: left;
        height: 30px;
    }
    .button-merge{
        height: 30px;
        width: 100%;
        margin-left: 5%;
        margin-right: 5%;
    }
    .tablett{
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
        height: 500px;
        margin-top: 20px;
    }
</style>
<style>
    .el-table .one-row {
        background: #f6c364;
    }

    .el-table .two-row {
        background: #cef8b6;
    }

    .el-table .three-row {
        background: #9bc1fa;
    }
</style>