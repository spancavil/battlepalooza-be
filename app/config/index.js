import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    PORT: process.env.PORT,
  },
  nodemailer: {
    USER: process.env.USER,
    PASS: process.env.PASS,
    SERVICE: process.env.SERVICE
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
  }
};

export default config;