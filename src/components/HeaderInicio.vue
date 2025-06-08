<template>
  <header id="inicio">
    <div class="header-content">
      <div class="title-wrapper">
        <div class="title-content">
          <div class="content-wrapper">
            <img src="/logo-ensea-footer.png" class="image-hands-header" alt="SEA Logo">
            <p class="title">Capacítate con</p>
            <p class="title-sea">SEA</p>
            <div class="header-details">
              <p class="header-text">¡Aprende lengua de señas con nosotros y amplía tus habilidades de comunicación! Contamos con más de 15 años de experiencia</p>
              <p class="header-text"></p>
              <div class="wrapper">
                <div>
                  <IniciarButton />
                  
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="image-container">
        <div class="image-wrapper">
           <!-- Video de YouTube con API -->
           <iframe
            id="youtube-video"
            class="video-carteles"
            :src="videoUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            @contextmenu.prevent
          ></iframe>
          <img src="/fondo-header-inicio.png" class="image-women" alt="Mujer Amarillo Header">
        </div>
      </div>
    </div>
    <!-- Cinta animada -->
    <div class="icons-wrapper">
      <div class="icons">
        <div class="icon-wrapper">
          <img src="/icono-profesores-header.png" class="icon" alt="User Icon" />
          <span class="icon-text">70+</span>
          <span class="icon-subtext">Educadores</span>
        </div>
        <div class="icon-wrapper">
          <img src="/icono-alumnos-header.png" class="icon" alt="User Icon" />
          <span class="icon-text">3000+</span>
          <span class="icon-subtext">Estudiantes</span>
        </div>
        <div class="icon-wrapper">
          <img src="/icono-experiencia-header.png" class="icon" alt="School Icon" />
          <span class="icon-text">15+</span>
          <span class="icon-subtext">Años de Experiencia</span>
        </div>
        <div class="icon-wrapper">
          <img src="/icono-certificado-header.png" class="icon" alt="Certificate Icon" />
          <span class="icon-text">Certificado</span>
          <span class="icon-subtext">Oficial</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import IniciarButton from './IniciarButton.vue'
import RegisterButton from './RegisterButton.vue'
import VideoButton from './VideoButton.vue'
import { ref, onMounted } from 'vue';

// ID del video de YouTube (sin la URL completa)
const videoId = ref('jHD4eA4Zt44'); // Reemplaza con el ID de tu video
const videoUrl = ref('');

// Función para generar la URL del video con parámetros de la API
const generateVideoUrl = () => {
  videoUrl.value = `https://www.youtube.com/embed/${videoId.value}?autoplay=1&mute=1&loop=1&playlist=${videoId.value}&controls=1&modestbranding=1&rel=0&disablekb=1&fs=1&enablejsapi=1`;
};

// Deshabilitar clic derecho en el iframe
const disableRightClick = () => {
  const iframe = document.getElementById('youtube-video');
  if (iframe) {
    iframe.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // Evita el menú contextual
    });
  }
};

// Deshabilitar la tecla F12 y la inspección del código
const disableInspect = () => {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
    }
  });
};

// Inicializar el video cuando el componente esté montado
onMounted(() => {
  generateVideoUrl();
  disableRightClick();
  disableInspect();
});
</script>

<style scoped>
@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'DINNextRoundedLTPro-Bold';
  src: url('/path-to-your-fonts/DINNextRoundedLTPro-Bold.woff2') format('woff2'),
       url('/path-to-your-fonts/DINNextRoundedLTPro-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

#inicio {
  background-color: white;
  color: black;
  z-index: 900;
  padding-bottom: 1px;
}

.image-women {
  width: 100%;
  margin-bottom: -20px;
}

.image-hands-header {
  width: 15%;
  margin-top: 85px;
  margin-bottom: 30px;
  margin-left: 220px;
  transition: transform 0.3s;
}

.image-hands-header:hover {
  transform: scale(1.3);
}

.header-content {
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('/fondo-women-invisible.png');
  background-size: cover;
}

span {
  color: black;
}

header {
  background-color: transparent;
  background-size: cover;
  background-position: center;
  color: black;
  text-align: left;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
  width: 50%;
  
}

.title-content {
  text-align: left;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.image-container {
  display: flex;
  justify-content: flex-end;
  width: 53%;
}

.image-wrapper {
  position: relative;
}

.image-wrapper img {
  max-width: 100%;
  height: auto;
  display: block;
}

.image-carteles {
  position: absolute;
  margin-top: 180px;
  left: 4%;
  width: 85%;
  transition: transform 0.3s;
}

.image-carteles:hover {
  transform: scale(0.9);
}

.video-carteles {
  position: absolute;
  margin-top: 180px;
  left: 8%;
  width: 85%;
  height: 300px; /* Ajusta la altura según sea necesario */
  border: none;
  transition: transform 0.3s;
}

.video-carteles:hover {
  transform: scale(0.9);
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1); /* Overlay transparente */
  cursor: pointer;
  pointer-events: none; /* Permite la interacción con el iframe */
}

