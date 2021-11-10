import jwt from 'jsonwebtoken';
import { UserModel} from '../models/index.js';
import logger from '../logger/bunyan.js';
import config  from '../config/index.js';
import AxiosService from '../lib/axios.lib.js';

export class LoginService {

    static async firstLogin ({email, code, userData}) {
     
        try {      
            const user = await UserModel.createUser(userData);
            
            if(user.message !== undefined && user.message.includes("duplicate")){
                return { message: 'Email already registered'};
            }

            const response = await AxiosService.signUp(email, code)
            if (response.result !== 0){
                return {message: 'Error at Signup: ' + response.error.text}
            }
            
            user.pid = response.pid;
            user.bpToken = response.accessToken;
            user.linkedWithMobile = false;

            await user.save();

            const token = jwt.sign({
                    token: user.bpToken,
                    id: user.pid,
                    },
                        `${config.session.secret}`,
                    {
                        expiresIn: config.session.expireIn
                    });

            const refreshToken = jwt.sign({
                userName: user.userName,
                id: user._id,
                },
                `${config.session.refreshExpireIn}`,
                {
                    expiresIn: config.session.refreshExpireIn
                });

            return {
                token,
                refreshToken,
                pid: user.pid,
                bpToken: user.bpToken,
                email,
                created_at: user.created_at
            };              
            
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }

    static async login ({email, code}) {
     
        try {
            
            const response = await AxiosService.login(email, code)
            if (response.error.num !== 0){
                return {message: 'Error: ' + response.error.text}
            }

            let user = await UserModel.findByEmail(email);

            if(!user){
                user = await UserModel.createUser({email})
                user.pid = response.pid;
                user.linkedWithMobile = true;
            }
            
            user.bpToken = response.accessToken;
            user.lastLogin = new Date().toLocaleString();

            await user.save();

            const token = jwt.sign({
                token: user.bpToken,
                id: user.pid,
                },
                    `${config.session.secret}`,
                {
                    expiresIn: config.session.expireIn
                });
                const refreshToken = jwt.sign({
                    userName: user.userName,
                    id: user._id,
                },
                    `${config.session.refreshExpireIn}`,
                {
                    expiresIn: config.session.refreshExpireIn
                });

            return {
                token,
                refreshToken,
                pid: user.pid,
                bpToken: user.bpToken,
                email,
                created_at: user.created_at
            };

        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }

    /* static async sentVerifyCode ({email}){
        try {
            const code = Math.floor(Math.random() * 899999 + 100000);
            const user = await UserModel.findByEmail(email);
            user.verifyCode = code;
            await user.save();
            const options = HtmlContentGenerator.htmlContentForVerifyCode(code, email)
            await NodeMailerLib.sendEmail(options)
            if(user){
                return { message: `Email sent with verify code (provisory: ${code}`}
            }
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    } */
}