<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-editar-tutoria.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
   
      
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div v-for="tutoria in tutorias" :key="tutoria.id" class="tutoria-item-container">
          <div class="tutoria-item" @click="selectTutoria(tutoria.id)">
            <h3>{{ tutoria.nombre }}</h3>
            <p>Profesor: {{ tutoria.profesorPrincipal }}</p>
            <p>Ayudante: {{ tutoria.profesorSecundario }}</p>
            <p>Alumnos: {{ tutoria.cantidadDeAlumnos }}</p>
          </div>
          <!-- Opciones de edición desplegadas debajo de la tutoría seleccionada -->
          <div v-if="selectedTutoriaId === tutoria.id" >
            <h2>Editar Tutoría</h2>
            <form @submit.prevent="showModal = true">
              <div class="form-group">
                <label for="tutoria-name">Nombre de la Tutoría</label>
                <input id="tutoria-name" v-model="tutoriaName" placeholder="Escribe aquí..." />
              </div>
              <div class="form-group">
            <label for="youtube-video-url">Link del Video Presentación</label>
            <input v-model="videoUrl" id="video-url" placeholder="Link del video de YouTube" />
        </div>
              <div class="form-group">
            <label for="driveLink">Link de Google Drive</label>
            <input id="driveLink" v-model=" driveLink" placeholder="Escribe aquí..." />
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input id="descripcion" v-model="descripcion" placeholder="Escribe aquí..." />
          </div>
              <!-- Profesores -->
              <div v-for="(profesorSeleccionado, index) in profesoresSeleccionados" :key="index" class="form-group">
                <label>Profesor {{ index + 1 }}</label>
                <select v-model="profesoresSeleccionados[index]">
                  <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.nombre">
                    {{ profesor.nombre }}
                  </option>
                </select>
                <div class="button-container">
    <button type="button" @click="removeProfesor(index)">Eliminar Profesor</button>
    <button type="button" @click="addProfesor">Agregar Profesor</button>
  </div>
              </div>
              
              <div class="form-group">
                <label for="student-count">Cantidad de Alumnos</label>
                <input id="student-count" v-model.number="studentCount" placeholder="Escribe aquí..." type="number" />
              </div>
              <div v-for="(clase, index) in clases" :key="index" class="form-group">
                <label>Clase {{ index + 1 }}</label>
                <input v-model="clase.nombre" placeholder="Nombre de la clase" />
                <input v-model="clase.tematica" placeholder="Temática de la clase" />
                <input v-model="clase.fecha" type="date" placeholder="Fecha de la clase" />
                <input v-model="clase.hora" type="time" placeholder="Hora de la clase" />
                <input v-model="clase.zoomLink" placeholder="Link de Zoom" />
               
                <button type="button" @click="removeClass(index)" class="remove-class-button">Eliminar Clase</button>
              </div>
              <button type="button" @click="addClass" class="add-class-button">Agregar Clase</button>
              <button type="submit" class="submit-button">Actualizar Tutoría</button>
            </form>
          </div>
        </div>
      
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Confirmación</h2>
        <p>¿Estás seguro de que deseas continuar con la edición?</p>
        <button @click="confirmEdit" class="confirm-button">Sí</button>
        <button @click="cancelEdit" class="cancel-button">No</button>
      </div>
    </div>

    <!-- Modal de redirección -->
    <div v-if="showRedirectModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Edición Completa</h2>
        <p>La tutoría ha sido actualizada exitosamente.</p>
        <button @click="redirectToEdit" class="redirect-button">Ir al Inicio</button>
      </div>
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
const videoUrl = ref('');
const descripcion = ref('');
const driveLink = ref('');

const studentCount = ref(0);
const clases = ref<{ id?: string; nombre: string; tematica: string; fecha?: string; hora?: string; zoomLink?: string }[]>([]);


const showModal = ref(false);
const showRedirectModal = ref(false);

const profesores = ref<any[]>([]);
const profesoresSeleccionados = ref<string[]>([]);

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

const loadProfesores = async () => {
  try {
    const profesoresResponse = await client.models.Usuario.list({
      filter: { rol: { eq: "Profesor" } }
    });
    if (profesoresResponse && profesoresResponse.data) {
      profesores.value = profesoresResponse.data;
    } else {
      throw new Error('Error al obtener la lista de profesores.');
    }
  } catch (error) {
    console.error('Error al cargar profesores:', error);
  }
};

const selectTutoria = async (id: string | null) => {
  if (id === null) return; 
  selectedTutoriaId.value = id;
  await loadTutoriaData(id);
};

