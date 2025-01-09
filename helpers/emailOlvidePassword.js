import formData from "form-data";
import Mailgun from "mailgun.js";

const emailOlvidePassword = async (datos) => {
  try {
    // Inicializar Mailgun con formData
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY, // Clave API
    });

    // Configurar datos para el correo
    const data = {
      from: "Mailgun Sandbox <postmaster@fullstack.codeinfinity.tech>", // Dirección del remitente
      to: datos.email, // Dirección del destinatario
      subject: "Hello",
      template: "sistema de inventario uce", // Nombre exacto de la plantilla
      "h:X-Mailgun-Variables": JSON.stringify({
        Name: datos.nombre,
        test: "test",
        link: `${process.env.FRONTEND_URL}/olvide-password/${datos.token}`,
      }), // Variables para la plantilla
    };

    // Enviar el correo
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    console.log("Correo enviado:", result);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }
};

export default emailOlvidePassword;
