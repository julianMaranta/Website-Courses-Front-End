<template>
  <div v-if="clase">
    <div class="container">
      <E_Sidebar/>
      <div class="content">
        <div class="logo-container">
        <img src="@/assets/logo-clase.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
     <br>
     <br>
    <h1>{{ clase.nombre }} - {{ clase.tematica }}</h1>
    
    
     

    <div v-if="entityType === 'tutoria'">
      <!-- Si es una tutoría, muestra el link de Zoom -->
      <div class="zoom-section" v-if="clase.zoomLink">
        <h3>Enlace de Zoom:</h3>
        <a :href="clase.zoomLink" target="_blank">{{ clase.zoomLink }}</a>
      </div>
    </div>

    <div v-else>
      <!-- Si no es una tutoría, muestra el contenido multimedia -->
      
      <div class="video-section" v-if="videosArray.length > 0">
        <div class="videos-container">
    <div v-for="(video, index) in videosArray" :key="index" class="video-item">
      <iframe 
        :src="getEmbedUrl(video.url)" 
        frameborder="0" 
        allowfullscreen
        class="video-iframe"
      ></iframe>
      <p class="video-title">{{ video.titulo }}</p>
    </div>
  </div>
       <!-- Contenedor flexbox para los botones -->
       <h1>Recursos:</h1>
  <div class="button-container">
    <button @click="goToSeapp" id="seapp-button">
      <img src="@/assets/background-button-play.png" alt="Botón Vimeo" />
    </button>
    <button @click="goToDrive" id="gmail-button">
      <img src="@/assets/Boton Drive 2.png" alt="Botón Drive" />
    </button>
    <button @click="goToPDF" id="gmail-button">
      <img src="@/assets/background-button-pdf.png" alt="Botón Drive" />
    </button>
  </div>
      </div>

     

     

      <div class="images-section" v-if="imagenesArray.length > 0">
  <h1>Imágenes y GIFs:</h1>
  <div v-for="(imagen, index) in imagenesArray" :key="index" class="image-container">
    <!-- Renderizar la imagen -->
    <img
      :src="imagen.url"
      :alt="imagen.titulo"
      @click="viewFullscreen(imagen.url)"
    />
    <!-- Mostrar el título -->
    <p>{{ imagen.titulo }}</p>
  </div>
</div>

      <div class="text-section" v-if="clase.texto">
        <h1>Para leer:</h1>
        <p>{{ clase.texto }}</p>
      </div>
    </div>
  </div>
</div>
  </div>
  <p v-else>Cargando clase...</p>
</template>

<script setup lang="ts">
import E_Sidebar from '../components/E_Sidebar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';


const client = generateClient<Schema>();
const route = useRoute();


const claseId = ref<string>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || '');
const clase = ref<any>(null);
const entityType = ref<string>('curso'); // Inicialmente asumimos que es un curso, pero se ajustará dependiendo de la ruta
const entityId = ref<string>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || '');
const entityData = ref<any>(null);

const goToDrive = () => {
  if (clase.value && clase.value.driveLinkClase) {
    window.open(clase.value.driveLinkClase, '_blank'); // Abre en nueva pestaña
  } else {
    console.error('El enlace de Google Drive no está disponible');
  }
};

const goToPDF = () => {
  if (clase.value && clase.value.pdfClase) {
    window.open(clase.value.pdfClase, '_blank'); // Abre en nueva pestaña
  } else {
    console.error('El enlace de PDF no está disponible');
  }
};

const goToSeapp = () => {
  window.open('https://play.google.com/store/apps/details?id=us.wizards.seapp2&hl=en_US', '_blank'); // Abre en nueva pestaña
};

const loadClass = async () => {
  try {
    const classResponse = await client.models.Clase.get({ id: claseId.value });
    clase.value = classResponse.data;
  } catch (error) {
    console.error('Error al cargar la clase:', error);
  }
};

const videosArray = computed(() => {
  if (clase.value && clase.value.youtubeVideoUrl) {
    try {
      // Parsear el JSON almacenado en el campo 'youtubeVideoUrl'
      return JSON.parse(clase.value.youtubeVideoUrl) as { titulo: string; url: string }[];
    } catch (error) {
      console.error('Error al procesar los videos:', error);
      // Si no es un JSON válido, asumimos que es un solo video en formato string
      return [{ 
        titulo: 'Video de la clase', 
        url: clase.value.youtubeVideoUrl 
      }];
    }
  }
  return [];
});

