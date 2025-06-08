<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-editar-usuario.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
   
      
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por nombre, correo o DNI"
        id="search-bar"
      />
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div
          v-for="usuario in filteredUsers"
          :key="usuario.id"
          class="user-item"
          @click="toggleEditOptions(usuario)"
        >
          <!-- Mostrar el nombre, DNI y correo inicialmente -->
          <div v-if="selectedUser !== usuario">
            {{ usuario.nombre }} - {{ usuario.dni }} - {{ usuario.correo }}
          </div>
          
          <!-- Mostrar todos los detalles y opciones cuando el usuario está seleccionado -->
          <div v-if="selectedUser === usuario">
            <input
              type="text"
              v-model="usuario.nombre"
              placeholder="Nombre"
              @click.stop
            />
            <input
              type="text"
              v-model="usuario.dni"
              placeholder="DNI"
              @click.stop
            />
            <input
              type="text"
              v-model="usuario.cuil"
              placeholder="CUIL"
              @click.stop
            />
            <input
              type="text"
              v-model="usuario.tramite"
              placeholder="Número de Trámite"
              @click.stop
            />
            <input
              type="text"
              v-model="usuario.correo"
              placeholder="Correo"
              @click.stop
            />
            <select v-model="usuario.rol" @click.stop>
              <option value="Estudiante">Estudiante</option>
              <option value="Administrador">Administrador</option>
              <option value="Profesor">Profesor</option>
            </select>
            <input
              type="password"
              v-model="usuario.contrasena"
              placeholder="Contraseña"
              @click.stop
            />
            <div class="edit-options">
              <button @click.stop="openUpdateModal(usuario)">
                Actualizar Usuario
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de actualización -->
    <div v-if="showUpdateModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Confirmación</h2>
        <p>¿Estás seguro de que deseas actualizar este usuario?</p>
        <button @click="confirmUpdate">Sí</button>
        <button @click="cancelUpdate">No</button>
      </div>
    </div>

    <!-- Modal de redirección -->
    <div v-if="showRedirectModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Usuario Editado</h2>
        <p>El usuario ha sido editado correctamente.</p>
        <button @click="redirectToPlataforma">Continuar</button>
      </div>
    </div>
  
</div>
</template>

<script setup lang="ts">
import A_Sidebar from '../components/A_Sidebar.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

// Configurar el cliente de Amplify
const client = generateClient<Schema>();
const router = useRouter();

const usuarios = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const showUpdateModal = ref(false);
const showRedirectModal = ref(false);
let selectedUser = ref<any>(null);

const loadUsers = async () => {
  try {
    const response = await client.models.Usuario.list();
    if (response.data) {
      usuarios.value = response.data.map((user: any) => ({
        ...user
      }));
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  } finally {
    loading.value = false;
  }
};

const openUpdateModal = (usuario: any) => {
  selectedUser.value = usuario;
  showUpdateModal.value = true;
};

const confirmUpdate = async () => {
  if (selectedUser.value) {
    await updateUser(selectedUser.value);
    showUpdateModal.value = false;
    showRedirectModal.value = true;
  }
};

const cancelUpdate = () => {
  showUpdateModal.value = false;
};



const redirectToPlataforma = () => {
  showRedirectModal.value = false;
  router.push('/plataforma-administrador');
};

const updateUser = async (usuario: any) => {
  try {
    await client.models.Usuario.update({
      id: usuario.id,
      nombre: usuario.nombre,
      dni: usuario.dni,
      cuil: usuario.cuil,
      tramite: usuario.tramite,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      rol: usuario.rol,
    });
    console.log('Usuario actualizado');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
  }
};

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return usuarios.value.filter(usuario =>
    (usuario.nombre?.toLowerCase() ?? '').includes(query) ||
    (usuario.correo?.toLowerCase() ?? '').includes(query) ||
    (usuario.dni?.toLowerCase() ?? '').includes(query)
  );
});


const toggleEditOptions = (usuario: any) => {
  selectedUser.value = selectedUser.value === usuario ? null : usuario;
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
}
#search-bar {
  min-width: 100%;
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */

}
.content {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
  position: relative;
}


.user-item {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 8px;
  margin: 10px 0;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  border-radius: 10px;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.user-item:hover {
  background-color: #e97b0d;
  color: white;
  transform: scale(1.02);
}

input[type="text"],
input[type="password"],
select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #000000;
  border-radius: 5px;
  width: 90%;
  margin-bottom: 10px;
  box-sizing: border-box;
  text-align: center;
}


h1, h2 {
  font-size: 24px;
  text-align: center;
}



/* Estilos para el modal */
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

/* Estilos para las opciones de edición */
.edit-options {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-options button{
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 10px;
}

.edit-options button:hover{
  background-color: #7f1a6c;
  color: white;
  transform: scale(1.1);
}
.user-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
