<template>
    <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-eliminar-tutoria.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
     
        
        <div v-if="loading" class="loading">Cargando...</div>
        <div v-else>
          <div v-for="tutoria in tutorias" :key="tutoria.id">
            <div class="course-item" @click="selectTutoria(tutoria.id)">
              <h3>{{ tutoria.nombre }}</h3>
              <p>Tema: {{ tutoria.tematica }}</p>
              <p>Fecha: {{ tutoria.fecha }}</p>
              <p>Hora: {{ tutoria.hora }}</p>
            </div>
            <!-- Opciones de eliminación desplegadas debajo de la tutoría seleccionada -->
            <div v-if="selectedTutoriaId === tutoria.id" class="content">
              <h2>Eliminar Tutoría</h2>
              <p>¿Estás seguro de que deseas eliminar la tutoría <strong>{{ tutoria.nombre }}</strong>?</p>
              <button @click="showModal = true">Eliminar Tutoría</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal de confirmación -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Confirmación</h2>
          <p>¿Estás seguro de que deseas eliminar la tutoría <strong>{{ tutoriaName }}</strong> y todos sus datos asociados?</p>
          <button @click="confirmDelete">Sí</button>
          <button @click="cancelDelete">No</button>
        </div>
      </div>
  
      <!-- Modal de redirección -->
      <div v-if="showRedirectModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Eliminación Completa</h2>
          <p>La tutoría ha sido eliminada exitosamente.</p>
          <button @click="redirectToAdmin">Ir al inicio</button>
        </div>
      </div>
    
  </div>
  </template>
  
  <script setup lang="ts">
  import A_Sidebar from '../components/A_Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { generateClient } from 'aws-amplify/data';
  import type { Schema } from '../../amplify/data/resource';
  
  const client = generateClient<Schema>();
  const router = useRouter();

  
  const tutorias = ref<any[]>([]);
  const loading = ref(true);
  const selectedTutoriaId = ref<string | null>(null);
  
  const tutoriaName = ref('');
  
  const showModal = ref(false);
  const showRedirectModal = ref(false);
  
  const loadTutorias = async () => {
    try {
      const response = await client.models.Tutoria.list();
      if (response.data) {
        tutorias.value = response.data;
      }
    } catch (error) {
      console.error('Error al cargar tutorías:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const selectTutoria = async (id: string) => {
    selectedTutoriaId.value = id;
    await loadTutoriaData(id);
  };
  
  const loadTutoriaData = async (id: string) => {
    try {
      const tutoria = await client.models.Tutoria.get({ id });
  
      if (tutoria.data) {
        tutoriaName.value = tutoria.data.nombre;
      } else {
        throw new Error('Tutoría no encontrada');
      }
    } catch (error) {
      console.error('Error al cargar datos de la tutoría:', error);
    }
  };
  
  const deleteTutoria = async () => {
    try {
      if (!selectedTutoriaId.value) return;
  
      // Eliminar todas las tutorías asociadas (si corresponde)
      const clasesResponse = await client.models.Clase.list({
        filter: { tutoriaId: { eq: selectedTutoriaId.value } },
      });
  
      if (clasesResponse.data) {
        for (const clase of clasesResponse.data) {
          await client.models.Clase.delete({ id: clase.id });
        }
      }
  
      // Eliminar la tutoría
      await client.models.Tutoria.delete({ id: selectedTutoriaId.value });
  
      console.log('Tutoría y clases eliminadas');
      showRedirectModal.value = true;
    } catch (error) {
      console.error('Error al eliminar tutoría y clases:', error);
    }
  };
  
  const confirmDelete = () => {
    showModal.value = false;
    deleteTutoria();
  };
  
  const cancelDelete = () => {
    showModal.value = false;
  };
  
  const redirectToAdmin = () => {
    showRedirectModal.value = false;
    router.push('/plataforma-administrador');
  };
  
  onMounted(() => {
    loadTutorias();
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
  
  .course-item {
    background-color: white;
    color: #000000;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  
  
  button {
    background-color: #f44336;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e53935;
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
  