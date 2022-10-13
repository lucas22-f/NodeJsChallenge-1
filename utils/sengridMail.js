const sgMail = require("@sendgrid/mail");
require("dotenv").config;

const sendMail = async (user) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY) // funcionalidad de envio de mail con sengrid 
    const msg = {
        to: `${user.email}`, // Change to your recipient
        from: 'lucas.200061@gmail.com', // Change to your verified sender
        subject: 'TE damos la bienvenida a disneyAPI',
        text: 'gracias por registrarte en el sistema de disneyAPI',
        html: '<strong> Ojalá que todas nuestras funciones esten a tu servicio. </strong>',
    }
    let emailSend
    sgMail.send(msg).then(emailSend = "enviado").catch((err) => console.log(err))
    return emailSend
}

module.exports = sendMail