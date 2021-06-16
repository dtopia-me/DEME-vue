<template>
    <div id="token-swap">
        <el-button type="primary" @click="approve">approve</el-button>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="tokenA_address" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline.tokenA_address" placeholder="tokenA_address" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="tokenB_address" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline.tokenB_address" placeholder="tokenB_address" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="amountADesired" class="demo-form-inline-info">
                <el-input v-model="formInline.amountADesired" placeholder="amountADesired" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="amountBDesired" class="demo-form-inline-info">
                <el-input v-model="formInline.amountBDesired" placeholder="amountBDesired" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="amountAMin" class="demo-form-inline-info">
                <el-input v-model="formInline.amountAMin" placeholder="amountAMin" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="amountBMin" class="demo-form-inline-info">
                <el-input v-model="formInline.amountBMin" placeholder="amountBMin" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="to_address" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline.to_address" placeholder="to_address" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="deadline" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline.deadline" placeholder="deadline" :style="{width:'500px'}"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">addLiquidity</el-button>
            </el-form-item>
        </el-form>

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="amountIn" class="demo-form-inline-info">
                <el-input v-model="formInline2.amountIn" placeholder="amountIn" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="amountOutMin" class="demo-form-inline-info">
                <el-input v-model="formInline2.amountOutMin" placeholder="amountOutMin" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="path" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline2.path" placeholder="path" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="to" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline2.to_address" placeholder="to" :style="{width:'500px'}"></el-input>
            </el-form-item>
            <el-form-item label="deadline" class="demo-form-inline-info" v-show="false">
                <el-input v-model="formInline2.deadline" placeholder="deadline" :style="{width:'500px'}"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit2">swapExactTokensForTokens</el-button>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="get_allPairs">allPairs</el-button>
        <el-button type="primary" @click="get_getReserves">getReserves</el-button>
    </div>
</template>

<script>
    export default {
        name:'TokenSwap',
        data() {
            return {
                formInline: {
                    tokenA_address: '',
                    tokenB_address: '',
                    amountADesired:'',
                    amountBDesired:"",
                    amountAMin:'',
                    amountBMin:'',
                    to_address:'',
                    deadline:''
                },
                formInline2:{
                    amountIn:'',
                    amountOutMin:'',
                    path:'',
                    to_address:'',
                    deadline:''
                }
            }
        },
        methods: {
            async onSubmit() {
                await this.addLiquidity('0x4209ADE548af8968239E97D59b22F9b69B17928e','0xDD1D5EE9248A54620D2821Cca777b79A73aD7145',this.formInline.amountADesired,this.formInline.amountBDesired,this.formInline.amountAMin,this.formInline.amountBMin,'0xfEDe06F4030643D7763B0c9610BcCe6E8DbdAf5C','1623923908')
            },
            async onSubmit2() {
                await this.swapExactTokensForTokens(this.formInline2.amountIn,this.formInline2.amountOutMin,['0x4209ADE548af8968239E97D59b22F9b69B17928e','0xDD1D5EE9248A54620D2821Cca777b79A73aD7145'],'0xfEDe06F4030643D7763B0c9610BcCe6E8DbdAf5C','1623923908')
            },
            async get_allPairs(){
                let aa = await this.allPairs(0);
                this.$alert(aa)
            },
            async get_getReserves(){
                let aa = await this.getReserves();
                this.$alert(aa)
            },
            async approve(){
                await this.approvea("0x91b447a71cae64922CD3cA751a362686AE8Fe567","100000000");
                await this.approveb("0x91b447a71cae64922CD3cA751a362686AE8Fe567","100000000");
            }
        }
    }
</script>

<style scoped>
    #token-swap{
        width: 100%;
    }
    .demo-form-inline{
        width: 100%;
    }
    .demo-form-inline-info{
        width: 100%;
    }
</style>