const loadTutoriaData = async (id: string) => {
  try {
    const tutoria = await client.models.Tutoria.get({ id });

    if (tutoria.data) {
      tutoriaName.value = tutoria.data.nombre;
      videoUrl.value = tutoria.data.videoUrl ?? '';
      descripcion.value = tutoria.data.descripcion ?? '';
      driveLink.value = tutoria.data.driveLink  ?? '';
      
      studentCount.value = tutoria.data.cantidadDeAlumnos;

      const clasesResponse = await client.models.Clase.list({
        filter: { tutoriaId: { eq: id } }
      });

      if (clasesResponse.data) {
        clases.value = clasesResponse.data.map((clase: any) => ({
          id: clase.id,
          nombre: clase.nombre,
          tematica: clase.tematica,
          fecha: clase.fecha,
          hora: clase.hora,
          zoomLink: clase.zoomLink,
          
        }));
      }
      // Cargar los profesores seleccionados del curso
      if (tutoria.data.profesores) {
        profesoresSeleccionados.value = tutoria.data.profesores.filter((profesor: string | null) => profesor !== null) as string[];
      }
    } else {
      throw new Error('Tutoría no encontrada');
    }
  } catch (error) {
    console.error('Error al cargar datos de la tutoría:', error);
  }
};

const addProfesor = () => {
  profesoresSeleccionados.value.push('');
};

const removeProfesor = (index: number) => {
  profesoresSeleccionados.value.splice(index, 1);
};

const addClass = () => {
  clases.value.push({ nombre: '', tematica: '', fecha: '', hora: '', zoomLink: '' });
};

const removeClass = (index: number) => {
  clases.value.splice(index, 1);
};

const updateTutoria = async () => {
  try {
    if (!selectedTutoriaId.value) return;

    // Actualizar la tutoría
    await client.models.Tutoria.update({
      id: selectedTutoriaId.value,
      nombre: tutoriaName.value,
      videoUrl: videoUrl.value,
      descripcion: descripcion.value,
      driveLink: driveLink.value,
      profesores: profesoresSeleccionados.value, // Actualizar la lista de profesores
      cantidadDeAlumnos: studentCount.value,
    });

    // Actualizar cada clase
    for (const clase of clases.value) {
      if (clase.id) {
        await client.models.Clase.update({
          id: clase.id,
          nombre: clase.nombre,
          tematica: clase.tematica,
          fecha: clase.fecha,
          hora: clase.hora,
          zoomLink: clase.zoomLink,
         
          tutoriaId: selectedTutoriaId.value,
        });
      } else {
        await client.models.Clase.create({
          nombre: clase.nombre,
          tematica: clase.tematica,
          fecha: clase.fecha,
          hora: clase.hora,
          zoomLink: clase.zoomLink,
          
          tutoriaId: selectedTutoriaId.value,
        });
      }
    }

     // Obtener los cursos comprados relacionados con este curso
     const tutoriasCompradasResponse = await client.models.TutoriaComprada.list({
      filter: { tutoriaId: { eq: selectedTutoriaId.value } },
    });

    if (tutoriasCompradasResponse.data) {
      // Eliminar los registros antiguos de CursoComprado
      //for (const tutoriaComprada of tutoriasCompradasResponse.data) {
      //  await client.models.TutoriaComprada.delete({ id: tutoriaComprada.id });
      //}

      // Eliminar SOLO los registros de CursoComprado de los profesores actuales
      for (const tutoriaComprada of tutoriasCompradasResponse.data) {
        const isProfesor = profesores.value.some(
          (profesor) => profesor.id === tutoriaComprada.usuarioId && profesoresSeleccionados.value.includes(profesor.nombre)
        );

        if (isProfesor) {
          await client.models.TutoriaComprada.delete({ id: tutoriaComprada.id });
        }
      }

      // Agregar todos los profesores seleccionados al modelo CursoComprado
      for (const profesorSeleccionado of profesoresSeleccionados.value) {
        const profesor = profesores.value.find(prof => prof.nombre === profesorSeleccionado);
        if (profesor) {
          await client.models.TutoriaComprada.create({
            usuarioId: profesor.id,
            tutoriaId: selectedTutoriaId.value,
            usuarioNombre: profesor.nombre,
            usuarioCorreo: profesor.correo,
          });
          console.log('Profesor agregado a CursosComprados:', profesor.nombre);
        }
      }
    }


    console.log('Tutoría y clases actualizadas');
    showRedirectModal.value = true;
  } catch (error) {
    console.error('Error al actualizar tutoría y clases:', error);
  }
};

const confirmEdit = () => {
  showModal.value = false;
  updateTutoria();
};

const cancelEdit = () => {
  showModal.value = false;
};

const redirectToEdit = () => {
  showRedirectModal.value = false;
  router.push('/plataforma-administrador');
};

onMounted(async () => {
  await loadTutorias();
  await loadProfesores();
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

.loading {
  text-align: center;
  font-size: 20px;
  color: #888;
}

.tutoria-item-container {
  margin-bottom: 20px;
}

.tutoria-item {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
}

.tutoria-item:hover {
  background-color: #f0f0f0;
}


.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"],
button[type="button"] {
  background-color: #7f1a6c;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: 10px;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  background-color: #e97b0d;
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
