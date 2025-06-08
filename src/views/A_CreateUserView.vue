<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-crear-usuario.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
      
      <form @submit.prevent="createUsers">
        <!-- Usuarios a crear -->
        <div v-for="(usuario, index) in usuarios" :key="index" class="form-group usuario-group">
          <h3>Usuario {{ index + 1 }}</h3>
          
          <label :for="'user-name-' + index">Nombre</label>
          <input 
            :id="'user-name-' + index" 
            v-model="usuario.nombre" 
            placeholder="Escribe aquí..." 
          />
          
          <label :for="'user-dni-' + index">D.N.I.</label>
          <input 
            :id="'user-dni-' + index" 
            v-model="usuario.dni" 
            placeholder="Escribe aquí..." 
          />
          
          <label :for="'user-email-' + index">Correo</label>
          <input 
            :id="'user-email-' + index" 
            v-model="usuario.correo" 
            placeholder="Escribe aquí..." 
            type="email" 
          />
          
          <label :for="'user-password-' + index">Contraseña</label>
          <input
            :id="'user-password-' + index"
            v-model="usuario.contrasena"
            placeholder="Escribe aquí..."
            type="password"
            required
            @input="validatePassword(index)"
          />
          <p v-if="usuario.passwordError" class="error">{{ usuario.passwordError }}</p>
          
          <label :for="'user-role-' + index">Rol</label>
          <select :id="'user-role-' + index" v-model="usuario.rol">
            <option value="Estudiante">Estudiante</option>
            <option value="Profesor">Profesor</option>
            <option value="Administrador">Administrador</option>
          </select>
          
          <button type="button" @click="removeUser(index)" class="remove-btn">Eliminar Usuario</button>
        </div>
        
        <button type="button" @click="addUser" class="add-btn">Agregar Usuario</button>
        <button type="submit" :disabled="hasErrors" class="submit-btn">Crear Usuarios</button>
      </form>
      
      <!-- Modal de confirmación -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Usuarios creados exitosamente</h2>
          <p>Se han creado {{ usuariosCreados }} usuarios.</p>
          <button @click="redirectToAdminPanel">Ir al Inicio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import A_Sidebar from '../components/A_Sidebar.vue';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();
const router = useRouter();

// Array de usuarios a crear
const usuarios = ref([{
  nombre: '',
  dni: '',
  correo: '',
  contrasena: '',
  rol: 'Estudiante' as "Estudiante" | "Administrador" | "Profesor",
  passwordError: ''
}]);

const showModal = ref(false);
const usuariosCreados = ref(0);

// Comprueba si hay errores en los formularios
const hasErrors = computed(() => {
  return usuarios.value.some(user => user.passwordError || 
    !user.nombre || !user.correo || !user.contrasena);
});

// Añadir nuevo usuario con datos del último usuario
const addUser = () => {
  const lastUser = usuarios.value[usuarios.value.length - 1];
  
  usuarios.value.push({
    nombre: '',
    dni: '',
    correo: lastUser.correo, // Copia el correo del último usuario
    contrasena: lastUser.contrasena, // Copia la contraseña del último usuario
    rol: lastUser.rol, // Copia el rol del último usuario
    passwordError: lastUser.passwordError // Copia el estado de validación
  });
};

// Eliminar usuario
const removeUser = (index: number) => {
  if (usuarios.value.length > 1) {
    usuarios.value.splice(index, 1);
  }
};

// Validar contraseña
const validatePassword = (index: number) => {
  const password = usuarios.value[index].contrasena;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (!passwordRegex.test(password)) {
    usuarios.value[index].passwordError =
      'La contraseña debe tener al menos 8 caracteres, incluir un número y un carácter especial.';
  } else {
    usuarios.value[index].passwordError = '';
  }
};

// Crear usuarios
const createUsers = async () => {
  try {
    let creados = 0;
    
    for (const usuario of usuarios.value) {
      await client.models.Usuario.create({
        nombre: usuario.nombre,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        dni: usuario.dni,
        rol: usuario.rol,
      });
      creados++;
    }
    
    usuariosCreados.value = creados;
    showModal.value = true;
    resetForm();
  } catch (error) {
    console.error('Error al crear usuarios:', error);
  }
};

// Reiniciar formulario
const resetForm = () => {
  usuarios.value = [{
    nombre: '',
    dni: '',
    correo: '',
    contrasena: '',
    rol: 'Estudiante',
    passwordError: ''
  }];
};

const redirectToAdminPanel = () => {
  showModal.value = false;
  router.push('/plataforma-administrador');
};
</script>

<style scoped>
/* Estilos base (igual que en el original) */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
}

.content {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
  position: relative;
}

.logo-plataforma {
  width: 300px;
  padding: 5px;
}

.logo-container {
  text-align: left; 
  margin-bottom: 5px;
  width: 160px;
  height: auto;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.usuario-group {
  position: relative;
}

.usuario-group h3 {
  margin-top: 0;
  color: #7f1a6c;
}

label {
  font-size: 18px;
  display: block;
  margin-bottom: 5px;
}

input,
select {
  padding: 15px;
  font-size: 18px;
  border: 1px solid #000000;
  border-radius: 10px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 15px;
}

/* Botones */
button {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn {
  background-color: #7f1a6c;
  color: white;
  border: none;
  margin-bottom: 20px;
}

.add-btn:hover {
  background-color: #e97b0d;
}

.remove-btn {
  background-color: #7f1a6c;
  color: white;
  border: none;
  margin-top: 10px;
}

.remove-btn:hover {
  background-color: #e97b0d;
}

.submit-btn {
  background-color: #e97b0d;
  color: white;
  border: none;
  padding: 15px;
  font-size: 18px;
  width: 200px;
  align-self: center;
}

.submit-btn:hover {
  background-color: #7f1a6c;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* Modal y errores (igual que en el original) */
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

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>