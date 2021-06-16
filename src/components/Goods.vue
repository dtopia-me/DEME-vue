<template>
    <!--eslint-disable-next-line-->
    <div class="goods">
        <!--eslint-disable-next-line-->
        <div class="goods-e" v-for="each in goods">
            <div class="goods-photo">
                <img  v-bind:src="each.uri" :onerror="defaultImg">
            </div>
            <div class="bidprice">bidprice:{{each.bidprice}}FLP</div>
            <div class="price">askprice:{{each.askprice}}FLP</div>
            <el-button class="button" type="text" @click="buy(each.punkid)" v-bind:id="each.punkid">BID</el-button>
        </div>
    </div>
</template>

<script>
    const aaa = require('../config.json');
    export default {
        name: "Goods",
        data(){
            return{
                defaultImg: "this.remove()",
                goods:[],
                myaccount:''
            }
        },
        mounted(){
            this.gettotal()
        },
        methods:{
            async gettotal(){
                const that=this;
                let myaccount_d = await this.getmyaccount();
                console.log(myaccount_d);
                that.myaccount = myaccount_d[0]; //获取当前地址
                let totalsupply = await this.listNFTForSale();
                console.log(totalsupply);
                for(let i =0;i<totalsupply[0].length;i++){
                    console.log(i);
                    let tokenid_n = totalsupply[0][i].toNumber();
                    console.log(tokenid_n);
                    let frameID = await this.getFrameIdByTokenId(tokenid_n);
                    let framecid = await this.getCID(frameID[0]);
                    let tokeninfo = await this.getNFTInfo(tokenid_n);
                    console.log(tokeninfo);
                    let each ={
                        punkid:tokeninfo[0]['_tokenId'].toNumber(),
                        uri:framecid,
                        askprice:tokeninfo[0]['_offerPrice']/100,
                        bidprice:tokeninfo[0]['_maxBidPrice']/100
                    };
                    console.log(each);
                    that.goods.push(each);
                }
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
            async buy(id){
                await this.getapproved();
                const that = this;
                let tokenid_o = id;
                let tokeninfo = await this.getNFTInfo(tokenid_o);
                let bidder = tokeninfo[0]['_bidder'];
                this.$prompt('Enter your bid price', 'Input', {
                    confirmButtonText: 'YES',
                    cancelButtonText: 'NO',
                }).then(({ value }) => {
                    console.log(that.myaccount,bidder)
                    if(bidder.toLowerCase()===that.myaccount.toLowerCase()){
                        let res = this.increaseBid(tokenid_o,value * 100 + '');
                        console.log(res);
                    }else {
                        let res = this.bid(tokenid_o,value * 100 + '');
                        console.log(value * 100 + '');
                        console.log(res)
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'cancel'
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .goods{
        margin-top: 20px;
        height: 500px;
        overflow:auto
    }
    .goods-e{
        height: 150px;
        width: 20%;
        float: left;
        font-family: "Inconsolata-B";
    }
    .goods-photo{
        margin:0 auto;
        height: 70px;
        width: 70px;
        border: black solid 1px;
    }
    img{
        height: 70px;
        width: 70px;
        border: black solid 1px;
    }
    .price{
        margin-top: 10px;
        height: 10px;
        font-size: 12px;
    }
    .bidprice{
        margin-top: 2px;
        height: 10px;
        font-size: 12px;
    }
    .button{
        height: 10px;
        font-size: 18px;
        font-weight: bolder;
        font-family: "IndieFlower";
    }

</style>