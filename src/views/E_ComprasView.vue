<template>
    <div class="container">
      
      <E_Sidebar/>
      
      <div class="content">
        <div class="logo-container">
          <img src="@/assets/logo-compras.png" alt="Logo ENSEA" class="logo-plataforma"/>
        </div>
       <br>
       <br>
          <!-- Cursos Comprados -->
          <div class="logo-container-producto">
          <img src="@/assets/logo-cursos.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="course-box" v-for="curso in cursosComprados" :key="curso.id">
          <div class="course-info">
            <h2>{{ curso.nombre }}</h2>
            <p>Accede a tus clases, revisa el avance de tu curso, entrega tus trabajos y haz tus exámenes!</p>
          </div>
          <button @click="goToCourse(curso.id)" class="comunidad-button"></button>
        </div>
  
        <!-- Especializaciones Compradas -->
        <div class="logo-container-producto">
          <img src="@/assets/logo-especializaciones.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="course-box" v-for="especializacion in especializacionesCompradas" :key="especializacion.id">
          <div class="course-info">
            <h2>{{ especializacion.nombre }}</h2>
            <p>Accede a tus especializaciones compradas, revisa tu progreso y continúa aprendiendo.</p>
          </div>
          <button @click="goToEspecializacion(especializacion.id)" class="comunidad-button"></button>
        </div>
  
        <!-- Tutorías Compradas -->
        <div class="logo-container-producto">
          <img src="@/assets/logo-tutorias.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="course-box" v-for="tutoria in tutoriasCompradas" :key="tutoria.id">
          <div class="course-info">
            <h2>{{ tutoria.nombre }}</h2>
            <p>Accede a tus tutorías, revisa el progreso y recibe apoyo personalizado.</p>
          </div>
          <button @click="goToTutoria(tutoria.id)" class="comunidad-button"></button>
        </div>
  
       
       
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import E_Sidebar from '../components/E_Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { generateClient } from 'aws-amplify/data';
  import type { Schema } from '../../amplify/data/resource';
  import { userId } from '../authenticator/auth';
  
  const client = generateClient<Schema>();
  const router = useRouter();
  
  const selectedCourse = ref('cursando');
  const cursosComprados = ref<any[]>([]);
  const especializacionesCompradas = ref<any[]>([]);
  const tutoriasCompradas = ref<any[]>([]);
  
  
  const goToCourse = (id: string) => {
    router.push(`/listado-clases/${id}`);
  };
  
  const goToEspecializacion = (id: string) => {
    router.push(`/listado-especializaciones/${id}`);
  };
  
  const goToTutoria = (id: string) => {
    router.push(`/listado-tutorias/${id}`);
  };
  
  const viewCatalog = () => {
    router.push('/catalogo-cursos');
  };
  
  const goToComunidad = () => {
      router.push('/comunidad-sea-estudiante');
    };
  
  const downloadCertificates = () => {
    router.push('/descargar-certificado');
  };
  
  const loadPurchasedCourses = async () => {
    if (!userId.value) return;
    try {
      const response = await client.models.CursoComprado.list({
        filter: { usuarioId: { eq: userId.value } }
      });
      if (response.data) {
        const courseIds = response.data.map((cursoComprado: any) => cursoComprado.cursoId);
        const coursesResponse = await Promise.all(courseIds.map(async (id: string) => {
          const courseResponse = await client.models.Curso.get({ id });
          return courseResponse.data;
        }));
        cursosComprados.value = coursesResponse.filter((course) => course !== null);
      }
    } catch (error) {
      console.error('Error al cargar cursos comprados:', error);
    }
  };
  
  const loadPurchasedEspecializaciones = async () => {
    if (!userId.value) return;
    try {
      const response = await client.models.EspecializacionComprada.list({
        filter: { usuarioId: { eq: userId.value } }
      });
      if (response.data) {
        const especializacionIds = response.data.map((especializacionComprada: any) => especializacionComprada.especializacionId);
        const especializacionesResponse = await Promise.all(especializacionIds.map(async (id: string) => {
          const especializacionResponse = await client.models.Especializacion.get({ id });
          return especializacionResponse.data;
        }));
        especializacionesCompradas.value = especializacionesResponse.filter((especializacion) => especializacion !== null);
      }
    } catch (error) {
      console.error('Error al cargar especializaciones compradas:', error);
    }
  };
  
  const loadPurchasedTutorias = async () => {
    if (!userId.value) return;
    try {
      const response = await client.models.TutoriaComprada.list({
        filter: { usuarioId: { eq: userId.value } }
      });
      if (response.data) {
        const tutoriaIds = response.data.map((tutoriaComprada: any) => tutoriaComprada.tutoriaId);
        const tutoriasResponse = await Promise.all(tutoriaIds.map(async (id: string) => {
          const tutoriaResponse = await client.models.Tutoria.get({ id });
          return tutoriaResponse.data;
        }));
        tutoriasCompradas.value = tutoriasResponse.filter((tutoria) => tutoria !== null);
      }
    } catch (error) {
      console.error('Error al cargar tutorías compradas:', error);
    }
  };
  
  onMounted(() => {
    loadPurchasedCourses();
    loadPurchasedEspecializaciones();
    loadPurchasedTutorias();
  });
  </script>
  
  
  <style scoped>
  body, html  {
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
  
  .course-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url('@/assets/background-caja.png');
    padding: 40px;
    border-radius: 40px;
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
    background-color: #7f1a6c;
    color: white;
    transform: scale(1.1);
  }
  
  .comunidad-button {
  background-image: url('@/assets/boton-ver-aqui.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .course-box {

  background-image: url('@/assets/background-caja-tablet.png');
 
  border-radius: 70px;
 
}
.course-info {
    flex: 1;
    padding: 20px;
  }
}
  </style>
  