<template>
    <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-productos.png" alt="Logo ENSEA" class="logo-plataforma" />
      </div>
      <br>   
      <br>
        <div class="catalog">
          <!-- Cursos -->
          <div class="logo-container-producto">
          <img src="@/assets/logo-cursos.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
          <div class="course-grid">
            <div class="course-box-curso" v-for="curso in cursos" :key="curso.id">
              <h3>{{ curso.nombre }}</h3>
                <div class="button-container">
              <button @click="habilitarUsuarios('curso', curso.id)" class="habilitar-button"></button>
              </div>
            </div>
          </div>
          <!-- Especializaciones -->
          <div class="logo-container-producto">
          <img src="@/assets/logo-especializaciones.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
          <div class="specialization-grid">
            <div class="course-box-especializacion" v-for="especializacion in especializaciones" :key="especializacion.id">
                         <!-- Mostrar la imagen de la especialización desde Dropbox -->
    <div class="especializacion-image-container">
      <img
        :src="processDropboxImageUrl(especializacion.imagen)"
        alt="Imagen de la Especialización"
        class="especializacion-imagen"
      />
    </div>
                <div class="button-container">
              <button @click="habilitarUsuarios('especializacion', especializacion.id)" class="habilitar-button"></button>
              </div>
            </div>
          </div>
          <!-- Tutorías -->
          <div class="logo-container-producto">
          <img src="@/assets/logo-tutorias.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
          <div class="tutoria-grid">
            <div class="course-box-tutoria" v-for="tutoria in tutorias" :key="tutoria.id">
              <h3>{{ tutoria.nombre }}</h3>
                <div class="button-container">
              <button @click="habilitarUsuarios('tutoria', tutoria.id)" class="habilitar-button"></button>
              </div>
            </div>
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

  
  const cursos = ref<any[]>([]);
  const especializaciones = ref<any[]>([]);
  const tutorias = ref<any[]>([]);
  const loading = ref(true);
  
  const processDropboxImageUrl = (url: string) => {
  if (url && url.includes('dropbox.com')) {
    let imagen = url.trim();
    imagen = imagen.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

    if (imagen.includes('?dl=0')) {
      imagen = imagen.replace('?dl=0', '?raw=1');
    } else if (imagen.includes('?dl=1')) {
      imagen = imagen.replace('?dl=1', '?raw=1');
    } else if (!imagen.includes('?raw=1')) {
      imagen += '?raw=1';
    }
    return imagen;
  }
  return url;
};

  const loadCourses = async () => {
  try {
    const response = await client.models.Curso.list();
    if (response.data) {
      cursos.value = response.data
        .map((curso: any) => ({ ...curso, clases: [] }))
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Use .getTime()

      for (let curso of cursos.value) {
        const clasesResponse = await client.models.Clase.list({
          filter: { cursoId: { eq: curso.id } }
        });
        if (clasesResponse.data) {
          curso.clases = clasesResponse.data;
        }
      }
    }
  } catch (error) {
    console.error('Error al cargar cursos:', error);
  } finally {
    loading.value = false;
  }
};

const loadSpecializations = async () => {
  try {
    const response = await client.models.Especializacion.list();
    if (response.data) {
      especializaciones.value = response.data
        .sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()); // Ordenar por fecha de creación
    }
  } catch (error) {
    console.error('Error al cargar especializaciones:', error);
  }
};

const loadTutorias = async () => {
  try {
    const response = await client.models.Tutoria.list();
    if (response.data) {
      tutorias.value = response.data
        .sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()); // Ordenar por fecha de creación
    }
  } catch (error) {
    console.error('Error al cargar tutorías:', error);
  }
};
  
  const habilitarUsuarios = (entityType: string, entityId: string) => {
    router.push({
      path: '/plataforma-administrador-habilitar',
      query: { entityType, entityId },
    });
  };
  
  onMounted(() => {
    loadCourses();
    loadSpecializations();
    loadTutorias();
  });
  </script>
  
  <style scoped>
  body, html  {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
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
  background-size: cover; /* Asegura que la imagen cubra todo el área manteniendo la proporción */
  background-position: center; /* Centra la imagen en el contenedor */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
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
  min-width: 120px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
  height: auto; /* Mantén la proporción de la imagen */
}

.logo-container-producto {
  text-align: left; 
  margin-bottom: 5px;
  min-width: 140px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}

  .course-grid, .specialization-grid, .tutoria-grid {
    display: flex;
  flex-wrap: wrap;
  gap: 20px;
  }

  .button-container {
  display: flex;
  flex-direction: column; /* Coloca los botones uno encima del otro */

  margin-bottom: 40px;
}

button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 12px;
  border-radius: 40px; /* Hace que los botones sean más redondos */
  cursor: pointer;
  
  transition: transform 0.3s;
 
}

/* Botón Habilitar */
.habilitar-button {
  background-image: url('@/assets/boton-habilitar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 40px;
  width: 160px;
  border: none;
  border-radius: 20px;
  transition: transform 0.3s;
}

.habilitar-button:hover {
  transform: scale(1.1);
}

  /* CAJAS TUTORIAS*/

.course-box-tutoria {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-tutoria.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 300px;
  max-height: 320px;
  min-width: 300px;
  min-height: 320px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.course-box-tutoria:hover {
 
  transform: scale(1.1);
}

.course-box-tutoria h3 {
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
}



/* CAJAS ESPECIALIZACIONES*/

.course-box-especializacion {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-especializaciones.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 300px;
  max-height: 320px;
  min-width: 300px;
  min-height: 320px;
  box-sizing: border-box;
  transition: transform 0.3s;
}


.course-box-especializacion:hover {
 
 transform: scale(1.1);
}

.course-box-especializacion h3 {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}



/* CAJAS CURSOS*/

.course-box-curso {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-cursos.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 300px;
  max-height: 320px;
  min-width: 300px;
  min-height: 320px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.course-box-curso:hover {
 
 transform: scale(1.1);
}

.course-box-curso h3 {
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
}

.especializacion-imagen{
  padding: 15px;
  width: 100%;
  max-width: 150px;
  height: auto;
}
.especializacion-imagen-container{
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .course-box-tutoria {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-tutoria.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 250px;
  max-height: 270px;
  min-width: 250px;
  min-height: 270px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.course-box-curso {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-cursos.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 250px;
  max-height: 270px;
  min-width: 250px;
  min-height: 270px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.course-box-especializacion {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-especializaciones.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 250px;
  max-height: 270px;
  min-width: 250px;
  min-height: 270px;
  box-sizing: border-box;
  transition: transform 0.3s;
}
}
  </style>
  