const getEmbedUrl = (youtubeUrl: string): string => {
  if (!youtubeUrl) return '';
  
  let videoId = '';

  // Extraer ID de diferentes formatos de URL de YouTube
  if (youtubeUrl.includes('youtube.com/watch?v=')) {
    videoId = youtubeUrl.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  } else if (youtubeUrl.includes('youtu.be/')) {
    videoId = youtubeUrl.split('youtu.be/')[1];
  } else if (youtubeUrl.includes('embed/')) {
    videoId = youtubeUrl.split('embed/')[1];
  }

  // Si no encontramos un ID válido, devolvemos la URL original
  if (!videoId) return youtubeUrl;

  return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`;
};

const imagenesArray = computed(() => {
  if (clase.value && clase.value.imagenes) {
    try {
      // Parsear el JSON almacenado en el campo 'imagenes'
      const parsedImagenes = JSON.parse(clase.value.imagenes) as { titulo: string; url: string }[];

      return parsedImagenes.map((imagen) => {
        let processedUrl = imagen.url;

        // Procesar enlaces de Dropbox
        if (processedUrl.includes('dropbox.com')) {
          processedUrl = processedUrl.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
          if (processedUrl.includes('?dl=0')) {
            processedUrl = processedUrl.replace('?dl=0', '?raw=1');
          } else if (!processedUrl.includes('?raw=1')) {
            processedUrl += '?raw=1';
          }
        }

        return {
          titulo: imagen.titulo || 'Sin título',
          url: processedUrl,
        };
      });
    } catch (error) {
      console.error('Error al procesar las imágenes:', error);
      return [];
    }
  }
  return [];
});


// Function to view image in fullscreen mode
const viewFullscreen = (imageSrc: string) => {
  const image = new Image();
  image.src = imageSrc;
  const fullscreenContainer = document.createElement('div');
  fullscreenContainer.style.position = 'fixed';
  fullscreenContainer.style.top = '0';
  fullscreenContainer.style.left = '0';
  fullscreenContainer.style.width = '100%';
  fullscreenContainer.style.height = '100%';
  fullscreenContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  fullscreenContainer.style.display = 'flex';
  fullscreenContainer.style.justifyContent = 'center';
  fullscreenContainer.style.alignItems = 'center';
  fullscreenContainer.style.zIndex = '1000';
  fullscreenContainer.appendChild(image);

  document.body.appendChild(fullscreenContainer);

  fullscreenContainer.addEventListener('click', () => {
    document.body.removeChild(fullscreenContainer);
  });
};

// Función para cargar la entidad (curso, especialización o tutoría)
const loadEntity = async () => {
  try {
    let response: any;

    if (entityType.value === 'curso') {
      response = await client.models.Curso.get({ id: entityId.value });
    } else if (entityType.value === 'especializacion') {
      response = await client.models.Especializacion.get({ id: entityId.value });
    } else if (entityType.value === 'tutoria') {
      response = await client.models.Tutoria.get({ id: entityId.value });
    }

    entityData.value = response.data;
  } catch (error) {
    console.error('Error al cargar la entidad:', error);
  }
};

onMounted(() => {
  // Asigna el tipo de entidad basado en el nombre de la ruta
  const routeName = route.name?.toString().toLowerCase();

  if (routeName?.includes('especializacion')) {
    entityType.value = 'especializacion';
  } else if (routeName?.includes('tutoria')) {
    entityType.value = 'tutoria';
  } else {
    entityType.value = 'curso'; // Valor predeterminado
  }

  console.log('Tipo de entidad:', entityType.value); // Debug
  loadClass();
  loadEntity(); // Carga los datos de la entidad
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

h1 {
  text-align: center;
  color: #e97b0d;
  font-size: 25px;
  margin-bottom: 20px;
   }

h2 {
  text-align: center;
  color: #7f1a6c;
}

.zoom-section a {
  display: block;
  text-align: center;
  color: #007bff;
  text-decoration: underline;
  margin: 20px 0;
}

/* Estilos para la sección de videos */
.videos-section {
  margin: 2rem 0;
}

.videos-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.video-item {
  flex: 1 1 300px; /* Los videos tendrán un ancho mínimo de 300px y crecerán según el espacio */
  max-width: 500px; /* Ancho máximo para cada video */
  display: flex;
  flex-direction: column;
}

.video-iframe {
  width: 100%;
  aspect-ratio: 16 / 9; /* Mantener relación de aspecto 16:9 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.video-title {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555;
  text-align: center;
}

.images-section {
  margin-top: 20px;
  text-align: center;
}

.image-container {
  display: inline-block;
  margin: 10px;
  
}

.image-container img {
  max-width: 200px;
  border-radius: 10px;
  transition: transform 0.3s ease; /* Añadir una transición suave */

}

.image-container img:hover {
  transform: scale(1.5); /* Escala de 1.2 al pasar el mouse */
}

.text-section p {
  text-align: center;
  font-size: 25px;
}
.text-section {
  padding: 30px;
}

/* Flexbox para los botones */
.button-container {
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
  gap: 10px; /* Espacio entre los botones */
  margin-top: 20px; /* Espacio superior */
}

#gmail-button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 10px;
  transition: transform 0.3s;
}

#gmail-button:hover {
  color: white;
  transform: scale(1.1);
}
#gmail-button img {
  width: 120px;
  height: 30px;
  object-fit: contain;
  border-radius: 10%;
  padding: 0;
}

#seapp-button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 10px;
  transition: transform 0.3s;
}

#seapp-button:hover {
  color: white;
  transform: scale(1.1);
}
#seapp-button img {
  width: 120px;
  height: 30px;
  object-fit: contain;
  border-radius: 10%;
  padding: 0;
}
</style>
