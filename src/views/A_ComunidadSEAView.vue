<template>
  <div class="container">
    <A_Sidebar />

    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-comunidad.png" alt="Logo ENSEA" class="logo-plataforma" />
      </div>
      <br />

      <div class="community-section">
        <!-- Contenedor para ambas imágenes con posición relativa -->
        <div class="image-wrapper">
          <!-- Logos de redes sociales con posiciones específicas -->
          <img src="@/assets/logo-facebook-comunidad.png" alt="Facebook" class="social-logo facebook-logo" @click="goToFacebook" />
          <img src="@/assets/logo-instagram-comunidad.png" alt="Instagram" class="social-logo instagram-logo" @click="goToInstagram" />
          <img src="@/assets/logo-discord-comunidad.png" alt="Discord" class="social-logo discord-logo" @click="goToDiscord" />

          <!-- Imagen de la comunidad debajo -->
          <img src="@/assets/foto-comunidad.png" alt="Comunidad SEA" class="community-image" />
        </div>
        <div class="image-container">
          <img src="/enseagente.png" alt="Enseñante SEA">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import A_Sidebar from '../components/A_Sidebar.vue';

const goToFacebook = () => {
  window.location.href = 'https://www.facebook.com/';
};

const goToInstagram = () => {
  window.location.href = 'https://www.instagram.com/';
};

const goToDiscord = () => {
  window.location.href = 'https://discord.com/';
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

.container {
  display: flex;
  min-height: 100vh;
}

.content {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
  position: relative;
  background-image: url('@/assets/background-comunidad.png');
  min-height: 100vh;
}

h1 {
  font-size: 24px;
  margin-bottom: 40px;
}

.community-section {
  text-align: center;
  margin-top: 50px;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.social-logo {
  position: absolute;
  top: 4%; /* Ajusta la distancia desde la parte superior */
  cursor: pointer;
  transition: transform 0.3s;
  z-index: 10;
  width: 120px;
}

.social-logo:hover {
  transform: scale(1.1);
}

/* Estilo específico para cada logo */
.facebook-logo {
  left: 8%;
  top: -2%; /* Ajusta la posición según sea necesario */
}

.instagram-logo {
  left: 5%;
  top: 25%; /* Ajusta la distancia desde la parte superior */
}

.discord-logo {
  left: 9%;
  top: 50%; /* Ajusta la posición según sea necesario */
}

.community-image {
  max-width: 75%;
  height: auto;
  border-radius: 10px;
}
@media screen and (max-width: 1024px) and (min-width: 769px) {
  .social-logo {
  position: absolute;
  top: 4%; /* Ajusta la distancia desde la parte superior */
  cursor: pointer;
  transition: transform 0.3s;
  z-index: 10;
  width: 70px;
}

.social-logo:hover {
  transform: scale(1.1);
}

/* Estilo específico para cada logo */
.facebook-logo {
  left: 8%;
  top: -2%; /* Ajusta la posición según sea necesario */
}

.instagram-logo {
  left: 5%;
  top: 25%; /* Ajusta la distancia desde la parte superior */
}

.discord-logo {
  left: 9%;
  top: 50%; /* Ajusta la posición según sea necesario */
}
}

/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
 .logo-plataforma {
  width: 450px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
}

.logo-container {
  text-align: left; 
  margin-bottom: 5px;
  width: 130px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}

.community-section {
  text-align: center;
  margin-top: 5px;
} 
}

/* Media Queries para pantallas de tablet */
@media screen and (max-width: 1024px) and (min-width: 769px) {
.image-container {
  flex: 1; /* La imagen ocupa el espacio disponible */
  margin-top: 60px; /* Elimina el margen superior */
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
}
}


@media screen and (min-width: 1024px) {
.image-container {
 display: none;
}

.image-container img {
  display: none;

}
}
</style>
