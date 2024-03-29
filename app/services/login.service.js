import { UserModel } from "../models/index.js";
import logger from "../logger/bunyan.js";
import config from "../config/index.js";
import AxiosService from "../lib/axios.lib.js";
import NodeRSA from "node-rsa";

export class LoginService {
    static async firstLogin({ email, code, userData }) {
        try {
            /* const user = await UserModel.createUser(userData);
            
            if(user.message !== undefined && user.message.includes("duplicate")){
                return { message: 'Email already registered'};
            } */

            const response = await AxiosService.signUp(email, code);
            if (response.result !== 0) {
                return { message: "Error at Signup: " + response.error.text };
            }

            //Checks for existing user with tah email
            let user = await UserModel.findByEmail(email);

            //If user does not exist, create it
            if (!user) {
                user = await UserModel.createUser(userData);
            }

            //Always save in the user this data
            user.pid = response.pid;
            user.bpToken = response.accessToken;
            user.linkedWithMobile = false;

            await user.save();

            /* const token = jwt.sign({
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
                }); */
            const pubKey = config.session.frontPubKey.replace(/\\n/g, "\n");
            const key = new NodeRSA(pubKey);
            const encryptedText = key.encrypt(
                Buffer.from(user.bpToken),
                "base64"
            );

            return {
                pid: user.pid,
                bpToken: encryptedText,
                email,
                created_at: user.created_at,
            };
            
        } catch (error) {
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
        }
    }

    static async login({ email, code }) {
        try {
            console.log(email, code);
            const response = await AxiosService.login(email, code);
            if (response.error.num !== 0) {
                console.log(response);
                return { response };
            }

            let user = await UserModel.findByEmail(email);

            if (!user) {
                user = await UserModel.createUser({ email });
                user.linkedWithMobile = true;
            }

            user.pid = response.pid;
            user.bpToken = response.accessToken;
            user.lastLogin = new Date().toLocaleString();

            await user.save();

            // const token = jwt.sign({
            //     token: user.bpToken,
            //     id: user.pid,
            //     },
            //         `${config.session.secret}`,
            //     {
            //         expiresIn: config.session.expireIn
            //     });
            //     const refreshToken = jwt.sign({
            //         userName: user.userName,
            //         id: user._id,
            //     },
            //         `${config.session.refreshExpireIn}`,
            //     {
            //         expiresIn: config.session.refreshExpireIn
            //     });

            const pubKey = config.session.frontPubKey.replace(/\\n/g, "\n");
            const key = new NodeRSA(pubKey);
            const encryptedText = key.encrypt(
                Buffer.from(user.bpToken),
                "base64"
            );
            return {
                pid: user.pid,
                bpToken: encryptedText,
                email,
                created_at: user.created_at,
            };
        } catch (error) {
            console.log(error);
            logger.info(`Error: ${error.name} ${error.message}`);
            logger.error(`Error: ${error.name} ${error.message}`);
            return { error: error.name, message: error.message };
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
