<template>
    <div id="new-board">
        <div class="new-board">
            <div class="new-board-t">
            <!--eslint-disable-next-line-->
            <div class="new-board-d" v-for="each in finalres" :style="{width: y, height: y, background:theme}" >
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import axios from 'axios';
    export default {
        name: "NewBoard",
        data(){
            return{
                finalres:[],
                width: 3,
                length:3,
                theme: '',
                governance:'',
                HashTag:'',
                y:'',
                name:''
            }
        },
        mounted(){
            this.width = this.$route.params.width;
            this.length = this.$route.params.length;
            this.name = this.$route.query.name;
            this.theme= this.$route.params.theme;
            this.governance = this.$route.params.governance;
            this.HashTag = this.$route.params.HashTag;
            this.math();
            // this.get_this_info()
        },
        methods:{
            math(){
                const that = this;
                // console.log(this.width);
                let amount = this.width * this.length;
                for(let i =0;i<amount;i++){
                    that.finalres.push(i);
                }
                if(this.width < this.length){
                    that.y = 500 / this.length + "px";
                    console.log(that.y)
                }else {
                    that.y = 500 / this.width + 'px';
                    console.log(that.y)
                }
            },
            // async get_this_info(){
            //     console.log(this.name);
            //     await axios({
            //         method: 'get',
            //         url: "http://flipnfts.cn/api/board/" + this.name,
            //     }).then(res => {
            //         this.$alert(res)
            //     })
            // },
            }
    }
</script>

<style scoped>
    #new-board{
        height: 100%;
        width: 100%;
    }
    .new-board-t{
    display: table-cell; vertical-align: middle;
    height: 500px;
    width: 500px;
    position: relative;
    }
    .new-board{
        height: 500px;
        width: 500px;
        position: relative;
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
</style>