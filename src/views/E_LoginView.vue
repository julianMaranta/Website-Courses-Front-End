<template>
  <div class="container">
    <div class="content">
  <section id="login-estudiante" class="main-section">
    <div class="login">
      <h2 class="title-informacion">Iniciar Sesión - Estudiante</h2>
      <form @submit.prevent="loginUser" class="formulario">
        <label for="login-email">Correo Electrónico:</label>
        <input id="login-email" v-model="loginEmail" placeholder="Escribe aquí..." type="email" required />

        <label for="login-password">Contraseña:</label>
        <input id="login-password" v-model="loginPassword" placeholder="Escribe aquí..." type="password" required />

        <button class="btn-login" type="submit"></button>
      </form>

      <button class="btn-recuperar" @click="showRecoveryModal = true"></button>

      <!-- Modal de Error -->
      <div v-if="showErrorModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Error de Inicio de Sesión</h3>
          <p>{{ errorMessage }}</p>
          <button @click="closeErrorModal">Cerrar</button>
        </div>
      </div>

      <!-- Modal de Recuperar Contraseña -->
      <div v-if="showRecoveryModal" class="modal-overlay">
        <div class="modal-content">
          <h3>Recuperar Contraseña</h3>
          <form @submit.prevent="recoverPassword">
            <label for="recovery-email">Correo Electrónico:</label>
            <input id="recovery-email" v-model="recoveryEmail" placeholder="Escribe tu correo" type="email" required />

            <label for="recovery-dni">DNI:</label>
            <input id="recovery-dni" v-model="recoveryDni" placeholder="Escribe tu DNI" required />

            <label for="recovery-cuil">CUIL:</label>
            <input id="recovery-cuil" v-model="recoveryCuil" placeholder="Escribe tu CUIL" required />

            <!-- tramite: { eq: recoveryTramite.value } <label for="recovery-tramite">Número de Trámite:</label>
            <input id="recovery-tramite" v-model="recoveryTramite" placeholder="Escribe tu número de trámite" required />-->

            <label for="new-password">Nueva Contraseña:</label>
            <input id="new-password" v-model="newPassword" placeholder="Escribe tu nueva contraseña" type="password" required />

            <button class="btn-recuperar-submit" type="submit"></button>
          </form>
          <button class="btn-cerrar" @click="closeRecoveryModal"></button>
        </div>
      </div>

         <!-- Modal de Éxito -->
         <div v-if="showSuccessModal" class="modal-overlay">
            <div class="modal-content">
              <h3>Contraseña Cambiada</h3>
              <p>{{ successMessage }}</p>
              <button @click="closeSuccessModal">Cerrar</button>
            </div>
          </div>

    </div>
  </section>
</div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import { login } from '../authenticator/auth';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();
const router = useRouter();

const loginEmail = ref('');
const loginPassword = ref('');
const showErrorModal = ref(false);
const errorMessage = ref('');
const showRecoveryModal = ref(false);
const showSuccessModal = ref(false);
const successMessage = ref('');

const recoveryEmail = ref('');
const recoveryDni = ref('');
const recoveryCuil = ref('');
const recoveryTramite = ref('');
const newPassword = ref('');

const loginUser = async () => {
  try {
    const response = await client.models.Usuario.list({
      filter: { correo: { eq: loginEmail.value }, rol: { eq: 'Estudiante' } }
    });

    const usuarios = response.data;

    if (usuarios.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const user = usuarios[0];

    if (user.contrasena !== loginPassword.value) {
      throw new Error('Contraseña incorrecta');
    }

    login(user.id);
    router.push('/plataforma-estudiante');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);

    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Ocurrió un error inesperado';
    }

    showErrorModal.value = true;
  }
};

const recoverPassword = async () => {
  try {
    const response = await client.models.Usuario.list({
      filter: {
        correo: { eq: recoveryEmail.value },
        dni: { eq: recoveryDni.value },
        cuil: { eq: recoveryCuil.value }
        
      }
    });

    const usuarios = response.data;

    if (usuarios.length === 0) {
      throw new Error('Datos incorrectos, verifica la información.');
    }

    const user = usuarios[0]; // Aquí user ya tiene la estructura correcta del tipo Usuario

    // Ahora actualizamos solo la contraseña
    const updatedUser = {
      ...user,  // Conservamos el resto de los campos del usuario
      contrasena: newPassword.value, // Actualizamos solo la contraseña
    };

    // Actualizamos el usuario sin especificar "id" nuevamente después del SPREAD
    await client.models.Usuario.update(updatedUser);

    successMessage.value = 'Contraseña cambiada exitosamente.';
    showSuccessModal.value = true;
    closeRecoveryModal();
  } catch (error) {
    console.error('Error al recuperar contraseña:', error);
    errorMessage.value = 'Ocurrió un error al cambiar la contraseña.';
    showErrorModal.value = true;
  }
};



