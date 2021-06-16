<template>
    <div id = 'set-board'>
        <div id="set-board-info">
            <div id="set-board-info-title">
                <div id="set-board-board-name">
                    {{board_name}}
                </div>
                <div id="set-board-board-size">
                    (size: 100 * 100)
                </div>
                <div id="set-board-button-mint">
                    <el-button type="warning" size="small" class="button" :style="{height:'40px',width:'120px'}" :disabled="dis" @click="mint">
                        {{mint_status}}</el-button>
                </div>
            </div>
            <div id="set-board-info-info">
                <div id="set-board-img">
                    <div class="set-op-name">Set the board image: </div>
                    <div class="set-op-upload">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :style="{width:'200px',height: '200px'}">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
                <div id="set-board-description">
                    <div class="set-op-name" >Description: </div>
                    <div class="set-op-upload">
                        <div class="set-op-upload-text">
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    placeholder="Enter..."
                                    v-model="textarea">
                            </el-input>
                            <el-button type="warning" size="small" class="button"  id="set-board-button-sbmit"  :style="{height:'40px',width:'100px',float:'right'}" @click="submit">SUBMIT</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const ethers = require('ethers');
    export default {
        name: "SetBoard",
        data(){
            return{
                board_name:'',
                imageUrl: '',
                textarea:'',
                mint_status:'',
                dis:'',
            }
        },
        mounted(){
            this.board_name = this.$route.params.num;
            this.is_mint();
        },
        methods:{
            async is_mint(){
                const that = this;
                console.log(this.board_name);
                let contract = await this.get_contract(this.board_name);
                let allminted = await contract.functions.allMinted();
                if (allminted[0] === true){
                    that.mint_status = 'All Minted';
                    that.dis = true
                }else {
                    that.mint_status = 'Mint';
                    that.dis = false;
                }
            },
            async mint(){
                console.log(this.board_name);
                let contract = await this.get_contract(this.board_name);
                let allminted = await contract.functions.allMinted();
                console.log(allminted);
                if (allminted[0] === true){
                    console.log("allminted")
                }else {
                    await contract.functions.batchMint({
                        gasLimit: 20000000,
                        gasPrice: ethers.utils.parseUnits("20", "gwei")
                    })
                }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('ONLY JPG!');
                }
                if (!isLt2M) {
                    this.$message.error('NO LARGER THAN 2MB!');
                }
                return isJPG && isLt2M;
            },
            submit(){


            }
        }
    }
</script>

<style>
    #set-board{
        width: 100%;
        height: 100%;
    }
    #set-board-info{
        width: 2000px;
        margin: 0 auto;
    }
    #set-board-info-title{
        width: 2000px;
        height: 100px;
        margin-top: 100px;
    }
    #set-board-info-info{
        width: 2000px;
        position: absolute;
        height: 700px;
        margin-top: 30px;
        background-color: #72767b;
    }
    #set-board-board-name{
        width: 250px;
        height: 100px;
        margin-top: 25px;
        font-size: 50px;
        font-weight: bolder;
        color: aliceblue;
        float: left;
    }
    #set-board-board-size{
        width: 180px;
        height: 100px;
        margin-top: 42px;
        font-size: 20px;
        color: aliceblue;
        float: left;
    }
    #set-board-button-mint{
        float: left;
        margin-left: 50px;
        width: 200px;
        margin-top: 42px;
        height: 100px;
    }
    #set-board-img,#set-board-description{
        height: 300px;
        width: 1500px;
        float: left;
        margin-top: 20px;
    }
    .set-op-name{
        margin-left: 30px;
        font-size: 25px;
        width: 300px;
        text-align: left;
    }
    .set-op-upload{
        width: 800px;
        margin-top: 20px;
    }
    #set-board-button-sbmit{
        margin-top: 10px;
        float: right;
    }
    .set-op-upload-text{
        width: 500px;
        margin: 0 auto;
    }
    .avatar-uploader{

        margin: 0 auto;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader :hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon{
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        margin-top: 80px;
        text-align: center;
    }
    .avatar{
        width: 178px;
        height: 178px;
        display: block;}
</style>