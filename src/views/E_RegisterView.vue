<template> 
<div class="container">
    <div class="content">
  <section id="registro" class="main-section">
    <div class="registro">
      <h2 class="title-informacion">Registro</h2>
      <form @submit.prevent="createUser" class="formulario">
        <label for="user-name">Nombre Completo:</label>
        <input id="user-name" v-model="userName" placeholder="Escribe aquí..." required />

        <label for="user-email">Correo Electrónico:</label>
        <input id="user-email" v-model="userEmail" placeholder="Escribe aquí..." type="email" required />

        <!-- Campo para el D.N.I. -->
        <label for="user-dni">D.N.I.:</label>
        <input id="user-dni" v-model="userDni" placeholder="Escribe aquí tu D.N.I." required />

        <!-- Nuevo campo para el CUIL -->
        <label for="user-cuil">CUIL:</label>
        <input id="user-cuil" v-model="userCuil" placeholder="Escribe aquí tu CUIL" required />

        <!-- Campo para el Número de Trámite con icono y tooltip 
        <div class="label-tooltip">
          <label for="user-tramite">Número de Trámite:</label>
          <i 
            class="icon-info" 
            @mouseover="showTooltip = true" 
            @mouseleave="showTooltip = false"
          >
            &#9432; --><!-- Icono de información -->
          <!--</i>-->
         <!-- Tooltip con imagen 
<div v-if="showTooltip" class="tooltip">
  <img :src="numeroTramiteImage" alt="Número de Trámite" />
</div>

        </div>
        <input id="user-tramite" v-model="userTramite" placeholder="Escribe aquí tu Número de Trámite" required />-->

        <label for="user-password">Contraseña:</label>
            <input 
              id="user-password" 
              v-model="userPassword" 
              placeholder="Escribe aquí..." 
              type="password" 
              required 
              @input="validatePassword" 
            />
            <p v-if="passwordError" class="error">{{ passwordError }}</p>

        <!-- Campo oculto para el rol -->
        <input type="hidden" v-model="userRole" />

        <button class="btn-registro" type="submit" :disabled="!!passwordError"></button>
      </form>
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Registro Exitoso</h2>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <button @click="redirectToLogin">Ir a Login</button>
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
import type { Schema } from '../../amplify/data/resource';

// Ruta de la imagen desde la carpeta assets
const numeroTramiteImage = new URL('@/assets/numero-tramite.jpg', import.meta.url).href;

// Configuración del cliente de Amplify
const client = generateClient<Schema>();
const router = useRouter();

// Variables reactivas para los campos del formulario
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const userDni = ref(''); // Variable para el D.N.I.
const userCuil = ref(''); // Nueva variable para el CUIL
const userTramite = ref(''); // Nueva variable para el Número de Trámite
const userRole = ref<"Estudiante" | "Administrador" | "Profesor">('Estudiante');

// Variable reactiva para controlar el tooltip
const showTooltip = ref(false);

// Variable reactiva para mostrar el modal
const showConfirmationModal = ref(false);

const passwordError = ref<string>(''); // Cambiado de `null` a una cadena vacía

const validatePassword = () => {
  const password = userPassword.value;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(password)) {
    passwordError.value = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.';
  } else {
    passwordError.value = ''; // Si es válido, no hay error
  }
};


const createUser = async () => {
  try {
    const rol = userRole.value || 'Estudiante';

    const nuevoUsuario = await client.models.Usuario.create({
      nombre: userName.value,
      correo: userEmail.value,
      contrasena: userPassword.value,
      dni: userDni.value, // Pasar el D.N.I. al modelo
      cuil: userCuil.value, // Pasar el CUIL al modelo
      tramite: userTramite.value, // Pasar el Número de Trámite al modelo
      rol: rol,
    });
    console.log('Usuario creado:', nuevoUsuario);
    
    // Mostrar el modal de confirmación
    showConfirmationModal.value = true;
  } catch (error) {
    console.error('Error al crear usuario:', error);
  }
};

// Función para redirigir al login
const redirectToLogin = () => {
  showConfirmationModal.value = false;
  router.push({ name: 'login' });
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

#registro {
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  max-width: 500px;
  max-height: 720px;
  margin: 0 auto;
  transition: box-shadow 0.3s;
  margin-top: 30px;
}

#registro:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.title-informacion {
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form label {
  font-size: 14px;
  font-weight: bold;
}

form input {
  padding: 6px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s;
}

form input:focus {
  border-color: #7f1a6c;
  outline: none;
}

/* Estilos para el contenedor de label y tooltip */
.label-tooltip {
  position: relative;
  display: flex;
  align-items: center;
}

.icon-info {
  font-size: 18px;
  color: #7f1a6c;
  margin-left: 5px;
  cursor: pointer;
}

/* Estilos para el tooltip */
.tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 10px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.tooltip img {
  max-width: 200px;
}

.btn-registro {
  font-size: 20px;
  margin-top: 20px;
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
  background-image: url('@/assets/boton-registro.png');
  background-size: cover; /* Hace que la imagen cubra todo el botón */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
}

.btn-registro:hover {
  
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

/* Media Queries para pantallas móviles */
@media screen and (max-width: 768px) {
  .registro {
    margin-top: 90px;
  }

  .btn-registro {
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
  .registro {
    margin-bottom: 200px;
    margin-top: 70px;
  }


  
#registro {
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  max-width: 500px;
  max-height: 800px;
  margin: 0 auto;
  transition: box-shadow 0.3s;
  margin-top: 30px;
}
}
/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  #registro {
    max-width: 400px; /* Ancho más compacto */
    max-height: 550px; /* Altura reducida */
    padding: 15px; /* Menos padding interno */
    margin-top: 50px; /* Margen superior reducido */
  }

  .title-informacion {
    font-size: 22px; /* Tamaño de fuente más pequeño */
    margin-bottom: 8px; /* Menos espacio debajo del título */
  }

  .formulario {
    gap: 6px; /* Menos espacio entre los campos del formulario */
  }

  form label {
    font-size: 14px; /* Tamaño de fuente más pequeño para los labels */
  }

  form input {
    font-size: 15px; /* Tamaño de fuente más pequeño para los inputs */
    padding: 5px; /* Padding reducido */
  }

  .btn-registro {
    font-size: 16px; /* Tamaño de fuente más pequeño */
    height: 38px; /* Altura reducida */
    padding: 8px 20px; /* Padding reducido */
    margin-top: 10px; /* Menos margen superior */
  }

  .modal-content {
    padding: 20px; /* Padding reducido en el modal */
  }

  .modal-content h2 {
    font-size: 20px; /* Tamaño de fuente más pequeño */
    margin-bottom: 10px; /* Menos espacio debajo del título */
  }

  .modal-content p {
    font-size: 16px; /* Tamaño de fuente más pequeño */
    margin-bottom: 10px; /* Menos espacio debajo del texto */
  }

  .modal-content button {
    font-size: 16px; /* Tamaño de fuente más pequeño */
    padding: 8px 16px; /* Padding reducido */
  }
}
</style>
