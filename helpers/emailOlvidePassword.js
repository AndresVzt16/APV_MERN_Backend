import nodemailer from 'nodemailer';

const emailOlvidePassword = async(datos) => {
    const transport = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT ,
        auth: {
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS
        }
      });
      const{email, nombre, token} = datos

      //enviar email

      const info = await transport.sendMail({
        from:'PetsLife',
        to:email,
        subject:'Cambiar contraseña',
        text:"PetsLife",
        html:`<h2>Hola ${nombre.split(' ')[0]}</h2>
        <p>Has solicitado restablecer la contraseña en tu cuenta, para realizar el cambio ingresa al siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer Contraseña</a></p>

        <p>Si tu no realizaste esta solicitud puedes ignorar este mensaje.</p>
        `
      })
  
}

export default emailOlvidePassword