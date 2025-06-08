<template>
   <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-crear-curso.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
      <form @submit.prevent="createCourse">
        <div class="form-group">
          <label for="course-name">Nombre del Curso</label>
          <input id="course-name" v-model="courseName" placeholder="Escribe aquí..." />
        </div>

        

          <div class="form-group">
            <label for="youtube-video-url">Link del Video Presentación</label>
            <input v-model="videoUrl" id="video-url" placeholder="Link del video de YouTube" />
        </div>

        <div class="form-group">
            <label for="driveLink">Link de Google Drive - General</label>
            <input id="driveLink" v-model=" driveLink" placeholder="Escribe aquí..." />
          </div>
          <div class="form-group">
            <label for="descripcion">Descripción</label>
            <input id="descripcion" v-model="descripcion" placeholder="Escribe aquí..." />
          </div>
          <div class="form-group">
            <label for="link-pago">Link de Pago - Mercado Pago</label>
            <input id="link-pago" v-model="linkPago" placeholder="Escribe aquí..." />
          </div>
         <!-- Profesores -->
        <div v-for="(profesorSeleccionado, index) in profesoresSeleccionados" :key="index" class="form-group">
          <label>Profesor {{ index + 1 }}</label>
          <select v-model="profesorSeleccionado.profesor" placeholder="Selecciona un profesor">
            <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.nombre">
              {{ profesor.nombre }}
            </option>
          </select>
          <button type="button" @click="removeProfesor(index)">Eliminar Profesor</button>
        </div>
        <button type="button" @click="addProfesor">Agregar Profesor</button>

        <div class="form-group">
          <label for="student-count">Cantidad de Alumnos</label>
          <input id="student-count" v-model.number="studentCount" placeholder="Escribe aquí..." type="number" />
        </div>
        
        <div v-for="(clase, index) in clases" :key="index" class="form-group">
          <label>Clase {{ index + 1 }}</label>
          <label for="clase-nombre">Nombre de la Clase</label>
          <input v-model="clase.nombre" id="clase-nombre" placeholder="Nombre de la clase" />

          <label for="clase-tematica">Temática de la Clase</label>
          <input v-model="clase.tematica" id="clase-tematica" placeholder="Temática de la clase" />

            <!-- Sección de Videos de YouTube -->
  <label>Videos de YouTube</label>
  <div class="video-links">
    <div v-for="(video, videoIndex) in clase.videos" :key="videoIndex" class="video-link-item">
      <input v-model="clase.videos[videoIndex].url" placeholder="Link del video de YouTube" />
      <input v-model="clase.videos[videoIndex].titulo" placeholder="Título del video" />
      <button type="button" @click="removeVideoLink(index, videoIndex)">Eliminar</button>
    </div>
    <button type="button" @click="addVideoLink(index)">Agregar Video</button>
  </div>

          <label for="drive-link-clase">Link de Google Drive - Clase</label>
          <input v-model="clase.driveLinkClase" id="drive-link-clase" placeholder="Link de Google Drive - Clase" />

          <label for="pdf-clase">Link de PDF - Clase</label>
          <input v-model="clase.pdfClase" id="pdf-clase" placeholder="Link de PDF - Clase" />

          <label for="imagenes">Links de las Imágenes y GIFs</label>
          <div class="image-links">
            <div v-for="(imageLink, imgIndex) in clase.imagenes" :key="imgIndex" class="image-link-item">
              <input v-model="clase.imagenes[imgIndex].url" placeholder="Link de la imagen" />
              <input v-model="clase.imagenes[imgIndex].titulo" placeholder="Título de la imagen" />
              <button   type="button" @click="removeImageLink(index, imgIndex)">Eliminar</button>
            </div>
            <button  type="button" @click="addImageLink(index)">Agregar Link de Imagen o GIF</button>
          </div>

          <label for="texto">Texto Adicional</label>
          <textarea v-model="clase.texto" id="texto" placeholder="Texto adicional" rows="3"></textarea>

          <button  type="button" @click="removeClass(index)">Eliminar Clase</button>
        </div>
        <button  type="button" @click="addClass">Agregar Clase</button>
        <button  type="submit">Crear Curso</button>
      </form>
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Curso Creado Exitosamente</h2>
        <p>El curso ha sido creado exitosamente.</p>
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

