<template>
    <div id="deboard">
        <div id="board-switch">
            <el-switch
                    style="display: block"
                    v-model="barrageIsShow"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    inactive-text="Barrage Show">
            </el-switch>
        </div>
        <div id="board-owner">
            Board Owner:{{board_owner}}
        </div>
        <div id="board-demo-name">BOARD-DEMO</div>
        <div id="board-demo-link">Link: http://deme.cc/zhibo</div>
        <div id="board-demo-description">Description: Description、Description、Description、Description
            Description、Description、Description</div>

        <div id="board-auction">
            <el-button type="warning" size="small" class="button" id="button-auction" @click="auction">AUCTION</el-button>
        </div>
        <div class="danmu">
            <vue-baberrage
                    :isShow="barrageIsShow"
                    :barrageList="barrageList"
                    :maxWordCount="maxWordCount"
                    :throttleGap="throttleGap"
                    :loop="barrageLoop"
                    :boxHeight="boxHeight"
                    :boxWidth="boxWidth"
                    :messageHeight="messageHeight"
                    :lanesCount="lanesCount"
                    style="width:100%;height:100px;z-index: 9999999;margin-top: 0">
            </vue-baberrage>
        </div>
        <div class="all-info">
        <div class="daohang">
            <el-row class="tac">
                <el-col>
                    <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="1">
                            <span slot="title"> </span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="router_myframe">
                            <i class="el-icon-present"></i>
                            <span slot="title">yNFTs</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-s-shop"></i>
                            <span slot="title">Market</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-notebook-2"></i>
                            <span slot="title">Governance</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        <div class="new-board">
            <div class="new-board-t">
                <!--eslint-disable-next-line-->
                <div class="new-board-d" v-for="each in finalres" :style="{width: y, height: y}" @click="openflip()">
                </div>
            </div>
        </div>
        </div>
        <el-drawer
                title="Flipboard"
                :visible.sync="drawer"
                size="30%"
                :with-header="false">
            <div id="eldraw">
                <div class="site-title">Here is the site-board for each NFT,  where you can upload text, images, videos, and other content, even HTML files!
                    <span>Here's a link: </span>
                    <a href="http://flipnfts.cn/">http://flipnfts.cn</a>
                </div>
                <div class="site-body">
                    <div class='demo' v-show="showsite2">
                        <video-player class="video-player vjs-custom-skin"
                                      ref="videoPlayer"
                                      :playsinline="true"
                                      :options="playerOptions">
                        </video-player>
                    </div>
                    <div id="flipboard-d" v-show="showsite">
                        <img v-bind:src="flipboard" id="flipboard" alt="">
                    </div>
                </div>
                <div class="block" id="button-d">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage3"
                            :page-size=1
                            layout="prev, pager, next"
                            :total=total>
                    </el-pagination>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import {MESSAGE_TYPE} from 'vue-baberrage';
    import {videoPlayer} from "vue-video-player";
    import "video.js/dist/video-js.css";
    const ethers = require('ethers');
    const fnft_json = require('../fnft.json')
    const config = require('../config.json');
    export default {
        name: "deboard",
        components: {
            videoPlayer
        },
        data(){
            return{
                board_owner:'',
                showsite:true,
                showsite2:false,
                showCard:false,
                isCollapse: true,
                board:'',
                finalres:[],
                y:'',
                width: '',
                height:'',
                board_id:'',
                contract:'',
                playerOptions: {
                    playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                    autoplay: true, // 如果为true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: true, // 是否视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4", // 类型
                        src: './12.mp4' // url地址
                    }],
                    poster: '', // 封面地址
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆 盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true, // 当前时间和持续时间的分隔符
                        durationDisplay: true, // 显示持续时间
                        remainingTimeDisplay: false, // 是否显示剩余时间功能
                        fullscreenToggle: false // 是否显示全屏按钮
                    },},
                barrageIsShow: true,    //是否展示弹幕
                messageHeight: 3,       //消息高度(测试不生效)
                barrageLoop: true,     //是否循环播放
                maxWordCount: 2,        //弹幕字数(测试不生效)
                lanesCount:2,           //固定弹幕(测试不生效)
                boxWidth:2000,           //弹幕宽度
                boxHeight: 200,         //弹幕高度(测试不生效)
                throttleGap: 3000,       //消息间隔
                barrageList: [],         //弹幕列表，格式为数组
                drawer: false,
                innerDrawer: false,
                currentPage3: 1,
                total:2,  //每页显示多少条
                multiArray:[],
                flipboard:'https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621948359000.jpg'
            }
        },
        async mounted(){
            this.board = this.$route.params.num;
            await this.get_info();
            this.math();
            await this.addToList();
        },
        methods:{
            handleCurrentChange(val) {
                const that = this;
                console.log(val);
                if(val===2){
                    that.showsite = false;
                    that.showsite2 = true;
                }else {
                    that.showsite = true;
                    that.showsite2 = false;
                }
            },
            async openflip(){
                const that=this;
                // that.fliplist = [];
                // let frameID = await this.getFrameIdByTokenId(id);
                // let frameID_d = frameID[0];
                // let CID = await this.getCID(frameID_d);
                // let flipnum = await this.getNumOfFlipboard(frameID_d);
                // console.log(flipnum[0].toNumber());
                // that.total = flipnum[0].toNumber();
                // let fliplist = [];
                //
                // for(let i=0;i<that.total;i++){
                //     console.log(i);
                //     try{
                //         let flip = await this.getFlipboardCID(frameID_d,i);
                //         fliplist.push(flip)
                //     }catch (error) {
                //         // user rejected permission
                //         console.log('no cid');
                //     }
                // }
                // that.fliplist.push(CID);
                // that.fliplist.push('https://ipfs.io/ipfs/Qmb4Uei1QKZHhZmi2G7YUow5kp9sMZfG9SkhpxULzFWa4r?filename=100.png');
                // that.fliplist.push(CID)
                // that.total = that.fliplist.length;
                that.drawer = true;
                // that.flipboard=that.fliplist[0];
            },
            addToList() {
                let list = [
                    {
                        id: 1,
                        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818',
                        msg: 'A good board!',
                        time: 9,
                        barrageStyle: 'yibai'
                    },
                    {
                        id: 2,
                        avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818",
                        msg: 'Hello~',
                        time: 8,
                        barrageStyle: 'erbai'
                    },
                    {
                        id: 3,
                        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818',
                        msg: 'How much does this board cost?',
                        time: 15,
                        barrageStyle: 'sanbai'
                    },
                    {
                        id: 4,
                        avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818",
                        msg: 'Come on!',
                        time: 13,
                        barrageStyle: 'sibai'
                    },
                    {
                        id: 5,
                        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818',
                        msg: 'This is a board that sells art',
                        time: 16,
                        barrageStyle: 'wubai'
                    },
                    {
                        id: 6,
                        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818',
                        msg: 'Really???It\'s really cool!!!',
                        time: 19,
                        barrageStyle: 'liubai'
                    },
                    {
                        id: 7,
                        avatar: 'https://www.liurulan.cn/ball.png',
                        msg: 'OMG!',
                        time: 10,
                        barrageStyle: 'qibai'
                    },
                    {
                        id: 8,
                        avatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818",
                        msg: 'Look at the frame in the lower left corner!!!!!!',
                        time: 13,
                        barrageStyle: 'babai'
                    },
                    {
                        id: 9,
                        avatar: 'https://www.liurulan.cn/ball.png',
                        msg: 'Look at the frame in the lower left corner!!!!!!',
                        time: 11,
                        barrageStyle: 'jiubai'
                    },
                    {
                        id: 10,
                        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_pic%2F18%2F04%2F06%2F1f1614cda068282ad94df571b5e2348d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624177260&t=cecfd9809042250ea570a6e836177818',
                        msg: 'Look at the frame in the lower left corner!!!!!!',
                        time: 14,
                        barrageStyle: 'yiqian'
                    }
                ];
                list.forEach((v) => {
                    this.barrageList.push({
                        id:v.id,                        //弹幕ID
                        avatar: v.avatar,               //头像
                        msg: v.msg,                     //弹幕消息
                        time: v.time,                   //屏幕展示时间
                        type: MESSAGE_TYPE.NORMAL,      //类型
                        barrageStyle:v.barrageStyle     //自定义样式
                    });
                });
            },
            async get_info(){
                const that = this;
                //get board—id
                let boardid = await this.getBoardIdByName(this.board);
                console.log(parseInt(boardid))
                //get board-info(length、width、contract_address)
                let boardinfo =  await this.getBoardInfo(parseInt(boardid));
                console.log(boardinfo);
                that.board_owner = boardinfo[0]['_boardOwner']
                that.height = boardinfo[0]['_height'];
                that.width = boardinfo[0]['_width'];

                that.contract = await this.get_contract(this.board)
            },
            async approve(){
                let boardid = await this.getBoardIdByName(this.board);
                console.log(parseInt(boardid))
                //get board-info(length、width、contract_address)
                let boardinfo =  await this.getBoardInfo(parseInt(boardid));
                console.log(boardinfo);
                let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
                let signer = provider.getSigner(0);
                let fnft_contract = new ethers.Contract(config['fnft'], fnft_json.abi, signer);
                let ss = await fnft_contract.functions.setApprovalForAll(config['tokenrouter'],true);
                console.log(ss);

            },
            async merged(){
                let contract = await this.get_contract(this.board);
                console.log(contract);
                await contract.functions.merge(30,31,{
                    gasLimit: 10000000,
                    gasPrice: ethers.utils.parseUnits("20", "gwei")
                })
            },
            async auction(){
                let contract = await this.get_contract(this.board);
                await contract.functions.bAsk("2000",{
                    gasLimit: 10000000,
                    gasPrice: ethers.utils.parseUnits("20", "gwei")
                })
            },
            router_myframe(){
                this.$router.push('/MyFrame/' + this.board)
            },
            math(){
                const that = this;
                // console.log(this.width);
                let amount = this.width * this.height;
                console.log(this.width,this.height);
                for(let i =0;i<amount;i++){
                    that.finalres.push(i);
                }
                if(this.width < this.height){
                    that.y = 500 / this.height + "px";
                    console.log(that.y)
                }else {
                    that.y = 500 / this.width + 'px';
                    console.log(that.y)
                }
            }
        }
    }
