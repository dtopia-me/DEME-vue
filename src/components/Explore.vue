<template>
    <div id="explore">
        <div id="explore-title">
            DEME
        </div>
        <div id="explore-input">
            <div id="explore-input-t">
                <el-input
                        placeholder="Enter boardname to search..."
                        v-model="input"
                        :disabled="true">
                </el-input>
            </div>
            <div id="explore-input-s">
                <el-button type="primary" icon="el-icon-search" :style="{background:'#C3A5A5',border:0}" @click="search">SEARCH</el-button>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Explore",
        data(){
            return{
                input:''
            }
        },
        methods:{
            search(){
                this.$alert("Not yet open, under development...",{
                    confirmButtonText: 'OK'
                })
            }
        }
    }
</script>

<style scoped>
    #explore{
        width: 100%;
        height: 100%;
    }
    #explore-title{
        margin-top: 200px;
        font-size: 100px;
        font-weight: bolder;
        color: #C3A5A5;
    }
    #explore-input{
        width: 600px;
        height: 100px;
        margin: 0 auto;
    }
    #explore-input-t,#explore-input-s{
        float: left;
        margin-top: 20px;
    }
    #explore-input-t{
        width: 480px;
    }
    #explore-input-s{
        margin-left: 10px;
        width: 100px;
    }
</style>