const closeErrorModal = () => {
  showErrorModal.value = false;
};

const closeRecoveryModal = () => {
  showRecoveryModal.value = false;
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};
</script>

<style scoped>
/* Estilos generales */
body, html  {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  height: 100%;
}

.container {
  display: flex;
  min-height: 100vh;
}

.content {
  
  
  width: calc(100%);
  position: relative;

  background-image: url('@/assets/plataforma-background.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}
#login-estudiante {
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  max-width: 500px;
  max-height: 700px;
  margin: 0 auto;
  transition: box-shadow 0.3s;
  margin-top: 100px;
}

#login-estudiante:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.title-informacion {
  font-size: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form label {
  font-size: 16px;
  font-weight: bold;
}

form input {
  padding: 8px;
  font-size: 18px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}

form input:focus {
  border-color: #7f1a6c;
  outline: none;
}

.btn-recuperar {
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 12px;
  height: 50px;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
  transition: transform 0.3s;
    /* Añadir imagen de fondo */
  background-image: url('@/assets/boton-password.png');
  background-size: cover; /* Hace que la imagen cubra todo el botón */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

 .btn-recuperar:hover {
 
  transform: scale(1.1);
}


.btn-recuperar-submit {
  font-size: 20px;
  margin-top: 30px;
  width: 100%;
  height: 50px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 12px;
 
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
  transition: transform 0.3s;
    /* Añadir imagen de fondo */
  background-image: url('@/assets/boton-change.png');
  background-size: cover; /* Hace que la imagen cubra todo el botón */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

 .btn-recuperar-submit:hover {
  
  transform: scale(1.1);
}

.btn-cerrar {
  font-size: 20px;
  width: 100%;
  height: 50px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 12px;
 
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
  transition: transform 0.3s;
    /* Añadir imagen de fondo */
  background-image: url('@/assets/boton-close.png');
  background-size: cover; /* Hace que la imagen cubra todo el botón */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

 .btn-cerrar:hover {
 
  transform: scale(1.1);
}

.btn-login {
  font-size: 20px;
  margin-top: 30px;
  width: 100%;
  height: 50px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 12px;
  
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
  transition: transform 0.3s, background-color 0.3s;
  
  /* Añadir imagen de fondo */
  background-image: url('@/assets/boton-login.png');
  background-size: cover; /* Hace que la imagen cubra todo el botón */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

.btn-login:hover {
  
  transform: scale(1.1);
}





/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.modal-content h3 {
  font-size: 22px;
  margin-bottom: 15px;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-content form label {
  font-size: 18px;
}

.modal-content form input {
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-content button {
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #7f1a6c;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s; 
  
}

.modal-content button:hover {
  background-color: #e97b0d;
  transform: scale(1.1);
}




@media screen and (max-width: 768px) {
  .login {
    margin-top: 90px;
  }

  .btn-login {
    padding: 10px 40px;
  }

  form label {
    font-size: 18px;
  }

  form input {
    font-size: 18px;
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .login {
    margin-bottom: 200px;
    margin-top: 70px;
  }

 
  #login-estudiante {
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  max-width: 500px;
  max-height: 600px;
  margin: 0 auto;
  transition: box-shadow 0.3s;
  margin-top: 100px;
}
}

/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  /* Estilos específicos para el modal de recuperación de contraseña */
  .modal-overlay .modal-content {
    max-width: 400px; /* Ancho más compacto */
    padding: 20px; /* Padding reducido */
  }

  .modal-content h3 {
    font-size: 20px; /* Tamaño de fuente más pequeño */
    margin-bottom: 10px; /* Menos espacio debajo del título */
  }

  .modal-content form {
    gap: 8px; /* Menos espacio entre los campos del formulario */
  }

  .modal-content form label {
    font-size: 14px; /* Tamaño de fuente más pequeño para los labels */
  }

  .modal-content form input {
    font-size: 14px; /* Tamaño de fuente más pequeño para los inputs */
    padding: 6px; /* Padding reducido */
  }

  .btn-recuperar-submit,
  .btn-cerrar {
    font-size: 14px; /* Tamaño de fuente más pequeño */
    height: 40px; /* Altura reducida */
    padding: 8px 16px; /* Padding reducido */
    margin-top: 10px; /* Menos margen superior */
  }

  .modal-content button {
    font-size: 14px; /* Tamaño de fuente más pequeño */
    padding: 8px 16px; /* Padding reducido */
    margin-top: 10px; /* Menos margen superior */
  }
}
</style>