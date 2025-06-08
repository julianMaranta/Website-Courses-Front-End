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
    
    
       <!-- Debug: Mostrar el valor de entityType 
       <p>Tipo de Entidad: {{ entityType }}</p> -->

    <div v-if="entityType === 'tutoria'">
      <!-- Si es una tutoría, muestra el link de Zoom 
      <div class="drive-section" v-if="clase.driveLink">
        <h3>Enlace de Google Drive:</h3>
        <a :href="clase.driveLink" target="_blank">{{ clase.driveLink }}</a>
      </div> -->
      <div class="zoom-section" v-if="clase.zoomLink">
        <h3>Enlace de Zoom:</h3>
        <a :href="clase.zoomLink" target="_blank">{{ clase.zoomLink }}</a>
      </div>

      
    </div>

    <div v-else>
      <!-- Si no es una tutoría, muestra el contenido multimedia -->
      <div class="video-section" v-if="clase.youtubeVideoUrl">
        <iframe :src="getEmbedUrl(clase.youtubeVideoUrl)" frameborder="0" allowfullscreen></iframe>
      </div>

      <div class="images-section" v-if="clase.imagenes">
        <div v-for="(imagen, index) in imagenesArray" :key="index" class="image-container">
          <img :src="imagen" :alt="`Imagen ${index + 1}`" />
        </div>
      </div>

      <div class="text-section" v-if="clase.texto">
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



const loadClass = async () => {
  try {
    const classResponse = await client.models.Clase.get({ id: claseId.value });
    clase.value = classResponse.data;
  } catch (error) {
    console.error('Error al cargar la clase:', error);
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

// Computed property to handle and display images from Dropbox URLs
const imagenesArray = computed(() => {
  if (clase.value && clase.value.imagenes) {
    return clase.value.imagenes.split(',').map((imagen: string) => {
      imagen = imagen.trim();
      if (imagen.includes('dropbox.com')) {
        imagen = imagen.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

        if (imagen.includes('?dl=0')) {
          imagen = imagen.replace('?dl=0', '?raw=1');
        } else if (imagen.includes('?dl=1')) {
          imagen = imagen.replace('?dl=1', '?raw=1');
        } else if (!imagen.includes('?raw=1')) {
          imagen += '?raw=1';
        }
      }
      return imagen;
    });
  }
  return [];
});

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

h1, h2 {
  text-align: center;
}

.zoom-section a {
  display: block;
  text-align: center;
  color: #007bff;
  text-decoration: underline;
  margin: 20px 0;
}

.video-section iframe {
  width: 100%;
  max-width: 600px;
  height: 300px;
  border-radius: 10px;
  margin: 0 auto 20px;
  display: block;
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
}

.text-section p {
  text-align: center;
}


</style>
