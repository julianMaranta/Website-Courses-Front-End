<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-eliminar-curso.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
    
      
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div v-for="curso in cursos" :key="curso.id">
          <div class="course-item" @click="selectCourse(curso.id)">
            <h3>{{ curso.nombre }}</h3>
            <p>Profesor: {{ curso.profesor }}</p>
            <p>Ayudante: {{ curso.ayudante }}</p>
            <p>Alumnos: {{ curso.cantidadDeAlumnos }}</p>
          </div>
          <!-- Opciones de eliminación desplegadas debajo del curso seleccionado -->
          <div v-if="selectedCourseId === curso.id" class="content">
            <h2>Eliminar Curso</h2>
            <p>¿Estás seguro de que deseas eliminar el curso <strong>{{ curso.nombre }}</strong>?</p>
            <button @click="showModal = true">Eliminar Curso</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Confirmación</h2>
        <p>¿Estás seguro de que deseas eliminar el curso <strong>{{ courseName }}</strong> y todas sus clases asociadas?</p>
        <button @click="confirmDelete">Sí</button>
        <button @click="cancelDelete">No</button>
      </div>
    </div>

    <!-- Modal de redirección -->
    <div v-if="showRedirectModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Eliminación Completa</h2>
        <p>El curso ha sido eliminado exitosamente.</p>
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


const cursos = ref<any[]>([]);
const loading = ref(true);
const selectedCourseId = ref<string | null>(null);

const courseName = ref('');

const showModal = ref(false);
const showRedirectModal = ref(false);

const loadCourses = async () => {
  try {
    const response = await client.models.Curso.list();
    if (response.data) {
      cursos.value = response.data;
    }
  } catch (error) {
    console.error('Error al cargar cursos:', error);
  } finally {
    loading.value = false;
  }
};

const selectCourse = async (id: string) => {
  selectedCourseId.value = id;
  await loadCourseData(id);
};

const loadCourseData = async (id: string) => {
  try {
    const curso = await client.models.Curso.get({ id });

    if (curso.data) {
      courseName.value = curso.data.nombre;
    } else {
      throw new Error('Curso no encontrado');
    }
  } catch (error) {
    console.error('Error al cargar datos del curso:', error);
  }
};

const deleteCourse = async () => {
  try {
    if (!selectedCourseId.value) return;

    // Eliminar todas las clases asociadas al curso
    const clasesResponse = await client.models.Clase.list({
      filter: { cursoId: { eq: selectedCourseId.value } },
    });

    if (clasesResponse.data) {
      for (const clase of clasesResponse.data) {
        await client.models.Clase.delete({ id: clase.id });
      }
    }

    // Eliminar el curso
    await client.models.Curso.delete({ id: selectedCourseId.value });

    console.log('Curso y clases eliminados');
    showRedirectModal.value = true;
  } catch (error) {
    console.error('Error al eliminar curso y clases:', error);
  }
};

const confirmDelete = () => {
  showModal.value = false;
  deleteCourse();
};

const cancelDelete = () => {
  showModal.value = false;
};

const redirectToAdmin = () => {
  showRedirectModal.value = false;
  router.push('/plataforma-administrador');
};

onMounted(() => {
  loadCourses();
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
