<template>
    <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-editar-especializacion.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
      
        
        <div v-if="loading" class="loading">Cargando...</div>
        <div v-else>
          <div v-for="especializacion in especializaciones" :key="especializacion.id">
            <div class="course-item" @click="selectEspecializacion(especializacion.id)">
              <h3>{{ especializacion.nombre }}</h3>
              <p>Profesor: {{ especializacion.profesor }}</p>
              <p>Ayudante: {{ especializacion.ayudante }}</p>
              <p>Alumnos: {{ especializacion.cantidadDeAlumnos }}</p>
            </div>
            <!-- Opciones de edición desplegadas debajo de la especialización seleccionada 2 -->
            <div v-if="selectedEspecializacionId === especializacion.id" >
              <h2>Editar Especialización</h2>
              <form @submit.prevent="showModal = true">
                <div class="form-group">
                  <label for="especializacion-name">Nombre especialización</label>
                  <input id="especializacion-name" v-model="especializacionName" placeholder="Escribe aquí..." />
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
          <div class="form-group">
            <label for="especializacion-imagen">Link de la Imagen de la Especialización</label>
            <input id="especializacion-imagen" v-model="especializacionImagen" placeholder="Escribe aquí..." />
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
                <div v-for="(clase, index) in clases" :key="index" class="form-group">
                  <label>Clase {{ index + 1 }}</label>
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
                  <button type="button" @click="removeVideo(index, videoIndex)">Eliminar Video</button>
                </div>
                <button type="button" @click="addVideo(index)">Agregar Video</button>
                  <label for="drive-link-clase">Link de Google Drive - Clase</label>
                  <input v-model="clase.driveLinkClase" placeholder="URL de Google Drive - Clase" />
                  <label for="pdf-clase">Link de PDF - Clase</label>
                  <input v-model="clase.pdfClase" placeholder="URL de PDF - Clase" />
                 <!-- Manejo de imágenes -->
<label>Imágenes</label>
<div v-for="(imagen, imageIndex) in clase.imagenes" :key="imageIndex" class="form-group">
  <label>Imagen {{ imageIndex + 1 }}</label>
  <input 
    v-model="clase.imagenes[imageIndex].url" 
    placeholder="URL de la imagen" 
  />
  <input
    v-model="clase.imagenes[imageIndex].descripcion"
    placeholder="Descripción de la imagen"
  />
  <button type="button" @click="removeImagen(index, imageIndex)">Eliminar Imagen</button>
</div>
<button type="button" @click="addImagen(index)">Agregar Imagen</button>

                  <label for="texto">Texto Adicional</label>
                  <textarea v-model="clase.texto" placeholder="Texto adicional"></textarea>
                  <button type="button" @click="removeClass(index)">Eliminar Clase</button>
                </div>
                <button type="button" @click="addClass">Agregar Clase</button>
                <button type="submit">Actualizar Especialización</button>
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
          <p>La especialización ha sido actualizada exitosamente.</p>
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
  
  
  const especializaciones = ref<any[]>([]);
  const loading = ref(true);
  const selectedEspecializacionId = ref<string | null>(null);
  const linkPago = ref('');
  const especializacionName = ref('');
  const videoUrl = ref('');
  const especializacionImagen = ref('');
  const descripcion = ref('');
  const driveLink = ref('');
 
  const studentCount = ref(0);
  const clases = ref<
  { id?: string; nombre: string; tematica: string; videos: { titulo: string; url: string }[]; driveLinkClase?: string; pdfClase?: string; imagenes: { url: string; descripcion?: string }[]; texto?: string }[]
>([]);
  

  const showModal = ref(false);
  const showRedirectModal = ref(false);

  const profesores = ref<any[]>([]);
