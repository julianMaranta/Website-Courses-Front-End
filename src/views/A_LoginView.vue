<template>
   <div class="container">
    <div class="content">
  <section id="login-admin" class="main-section">
    <div class="login">
      <h2 class="title-informacion">ADMINISTRADOR - Iniciar Sesión</h2>
      <form @submit.prevent="loginUser" class="formulario">
        <label for="login-email">Correo Electrónico:</label>
        <input id="login-email" v-model="loginEmail" placeholder="Escribe aquí..." type="email" required />

        <label for="login-password">Contraseña:</label>
        <input id="login-password" v-model="loginPassword" placeholder="Escribe aquí..." type="password" required />

        <button class="btn-login" type="submit"></button>
      </form>

      <!-- Modal de Error -->
      <div v-if="showErrorModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Error de Inicio de Sesión</h2>
          <p>{{ errorMessage }}</p>
          <button @click="closeErrorModal">Cerrar</button>
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

const loginUser = async () => {
  try {
    const response = await client.models.Usuario.list({
      filter: { correo: { eq: loginEmail.value }, rol: { eq: 'Administrador' } }
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
    router.push('/plataforma-administrador');
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

const closeErrorModal = () => {
  showErrorModal.value = false;
};
</script>

<style scoped>
 body, html  {
  font-family: Arial, sans-serif;
  
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

#login-admin {
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

#login-admin:hover {
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
.modal-overlay {
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  text-align: center;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 22px;
}
.modal-content p {
  margin-bottom: 20px;
  font-size: 20px;
}

.modal-content button {
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #7f1a6c;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #e97b0d;
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
  #login-admin {
    margin-top: 40px;
  }
}
</style>
