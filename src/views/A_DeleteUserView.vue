<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-eliminar-usuario.png" alt="Logo ENSEA" class="logo-plataforma"/>
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
          @click="toggleDetails(usuario.id)"
        >
          <div class="user-name">
            {{ usuario.nombre }} - {{ usuario.dni }} - {{ usuario.correo }}
          </div>
          <div v-if="isDetailsVisible(usuario.id)" class="user-details">
            <input
              type="text"
              v-model="usuario.nombre"
              placeholder="Nombre"
              readonly
            />
            <input
              type="text"
              v-model="usuario.dni"
              placeholder="DNI"
              @click.stop
            />
            <input
              type="text"
              v-model="usuario.correo"
              placeholder="Correo"
              readonly
            />
            <select v-model="usuario.rol" disabled>
              <option value="Estudiante">Estudiante</option>
              <option value="Administrador">Administrador</option>
              <option value="Profesor">Profesor</option>
            </select>
            <input
              type="password"
              v-model="usuario.contrasena"
              placeholder="Contraseña"
              readonly
            />
            <button @click.stop="openDeleteModal(usuario.id)" class="delete-button">
              Eliminar Usuario
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal-content">
        <h2>¿Estás seguro de que deseas eliminar este usuario?</h2>
        <button @click="confirmDelete">Confirmar</button>
        <button @click="closeDeleteModal">Cancelar</button>
      </div>
    </div>

    <!-- Modal de redirección -->
    <div v-if="showRedirectModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Usuario Eliminado</h2>
        <p>El usuario ha sido eliminado correctamente.</p>
        <button @click="redirectToPlataforma">Ir al Inicio</button>
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

const client = generateClient<Schema>();
const router = useRouter();


const usuarios = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');

const showDeleteModal = ref(false);
const showRedirectModal = ref(false);
const userIdToDelete = ref<string | null>(null);
const visibleUserId = ref<string | null>(null);

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

const deleteUser = async (userId: string) => {
  try {
    await client.models.Usuario.delete({ id: userId });
    usuarios.value = usuarios.value.filter(user => user.id !== userId);
    console.log('Usuario eliminado');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
};

const openDeleteModal = (id: string) => {
  userIdToDelete.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userIdToDelete.value = null;
};

const confirmDelete = () => {
  if (userIdToDelete.value) {
    deleteUser(userIdToDelete.value);
    closeDeleteModal();
    showRedirectModal.value = true;
  }
};

const redirectToPlataforma = () => {
  showRedirectModal.value = false;
  router.push('/plataforma-administrador');
};

const toggleDetails = (id: string) => {
  if (visibleUserId.value === id) {
    visibleUserId.value = null;
  } else {
    visibleUserId.value = id;
  }
};

const isDetailsVisible = (id: string) => {
  return visibleUserId.value === id;
};

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return usuarios.value.filter(usuario =>
    (usuario.nombre?.toLowerCase() ?? '').includes(query) ||
    (usuario.correo?.toLowerCase() ?? '').includes(query) ||
    (usuario.dni?.toLowerCase() ?? '').includes(query)
  );
});

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

.logo-plataforma {
  width: 500px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
}

.logo-container {
  text-align: left; 
  margin-bottom: 5px;
  width: 160px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}

.search-bar {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #000000;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  text-align: center;
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

.user-name {
  font-size: 20px;
  font-weight: bold;
  width: 100%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.user-details {
  margin-top: 10px;
  width: 100%;
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


.delete-button {
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

.delete-button:hover {
  background-color: #7f1a6c;
  color: white;
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
</style>
