import jwt from 'jsonwebtoken';
import { UserModel} from '../models/index';
import logger from '../logger/bunyan';
import config  from '../config/index';
import HtmlContentGenerator from '../utils/generateHtmlContentForMails'
import NodeMailerLib from '../lib/nodemailer.lib';

export class LoginService {

    static async generalLogin ({email, code}) {
     
        try {
            const user = await UserModel.findByEmail(email);

            if(!user){
                return {message: 'The user doesnt exist'};
            }
            if (user.verifyCode !== code){
                return {message: 'The code is wrong'};
            }
            const token = jwt.sign({
                    userName: user.userName,
                    id: user._id,
                    role: user.role,
                    },
                        `${config.session.secret}`,
                    {
                        expiresIn: config.session.expireIn
                    });
                    const refreshToken = jwt.sign({
                        userName: user.userName,
                        id: user._id,
                        role: user.role,
                    },
                        `${config.session.refreshExpireIn}`,
                    {
                        expiresIn: config.session.refreshExpireIn
                    });
            return {token, refreshToken, userId: user._id, role: user.role};              
            
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }

    static async sentVerifyCode (email){
        try {
            const code = Math.floor(Math.random() * 900000);
            const user = await UserModel.findByEmail(email);
            user.verifyCode = code;
            await user.save()
            const options = HtmlContentGenerator.htmlContentForVerifyCode(code, email)
            await NodeMailerLib.sendEmail(options)
            if(user){
                return { message: 'Email sent with verify code'}
            }
        } catch (error) {
            logger.error(`Error: ${error.name} ${error.message}`);
            return {error: error.name, message: error.message};
        }
    }
}