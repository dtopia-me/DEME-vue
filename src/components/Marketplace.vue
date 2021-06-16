<template>
    <div id="marketplace">
        <div class="xiangmu">FLIP</div>
        <h1>10000 NFTs representing the rights to operate on the board frames are to be auctioned.</h1>
        <el-progress id = "indudu" type="dashboard" :percentage="percentage" :color="colors"></el-progress>
        <div class="auctioned">
            {{this.currentindex}} frames are auctioned off!
        </div>
        <div id="jindutiao">
            <div class="jindu">
                <div>20</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per1"></el-progress>
                <div>100FLP</div>
            </div>
            <div class="jindu">
                <div>15</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per2"></el-progress>
                <div>200FLP</div>
            </div>
            <div class="jindu">
                <div>15</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per3"></el-progress>
                <div>300FLP</div>
            </div>
            <div class="jindu">
                <div>20</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per4"></el-progress>
                <div>500FLP</div>
            </div>
            <div class="jindu">
                <div>15</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per5"></el-progress>
                <div>800FLP</div>
            </div>
            <div class="jindu">
                <div>8</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per6"></el-progress>
                <div>1300FLP</div>
            </div>
            <div class="jindu">
                <div>4</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per7"></el-progress>
                <div>2100FLP</div>
            </div>
            <div class="jindu">
                <div>3</div>
                <el-progress :text-inside="true" :stroke-width="30" :percentage="per8"></el-progress>
                <div>10000FLP</div>
            </div>
        </div>
        <el-button type="success" @click="op_auction" id="auc">{{wallet_status}}</el-button>
        <div class = "intro">
            <div id="biaoyu">These NFTs are for sale: </div>
            <el-button type="success" size="small" id="sell"><router-link to="Package" class="routerlink">I want to sell</router-link></el-button>
        </div>
        <div class="hengxian"></div>

        <div id = "onsell">
            <Goods></Goods>
        </div>

        <div class="hengxian"></div>
        <div id = "fees">
            <Fees></Fees>
        </div>

        <div class="hengxian"></div>
        <div id = "faqq">
            <FAQ></FAQ>
        </div>


    </div>

</template>

