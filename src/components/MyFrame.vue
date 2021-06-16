<template>
    <div id="my-frame">
        <div class="my-frame-list">
            <el-row>
                <!--eslint-disable-next-line-->
                <el-col v-for="each in framelist" class="my-frame-list-each">
                    <div :style="{cursor: 'pointer'}" @click="route_fi">
                        <el-card :body-style="{ padding: '0px',height:'380px'}">
                            <img src="" :style="{height: '230px',width:'100%'}">
                            <div class="my-frame-list-each-board-size" v-text="'size: ' + each.frame_size">
                            </div>
                            <div class="my-frame-list-each-board-coordinate" v-text="'coordinate: ' + each.coordinate">
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyFrame",
        data(){
            return{
                framelist:[
                    {"frame_size":"10 * 10","coordinate":"(1,2)"}
                ],
                board_name:''
            }
        },
        mounted(){
            this.board_name = this.$route.params.num
        },
        methods:{
            async bid(){
                let contract = await this.get_contract(this.board_name);
                console.log(contract);
                await contract.functions.bid("38","100")
            },
            route_fi(){
                this.$router.push('/FrameInfo/' + this.board_name)
            }
        }
    }
</script>

<style scoped>
    #my-frame{
        width: 100%;
        height: 100%;
        margin-top: 100px;
    }
    .my-frame-list{
        width: 1000px;
        margin:0 auto;
    }
    .my-frame-list-each{
        height: 400px;
        float: left;
        width: 280px !important;
        margin-left: 10px;
        margin-right: 10px;
    }

    #my-frame-list-each-button-buy,#my-frame-list-each-button-ask{
        margin-top: 20px;
        float: right;
        margin-right: 10px;
        height: 30px;
    }
    .my-frame-list-each-board-size,.my-frame-list-each-board-coordinate{
        width: 100%;
        float: left;
        margin-left: 20px;
        height: 30px;
        font-size: 15px;
        font-weight: bolder;
        margin-top: 5px;
        text-align: left;
    }
</style>