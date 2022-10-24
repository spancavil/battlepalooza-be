import path from 'path';
import dotenv from 'dotenv';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env')});

const config = {
  server: {
    PORT: process.env.PORT,
  },
  nodemailer: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,    
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    REDIRECT_URI : process.env.REDIRECT_URI,   
    SERVICE: process.env.SERVICE,
    TYPE: process.env.TYPE,
    USERMAIL: process.env.USERMAIL
  },
  database:{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  session:{
    frontPubKey: process.env.FRONT_PUBKEY,
    secret: process.env.SECRET,
    expireIn: process.env.EXPIRE_IN,
    refreshExpireIn: process.env.REFRESH_EXPIRE_IN
  },
  recaptcha:{
    secret: process.env.RECAPTCHA_SECRET
  },
  bpEndpoints: {
    passcode: process.env.PASSCODE_URL,
    signUp: process.env.SIGNUP_URL,
    login: process.env.LOGIN_URL,
    payloadForte: process.env.PAYLOAD_FORTE_URL,
    forteBalance: process.env.FORTE_BALANCE_URL,
    getCollection: process.env.GET_COLLECTION_URL,
    getCollectionDetail: process.env.GET_COLLECTION_DETAIL_URL,
    getMarketData: process.env.GET_MARKET_DATA,
    getMarketList: process.env.GET_MARKET_LIST,
    getMarketDetail: process.env.GET_MARKET_DETAIL,
    registerProductMarket: process.env.REGISTER_PRODUCT_MARKET,
    getForteTxStatus: process.env.GET_FORTE_TX_STATUS,
    cancelSellingMarket: process.env.CANCEL_SELLING_MARKET,
    buyProductMarket: process.env.BUY_PRODUCT_MARKET,
    requestWithdrawCoins: process.env.REQUEST_WITHDRAW,
    getDropList: process.env.GET_DROP_LIST,
    getDropDetail: process.env.GET_DROP_DETAIL,
    payCoinNft: process.env.PAY_COIN_NFT,
    payShopProduct: process.env.PAY_SHOP_PRODUCT,
    tradeHistoryList: process.env.TRADE_HISTORY_LIST,
    tradeHistoryDetail: process.env.TRADE_HISTORY_DETAIL,
    getWalletPaymentToken: process.env.GET_WALLET_PAYMENT_TOKEN,
    getWalletCryptoTransactions: process.env.GET_WALLET_CRYPTO_TRANSACTIONS,
    getPackNftInfo: process.env.GET_PACK_NFT_INFO,
  },
  historyTypes: [1,2],
  staticUrls: {
    nftIdUrl: process.env.NFT_ID_URL,
    clanUrl: process.env.CLAN_URL,
    rarityTypeUrl: process.env.RARITY_URL,
    repIdUrl: process.env.REP_ID_URL,
    premiumUrl: process.env.PREMIUM_URL
  }
};

export default config;