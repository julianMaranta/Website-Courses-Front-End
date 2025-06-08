<template>
    <section id="recover-password" class="main-section">
      <div class="recover-password">
        <h2 class="title-informacion">Recuperar Contraseña</h2>
        <form @submit.prevent="recoverPassword" class="formulario">
          <label for="recover-email">Correo Electrónico:</label>
          <input
            id="recover-email"
            v-model="recoverEmail"
            placeholder="Escribe aquí..."
            type="email"
            required
          />
          <button class="btn-recover" type="submit">Enviar Contraseña</button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { generateClient } from 'aws-amplify/data';
  import { sendPasswordRecoveryEmail } from '../emailModule';
  import type { Schema } from '../../amplify/data/resource';
  
  const client = generateClient<Schema>();
  const recoverEmail = ref('');
  
  const obtenerUsuarioPorCorreo = async (correo: string) => {
    try {
      const response = await client.models.Usuario.list({
        filter: {
          correo: { eq: correo },
        },
      });
  
      if (response.data && response.data.length > 0) {
        return response.data[0]; 
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al buscar usuario por correo:', error);
      throw new Error('Error al buscar usuario');
    }
  };
  
  const recoverPassword = async () => {
    try {
      const usuario = await obtenerUsuarioPorCorreo(recoverEmail.value);
  
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
  
      // Envía el email con la contraseña actual del usuario
      await sendPasswordRecoveryEmail(recoverEmail.value, usuario.nombre, usuario.contrasena);
  
      alert('El email con la contraseña ha sido enviado.');
    } catch (error) {
      console.error('Error al enviar email con la contraseña:', error);
      alert('Hubo un error al intentar enviar el email.');
    }
  };
  </script>
  
  <style scoped>
  .main-section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .recover-password {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title-informacion {
    font-size: 1.5em;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .formulario {
    display: flex;
    flex-direction: column;
  }
  
  .formulario label {
    margin-bottom: 5px;
  }
  
  .formulario input {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn-recover {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s;
  }
  
  .btn-recover:hover {
    background-color: #0056b3;
  }
  </style>
  