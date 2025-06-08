<template>
  <div class="container">
    <A_Sidebar />
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-editar-curso.png" alt="Logo ENSEA" class="logo-plataforma" />
      </div>
      <br />
      <br />

      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div v-for="curso in cursos" :key="curso.id">
          <div class="course-item" @click="selectCourse(curso.id)">
            <h3>{{ curso.nombre }}</h3>
            <p>Profesores: {{ curso.profesores }}</p>
            <p>Alumnos: {{ curso.cantidadDeAlumnos }}</p>
          </div>
          <!-- Opciones de edición desplegadas debajo del curso seleccionado -->
          <div v-if="selectedCourseId === curso.id">
            <h2>Editar Curso</h2>
            <form @submit.prevent="showModal = true">
              <div class="form-group">
                <label for="course-name">Nombre curso</label>
                <input id="course-name" v-model="courseName" placeholder="Escribe aquí..." />
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
              <div class="form-group">
            <label for="link-pago">Link de Pago - Mercado Pago</label>
            <input id="link-pago" v-model="linkPago" placeholder="Escribe aquí..." />
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
                <label for="student-count">Cantidad de alumnos</label>
                <input id="student-count" v-model.number="studentCount" placeholder="Escribe aquí..." type="number" />
              </div>

              <div v-for="(clase, classIndex) in clases" :key="classIndex" class="form-group">
                <label>Clase {{ classIndex + 1 }}</label>
                <label for="clase-nombre">Nombre de la Clase</label>
                <input v-model="clase.nombre" placeholder="Nombre de la clase" />
                <label for="clase-tematica">Temática de la Clase</label>
                <input v-model="clase.tematica" placeholder="Temática de la clase" />
                    <!-- Videos de YouTube (ahora con estructura similar a imágenes) -->
                    <label>Videos de YouTube</label>
                <div v-for="(video, videoIndex) in clase.videos" :key="videoIndex" class="form-group">
                  <label>Video {{ videoIndex + 1 }}</label>
                  <input
                    v-model="clase.videos[videoIndex].titulo"
                    placeholder="Título del video"
                    class="video-title-input"
                  />
                  <input
                    v-model="clase.videos[videoIndex].url"
                    placeholder="URL del video de YouTube"
                    class="video-url-input"
                  />
                  <button type="button" @click="removeVideo(classIndex, videoIndex)">Eliminar Video</button>
                </div>
                <button type="button" @click="addVideo(classIndex)">Agregar Video</button>
                <label for="drive-link-clase">Link de Google Drive - Clase</label>
                <input v-model="clase.driveLinkClase" placeholder="URL de Google Drive - Clase" />
                <label for="pdf-clase">Link de PDF - Clase</label>
                <input v-model="clase.pdfClase" placeholder="URL de PDF - Clase" />

                <div v-for="(imagen, imageIndex) in clase.imagenes" :key="imageIndex" class="form-group">
  <label>Imagen {{ imageIndex + 1 }}</label>
  <input
    v-model="clase.imagenes[imageIndex].titulo"
    placeholder="Título de la imagen"
    class="image-title-input"
  />
  <input
    v-model="clase.imagenes[imageIndex].url"
    placeholder="URL de la imagen"
    class="image-url-input"
  />
  <button type="button" @click="removeImagen(classIndex, imageIndex)">Eliminar Imagen</button>
</div>
<button type="button" @click="addImagen(classIndex)">Agregar Imagen</button>



                <label for="texto">Texto Adicional</label>
                <textarea v-model="clase.texto" placeholder="Texto adicional"></textarea>
                <button type="button" @click="removeClass(classIndex)">Eliminar Clase</button>
              </div>
              <button type="button" @click="addClass">Agregar Clase</button>
              <button type="submit">Actualizar Curso</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Modal de confirmación -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Confirmación</h2>
          <p>¿Estás seguro de que deseas continuar con la edición?</p>
          <button @click="confirmEdit">Sí</button>
          <button @click="cancelEdit">No</button>
        </div>
      </div>

      <!-- Modal de redirección -->
      <div v-if="showRedirectModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Edición Completa</h2>
          <p>El curso ha sido actualizado exitosamente.</p>
          <button @click="redirectToEdit">Ir al Inicio</button>
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

// Configurar el cliente de Amplify
const client = generateClient<Schema>();
const router = useRouter();

const cursos = ref<any[]>([]);
const loading = ref(true);
const selectedCourseId = ref<string | null>(null);

const courseName = ref('');
const videoUrl = ref('');
const descripcion = ref('');
const linkPago = ref('');
const driveLink = ref('');
const studentCount = ref(0);
const clases = ref<
  { id?: string; nombre: string; tematica: string; driveLinkClase?: string; pdfClase?: string; videos: { titulo: string; url: string }[];  imagenes: { titulo: string; url: string }[]; texto?: string;  index: number; }[]
>([]);

const showModal = ref(false);
const showRedirectModal = ref(false);

const profesores = ref<any[]>([]);
const profesoresSeleccionados = ref<string[]>([]);

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

