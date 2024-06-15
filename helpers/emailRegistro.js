import nodemailer from 'nodemailer';

const emailRegistro = async(datos) => {
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
        subject:'Confirmar tu cuenta',
        text:"Bienvenido a PetsLife",
        html:`<h2>Hola ${nombre.split(' ')[0]} nos da gusto que seas parte de PetsLife</h2>
        <p>Tu cuenta ha sido creada exitosamente, para comprobarla ingresa al siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>

        <p>Si tu no solicitaste la creación de esta cuenta, puedes ignorar este mensaje.</p>
        `
      })

}

export default emailRegistro