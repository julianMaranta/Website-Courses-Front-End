<template>
    <div class="sidebar">
      <img src="@/assets/logo-sidebar.png" alt="Logo ENSEA" class="logo-sidebar"/>
      <div class="sidebar-buttons">
        <button @click="goToInicio" class="inicio-button"></button>
        <button @click="goToPerfil" class="perfil-button"></button> 
        <button @click="goToComunidad" class="comunidad-button"></button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const goToInicio = () => {
    router.push('/plataforma-administrador');
  };

  const goToPerfil = () => {
    router.push('/configurar-perfil-administrador');
  };


  const goToComunidad = () => {
    router.push('/comunidad-sea-administrador');
  };
  </script>
  
  <style scoped>
  .sidebar {
    background-image: url('@/assets/sidebar-background.png');
  padding: 20px;
  width: 220px;
  height: 100vh;
  position: fixed;
}

.logo-sidebar {
  display: block;
  margin: 0 auto 20px;
  width: 100px;
  height: auto;
}

.sidebar-buttons {
  margin-top: 120px;
}

.sidebar button {
  display: block;
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 15px;
  margin: 10px 0;
  text-align: center;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  border-radius: 50px;
  transition: transform 0.3s;
}

/* Estilos para el botón de "Inicio" */
.inicio-button {
  background-image: url('@/assets/boton-inicio.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
}

.perfil-button {
  background-image: url('@/assets/boton-perfil-1.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
}

.comunidad-button {
  background-image: url('@/assets/boton-comunidad.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  

}

.sidebar button:hover {
  background-color: #e97b0d;
  color: white;
  transform: scale(1.1);
}

/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .logo-sidebar {
  display: block;
  margin: 0 auto 20px;
  width: 70px;
  height: auto;
  margin-top: 5px;
}

.sidebar-buttons {
  margin-top: 60px;
}
 
}
  </style>
  