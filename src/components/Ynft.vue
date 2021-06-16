<template>
    <div id = "ynft">
            <el-row>
                <!--eslint-disable-next-line-->
                <el-col v-for="each in nftlist" class="ynft-each">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="cat-name" v-text="each.category"></div>
                        <div style="padding: 14px;">
                            <div class="bottom">
                                <el-button type="text" size="large" class="button" @click="more(each.category)">More >>></el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
    </div>
</template>

<script>
    export default {
        name: "Ynft",
        data(){
            return{
                nftlist:[
                    {"category":"Boards"},
                    {"category":"Frames"}
                ]
            }
        },
        methods:{
            more(name){
                if(name==="Boards"){
                    let routeData = this.$router.resolve({path:'/YBoard'});
                    window.open(routeData.href, '_blank');
                }else {
                    let routeData = this.$router.resolve({path:'/Package'});
                    window.open(routeData.href, '_blank');
                }
            }
        }
    }
</script>

<style scoped>
    #ynft{
        width: 100%;
        height: 100%;
    }
    .ynft-each{
        width: 80%;
        margin-right: 10%;
        margin-left: 10%;
        height: 100px;
        margin-top: 50px;
    }
    .cat-name{
        font-family: IndieFlower;
        font-size: xx-large;
        font-weight: bolder;
        color: #995f07;
        float: left;
        margin-left: 10%;
        margin-top: 10px;
    }
    .bottom{
        font-family: IndieFlower;
        font-size: large;
        font-weight: normal;
        color: #995f07;
        float: left;
        margin-left: 10%;
    }
</style>