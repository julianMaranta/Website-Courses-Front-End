import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configuración del cliente de AWS SES
const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  },
  region: 'sa-east-1',
};

const sesClient = new SESClient(SES_CONFIG);

export async function sendPasswordRecoveryEmail(recipientEmail, name, password) {
  const params = {
    Source: 'julian@icreate.studio', // Cambia esto por tu correo verificado en SES
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Data: `
            <p>Hola ${name},</p>
            <p>Tu contraseña actual es: <strong>${password}</strong></p>
            <p>Por favor, asegúrate de guardarla en un lugar seguro.</p>
            <p>Si no solicitaste este correo, ignóralo.</p>
          `,
        },
      },
      Subject: {
        Data: `Tu contraseña, ${name}`,
      },
    },
  };

  try {
    await sesClient.send(new SendEmailCommand(params));
    console.log("Email enviado exitosamente");
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw new Error("No se pudo enviar el email con la contraseña");
  }
}

