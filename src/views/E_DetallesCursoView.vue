<template>
  <div class="container">
    <E_Sidebar />
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-producto.png" alt="Logo ENSEA" class="logo-plataforma" />
      </div>
      <br>
      <br>
      <h1>DETALLES DEL {{ entityType }} - {{ entityData.nombre }}</h1>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else class="course-info">
        <!-- Contenedor flexible para información y video -->
        <div class="info-video-container">
          <!-- Sección de información de texto -->
          <div class="text-info">
            <div class="logo-container-producto">
              <img src="@/assets/detalle-alumnos.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
            </div>
            <p>{{ entityData.cantidadDeAlumnos }}</p>
            <div class="logo-container-producto">
              <img src="@/assets/detalle-profesores.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
            </div>
            <p v-if="entityData.profesores && entityData.profesores.length > 0">
              <ul>
                <li v-for="(profesor, index) in entityData.profesores" :key="index">{{ profesor }}</li>
              </ul>
            </p>
            <div class="logo-container-producto">
              <img src="@/assets/detalle-producto.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
            </div>
            <p>{{ entityData.descripcion }}</p>
            <div class="logo-container-producto">
              <img src="@/assets/detalle-clases.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
            </div>
            <ul>
              <li v-for="clase in entityData.clases" :key="clase.id">
                {{ clase.nombre }} - {{ clase.tematica }}
              </li>
            </ul>
          </div>

          <!-- Sección de video -->
          <div class="video-section" v-if="entityData.videoUrl">
            <h2>Video del Curso</h2>
            <iframe :src="getEmbedUrl(entityData.videoUrl)" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import E_Sidebar from '../components/E_Sidebar.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { userId } from '../authenticator/auth';

const client = generateClient<Schema>();
const route = useRoute();
const router = useRouter();

const entityType = ref<string>('curso'); // Por defecto, pero cambiará según la ruta
const entityData = ref<any>(null);
const loading = ref(true);


const loadEntityDetails = async () => {
  let entityId = route.params.id;

  if (Array.isArray(entityId)) {
    entityId = entityId[0];
  }

  try {
    let response: any;

    // Determina el tipo de entidad según la ruta
    if (route.path.includes('especializacion')) {
      entityType.value = 'especializacion';
      response = await client.models.Especializacion.get({ id: entityId });
    } else if (route.path.includes('tutoria')) {
      entityType.value = 'tutoria';
      response = await client.models.Tutoria.get({ id: entityId });
    } else {
      entityType.value = 'curso';
      response = await client.models.Curso.get({ id: entityId });
    }

    if (response.data) {
      entityData.value = {
        ...response.data,
        clases: []
      };

      const classesResponse = await client.models.Clase.list({
        filter: { [`${entityType.value}Id`]: { eq: entityId } }
      });

      if (classesResponse.data) {
        entityData.value.clases = classesResponse.data.sort((a, b) => {
    if (a.index === null || b.index === null) {
      return 0; // O cualquier otra lógica que desees aplicar si `index` es `null`
    }
    return a.index - b.index;
  });
      }
    }
  } catch (error) {
    console.error(`Error al cargar detalles de la ${entityType.value}:`, error);
  } finally {
    loading.value = false;
  }
};

const comprar = async (entityId: string) => {
  if (!userId.value) return;
  try {
     // Crear el objeto de usuario con su id
     const usuario = { id: userId.value };

// Obtener información del usuario
const usuarioData = await client.models.Usuario.get(usuario);
if (!usuarioData.data) throw new Error('Usuario no encontrado');

const nombreUsuario = usuarioData.data.nombre;
const correoUsuario = usuarioData.data.correo;
    await client.models.CursoComprado.create({
      usuarioId: userId.value,
      cursoId: entityId,
      usuarioNombre: nombreUsuario, // Agregar nombre del usuario
      usuarioCorreo: correoUsuario, // Agregar correo del usuario
    });
    console.log(`Curso comprado: ${entityId}`);
  } catch (error) {
    console.error('Error al comprar curso:', error);
  }
};

// Function to convert YouTube URL to embed URL
const getEmbedUrl = (youtubeUrl: string): string => {
  let videoId = '';

  if (youtubeUrl.includes('youtube.com')) {
    const urlParams = new URLSearchParams(youtubeUrl.split('?')[1]);
    videoId = urlParams.get('v') || '';
  } else if (youtubeUrl.includes('youtu.be')) {
    videoId = youtubeUrl.split('youtu.be/')[1];
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

onMounted(() => {
  loadEntityDetails();
});
</script>

<style scoped>
 body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  height: 100%;
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

.logo-plataforma-producto {
  min-width: 280px;
  padding: 10px;
  min-height: 40px;
}

.logo-container-producto {
  text-align: left; /* Ubica el logo a la izquierda */
  margin-bottom: 5px; /* Espacio entre el logo y el contenido */
}

h1 {
  font-size: 24px;
}

ul, li, p{
  font-size: 24px;
  color: #000000;
}


.loading {
  text-align: center;
  font-size: 18px;
  color: #555;
}

.course-info h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.course-info p {
  margin: 10px 0;
  font-size: 20px;
}

.course-info button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 20px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.3s;
}

.course-info button:hover {
  background-color: #e97b0d;
  color: white;
  transform: scale(1.1);
}

/* Botón Comprar */
.comprar-button {
  background-image: url('@/assets/background-boton-comprar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 40px;
  width: 120px;
  border: none;
  border-radius: 15px;
  transition: transform 0.3s;
}

.comprar-button:hover {
  transform: scale(1.1);
}

/* Contenedor flexible para información y video */
/* Contenedor flexible para información y video */
.info-video-container {
  display: flex;
  gap: 0; /* Ajusta este valor según lo que necesites */
  align-items: flex-start; /* Alinear al inicio */
}

/* Sección de información de texto */
.text-info {
  flex: 1; /* Ocupa el espacio disponible */
  padding-right: 10px; /* Ajusta este valor según lo que necesites */
}

/* Sección de video */
.video-section {
  flex: 1; /* Ocupa el espacio disponible */
  max-width: 600px; /* Ancho máximo del video */
  padding-left: 10px; /* Ajusta este valor según lo que necesites */
}

.video-section iframe {
  width: 100%;
  height: 300px;
  border-radius: 10px;
}
</style>
