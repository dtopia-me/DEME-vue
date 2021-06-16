import Vue from 'vue';
import Router from 'vue-router';
import Package from "@/components/Package";
import Board from "@/components/Board";
import Marketplace from "@/components/Marketplace";
import Goods from "@/components/Goods";
import FAQ from "@/components/FAQ";
import Fees from "@/components/Fees";
import Create from "@/components/Create";
import NewBoard from "@/components/NewBoard";
import deboard from "@/components/deboard";
import YBoard from "@/components/YBoard";
import Ynft from "@/components/Ynft";
import BOARDMARKET from "@/components/BOARDMARKET";
import DOC from "@/components/DOC";
import HOME from "@/components/HOME";
import Explore from "@/components/Explore";
import SetBoard from "@/components/SetBoard";
import BOARDMARKETA from "@/components/BOARDMARKETA";
import MYASSETS from "@/components/MYASSETS";
import BOARDINFO from "@/components/BOARDINFO";
import AUCTION from "@/components/AUCTION";
import MyFrame from "@/components/MyFrame";
import FrameInfo from "@/components/FrameInfo";
import TokenSwap from "@/components/TokenSwap";


    Vue.use(Router)

export default new Router({
    mode: 'history',  //去掉url中的#
    routes: [
        {
            path: '*',
            redirect: '/HOME'
        },
        {
            path: '/deboard/:num',
            name: 'deboard',
            component: deboard
        },
        {
            path: '/AUCTION',
            name: 'AUCTION',
            component: AUCTION
        },
        {
            path: '/TokenSwap',
            name: 'TokenSwap',
            component: TokenSwap
        },
        {
            path: '/YBoard',
            name: 'YBoard',
            component: YBoard
        },
        {
            path: '/MyFrame/:num',
            name: 'MyFrame',
            component: MyFrame
        },
        {
            path: '/FrameInfo/:num',
            name: 'FrameInfo',
            component: FrameInfo
        },
        {
            path: '/Explore',
            name: 'Explore',
            component: Explore
        },
        {
            path: '/MYASSETS',
            name: 'MYASSETS',
            component: MYASSETS
        },
        {
            path: '/BOARDINFO/:num',
            name: 'BOARDINFO',
            component: BOARDINFO
        },
        {
            path: '/BOARDMARKETA',
            name: 'BOARDMARKETA',
            component: BOARDMARKETA
        },
        {
            path: '/SetBoard/:num',
            name: 'SetBoard',
            component: SetBoard
        },
        {
            path: '/BOARDMARKET',
            name: 'BOARDMARKET',
            component: BOARDMARKET
        },
        {
            path: '/HOME',
            name: 'HOME',
            component: HOME
        },
        {
            path: '/DOC',
            name: 'DOC',
            component: DOC
        },
        {
            path: '/Ynft',
            name: 'Ynft',
            component: Ynft
        },
        {
            path: '/Goods',
            name: 'Goods',
            component: Goods
        },
        {
            path: '/NewBoard',
            name: 'NewBoard',
            component: NewBoard
        },
        {
            path: '/Create',
            name: 'Create',
            component: Create
        },
        {
            path: '/Fees',
            name: 'Fees',
            component: Fees
        },
        {
            path: '/Marketplace',
            name: 'Marketplace',
            component: Marketplace
        },
        {
            path: '/Package',
            name: 'Package',
            component: Package
        },
        {
            path: '/FAQ',
            name: 'FAQ',
            component: FAQ
        },
        {
            path: '/Board',
            name: 'Board',
            component: Board
        },
        ]
})