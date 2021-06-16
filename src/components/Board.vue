<template>
    <div id="board">
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
            Owner: 0xC2001011233A38......
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
                <beautiful-chat
                        :participants="participants"
                        :titleImageUrl="titleImageUrl"
                        :onMessageWasSent="onMessageWasSent"
                        :messageList="messageList"
                        :newMessagesCount="newMessagesCount"
                        :isOpen="isChatOpen"
                        :close="closeChat"
                        :open="openChat"
                        :showEmoji="true"
                        :showFile="true"
                        :showEdition="true"
                        :showDeletion="true"
                        :showTypingIndicator="showTypingIndicator"
                        :showLauncher="true"
                        :showCloseButton="true"
                        :colors="colors"
                        :alwaysScrollToBottom="alwaysScrollToBottom"
                        :disableUserListToggle="false"
                        :messageStyling="messageStyling"
                        @onType="handleOnType"
                        @edit="editMessage"/>
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
                        <el-menu-item index="2">
                            <router-link to="Package" class="board-router" target="_blank">
                                <i class="el-icon-present"></i>
                                your frames
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <router-link to="Goods" class="board-router" target="_blank">
                                <i class="el-icon-s-shop"></i>
                                Market
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-notebook-2"></i>
                            <span slot="title">Governance</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                </el-row>
            </div>
            <div class="allboard">
                <div class="board">
                    <!--eslint-disable-next-line-->
                    <div class="board-d" v-for="(each,i) in res" :style="{left:each.x, top: each.y, width:each.width, height:each.height}">
                        <el-tooltip class="item" effect="light" :open-delay="200" v-bind:content=each.tokenid placement="top-start">
                            <img track-by="$index" :src="each.uri" @click="openflip(each.tokenid)"  alt=''>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>

        <el-drawer
                title="Flipboard"
                :visible.sync="drawer"
                size="30%"
                :with-header="false"
                >
            <div id="eldraw">
                <div class="site-title">
                    <p>Here is the site-board for each NFT,  where you can upload text, images, videos, and other content, even HTML files!</p>
                    Here's a link:
                    <a href="http://flipnfts.cn/" target="_blank" :style="{color:'#409EFF'}">http://flipnfts.cn</a>
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
    import axios from 'axios';
    import {MESSAGE_TYPE} from 'vue-baberrage';
    import {videoPlayer} from "vue-video-player";
    import "video.js/dist/video-js.css";
    import {Loading} from "element-ui";

    export default {
        name: "Board",
        components: {
            videoPlayer
        },
        data(){
            return{
                showsite:true,
                showsite2:false,
                showCard:false,
                isCollapse: true,
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
                        src: 'http://flipnfts.cn/12.mp4' // url地址
                    }],
                    poster: '', // 封面地址
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆 盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true, // 当前时间和持续时间的分隔符
                        durationDisplay: true, // 显示持续时间
                        remainingTimeDisplay: false, // 是否显示剩余时间功能
                        fullscreenToggle: false // 是否显示全屏按钮
                    },},
                barrageIsShow: false,    //是否展示弹幕
                messageHeight: 3,       //消息高度(测试不生效)
                barrageLoop: true,     //是否循环播放
                maxWordCount: 2,        //弹幕字数(测试不生效)
                lanesCount:2,           //固定弹幕(测试不生效)
                boxWidth:2000,           //弹幕宽度
                boxHeight: 200,         //弹幕高度(测试不生效)
                throttleGap: 3000,       //消息间隔
                barrageList: [],         //弹幕列表，格式为数组
                x:'',
                y:'',
                defaultImg: "this.remove()",
                total:2,  //每页显示多少条
                flipboard:'',
                res:[],
                drawer: false,
                innerDrawer: false,
                currentPage3: 1,
                result:'',
                responde:'',
                multiArray:[],
                participants: [
                    {
                        id: 'user1',
                        name: 'Zero',
                        imageUrl: 'https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621948359000.jpg'
                    },
                    {
                        id: 'user2',
                        name: 'Support',
                        imageUrl: 'https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1621867768000.jpg'
                    },
                    {
                        id: 'user3',
                        name: 'ADDr3',
                        imageUrl: 'https://raw.githubusercontent.com/ziyuan-zhang/graph/main/graph/1622440850000.jpg'
                    }
                ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
                titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
                messageList: [
                    { type: 'text', author: `user2`, data: { text: `Say yes!` } },
                    { type: 'text', author: `user1`, data: { text: `No.` } },
                    { type: 'text', author: `user3`, data: { text: `I want to buy a NFT on this BOARD.` } },
                    { type: 'text', author: `user3`, data: { text: `Who can teach me how to operate it?` } },

                ], // the list of the messages to show, can be paginated and adjusted dynamically
                newMessagesCount: 0,
                isChatOpen: true, // to determine whether the chat window should be open or closed
                showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
                colors: {
                    header: {
                        bg: '#444750',
                        text: '#ffffff'
                    },
                    launcher: {
                        bg: '#444750'
                    },
                    messageList: {
                        bg: '#ffffff'
                    },
                    sentMessage: {
                        bg: '#444750',
                        text: '#ffffff'
                    },
                    receivedMessage: {
                        bg: '#444750',
                        text: '#ffffff'
                    },
                    userInput: {
                        bg: '#f4f7f9',
                        text: '#565867'
                    }
                }, // specifies the color scheme for the component
                alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
                messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
            }
        },
        async mounted(){
            await this.getdev();
            await this.addToList();
            // this.getdev();
        },
        methods:{
            auction(){
                this.$router.push("/AUCTION");
            },
            // sendMessage (text) {
            //     if (text.length > 0) {
            //         this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
            //         this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
            //     }
            // },
            onMessageWasSent (message) {
                // called when the user sends a message
                this.messageList = [ ...this.messageList, message ]
            },
            openChat () {
                // called when the user clicks on the fab button to open the chat
                this.isChatOpen = true
                this.newMessagesCount = 0
            },
            closeChat () {
                // called when the user clicks on the botton to close the chat
                this.isChatOpen = false
            },
            handleScrollToTop () {
                // called when the user scrolls message list to top
                // leverage pagination for loading another page of messages
            },
            handleOnType () {
                console.log('Emit typing event')
            },
            editMessage(message){
                const m = this.messageList.find(m=>m.id === message.id);
                m.isEdited = true;
                m.data.text = message.data.text;
            },
            async getjson(){
                const that = this;
                await axios({
                    method: 'get',
                    url: "./test.json",
                    dataType: "json",
                    crossDomain: true,
                    cache: false
                    }).then(res => {
                        that.res = res['data']['points'];
                        that.res.sort(this.compare('tokenid'));
            })
            },
            compare(property){
                return function (a, b){
                    var value1 = a[property];
                    var value2 = b[property];
                    return parseInt(value1) - parseInt(value2);
                }
            },
            async getdev() {
                const that = this;
                await this.getjson();
                let loadingInstance1 = Loading.service({text:"Loading......"});
                for (let i = 0; i < that.res.length; i++) {
                    let each = that.res[i];
                    this.getFrameIdByTokenId(parseInt(each['tokenid'])).then((res)=>{
                        this.getCID(res[0]).then((res)=>{
                            this.$set(each,"uri",res['CID'])
                        });
                    });
                }
                loadingInstance1.close();
                console.log(this.res);
            },
            async openflip(id){
                const that=this;
                that.fliplist = [];
                let frameID = await this.getFrameIdByTokenId(id);
                let frameID_d = frameID[0];
                let CID = await this.getCID(frameID_d);
                that.fliplist.push(CID);
                that.fliplist.push(CID);
                that.total = that.fliplist.length;
                that.drawer = true;
                that.flipboard=that.fliplist[0];
            },
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
            }
    }}
