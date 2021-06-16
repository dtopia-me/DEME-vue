<template>
    <div id="home">
        <div id="home-o">
            <div id="home-info">
                <el-row>
                    <el-col :span="8"  class="card" :style="{top:0,left:0}">
                        <el-card shadow="hover"  class="card">
                            <div class="card-text" @click="route_e">Explore Board</div>
                        </el-card>
                    </el-col>
                    <el-col :span="8"  class="card" :style="{top:0,right:0}">
                        <el-card shadow="hover"  class="card">
                            <div class="card-text" @click="route_g">Creat Your Board</div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div id="simple-board" @click="route_s">
            Simple Board >>
        </div>
        <div id="airdrop" @click="get_airdrop">
            Air Drop
        </div>
    </div>
</template>

<script>
    export default {
        name: "HOME",
        methods:{
            route_s(){
                this.$router.push({"path":"/Board"})
            },
            route_g(){
                this.$router.push({"path":"/Create"})
            },
            route_e(){
                this.$router.push({"path":"/Explore"})
            },
            async get_airdrop(){
                await this.get_drop()
            }
        }
    }
</script>

<style scoped>
    #home{
        height: 100%;
        width: 100%;
    }
    #home-o{
        height: 400px;
        margin-top: 300px;
    }
    #home-info{
        height: 400px;
        width: 1500px;
        margin: 0 auto;
    }
    #simple-board{
        height: 100px;
        width: 200px;
        color: #8bb9e8;
        font-size: 25px;
        margin: 0 auto;
        cursor:pointer;
    }
    #airdrop{
        position: fixed;
        left: 1800px;
        top:800px;
        height: 100px;
        width: 100px;
        cursor: pointer;
    }
    .card{
        height: 300px;
        width: 500px;
        position: absolute;
        background-color: #72767b;
        cursor:pointer;
    }
    .card-text{
        margin-top: 110px;
        font-family: Inconsolata-B;
        font-size: 40px;
        color: aliceblue;
    }
</style>