const profesoresSeleccionados = ref<string[]>([]);
  
  const loadEspecializaciones = async () => {
    try {
      const response = await client.models.Especializacion.list();
      if (response.data) {
        especializaciones.value = response.data;
      }
    } catch (error) {
      console.error('Error al cargar especializaciones:', error);
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

  const selectEspecializacion = async (id: string | null) => {
    if (id === null) return; // Evita usar `null` como parámetro
    selectedEspecializacionId.value = id;
    await loadEspecializacionData(id);
  };
  
  const loadEspecializacionData = async (id: string) => {
    try {
      const especializacion = await client.models.Especializacion.get({ id });
  
      if (especializacion.data) {
        especializacionName.value = especializacion.data.nombre;
        videoUrl.value = especializacion.data.videoUrl ?? '';
        descripcion.value = especializacion.data.descripcion ?? '';
        driveLink.value = especializacion.data.driveLink  ?? '';
        linkPago.value = especializacion.data.linkPago ?? '';
        especializacionImagen.value = especializacion.data.imagen ?? '';
        studentCount.value = especializacion.data.cantidadDeAlumnos;
  
        const clasesResponse = await client.models.Clase.list({
          filter: { especializacionId: { eq: id } }
        });
  
        if (clasesResponse.data) {
      clases.value = clasesResponse.data.map((clase: any) => ({
        id: clase.id,
        nombre: clase.nombre,
        tematica: clase.tematica,
        videos: clase.youtubeVideoUrl ? JSON.parse(clase.youtubeVideoUrl) : [{ titulo: '', url: '' }],
        driveLinkClase: clase.driveLinkClase,
        pdfClase: clase.pdfClase,
        imagenes: clase.imagenes ? 
          JSON.parse(clase.imagenes).map((img: string | { url: string, descripcion?: string }) => 
            typeof img === 'string' ? { url: img, descripcion: '' } : img
          ) : [],
        texto: clase.texto,
      }));
    }
        // Cargar los profesores seleccionados del curso
      if (especializacion.data.profesores) {
        profesoresSeleccionados.value = especializacion.data.profesores.filter((profesor: string | null) => profesor !== null) as string[];
      }
      } else {
        throw new Error('Especialización no encontrada');
      }
    } catch (error) {
      console.error('Error al cargar datos de la especialización:', error);
    }
  };

  const addProfesor = () => {
  profesoresSeleccionados.value.push('');
};

const removeProfesor = (index: number) => {
  profesoresSeleccionados.value.splice(index, 1);
};
  
  const addClass = () => {
    clases.value.push({ nombre: '', tematica: '', videos: [{ titulo: '', url: '' }], imagenes: [], texto: '' });
  };
  
  const removeClass = (index: number) => {
    clases.value.splice(index, 1);
  };
  
  const addImagen = (index: number) => {
  clases.value[index].imagenes.push({ url: '', descripcion: '' }); // Agregar un nuevo objeto de imagen
};

const removeImagen = (index: number, imageIndex: number) => {
  clases.value[index].imagenes.splice(imageIndex, 1);
};


const addVideo = (classIndex: number) => {
  clases.value[classIndex].videos.push({ titulo: '', url: '' });
};

const removeVideo = (classIndex: number, videoIndex: number) => {
  clases.value[classIndex].videos.splice(videoIndex, 1);
};

  const updateEspecializacion = async () => {
    try {
      if (!selectedEspecializacionId.value) return;
  
      // Actualizar la especialización
      await client.models.Especializacion.update({
        id: selectedEspecializacionId.value,
        nombre: especializacionName.value,
        videoUrl: videoUrl.value,
        descripcion: descripcion.value,
        imagen: especializacionImagen.value,
        linkPago: linkPago.value,
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
            youtubeVideoUrl: JSON.stringify(clase.videos),
            driveLinkClase: clase.driveLinkClase,
          pdfClase: clase.pdfClase,
          imagenes: JSON.stringify(clase.imagenes), // Ahora guardamos el objeto completo
            texto: clase.texto,
            
            especializacionId: selectedEspecializacionId.value,
          });
        } else {
          await client.models.Clase.create({
            nombre: clase.nombre,
            tematica: clase.tematica,
            youtubeVideoUrl: JSON.stringify(clase.videos),
            driveLinkClase: clase.driveLinkClase,
          pdfClase: clase.pdfClase,
          imagenes: JSON.stringify(clase.imagenes), // Ahora guardamos el objeto completo
            texto: clase.texto,
            
            especializacionId: selectedEspecializacionId.value,
          });
        }
      }

      // Obtener los cursos comprados relacionados con este curso
    const especializacionesCompradasResponse = await client.models.EspecializacionComprada.list({
      filter: { especializacionId: { eq: selectedEspecializacionId.value } },
    });

    if (especializacionesCompradasResponse.data) {
      // Eliminar los registros antiguos de CursoComprado
      //for (const especializacionComprada of especializacionesCompradasResponse.data) {
      //  await client.models.EspecializacionComprada.delete({ id: especializacionComprada.id });
      //}

      // Eliminar SOLO los registros de CursoComprado de los profesores actuales
      for (const especializacionComprada of especializacionesCompradasResponse.data) {
        const isProfesor = profesores.value.some(
          (profesor) => profesor.id === especializacionComprada.usuarioId && profesoresSeleccionados.value.includes(profesor.nombre)
        );

        if (isProfesor) {
          await client.models.EspecializacionComprada.delete({ id: especializacionComprada.id });
        }
      }

      // Agregar todos los profesores seleccionados al modelo CursoComprado
      for (const profesorSeleccionado of profesoresSeleccionados.value) {
        const profesor = profesores.value.find(prof => prof.nombre === profesorSeleccionado);
        if (profesor) {
          await client.models.EspecializacionComprada.create({
            usuarioId: profesor.id,
            especializacionId: selectedEspecializacionId.value,
            usuarioNombre: profesor.nombre,
            usuarioCorreo: profesor.correo,
          });
          console.log('Profesor agregado a CursosComprados:', profesor.nombre);
        }
      }
    }

  
      console.log('Especialización y clases actualizadas');
      showRedirectModal.value = true;
    } catch (error) {
      console.error('Error al actualizar especialización y clases:', error);
    }
  };
  
  const confirmEdit = () => {
    showModal.value = false;
    updateEspecializacion();
  };
  
  const cancelEdit = () => {
    showModal.value = false;
  };
  
  const redirectToEdit = () => {
    showRedirectModal.value = false;
    router.push('/plataforma-administrador');
  };
  
  onMounted(async () => {
  await loadEspecializaciones();
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
  