/* Permite la interacción con los controles de pantalla completa y sonido */
.video-container:hover .overlay {
  pointer-events: none; /* Desactiva el overlay al pasar el mouse */
}

.title {
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
  
  margin: 0;
  line-height: 1.2;
}

.title-sea {
  font-family: 'DINNextRoundedLTPro-Bold', sans-serif; /* Fuente aplicada */
  font-size: 60px;
  font-weight: bold;
  margin-top: 10px;
  color: #f57f25;
  line-height: 1.2;
  margin-bottom: 20px;
}

.header-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-text {
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
  font-size: 16px;
  line-height: 1.4;
  margin-top: 0;
}

.wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  
  margin-left:50px;
}

.wrapper > div {
  display: flex;
  margin-left: 10px;
}

.wrapper > div > * {
  margin-right: 10px;
}

.icon-wrapper {
  text-align: center;
}

.icon-wrapper span {
  display: block;
  margin-top: 0;
}

.icon {
  
  font-size: 10px;
  color: purple;
  transition: transform 0.2s ease-in-out;
}

.icon:hover {
  transform: scale(1.4);
}

.icons-wrapper {
  margin: 0;
  background-color: #f57f25;
  padding: 20px;
  position: relative;
  top: 0px;
  z-index: 900;
}

.icons {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.icon-text {
  font-size: 20px;
  font-weight: 900;
}

.icon-subtext {
  font-size:20px;
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
  font-weight: 500;
}

.section-title {
  font-size: 55px;
  text-align: center;
  margin-bottom: 20px;
}

.section-description {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}

@media screen and (min-width: 1024px) {
  .title {
    font-size: 60px;
  }
  .header-text {
    font-size: 20px;
  }
  .icon-text {
    font-size: 25px;
  }
  .icon {
    font-size: 40px;
  }
  .title-wrapper {
    margin-left: 60px;
  }
  .icons-wrapper {
    padding: 47px;
  }
}

/* Oculta el contenedor de la imagen en tablets y móviles */
@media screen and (max-width: 1024px) {
  .wrapper {
 
  
  margin-left:10px;
}
  .image-container {
    display: none;
  }
  .image-hands-header {
    margin-top: 120px;
  }
  .image-hands-header, .image-carteles, .icon {
    transition: none;
  }
  .image-hands-header:hover, .image-carteles:hover, .icon:hover {
    transform: none;
  }
}

/* Flex direction column para botones en móviles */
@media screen and (max-width: 768px) {
  .wrapper > div {
    flex-direction: column;
    align-items: center;
  }
  .wrapper > div > * {
    margin-bottom: 10px;
    margin-right: 0;
  }

  .icons {
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .icon-wrapper {
    width: calc(50% - 10px);
    box-sizing: border-box;
    padding: 10px;
  }

  /* Centra el contenido en dispositivos móviles */
  .title-wrapper {
    width: 100%;
    margin-left: 0;
    align-items: center;
    text-align: center;
  }

  .content-wrapper {
    align-items: center;
  }

  .image-hands-header {
    margin: 20px auto;
    margin-top: 120px;
    width: 70px;
  }

  .title {
    font-size: 30px;
  }

  .title-sea {
    font-size: 35px;
  }

  .header-details {
    align-items: center;
  }

  .header-text {
    font-size: 16px;
    text-align: center;
    margin-left: 10px;
  }

  .wrapper {
    justify-content: center; 
 margin-left:0px;

  }

  /* Añade centrado vertical con flexbox */
  .header-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .image-hands-header, .image-carteles, .icon {
    transition: none;
  }
  .image-hands-header:hover, .image-carteles:hover, .icon:hover {
    transform: none;
  }
}

/* Centra el contenido en tabletas */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .title-wrapper {
    width: 100%;
    align-items: center;
    text-align: center;
  }

  .content-wrapper {
    align-items: center;
  }

  .header-details {
    align-items: center;
  }

  .title {
    font-size: 60px;
    font-weight: bold;
  }
  .title-sea {
    font-size: 70px;
    font-weight: bold;
  }
  .header-text {
    font-size: 18px;
  }
  .icon-text {
    font-size: 22px;
  }
  .icon {
    font-size: 35px;
  }

  .image-hands-header {
    margin: 20px auto;
    margin-top: 120px;
    width: 70px;
  }

  .image-hands-header, .image-carteles, .icon {
    transition: none;
  }
  .image-hands-header:hover, .image-carteles:hover, .icon:hover {
    transform: none;
  }
}

/* Ajusta el margen superior de la imagen en móviles */
@media screen and (max-width: 480px) {
  
}

/* Estilos mobile-first */
@media screen and (min-width: 768px) {
  
}

/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .icons-wrapper {

  margin-top: -15px;
 
}

}
</style>