const loadProfesores = async () => {
  try {
    const profesoresResponse = await client.models.Usuario.list({
      filter: { rol: { eq: 'Profesor' } },
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

const selectCourse = async (id: string | null) => {
  if (id === null) return; // Evita usar `null` como parámetro
  selectedCourseId.value = id;
  await loadCourseData(id);
};

const loadCourseData = async (id: string) => {
  try {
    const curso = await client.models.Curso.get({ id });

    if (curso.data) {
      courseName.value = curso.data.nombre;
      videoUrl.value = curso.data.videoUrl ?? '';
      descripcion.value = curso.data.descripcion ?? '';
      driveLink.value = curso.data.driveLink ?? '';
      linkPago.value = curso.data.linkPago ?? '';
      studentCount.value = curso.data.cantidadDeAlumnos;

      const clasesResponse = await client.models.Clase.list({
        filter: { cursoId: { eq: id } },
      });

      if (clasesResponse.data) {
        clases.value = clasesResponse.data.map((clase: any) => ({
          id: clase.id,
          nombre: clase.nombre,
          tematica: clase.tematica,
          videos: clase.youtubeVideoUrl ? JSON.parse(clase.youtubeVideoUrl) : [{ titulo: '', url: '' }],
          driveLinkClase: clase.driveLinkClase,
          pdfClase: clase.pdfClase,
          imagenes: clase.imagenes ? JSON.parse(clase.imagenes) : [],
          texto: clase.texto,
          index: clase.index ?? Number.MAX_SAFE_INTEGER, // Usar un valor por defecto si no tiene índice
          }))
          .sort((a: any, b: any) => a.index - b.index); // Orden ascendente
      }

      // Cargar los profesores seleccionados del curso
      if (curso.data.profesores) {
        profesoresSeleccionados.value = curso.data.profesores.filter(
          (profesor: string | null) => profesor !== null,
        ) as string[];
      }
    } else {
      throw new Error('Curso no encontrado');
    }
  } catch (error) {
    console.error('Error al cargar datos del curso:', error);
  }
};

const addProfesor = () => {
  profesoresSeleccionados.value.push('');
};

const removeProfesor = (index: number) => {
  profesoresSeleccionados.value.splice(index, 1);
};

const addClass = () => {
  const newIndex = clases.value.length; // El índice es igual a la longitud actual del array
  clases.value.push({
    nombre: '',
    tematica: '',
    videos: [{ titulo: '', url: '' }],
    driveLinkClase: '',
    pdfClase: '',
    imagenes: [],
    texto: '',
    index: newIndex, // Asignar el índice correcto
  });
};

const removeClass = (index: number) => {
  if (index >= 0 && index < clases.value.length) {
    clases.value.splice(index, 1);
    // Reasignar los índices de las clases restantes
    clases.value.forEach((clase, i) => (clase.index = i));
  }
};

const addVideo = (classIndex: number) => {
  clases.value[classIndex].videos.push({ titulo: '', url: '' });
};

const removeVideo = (classIndex: number, videoIndex: number) => {
  clases.value[classIndex].videos.splice(videoIndex, 1);
};

const addImagen = (classIndex: number) => {
  clases.value[classIndex].imagenes.push({ titulo: '', url: '' });
};

const removeImagen = (classIndex: number, imageIndex: number) => {
  clases.value[classIndex].imagenes.splice(imageIndex, 1);
};



const updateCourse = async () => {
  try {
    if (!selectedCourseId.value) return;

    // Obtener las clases actuales del curso desde la base de datos
    const clasesResponse = await client.models.Clase.list({
      filter: { cursoId: { eq: selectedCourseId.value } },
    });

    // Identificar las clases que ya no están en el array `clases.value`
    const clasesAEliminar = clasesResponse.data.filter(
      (claseDb) => !clases.value.some((clase) => clase.id === claseDb.id)
    );

    // Eliminar las clases que ya no están en el array `clases.value`
    for (const clase of clasesAEliminar) {
      await client.models.Clase.delete({ id: clase.id });
      console.log('Clase eliminada:', clase.id);
    }

    // Actualizar el curso
    await client.models.Curso.update({
      id: selectedCourseId.value,
      nombre: courseName.value,
      videoUrl: videoUrl.value,
      descripcion: descripcion.value,
      linkPago: linkPago.value,
      driveLink: driveLink.value,
      profesores: profesoresSeleccionados.value,
      cantidadDeAlumnos: studentCount.value,
    });

    // Actualizar o crear las clases restantes
    for (const clase of clases.value) {
      if (clase.id) {
        // Si la clase ya tiene un ID, actualízala
        await client.models.Clase.update({
          id: clase.id,
          nombre: clase.nombre,
          tematica: clase.tematica,
          youtubeVideoUrl: JSON.stringify(clase.videos),
          driveLinkClase: clase.driveLinkClase,
          pdfClase: clase.pdfClase,
          imagenes: JSON.stringify(clase.imagenes),
          texto: clase.texto,
          index: clase.index,
          cursoId: selectedCourseId.value,
        });
      } else {
        // Si la clase no tiene un ID, créala
        await client.models.Clase.create({
          nombre: clase.nombre,
          tematica: clase.tematica,
          youtubeVideoUrl: JSON.stringify(clase.videos),
          driveLinkClase: clase.driveLinkClase,
          pdfClase: clase.pdfClase,
          imagenes: JSON.stringify(clase.imagenes),
          texto: clase.texto,
          index: clase.index,
          cursoId: selectedCourseId.value,
        });
      }
    }

    // Mostrar modal de redirección
    showModal.value = false;
    showRedirectModal.value = true;
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
  }
};
const confirmEdit = () => {
  updateCourse();
};

const cancelEdit = () => {
  showModal.value = false; // Ocultar el modal de confirmación
};

const redirectToEdit = () => {
  router.push('/plataforma-administrador'); // Redirigir al usuario a la página de edición
};

onMounted(() => {
  loadCourses();
  loadProfesores();
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

.main-content {
  margin-left: 320px;
  padding: 20px;
  width: 100%;
}

.course-item {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
}

.course-item:hover {
  background-color: #f0f0f0;
}

.course-item h3 {
  margin: 0;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-group textarea {
  resize: vertical;
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


.loading {
  text-align: center;
  font-size: 18px;
  padding: 20px;
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