<template>
  <div>
    <button @click="openModal" class="video-btn">Ver Video</button>
    <div :class="{ 'modal': true, 'show': modalOpen }">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">CERRAR</button>
        <div class="youtube-content">
          <iframe
            v-if="modalOpen"
            :src="embedUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const modalOpen = ref(false);
const videoId = ref('jHD4eA4Zt44'); // Cambia este ID por el de tu video de YouTube

// Convertir la URL de YouTube en una URL de embed
const embedUrl = computed(() => {
  const baseUrl = 'https://www.youtube.com/embed/';
  const loopParam = '?autoplay=1&mute=1'; // Autoplay y mute para mejor experiencia de usuario
  return baseUrl + videoId.value + loopParam;
});

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};
</script>

<style scoped>
@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-font/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-font/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.video-btn {
  font-family: 'DINNextRoundedLTPro-Light', sans-serif;
  font-size: 21px;
  padding: 15px 50px;
  border-radius: 15px;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 15px; 
  transition: background-color 0.3s, transform 0.3s;
}

.video-btn:hover {
  background-color: orange;
  transform: scale(1.1);
}

.modal {
  display: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.8);
  transform: scale(1.1);
}

.show {
  display: block;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 5px;
  border: 1px solid #888;
  width: 80%;
  height: 80%;
}

.youtube-content {
  width: 100%;
  height: 85%;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.close-btn {
  background-color: red; /* Color de fondo rojo */
  color: white; /* Texto en blanco */
  border: none; /* Sin borde */
  padding: 10px 20px; /* Espaciado interno */
  font-size: 16px; /* Tamaño de la fuente */
  cursor: pointer; /* Cursor en forma de mano */
  float: right; /* Alinear a la derecha */
  border-radius: 5px; /* Bordes redondeados */
  margin: 10px; /* Margen exterior */
  transition: background-color 0.3s; /* Transición suave */
}

.close-btn:hover {
  background-color: darkred; /* Cambiar color al pasar el mouse */
}

.close {
  color: #7f1a6c;
  float: right;
  font-size: 50px;
  font-weight: bold;
  margin-right: 30px;
}

.close:hover,
.close:focus {
  color: #e97b0d;
  text-decoration: none;
  cursor: pointer;
}

/* Eliminar animaciones en tablets */
@media screen and (max-width: 1024px) {
  .video-btn {
    transition: none;
  }
  .video-btn:hover {
    transform: none;
  }
  .modal-content {
    margin-top: 160px;
    width: 90%;
    height: 80%;
  }
  .youtube-content {
    width: 100%;
    height: 85%;
  }
}

/* Eliminar animaciones en móviles */
@media screen and (max-width: 768px) {
  .video-btn {
    transition: none;
  }
  .video-btn:hover {
    transform: none;
  }
}

/* Media Queries para pantallas aún más pequeñas, como móviles */
@media screen and (max-width: 480px) {
  .modal-content {
    margin-top: 100px;
    width: 80%;
    height: 70%;
  }
  .youtube-content {
    width: 100%;
    height: 75%;
  }
}



</style>