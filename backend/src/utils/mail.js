const nodemailer = require('nodemailer');

module.exports = {
  transporter: nodemailer.createTransport({
    host: 'smtp.aol.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  }),
  welcome(name) {
    return {
      html: `
        <body>
          <h1>Tasks App</h1>
          <h2>Welcome ${name}</h2>
        </body>
      `,
      text: `Tasks App\nWelcome ${name}`,
    };
  },
  recoverPass(token) {
    return `
      <body>
        <p>
          recivimos tu petción para cambiar tu contraseña. entra a este link para generar una nueva
          <a href="http://localhost:3000?resetToken=${token}">Cambiar contraseña</a>
        </p>
      </body>
    `;
  },
  verify(transporter) {
    transporter.verify(function(error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
  }
}



