// 连接metamask钱包，并实例化合约，定义合约ABI函数
const Web3 =require('web3');
const ethers = require('ethers');
const config = require('./config.json');
const flp_json = require("./flp.json");
const auction_json = require("./aution.json");
const frame_json = require("./frame.json");
const factory_json = require('./factory.json')
const storage_json = require('./storage.json');
const board_json = require('./board.json');
// const boardmint_json = require('./boardmint.json')
const demetoken_json = require('./demetoken.json')
// const tokenrouter_json = require('./tokenrouter.json')
const market_json = require('./market.json')
const drop_json = require('./drop.json')
const fnft_json = require('./fnft.json')
const bnft_json = require('./bnft.json')
const demerouter_json = require('./demerouter.json')
const demefactory_json = require('./demefactory.json')
const demepair_json = require('./demepair.json')
const demetoken2_json = require('./demeerc20.json')
const usd_json = require('./bep20.json')

exports.install = function (Vue) {
    window.addEventListener('load', async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
        }
        else {
            console.log('No ethers provider detected');
        }
    });

    let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
    let signer = provider.getSigner(0);

    //实例化ftp合约
    const address_f = config["ERC20"];
    const abi_f = flp_json.abi;
    let flp_contract = new ethers.Contract(address_f, abi_f, signer);

    //实例化fnft
    const address_fnft = config["fnft"];
    const abi_fnft = fnft_json.abi;
    let fnft_contract = new ethers.Contract(address_fnft, abi_fnft, signer);

    //实例化bnft
    const address_bnft= config["bnft"];
    const abi_bnft = bnft_json.abi;
    let bnft_contract = new ethers.Contract(address_bnft, abi_bnft, signer);

    //实例化auction合约
    const address_a = config["auction"];
    const abi_a = auction_json.abi;
    let auction_contract = new ethers.Contract(address_a, abi_a, signer);

    //实例化frame合约
    const address_m = config["frame"];
    const abi_m = frame_json.abi;
    let frame_contract = new ethers.Contract(address_m, abi_m, signer);

    //storage
    const address_st = config["storage"];
    const abi_st = storage_json.abi;
    let storage_contract = new ethers.Contract(address_st, abi_st, signer);

    const address_deme20 = config["DEMED"];
    const abi_deme20 = demetoken2_json.abi;
    let deme20_contract = new ethers.Contract(address_deme20, abi_deme20, signer);

    const address_usd= config["BUSDD"];
    const abi_usd = usd_json.abi;
    let usd_contract = new ethers.Contract(address_usd, abi_usd, signer);

    //实例化factory合约
    const address_fa = config["factory"];
    const abi_fa = factory_json.abi;
    let factory_contract = new ethers.Contract(address_fa, abi_fa, signer);

    //deme_token
    const address_deme = config["demetoken"];
    const abi_deme = demetoken_json.abi;
    let deme_contract = new ethers.Contract(address_deme, abi_deme, signer);

    const address_demepair= config["DeMePairD"];
    const abi_demepair = demepair_json.abi;
    let demepair_contract = new ethers.Contract(address_demepair, abi_demepair, signer);
    //
    //
    // //token_router
    // const address_router = config["tokenrouter"];
    // const abi_router = tokenrouter_json.abi;
    // let router_contract = new ethers.Contract(address_router, abi_router, signer);

    //market
    const address_market = config["market"];
    const abi_market = market_json.abi;
    let market_contract = new ethers.Contract(address_market, abi_market, signer);

    //drop
    const address_drop = config["drop"];
    const abi_drop = drop_json.abi;
    let drop_contract = new ethers.Contract(address_drop, abi_drop, signer);

    //drop
    const address_demerouter = config["DeMeRouterD"];
    const abi_demerouter = demerouter_json.abi;
    let demerouter_contract = new ethers.Contract(address_demerouter, abi_demerouter, signer);

    //drop
    const address_demefactory = config["DeMeFactoryD"];
    const abi_demefactory = demefactory_json.abi;
    let demefactory_contract = new ethers.Contract(address_demefactory, abi_demefactory, signer);

    // //实例化boardmint合约
    // const address_boardmint = config["boardmint"];
    // const abi_boardmint = boardmint_json.abi;
    // let boardmint_contract = new ethers.Contract(address_boardmint, abi_boardmint, signer);
    // var owner_e,newBoardAddr_e,boardName_e
    // factory_contract.on("BoardCreated", (owner,newBoardAddr,boardName) =>{
    //     owner_e = owner;
    //     newBoardAddr_e = newBoardAddr;
    //     boardName_e = boardName;
    //     console.log(owner_e,newBoardAddr_e,boardName_e)
    // })

    Vue.prototype.signer_s= async () =>{
        return signer
    };

    Vue.prototype.factory_c = async () =>{
        return factory_contract
    };

    Vue.prototype.get_install_status = async () =>{
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    // Vue.prototype.get_board_addr = async () =>{
    //     return newBoardAddr_e
    // };
    //
    // Vue.prototype.get_board_name = async () =>{
    //     return boardName_e
    // };
    //
    // Vue.prototype.get_board_owner = async () =>{
    //     return owner_e
    // };

    Vue.prototype.get_contract = async function(boardname){
        let provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        let signer = provider.getSigner(0);

        //get board—id
        let boardid = await this.getBoardIdByName(boardname);

        //get board-info(length、width、contract_address)
        let boardinfo =  await this.getBoardInfo(parseInt(boardid));

        let newBoardAddr = boardinfo[0]['_boardAddr'];

        return new ethers.Contract(newBoardAddr, board_json.abi, signer);
    };

    Vue.prototype.onClickConnect = async () => {
        try {
            // Will open the MetaMask UI
            // You should disable this button while the request is pending!
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error(error);
        }
    };


    //获得当前地址,返回的值为列表，需要取第'0'位
    Vue.prototype.getmyaccount = async () => {
        return await window.ethereum.request({ method: 'eth_accounts' })
    };

    //根据newboard‘address查找boardid
    Vue.prototype.getBoardIdByAddr = function (address) {
        return storage_contract.functions.getBoardIdByAddr(address)
    };

    Vue.prototype.getReserves = function () {
        return demepair_contract.functions.getReserves()
    };

    //根据newboard‘address查找boardid
    Vue.prototype.allPairs = function (n) {
        return demefactory_contract.functions.allPairs(n)
    };

    Vue.prototype.approvea = function (address,amount) {
        return usd_contract.functions.approve(address,amount)
    };

    Vue.prototype.approveb = function (address,amount) {
        return deme20_contract.functions.approve(address,amount)
    };

    //airdrop
    Vue.prototype.get_drop = function () {
        return drop_contract.functions.claim()
    };

    //根据newboard‘name查找boardid
    Vue.prototype.getBoardIdByName = function (name) {
        return storage_contract.functions.getBoardIdByName(name)
    };

    //根据boardid查找boardinfo
    Vue.prototype.getBoardInfo = function (boardid) {
        return storage_contract.functions.getBoardInfo(boardid)
    };

    //getBTokenForSaleNum
    Vue.prototype.getBTokenForSaleNum = function () {
        return storage_contract.functions.getBTokenForSaleNum()
    };



    //查找某一地址拥有的所有board
    Vue.prototype.listAllBoardParticipated = function (address) {
        return storage_contract.functions.listAllBoardParticipated(address)
    };

    //查找在售的board nft
    Vue.prototype.listBTokenForSale = function () {
        return storage_contract.functions.listBTokenForSale()
    };

    //查找某一地址拥有的frame数量
    Vue.prototype.getFrameBalance = function (address) {
        return storage_contract.functions.getFrameBalance(address)
    };

    //查找board ask bid 信息
    Vue.prototype.getBMarketInfo = function (tokenid) {
        return storage_contract.functions.getBMarketInfo(tokenid)
    };

    // //flp-approve,传入合约地址，和授权额度，授予合约扣取相应额度内金额的权利
    // Vue.prototype.approve = function (spender,amount) {
    //     return flp_contract.functions.approve(spender,amount)
    // };\\

    Vue.prototype.addLiquidity = function (tokenA,tokenB,amountADesired,amountBDesired,amountAMin,amountBMin,to,deadline) {
        return demerouter_contract.functions.addLiquidity(tokenA,tokenB,amountADesired,amountBDesired,amountAMin,amountBMin,to,deadline,{
            gasLimit: 10000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    Vue.prototype.swapExactTokensForTokens = function (amountIn,amountOutMin,path,to,deadline) {
        return demerouter_contract.functions.swapExactTokensForTokens(amountIn,amountOutMin,path,to,deadline,{
            gasLimit: 10000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //bAsk
    Vue.prototype.mbAsk = function (tokenid,price) {
        return market_contract.functions.bAsk(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //bAsk
    Vue.prototype.mbBib = function (tokenid,price) {
        return market_contract.functions.bBib(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //bAsk
    Vue.prototype.mAsk = function (tokenid,price) {
        return market_contract.functions.ask(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //bAsk
    Vue.prototype.mbid = function (tokenid,price) {
        return market_contract.functions.bid(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-ask,用于sell
    Vue.prototype.ask = function (tokenid,price) {
        console.log(price);
        return auction_contract.functions.ask(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-bid,用于bid
    Vue.prototype.bid = function (tokenid,price) {
        console.log(price);
        return auction_contract.functions.bid(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-bid,用于bid
    Vue.prototype.increaseBid = function (tokenid,price) {
        console.log(price);
        return auction_contract.functions.increaseBid(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-transfer,用于transfer
    Vue.prototype.transfer = function (address_t,tokenid) {
        return auction_contract.functions.makeSafeTransfer(address_t,tokenid,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-ask,用于sell
    Vue.prototype.ask = function (tokenid,price) {
        return auction_contract.functions.ask(tokenid,price,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-buy,用于buy,需要用户approve，否则无法操作
    Vue.prototype.buy = function (tokenid) {
        return auction_contract.functions.buy(tokenid)
    };

    //auction-merge,传入两个tokenid，merge
    Vue.prototype.merge = function (tokenId1,tokenId2) {
        console.log(tokenId1,tokenId2);
        return auction_contract.functions.merge(tokenId1,tokenId2,{
            gasLimit: 5000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //frame-get position,通过frameid获得frame左下角和右上角坐标,返回x1，y1，x2，y2
    Vue.prototype.getFrame = function (frameId) {
        return frame_contract.functions.getFrame(frameId,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //frame-setFlipboardCID
    Vue.prototype.setFlipboardCID = function (frameId,flipboardId,CID) {
        return frame_contract.functions.setFlipboardCID(frameId,flipboardId,CID,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //frame-getNumOfFlipboard
    Vue.prototype.getNumOfFlipboard = function (frameId) {
        return frame_contract.functions.getNumOfFlipboard(frameId,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //frame-getFlipboardCID
    Vue.prototype.getFlipboardCID = function (frameId,flipboardId) {
        return frame_contract.functions.getFlipboardCID(frameId,flipboardId,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-getTokenIdByFrameId,通过frameid获得tokenid
    Vue.prototype.getTokenIdByFrameId = function (frameId) {
        return auction_contract.functions.getTokenIdByFrameId(frameId)
    };

    //auction-getFrameIdByTokenId,通过tokenid获得frameid
    Vue.prototype.getFrameIdByTokenId = function (tokenId) {
        return auction_contract.functions.getFrameIdByTokenId(tokenId)
    };

    //auction-balanceOf，获取地址下有多少个NFT
    Vue.prototype.balanceOf = function (owner) {
        return auction_contract.functions.balanceOf(owner)
    };

    //flp-balanceOf，获取地址下有多少个flp(erc20 token)
    Vue.prototype.balanceOfFlp = function (owner) {
        return flp_contract.functions.balanceOf(owner)
    };

    //deme-balanceOf，获取地址下有多少个deme(erc20 token)
    Vue.prototype.balanceOfDeme = function (owner) {
        return deme_contract.functions.balanceOf(owner)
    };

    //flp-`appro`ve，获取地址下有多少个flp(erc20 token)
    Vue.prototype.approve = function (address,amount) {
        return deme_contract.functions.approve(address,amount,{
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-isdForAll，查看是否授权
    Vue.prototype.isApprovedForAll = function (address1,address2) {
        return bnft_contract.functions.isApprovedForAll(address1,address2)
    };

    //auction-setApprovalForAll，二次授权确认
    Vue.prototype.setApprovalForAll = function (address1,approve) {
        return bnft_contract.functions.setApprovalForAll(address1,approve)
    };

    //frame-setApprovalForAll，二次授权确认
    Vue.prototype.setApprovalForAll_f = function (address1,approve) {
        return fnft_contract.functions.setApprovalForAll(address1,approve)
    };

    //frame-getCID，二次授权确认
    Vue.prototype.getCID = function (frameId) {
        return frame_contract.functions.getCID(frameId)
    };

    //auction-resetIndex,重置index，在mint之后需要调用一次，在auction完成之后需要调用一次
    Vue.prototype.resetIndex = function () {
        return auction_contract.functions.resetIndex()
    };

    //auction-totalsupply，获取总共有多少个NFT
    Vue.prototype.totalSupply = function () {
        return auction_contract.functions.totalSupply()
    };

    //auction-tokenByIndex，按索引查询tokenid，与totalsupply配合使用
    Vue.prototype.tokenByIndex = function (i) {
        return auction_contract.functions.tokenByIndex(i)
    };

    //auction-getNFTInfo，按tokenid查询nft的信息，与tokenByIndex配合使用
    Vue.prototype.getNFTInfo = function (i) {
        return auction_contract.functions.getNFTInfo(i)
    };

    //auction-ownerOf，获取nft对应的地址
    Vue.prototype.ownerOf = function (tokenid) {
        return auction_contract.functions.ownerOf(tokenid)
    };

    //auction-tokenOfOwnerByIndex,通过索引获取xx地址下的token，返回tokenid
    Vue.prototype.tokenOfOwnerByIndex = function (owner,index) {
        return auction_contract.functions.tokenOfOwnerByIndex (owner,index)
    };

    //auction-shallowSwap,swap
    Vue.prototype.shallowSwap = function (tokenid1,tokenid2) {
        return auction_contract.functions.shallowSwap(tokenid1,tokenid2,{
            gasLimit: 5000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-listNFTForSale,获取当前所有正在sell的NFT
    Vue.prototype.listNFTForSale = function () {
        return auction_contract.functions.listNFTForSale()
    };

    //auction-update,上传frame的图片链接
    Vue.prototype.updateuri = function (tokenid,newCID) {
        return auction_contract.functions.update(tokenid,newCID,{
            gasLimit: 5000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-initialBatchMint,通过索引获取xx地址下的token，返回tokenid
    Vue.prototype.initialBatchMint = function () {
        return auction_contract.functions.initialBatchMint ({
            gasLimit: 12000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-getNextIndex,获取下一个拍卖的index=tokenid
    Vue.prototype.getNextIndex = function () {
        return auction_contract.functions.getNextIndex ()
    };

    //auction-auction,获取下一个拍卖的index=tokenid
    Vue.prototype.auction = function () {
        return auction_contract.functions.auction ({
            gasLimit: 500000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")
        })
    };

    //auction-split,分割
    Vue.prototype.split = function (tokenId,inX,nUnits) {
            return auction_contract.functions.split(tokenId,inX,nUnits,{
                gasLimit: 5000000,
                gasPrice: ethers.utils.parseUnits("20", "gwei")})
    };

    //frame-isApprovedForAll,分割
    Vue.prototype.isApprovedForAll_f = function (address1,address2) {
        return fnft_contract.functions.isApprovedForAll(address1,address2,{
            gasLimit: 5000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")})
    };

    //factory-createBoard
    Vue.prototype.createBoard = function (width,height,theme_id,boardName) {
        return factory_contract.functions.createBoard(width,height,theme_id,boardName,{
            gasLimit: 12000000,
            gasPrice: ethers.utils.parseUnits("20", "gwei")})
    };
}

