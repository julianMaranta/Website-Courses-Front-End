<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-crear-tutoria.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br> 
      <form @submit.prevent="createTutoria">
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
          <input id="driveLink" v-model="driveLink" placeholder="Escribe aquí..." />
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción</label>
          <input id="descripcion" v-model="descripcion" placeholder="Escribe aquí..." />
        </div>

         <!-- Profesores -->
         <div v-for="(profesorSeleccionado, index) in profesoresSeleccionados" :key="index" class="form-group">
          <label>Profesor {{ index + 1 }}</label>
          <select v-model="profesorSeleccionado.profesor" placeholder="Selecciona un profesor">
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
          <input v-model="clase.fecha" type="date" />
          <input v-model="clase.hora" type="time" />
          <input v-model="clase.zoomLink" placeholder="Link de la sesión de Zoom" />
          <button type="button" @click="removeClass(index)">Eliminar Clase</button>
        </div>

        <button type="button" @click="addClass">Agregar Clase</button>
        <button type="submit">Crear Tutoría</button>
      </form>
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Tutoría Creada Exitosamente</h2>
        <p>La tutoría ha sido creada exitosamente.</p>
        <button @click="redirectToAdminCreate">Ir al Inicio</button>
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

const tutoriaName = ref('');
const videoUrl = ref('');
const descripcion = ref('');
const driveLink = ref('');
const studentCount = ref(0);
const clases = ref([
  { index: 0, nombre: '', tematica: '', fecha: '', hora: '', zoomLink: '' },
]);

const showConfirmationModal = ref(false);

const profesores = ref<any[]>([]);
const profesoresSeleccionados = ref([{ profesor: '' }]);

onMounted(async () => {
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
});

const addProfesor = () => {
  profesoresSeleccionados.value.push({ profesor: '' });
};

const removeProfesor = (index: number) => {
  profesoresSeleccionados.value.splice(index, 1);
};

const addClass = () => {
  const newIndex = clases.value.length; 
  clases.value.push({
    index: newIndex,
    nombre: '',
    
    tematica: '',
    fecha: '',
    hora: '',
    zoomLink: '',
  });
};

const removeClass = (index: number) => {
  clases.value.splice(index, 1);
  // Reasignar los índices de las clases restantes
  clases.value.forEach((clase, i) => (clase.index = i));
};

const createTutoria = async () => {
  try {
    
    // Crear la tutoría
    const nuevaTutoria = await client.models.Tutoria.create({
      nombre: tutoriaName.value,
      videoUrl: videoUrl.value,
      descripcion: descripcion.value,
      driveLink: driveLink.value,
      profesores: profesoresSeleccionados.value.map((p) => p.profesor), // Asignar los profesores seleccionados
      cantidadDeAlumnos: studentCount.value,
    });

    if (nuevaTutoria.data) {
      const tutoriaId = nuevaTutoria.data.id;

      // Crear clases
      for (const clase of clases.value) {
        await client.models.Clase.create({
          index: clase.index,
          nombre: clase.nombre,
          tematica: clase.tematica,
          tutoriaId: tutoriaId,
          fecha: clase.fecha,
          hora: clase.hora,
          zoomLink: clase.zoomLink,
        });
      }

    // Agregar todos los profesores seleccionados al modelo CursoComprado
    for (const profesorSeleccionado of profesoresSeleccionados.value) {
        const profesor = profesores.value.find(prof => prof.nombre === profesorSeleccionado.profesor);
        if (profesor) {
          await client.models.TutoriaComprada.create({
            usuarioId: profesor.id,
            tutoriaId: tutoriaId,
            usuarioNombre: profesor.nombre,
            usuarioCorreo: profesor.correo,
          });
          console.log('Profesor agregado a CursosComprados:', profesor.nombre);
        }
      }

      console.log('Tutoría y clases creadas:', nuevaTutoria);
      showConfirmationModal.value = true;
    } else {
      throw new Error('Error al crear la tutoría, el objeto data es nulo.');
    }
  } catch (error: any) {
    console.error('Error al crear tutoría y clases:', error);
    alert(error.message);
  }
};

const redirectToAdminCreate = () => {
  showConfirmationModal.value = false;
  router.push('/plataforma-administrador');
};
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
  width: 300px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
}

.logo-container {
  text-align: left; 
  margin-bottom: 5px;
  width: 160px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 18px;
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    padding: 10px;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
  }
  
  button[type='submit'] {
    background-color: #7f1a6c;
    color: white;
    border: none;
    padding: 15px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 10px;
    margin-top: 20px;
  }
  
  button[type='submit']:hover {
    background-color: #e97b0d;
    color: rgb(0, 0, 0);
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

  button[type='button'] {
  background-color: #7f1a6c;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 10px;
  width: 200px; /* Establece un ancho fijo para los botones */
  text-align: center; /* Asegura que el texto esté centrado */
}

button[type='button']:hover {
  background-color: #e97b0d;
  color: rgb(0, 0, 0);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaciado entre los botones */
  margin-top: 10px;
}


  </style>
  