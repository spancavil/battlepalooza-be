import config from '../config';
const { USER } = config.nodemailer;


class HtmlContentGenerator {

    static htmlContentForVerifyCode(code, email){
        const contentHTML = `
        <h1>Insert this Code in you login</h1>
        <ul>
        <li>Verify Code: ${code}</li>
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