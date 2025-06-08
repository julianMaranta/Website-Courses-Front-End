<template>
    <div class="container">
        <P_Sidebar/>
        <div class="content">
          <div class="logo-container">
        <img src="@/assets/logo-perfil.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
       <br>
       <br>
    <div class="profile-container">
      
      <form @submit.prevent="openConfirmationModal">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            v-model="form.nombre"
            placeholder="Ingrese su nombre"
            required
          />
        </div>
        <div class="form-group">
          <label for="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            v-model="form.correo"
            placeholder="Ingrese su correo"
            required
          />
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            v-model="form.contrasena"
            placeholder="Ingrese su nueva contraseña"
          />
        </div>
        <button type="submit" class="perfil-button"></button>
      </form>
  
      <!-- Modal de Confirmación -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Confirmación</h2>
          <p>¿Estás seguro de que deseas guardar los cambios?</p>
          <button @click="confirmUpdate">Confirmar</button>
          <button @click="cancelUpdate">Cancelar</button>
        </div>
      </div>
 <!-- Modal de éxito y redirección -->
 <div v-if="showSuccessModal" class="modal-overlay">
          <div class="modal-content">
            <h2>Perfil Actualizado</h2>
            <p>Tu perfil ha sido actualizado con éxito.</p>
            <button @click="redirectToStudentPlatform">Continuar</button>
          </div>
        </div>

    </div>
  </div>
    </div>
  </template>
  
  <script setup lang="ts">
   import P_Sidebar from '../components/P_Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import { generateClient } from 'aws-amplify/data';
  import { userId } from '../authenticator/auth';
  import type { Schema } from '../../amplify/data/resource';
  import { useRouter } from 'vue-router';
  
  const client = generateClient<Schema>();
  const router = useRouter();
  
  const form = ref({
    nombre: '',
    correo: '',
    contrasena: '',
  });
  
  const showModal = ref(false);
  const showSuccessModal = ref(false);
  
  if (!userId.value) {
    throw new Error('User ID is not available');
  }
  
  const loadProfile = async () => {
    try {
      const response = await client.models.Usuario.get({
        id: userId.value ?? '',
      });
  
      if (response.data) {
        form.value.nombre = response.data.nombre ?? '';
        form.value.correo = response.data.correo ?? '';
        form.value.contrasena = response.data.contrasena ?? '';
      }
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  };
  
  const openConfirmationModal = () => {
    showModal.value = true;
  };
  
  const confirmUpdate = async () => {
    try {
      if (!userId.value) {
        throw new Error('User ID is not available');
      }
  
      const updates: Partial<typeof form.value> = {
        nombre: form.value.nombre,
        correo: form.value.correo,
        contrasena: form.value.contrasena,
      };
  
      if (form.value.contrasena) {
        updates.contrasena = form.value.contrasena;
      }
  
      await client.models.Usuario.update({
        id: userId.value,
        ...updates,
      });
  
      showSuccessModal.value = true;
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un error al actualizar el perfil');
    } finally {
      showModal.value = false;
    }
  };
  
  const cancelUpdate = () => {
    showModal.value = false;
  };
  
  const redirectToStudentPlatform = () => {
  showSuccessModal.value = false;
  router.push('/plataforma-profesor');
};

  onMounted(() => {
    loadProfile();
  });
  </script>
  
  <style scoped>
  body, html {
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
    margin-left: 220px;
    padding: 20px;
    width: calc(100% - 220px);
    position: relative;
    min-height: 100vh;
    background-image: url('@/assets/background-perfil.png');
    background-size: cover;
  background-position: center;
  }

  .logo-plataforma {
  width: 300px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
}

.logo-container {
  text-align: left; 
  margin-bottom: 5px;
  width: 160px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}

.profile-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* sombra más fuerte */
}

.profile-container:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5); /* sombra más pronunciada al hacer hover */
}

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
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

  .perfil-button {
  background-image: url('@/assets/boton-perfil.png');
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 10px;

  width: 100%;
  height: 70px;
  padding: 15px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
}

.perfil-button:hover {
  transform: scale(1.03);
  
}
  </style>
  