</script>

<style scoped>
    #deboard{
        height: 100%;
        width: 100%;
        margin-top: 200px;
    }
    .new-board-t{
        display: table-cell;
        vertical-align: middle;
        height: 500px;
        width: 500px;
        position: relative;
    }
    #board-switch{
        float: left;
        color: #13ce66;
        margin-left: 200px;
    }
    #board-owner{
        float: right;
        margin-right: 200px;
    }
    .danmu{
        width:100%;
        height: 100px;
    }
    .new-board{
        height: 100%;
        width: 500px;
        float: left;
    }
    .site-title{
        width: 80%;
        height: 10%;
        font-weight: bolder;
        font-size: 20px;
        margin-top: 150px;
        margin-left: 10%;
        margin-right: 10%;
        font-family: Inconsolata-B;
    }
    .site-body{
        width: 80%;
        height: 60%;
        margin-top: 0;
        margin-left: 10%;
        margin-right: 10%;
    }
    .demo{
        width: 80%;
        height:80%;
        margin-top: 10%;
        margin-left: 10%;
        margin-right: 10%;
    }
    #flipboard-d{
        width: 80%;
        height:80%;
        margin-top: 10%;
        margin-left: 10%;
        margin-right: 10%;
    }
    #button-d{
        height: 10%;
        width: 80%;
        margin-top: 10px;
        margin-right: 10%;
        margin-left: 10%;
    }
    #flipboard{
        position: relative;
        width: 80%;
        margin-left: 10%;
        margin-right: 10%;
    }
    #eldraw{
        width: 100%;
        height:80%;
        margin-top: 100px;
    }
    img{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        display:flex;align-items:center;
        width: 98%;
    }
    #board-demo-name{
        font-size: 30px;
        font-family: Inconsolata-B;
        width: 900px;
        font-weight: bolder;
        margin: 0 auto;
    }
    .new-board-d{
        display: inline-block;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        /* Firefox */
        -webkit-box-sizing: border-box;
        /* Safari */
        border: 0.05em solid #e0dcdb;
        float: left;
    }
    .daohang{
        height: 500px;
        width: 200px;
        float: left;
        margin-left: 100px;

    }
    .all-info{
        width: 1000px;
        height: 500px;
        position: relative;
        margin: 0 auto;
    }
    #board-auction{
        position: fixed;
        top:800px;
        left:1700px;
    }
</style>