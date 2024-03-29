import config from '../config/index.js';
const { USERMAIL } = config.nodemailer;

class HtmlContentGenerator {

    static htmlContentForVerifyCode(code, email){
        const contentHTML = `
        <h4>Insert this Code in your Battlepalooza login</h1>
        <ul>
        <li><h2>Verify Code: ${code}</h2></li>
        </ul>`;

        const mailOptions = {
            from: USERMAIL,
            to: email,
            subject: 'Verify Code',
            html: contentHTML,
        };
        return mailOptions;
    }
}

export default HtmlContentGenerator