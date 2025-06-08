import { ref, type Ref } from 'vue';
import sgMail from '@sendgrid/mail';

// Utiliza la variable de entorno para configurar SendGrid
sgMail.setApiKey(import.meta.env.VITE_SENDGRID_API_KEY);

const isAuthenticated: Ref<boolean> = ref(false);
const userId: Ref<string | null> = ref(null);

const login = (id: string): void => {
  isAuthenticated.value = true;
  userId.value = id;
};

const logout = (): void => {
  isAuthenticated.value = false;
  userId.value = null;
};

const checkAuth = (): boolean => {
  return isAuthenticated.value;
};

const enviarContrasenaPorEmail = async (correo: string, contrasena: string): Promise<void> => {
  const msg = {
    to: correo, 
    from: 'julianmailing1@gmail.com', 
    subject: 'Recuperación de contraseña',
    text: `Hola, \n\nTu contraseña actual es: ${contrasena}\n\nPor favor, considera cambiarla después de iniciar sesión.`,
    html: `<p>Hola,</p>
           <p>Tu contraseña actual es: <strong>${contrasena}</strong></p>
           <p>Por favor, considera cambiarla después de iniciar sesión.</p>`
  };

  try {
    await sgMail.send(msg);
    console.log('Email de recuperación enviado a:', correo);
  } catch (error) {
    console.error('Error al enviar email de recuperación:', error);
    throw new Error('No se pudo enviar el email de recuperación.');
  }
};

export { isAuthenticated, userId, login, logout, checkAuth, enviarContrasenaPorEmail };
