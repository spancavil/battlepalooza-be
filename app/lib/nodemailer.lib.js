import nodemailer from 'nodemailer';
import config from '../config/index.js';
const { REDIRECT_URI, TYPE, USER, SERVICE, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = config.nodemailer;
import logger from '../logger/bunyan.js';
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';

class NodeMailerLib {
  static async sendEmail(options) {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );

      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: SERVICE,
        auth: {
          type: TYPE,
          user: USER,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken
        },
      });
      await transporter.sendMail(options);
    } catch (error) {
      logger.error(`Error at nodemailer: ${error.name} Message: ${error.message} Status Code: ${error.status}`);
      throw { Error: error.name, Message: error.message }
    }
  }
}

export default NodeMailerLib;