<script>
    import Goods from "@/components/Goods";
    import FAQ from "@/components/FAQ";
    import Fees from "@/components/Fees";
    export default {
        name: "Marketplace",
        components: {Fees, FAQ, Goods},
        data(){
            return{
                wallet_status:'',
                isauction:true,
                currentindex:'',
                percentage:100,
                per1:0,
                per2:0,
                per3:0,
                per4:0,
                per5:0,
                per6:0,
                per7:0,
                per8:0,
                colors: [
                    {color: '#f56c6c', percentage: 20},
                    {color: '#e6a23c', percentage: 40},
                    {color: '#5cb87a', percentage: 60},
                    {color: '#1989fa', percentage: 80},
                    {color: '#6f7ad3', percentage: 100}
                ]
            }
    },
        mounted(){
            this.getnextindex();
            this.get_connect()
        },
        methods: {
            async get_connect(){
                const that = this;
                let status = await this.getmyaccount();
                let statuss = status.length;
                console.log(status,statuss);
                if(statuss===0){
                    that.wallet_status = "Connect Wallet";
                }else {
                    that.wallet_status = "Get Your NFTs";
                }
            },
            async op_auction(){
                const that = this;
                if(that.wallet_status === "Get Your NFTs"){
                    this.getauction();
                }else {
                    await this.onClickConnect().then((res)=>{
                        console.log(res);
                        location.reload();
                    })
                }
            },
            async getnextindex(){
                const that = this;
                if(that.isauction===true){
                    that.percentage = 100;
                    that.per1=100;
                    that.per2=100;
                    that.per3=100;
                    that.per4=100;
                    that.per5=100;
                    that.per6=100;
                    that.per7=100;
                    that.per8=100;
                }else{
                    let nextindex = await this.getNextIndex();
                    console.log(nextindex)
                    that.currentindex = nextindex[0].toNumber();
                    console.log(that.currentindex);
                    that.percentage = that.currentindex;
                    that.per1= (20<that.currentindex?100:that.currentindex/20*100);
                    console.log(that.per1);
                    that.per2= (35<that.currentindex?100:(that.currentindex<=20 ? 0:parseInt((that.currentindex-20)/15*100)));
                    that.per3= (50<that.currentindex?100:(that.currentindex<=35 ? 0:parseInt((that.currentindex-35)/15*100)));
                    that.per4= (70<that.currentindex?100:(that.currentindex<=50 ? 0:parseInt((that.currentindex-50)/20*100)));
                    that.per5= (85<that.currentindex?100:(that.currentindex<=70 ? 0:parseInt((that.currentindex-70)/15*100)));
                    that.per6= (93<that.currentindex?100:(that.currentindex<=85 ? 0:parseInt((that.currentindex-85)/8*100)));
                    that.per7= (97<that.currentindex?100:(that.currentindex<=93 ? 0:parseInt((that.currentindex-93)/4*100)));
                    that.per8= (100<that.currentindex?100:(that.currentindex<=97 ? 0:parseInt((that.currentindex-97)/3*100)));
                    console.log(that.per1)
                }

            },
            getauction() {
                if (this.percentage === 100) {
                    this.$alert("<h2>The auction is over!But frames that have been offered for sale by others can be purchased!<h2>",{
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: 'OK',
                        })
                } else {
                    this.$alert('<h3>We will use your FLP for the auction, please confirm.</h3>', '', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: 'BUY',
                        center: true
                    }).then(() => {
                        this.auction();
                        this.$message({
                            type: 'success',
                            message: 'OK, waiting for confirmation...'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'fail',
                            message: 'cancel'
                        });
                    })
                }

            },
            sell() {
                this.$alert("Will jump to fill in the information page...")
            }
        }
    }
</script>

<style>
    #indudu{
        font-family: "IndieFlower";
    }
    .xiangmu{
        font-family: "IndieFlower";
        text-align: center;
        font-size: 100px;
    }
    .auctioned{
        font-family: "IndieFlower";
        font-size: x-large;
        color: #995f07;
        font-weight: bolder;
    }
    h1{
        font-family: "IndieFlower";
    }
    a{
        font-size: 12px;
        margin-right: 5px;
    }
    #marketplace{
        width: 90%;
        position: relative;
        margin: 0 auto;
    }
    #faqq{
        width: 100%;
        height: 700px;
    }
    #fees{
        margin-top: 0;
        width: 100%;
        height: 600px;
    }
    .intro{
        margin-top: 30px;
        height: 30px;
        width: 100%;
    }
    .hengxian{
        margin-top: 5px;
        border: black solid 1px;
    }
    #biaoyu{
        height: 50px;
        float: left;
        position: relative;
        font-weight: bolder;
        font-family: "IndieFlower";
        font-size: 20px;
    }
    #sell{
        float: right;
        background-color: aliceblue;
        font-family: "IndieFlower";
        font-weight: bolder;
        font-size: 15px;
    }
    .routerlink{
        text-decoration: none;
        color: black;
    }
    #jindutiao{
        font-family: "IndieFlower";
        font-weight: bolder;
    }
    .jindu{
        width: 12.5%;
        float: left;
        margin-top: 20px;
        font-size: 15px;
    }
    #onsell{
        margin-top: 20px;
        height: 500px;
    }
    #auc{
        margin-top: 30px;
        height: 50px;
        width: 220px;
        font-family: "IndieFlower";
        font-weight: bolder;
        font-size: 30px;
    }
    body {
        padding-right: 0px !important;/* 强制设置右侧填充为0，这样弹窗的代码就改不动它了 */
        overflow-y: scroll!important;/* 所有页面都显示滚动条 */
    }


</style>