const courseName = ref('');
const videoUrl = ref('');
const descripcion = ref('');
const linkPago = ref('');
const driveLink = ref('');
const studentCount = ref(0);
const clases = ref([
  { index: 0, nombre: '', tematica: '',   videos: [{ url: '', titulo: '' }], driveLinkClase: '', pdfClase: '', imagenes: [{ url: '', titulo: '' }],  texto: '' },
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

const addVideoLink = (claseIndex: number) => {
  clases.value[claseIndex].videos.push({ url: '', titulo: '' });
};

const removeVideoLink = (claseIndex: number, videoIndex: number) => {
  clases.value[claseIndex].videos.splice(videoIndex, 1);
};

const addClass = () => {
  const newIndex = clases.value.length; // El índice es igual a la longitud actual del array
  clases.value.push({
    index: newIndex, // Asignar el índice correcto
    nombre: '',
    
    tematica: '',
    videos: [{ url: '', titulo: '' }], // Inicializar con un video vacío
    driveLinkClase: '',
    pdfClase: '',
    imagenes: [{ url: '', titulo: '' }],
    texto: '',
  });
};

const removeClass = (index: number) => {
  clases.value.splice(index, 1);
  // Reasignar los índices de las clases restantes
  clases.value.forEach((clase, i) => (clase.index = i));
};

const addImageLink = (claseIndex: number) => {
  clases.value[claseIndex].imagenes.push({ url: '', titulo: '' });
};

const removeImageLink = (claseIndex: number, imageIndex: number) => {
  clases.value[claseIndex].imagenes.splice(imageIndex, 1);
};

const createCourse = async () => {
  try {
    
    // Crear el curso
    const nuevoCurso = await client.models.Curso.create({
      nombre: courseName.value,
      videoUrl: videoUrl.value,
      descripcion: descripcion.value,
      linkPago: linkPago.value,
      driveLink: driveLink.value,
      profesores: profesoresSeleccionados.value.map((p) => p.profesor), // Enviamos el ID del profesor
      cantidadDeAlumnos: studentCount.value,
    });

    if (nuevoCurso.data) {
      const cursoId = nuevoCurso.data.id;

      // Crear las clases asociadas al curso
      for (const clase of clases.value) {
        await client.models.Clase.create({
          index: clase.index, // Asegurar que el índice se envíe correctamente
          nombre: clase.nombre,
          tematica: clase.tematica,
          cursoId: cursoId,
          youtubeVideoUrl: JSON.stringify(clase.videos), // Guardamos todos los videos como JSON
          driveLinkClase: clase.driveLinkClase,
          pdfClase: clase.pdfClase,
          imagenes: JSON.stringify(clase.imagenes),
          texto: clase.texto,
        });
      }

        // Agregar todos los profesores seleccionados al modelo CursoComprado
      for (const profesorSeleccionado of profesoresSeleccionados.value) {
        const profesor = profesores.value.find(prof => prof.nombre === profesorSeleccionado.profesor);
        if (profesor) {
          await client.models.CursoComprado.create({
            usuarioId: profesor.id,
            cursoId:  cursoId,
            usuarioNombre: profesor.nombre,
            usuarioCorreo: profesor.correo,
          });
          console.log('Profesor agregado a CursosComprados:', profesor.nombre);
        }
      }

      showConfirmationModal.value = true;
    }
  } catch (error) {
    console.error('Error al crear la especialización:', error);
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

.content h1 {
  font-size: 28px;
  margin-bottom: 20px;
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.form-group button {
  margin-top: 10px;
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

button[type="submit"],
button[type="button"] {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #7f1a6c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover,
button[type="button"]:hover {
  background-color: #e97b0d;
}
</style>
