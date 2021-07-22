const sgMail = require('@sendgrid/mail');
const nodemailer = require("nodemailer");

module.exports = (from, to, subject, body) => {

    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: process.env.NODEMAILER_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        },
        from: 'info@mohazon.com.bd',
        tls: {
            rejectUnauthorized: false
        }
    });
      
    const mailOptions = {
        // from: process.env.NODEMAILER_EMAIL,
        from: from,
        to: to,
        subject: subject,
        html: body,
        priority: 'high'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });


    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // console.log('token: ', token);
    // const msg = {
    //     from: process.env.FROM,
    //     to: email,
    //     subject: 'Welcome to movie app community',
    //     html: `
    //         <p> Hello ${username} </p>

    //         <p> verify your account </p>

    //         <button> <a href="${process.env.APP_URL}${process.env.PORT}/verify?${token}"> Click here </a> </button>

    //     `
    // }

    // sgMail.send(msg);



}