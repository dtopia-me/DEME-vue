<template>
    <div id="app">
        <div class="wrapper">
            <div class="dinbu">
                <div id="title">
                    <div id="name">
                        DEME
                    </div>
                    <div id="r-connect">
                        <el-button type="warning" @click="op_wallet" id="aucc">{{wallet_status}}</el-button>
                    </div>
                    <div id="r-icon">
                        <i class="el-icon-user-solid"></i>
                    </div>
                    <div id="r-flp">
                        <i class="el-icon-shopping-cart-2"></i>
                        :{{flp}}DEME
                    </div>
                    <div id="r-package" v-if="show">
                        <router-link to="/BOARDMARKET" class="package-a">BOARD MARKET</router-link>
                    </div>
                    <div id="r-flip" v-if="show">
                        <router-link to="/DOC" class="package-a">DOC</router-link>
                    </div>

                </div>
            </div>
            <div id="info">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    const aaa = require('./config.json');
    export default {
        name: 'App',
        data(){
            return{
                show:false,
                wallet_status:'',
                flp:'',
                myaccount:'',
                auction:'',
                frame:'',
                token:'',
                auction_c:'',
                frame_c:'',
                token_c:''
            }
        },
        mounted(){
            this.get_connect();
            this.getcontra();
            this.getbalanceofflp();
        },
        methods:{
            async get_connect(){
                const that = this;
                let status = await this.getmyaccount();
                let statuss = status.length;
                console.log(status,statuss);
                if(statuss===0){
                    that.wallet_status = "Connect Wallet";
                }else {
                    that.wallet_status = "My Wallet"
                    that.show = true;
                }
            },
            async op_wallet(){
                const that = this;
                if(that.wallet_status === "My Wallet"){
                    let myaccount_d = await this.getmyaccount();
                    that.myaccount = myaccount_d[0]
                    this.$alert("Address: " + that.myaccount);
                }else {
                    await this.onClickConnect().then((res)=>{
                            console.log(res);
                            location.reload();
                        }
                    );
                }
            },
            async getbalanceofflp(){
                let myaccount_d = await this.getmyaccount();
                console.log( myaccount_d);
                const that = this;
                that.myaccount = myaccount_d[0]; //获取当前地址
                console.log(that.myaccount);
                let balance = await this.balanceOfFlp(that.myaccount);
                this.flp = balance[0].toNumber()/100; //最后两位是小数点,所以除100
            },
            getcontra(){
                this.auction = aaa['auction'];
                this.token = aaa['ERC20'];
                this.frame = aaa['frame'];
                this.auction_c = "https://testnet.bscscan.com/address/" + this.auction;
                this.token_c = "https://testnet.bscscan.com/address/" + this.token;
                this.frame_c = "https://testnet.bscscan.com/address/" + this.frame
            },
        }

    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
        width: 100%;
        position:absolute;
        top:0;
        right:0;
        bottom:0;
        left:0;
    }
    .wrapper{display: flex;flex-direction: column;min-height: 100%;}
    #info{
        margin-top: 100px;
        flex: 1;
        text-align: center;
    }
    .dinbu{
        flex: 1;
    }
    #title{
        position: fixed;
        background-color: rgb(245, 199, 158);
        height: 100px;
        width: 100%;
        z-index:9999
    }
    #name{
        font-weight: bolder;
        font-size: 30px;
        color: #0762a8;
        text-align: center;
        float: left;
        width: 200px;
        height: 40px;
        margin-top: 30px;
        margin-left: 30px;
    }
    #r-connect{
        font-weight: bolder;
        font-size: x-large;
        color: #0762a8;
        text-align: center;
        float: left;
        width: 200px;
        height: 20px;
        margin-top: 26px;
        margin-left: 40px;
    }
    #r-flip,#r-package,#r-market,#r-gen{
        text-align: center;
        width: 150px;
        height: 40px;
        float: left;
        margin-top: 40px;
        margin-left: 40px;
    }
    #r-icon{
        text-align: center;
        width: 50px;
        height: 30px;
        font-size: 20px;
        float: right;
        margin-top: 40px;
    }
    #r-flp{
        font-size: 15px;
        float: right;
        text-align: center;
        margin-left: 20px;
        width: 150px;
        height: 30px;
        margin-top: 42px;
    }
    .package-a{
        text-decoration: none;
        font-weight: bolder;
        color: #0762a8;
    }
    .dibu{
        float: left;
        width: 45%;
        text-align:left;
        margin-top: 20px;
        margin-left: 5%;
    }
    .dibu_e{
        float: right;
        width: 45%;
        text-align:right;
        margin-top: 20px;
        margin-right: 5%;
    }
    .di{
        flex: 0;
        background-color:  rgb(245, 199, 158);
        width: 100%;
        height: 160px;
    }
    .hengxian{
        margin-top: 5px;
        border: black solid 1px;
    }
    .email{
        float: right;
        width: 400px;
        margin-top: 20px;
        font-size: 14px;
        text-align:left;
    }
    .contra{
        float: left;
        width: 100%;
        margin-top: 0;
        font-size: 14px;
    }
    .contraa{
        float: left;
        width: 100%;
        margin-top: 0;
        font-weight: normal;
    }
    #aucc{
        margin-top: 0;
        height: 40px;
        width: 200px;
    }

</style>