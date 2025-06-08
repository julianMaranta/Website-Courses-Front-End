<template>
  <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-inicio-administradores.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
      <div class="action-box">
        <div class="action-info">
          <h2>CREAR</h2>
          <p>Crea cursos, especializaciones, tutorias y usuarios!</p>
        </div>
        <button @click="create" class="crear-button"></button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>EDITAR</h2>
          <p>Edita los cursos, especializaciones, tutorias y usuarios que has creado.</p>
        </div>
        <button @click="edit" class="editar-button"></button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>ELIMINAR</h2>
          <p>Elimina cursos, especializaciones, tutorias y usuarios.</p>
        </div>
        <button @click="remove" class="eliminar-button"></button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>GESTIONAR VIDEOS</h2>
          <p>Gestiona los videos que has subido.</p>
        </div>
        <button @click="goToYouTube" id="youtube-button">
          <img src="@/assets/Boton YouTube.png" alt="Botón YouTube" />
        </button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>GENERACIÓN DE INFORMES</h2>
          <p>Genera informes en formato Excel.</p>
        </div>
        <button @click="generateReport" id="excel-button">
          <img src="@/assets/Boton Excel.png" alt="Botón Excel" />
        </button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>HABILITAR ACCESOS</h2>
          <p>Habilita los accesos de los usuarios.</p>
        </div>
        <button @click="productos" class="habilitar-button"></button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>APROBAR COMPROBANTES</h2>
          <p>Aprueba los comprobantes de los usuarios.</p>
        </div>
        <button @click="aprobar" class="habilitar-button"></button>
      </div>
      <div class="action-box">
        <div class="action-info">
          <h2>COMUNIDAD SEA</h2>
          <p>Sé parte de la Comunidad SEA, participa en los foros y canales de comunicación</p>
        </div>
        <button @click="goToComunidad" class="comunidad-button"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import A_Sidebar from '../components/A_Sidebar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const create = () => {
  router.push('/plataforma-administrador-crear');
};

const edit = () => {
  router.push('/plataforma-administrador-editar');
};

const remove = () => {
  router.push('/plataforma-administrador-eliminar');
};

const productos = () => {
  router.push('/plataforma-administrador-productos');
};
const aprobar = () => {
  router.push('/aprobar-comprobantes');
};

const goToComunidad = () => {
    router.push('/comunidad-sea-administrador');
  };

const goToYouTube = () => {
  window.location.href = 'https://www.youtube.com/';
};

const generateReport = () => {
  router.push('/descargar-informe');
};

</script>

<style scoped>
body, html {
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
  font-size: 24px;
}

.action-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-caja.png');
  padding: 40px;
  border-radius: 40px;
  margin-bottom: 20px;
  color: white;
}

.action-info {
  flex: 1;
}

.action-info h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.action-info p {
  margin: 10px 0;
  font-size: 20px;
}

.action-box button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 15px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.3s;
}

.action-box button:hover {
  background-color: #7f1a6c;
  color: white;
  transform: scale(1.1);
}

/* Estilos del botón y la imagen de YouTube */
#youtube-button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 0px; 
  border-radius: 25px;
  width: 150px;
  height: 80px;
  transition: transform 0.3s;
}

#youtube-button:hover {
 
  color: white;
  transform: scale(1.1);
}

#youtube-button img {
  width: 130px;
  height: 80px;
  object-fit: contain;
}

/* Nuevos estilos para el botón y la imagen de Excel */
#excel-button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 0px; 
  border-radius: 25px;
  width: 150px;
  height: 80px;
  transition: transform 0.3s;
}

#excel-button:hover {
  color: white;
  transform: scale(1.1);
}

#excel-button img {
  width: 130px;
  height: 80px;
  object-fit: contain;
}

.comunidad-button {
  background-image: url('@/assets/boton-ver-aqui.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}

.crear-button {
  background-image: url('@/assets/boton-crear.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}
.editar-button {
  background-image: url('@/assets/boton-editar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}

.eliminar-button {
  background-image: url('@/assets/boton-eliminar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}
.habilitar-button {
  background-image: url('@/assets/boton-habilitar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .action-box {
  
  background-image: url('@/assets/background-caja-tablet.png');
  
  border-radius: 70px;
 
}
}
</style>
