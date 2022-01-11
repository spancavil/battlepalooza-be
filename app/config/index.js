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
    getCollectionDetail: process.env.GET_COLLECTION_DETAIL_URL
  }
};

export default config;