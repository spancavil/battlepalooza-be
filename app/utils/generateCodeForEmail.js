import config from '../config/index.js';
const { USER } = config.nodemailer;

console.log(USER);

class HtmlContentGenerator {

    static htmlContentForVerifyCode(code, email){
        const contentHTML = `
        <h4>Insert this Code in you login</h1>
        <ul>
        <li><h2>Verify Code: ${code}</h2></li>
        </ul>`;

        const mailOptions = {
            from: USER,
            to: email,
            subject: 'Verify Code',
            html: contentHTML,
        };
        return mailOptions;
    }


}

export default HtmlContentGenerator