</script>

<style scoped>
    #board{
        height: 600px;
        margin-top: 100px;
        width: 100%;
    }
    #board-demo-name{
        font-size: 30px;
        font-family: Inconsolata-B;
        width: 900px;
        font-weight: bolder;
        margin: 0 auto;
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
    .allboard{
        height: 100%;
        width: 500px;
        float: left;
    }
    .board{
        height: 500px;
        width: 500px;
        position: relative;
        margin: 0 auto;
    }
    .daohang{
        height: 500px;
        width: 200px;
        float: left;
        margin-left: 100px;

    }
    .all-info{
        width: 900px;
        height: 500px;
        position: relative;
        margin: 0 auto;
    }
    .chat-view{
        width: 750px;
        height: 500px;
        float: left;
    }
    .board-d{
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        /* Firefox */
        -webkit-box-sizing: border-box;
        /* Safari */
        width: 50%;
        border: 0.05em solid;
        float: left;
        position: absolute;
        background-color: #a0ada8;
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
    .site-title{
        width: 80%;
        height: 10%;
        font-weight: bolder;
        font-size: 20px;
        text-align: left;
        margin-top: 150px;
        margin-left: 10%;
        margin-right: 10%;
        font-family: Inconsolata-B;
    }
    .board-router{
        text-decoration: none;
        font-weight: bolder;
        color: rgb(255, 255, 255);
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
    img[src=""],img:not([src]){opacity:0;}
    #eldraw{
        width: 100%;
        height:80%;
        margin-top: 100px;
        color: #0c0c0c;
    }
    .danmu{
        width:100%;
        height: 100px;
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
    #board-auction{
        position: fixed;
        top:800px;
        left:1700px;
    }
    .yibai{
        margin-top:100px;
    }
    .erbai{
        margin-top:120px;
    }
    .sanbai{
        margin-top:140px;
    }
    .sibai{
        margin-top:160px;
    }
    .wubai{
        margin-top:180px;
    }
    .liubai{
        margin-top:200px;
    }
    .qibai{
        margin-top:220px;
    }
    .babai{
        margin-top:240px;
    }
    .jiubai{
        margin-top:260px;
    }
    .yiqian{
        margin-top:300px;
    }
</style>