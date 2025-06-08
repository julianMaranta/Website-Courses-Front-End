<template>
  <div class="container">
  <A_Sidebar/>
  <div class="content">
    <div class="logo-container">
      <img src="@/assets/logo-buscador.png" alt="Logo ENSEA" class="logo-plataforma"/>
    </div>
    <br>   
    <br>
    
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar por nombre, correo o DNI"
      class="search-bar"
    />
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else>
      <div  v-for="usuario in filteredUsers"
        :key="usuario.id"
        class="user-item"
        >
        <div class="user-name">{{ usuario.nombre }} - {{ usuario.dni }} - {{ usuario.correo }}</div>
        <button @click="habilitarUsuario(usuario.id)" class="comunidad-button"></button>
      </div>
    </div>
  </div>
  <!-- Modal de Habilitación -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <h2>Estudiante Habilitado</h2>
      <p>El estudiante ha sido habilitado correctamente para el {{ entityTypeLabel }}</p>
      <button @click="closeModal">Cerrar</button>
    </div>
  </div>
  </div>
</template>

  
  <script setup lang="ts">
  import A_Sidebar from '../components/A_Sidebar.vue';
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { generateClient } from 'aws-amplify/data';
  import type { Schema } from '../../amplify/data/resource';
  import { userId } from '../authenticator/auth';
  
  const client = generateClient<Schema>();
  const usuarios = ref<any[]>([]);
  const loading = ref(true);
  const searchQuery = ref('');
  const showModal = ref(false);
const entityTypeLabel = ref('');
  const route = useRoute();
  
  const entityType = ref<string>(route.query.entityType as string);
  const entityId = ref<string>(route.query.entityId as string);
  
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
  
  const habilitarUsuario = async (usuarioId: string) => {
    if (!userId.value) return;
    try {
       // Crear el objeto de usuario con su id
    const usuario = { id: userId.value };

// Obtener información del usuario
const usuarioData = await client.models.Usuario.get(usuario);
if (!usuarioData.data) throw new Error('Usuario no encontrado');

const nombreUsuario = usuarioData.data.nombre;
const correoUsuario = usuarioData.data.correo;

      if (entityType.value === 'curso') {
        await client.models.CursoComprado.create({
          usuarioId,
          cursoId: entityId.value,
          usuarioNombre: nombreUsuario, // Agregar nombre del usuario
      usuarioCorreo: correoUsuario, // Agregar correo del usuario
        });
      } else if (entityType.value === 'especializacion') {
        await client.models.EspecializacionComprada.create({
          usuarioId,
          especializacionId: entityId.value,
          usuarioNombre: nombreUsuario, // Agregar nombre del usuario
      usuarioCorreo: correoUsuario, // Agregar correo del usuario
        });
      } else if (entityType.value === 'tutoria') {
        await client.models.TutoriaComprada.create({
          usuarioId,
          tutoriaId: entityId.value,
          usuarioNombre: nombreUsuario, // Agregar nombre del usuario
      usuarioCorreo: correoUsuario, // Agregar correo del usuario
        });
      }
      // Mostrar el modal de éxito
    showModal.value = true;
    } catch (error) {
      console.error('Error al habilitar estudiante:', error);
    }
  };

  const closeModal = () => {
  showModal.value = false;
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
  body, html  {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
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

  background-image: url('@/assets/plataforma-background.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
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


  .user-item button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.3s;
}

.user-item button:hover {
  background-color: #7f1a6c;
  color: white;
  transform: scale(1.1);
}

.user-item {
  margin: 10px 20px;
  padding: 30px;
  border: 1px solid #000000;
  color: #000000;
  background-image: url('@/assets/background-caja.png');
  border-radius: 45px;
  display: flex; /* Alinear elementos horizontalmente */
  align-items: center; /* Centrar verticalmente los elementos */
  justify-content: space-between; /* Espacio entre el nombre y el botón */
}

.user-name {
  display: inline-block;
  margin-right: 20px;
}

.comunidad-button {
  background-image: url('@/assets/boton-habilitar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 40px;
  width: 180px;
  border: none; /* Eliminar el borde por defecto */
  cursor: pointer; /* Cambiar el cursor al pasar sobre el botón */
  transition: transform 0.3s; /* Efecto de escala al pasar el mouse */
}

.comunidad-button:hover {
  transform: scale(1.05); /* Efecto de escala al pasar el mouse */
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