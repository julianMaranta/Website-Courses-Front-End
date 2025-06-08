<template>
  <div class="container">
      <E_Sidebar/>
      <div class="content">
        <div class="logo-container">
        <img src="@/assets/logo-clases.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
     <br>
     <div class="class-box">
        <div class="class-info">
          <h3>EVALUACIÓN</h3>
          <p>Envía tu video cumpliendo con los requisitos de aprobación explicados en el Drive y obtén tu certificado.</p>
        </div>
        <button @click="goToGmailMessages" id="gmail-button">
          <img src="@/assets/Boton Gmail.png" alt="Botón Vimeo" />
        </button>
      </div>

      <div class="class-box">
        <div class="class-info">
          <h3>ARCHIVOS - GOOGLE DRIVE</h3>
          <p>Accede a todos los archivos de cada clase.</p>
        </div>
        <button @click="goToDrive" id="gmail-button">
          <img src="@/assets/Boton Drive 2.png" alt="Botón Vimeo" />
        </button>
      </div>
     <br>
      <h1 v-if="entityData">{{ entityData.nombre }}</h1>
      <p v-else>Cargando {{ entityType }}...</p>
      
      

      <div class="program" v-if="clases.length > 0">
        
        <div class="class-box" v-for="clase in clases" :key="clase.id">
          <div class="class-info">
            <h3>{{ clase.nombre }}</h3>
            <p>{{ clase.tematica }}</p>
            <p>{{ clase.fecha }}</p>
            <p>{{ clase.hora }}</p>
          </div>
          <button 
            @click="handleButtonClick(clase)" 
            :class="['comunidad-button', { 'zoom-button': entityType === 'tutoria' }]"
          ></button>
        </div>
      </div>
      <p v-else>No hay clases disponibles.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import E_Sidebar from '../components/E_Sidebar.vue';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();
const router = useRouter();
const route = useRoute();

const entityType = ref<string>('curso'); // Puede ser 'curso', 'especializacion', 'tutoria'
const entityId = ref<string>(Array.isArray(route.params.id) ? route.params.id[0] : route.params.id || '');
const entityData = ref<any>(null);
const clases = ref<any[]>([]);

const goToGmailMessages = () => {
  window.open('https://mail.google.com/mail/u/0/#inbox', '_blank'); // Abre en nueva pestaña
};

const goToDrive = () => {
  if (entityData.value && entityData.value.driveLink) {
    window.open(entityData.value.driveLink, '_blank'); // Abre en nueva pestaña
  } else {
    console.error('El enlace de Google Drive no está disponible');
  }
};

// Esta función maneja la redirección según el tipo de clase
const handleButtonClick = (clase: any) => {
  if (entityType.value === 'tutoria' && clase.zoomLink) {
    // Redirige al enlace de Zoom si es una tutoría y hay un enlace de Zoom
    window.location.href = clase.zoomLink;
  } else {
    // Redirige a la clase normal
    verClase(clase.id);
  }
};

const verClase = (id: string) => {
  if (entityType.value === 'tutoria') {
    router.push(`/clase-tutoria/${id}`);
  } else {
    router.push(`/reproductor-clase/${id}`);
  }
};

const loadEntityAndClasses = async () => {
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

    const classesResponse = await client.models.Clase.list({
      filter: { [`${entityType.value}Id`]: { eq: entityId.value } } // Dinámico según el tipo de entidad
    });

    if (classesResponse.data) {
      // Ordena las clases por INDICE
      clases.value = classesResponse.data.sort((a: any, b: any) => {
        const indexA = a.index ?? Number.MAX_SAFE_INTEGER; // Valor por defecto si no tiene índice
        const indexB = b.index ?? Number.MAX_SAFE_INTEGER;
        return indexA - indexB;
      });
    }
  } catch (error) {
    console.error('Error al cargar la entidad y sus clases:', error);
  }
};

onMounted(() => {
  // Asigna el tipo de entidad basado en la ruta, puedes modificar esta lógica según tu necesidad.
  if (route.path.includes('especializacion')) {
    entityType.value = 'especializacion';
  } else if (route.path.includes('tutoria')) {
    entityType.value = 'tutoria';
  }
  loadEntityAndClasses();
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
  background-color: #f0f0f0;
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

h1 {
  font-size: 24px;
}

.program {
  margin-top: 20px;
}

.program h2 {
  font-size: 24px; /* Aumenta el tamaño de la fuente */
  margin-bottom: 10px;
}

.class-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-caja.png');
  padding: 30px; /* Aumenta el padding */
  border-radius: 40px;
  color: white;
  margin-bottom: 20px;
}

.class-info h3 {
  margin: 0;
  font-size: 24px; /* Aumenta el tamaño de la fuente */
}

.class-info p {
  margin: 5px 0 0;
  font-size: 20px; /* Aumenta el tamaño de la fuente */
}

.class-box button {
  background-color: white; /* Esto hace que el fondo sea siempre visible */
  color: #000000;
  border: 1px solid #000000;
  padding: 20px; /* Aumenta el padding para botones más grandes */
  border-radius: 50px; /* Hace que el botón sea redondeado */
  cursor: pointer;
  font-size: 20px; /* Aumenta el tamaño de la fuente */
  transition: transform 0.3s; /* Transición suave */
}

.class-box button:hover {
  
  color: white; /* Cambia el color del texto al pasar el mouse */
  transform: scale(1.1); /* Aumenta el tamaño del botón al pasar el mouse */
}

.course-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e97b0d;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 20px;
  color: white;
}

.course-info {
  flex: 1;
}

.course-info h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.course-info p {
  margin: 10px 0;
  font-size: 20px;
}

.course-box button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.3s;
}

.course-box button:hover {
  
  color: white;
  transform: scale(1.1);
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

.comunidad-button {
  background-image: url('@/assets/boton-ver-aqui.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}

.zoom-button {
  background-image: url('@/assets/logo-zoom.png');
  background-size: 90%;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}


@media screen and (max-width: 1024px) and (min-width: 769px) {
  .class-box {

  background-image: url('@/assets/background-caja-tablet.png');
 
  border-radius: 70px;
 
}
}
</style>
