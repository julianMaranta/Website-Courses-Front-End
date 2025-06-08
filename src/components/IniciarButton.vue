<template>
  <button class="iniciar-btn" @click="redirectToPlataforma">Iniciar Sesión y/o Registrarse</button>
</template>

<script setup>
import { useRouter } from 'vue-router'; // Importa useRouter

const router = useRouter(); // Obtén la instancia del router

 const redirectToPlataforma = () => {
    router.push('/entry-option');
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

.iniciar-btn {
  font-family: 'DINNextRoundedLTPro-Light', sans-serif;
  font-size: 22px;
  text-decoration: none;
  padding: 15px 60px;
  border-radius: 15px;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.iniciar-btn:hover {
  background-color: orange;
  transform: scale(1.1);
}

/* Eliminar animaciones en tablets */
@media screen and (max-width: 1024px) {
  .iniciar-btn {
    transition: none;
  }
  .iniciar-btn:hover {
    transform: none;
  }
}

/* Eliminar animaciones en móviles */
@media screen and (max-width: 768px) {
  .iniciar-btn {
    transition: none;
    margin-left:10px;
  }
  .iniciar-btn:hover {
    transform: none;
  }
}
</style>
