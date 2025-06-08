<template>
    <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-eliminar.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
      
        
        <div class="action-box">
          <div class="action-info">
            <h2>CURSO</h2>
            <p>Elimina cursos.</p>
          </div>
          <button @click="deleteCourse"  class="delete-button"></button>
        </div>
        <div class="action-box">
          <div class="action-info">
            <h2>ESPECIALIZACION</h2>
            <p>Elimina Especializaciones.</p>
          </div>
          <button @click="deleteEspecializacion"  class="delete-button"></button>
        </div>
        <div class="action-box">
          <div class="action-info">
            <h2>TUTORIA</h2>
            <p>Elimina Tutorias.</p>
          </div>
          <button @click="deleteTutoria"  class="delete-button"></button>
        </div>
        <div class="action-box">
          <div class="action-info">
            <h2>USUARIO</h2>
            <p>Elimina usuarios.</p>
          </div>
          <button @click="deleteUser"  class="delete-button"></button>
        </div>
      </div>
    
  </div>
  </template>
  
  <script setup>
  import A_Sidebar from '../components/A_Sidebar.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  

  const deleteCourse = () => {
    router.push('/delete-course'); // Navega a la vista de edición de cursos
  };
  
  const deleteEspecializacion = () => {
    router.push('/delete-especializacion');
  };

  const deleteTutoria = () => {
    router.push('/delete-tutoria');
  };
  
  const deleteUser = () => {
    router.push('/delete-user');
  };
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
}

.content {
  margin-left: 220px;
  background-color: #f0f0f0;
  padding: 20px;
  width: calc(100% - 220px);
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
  background-color: white; /* This makes the background always visible */
  color: #000000;
  border: 1px solid #000000;
  padding: 20px; /* Increased padding for larger buttons */
  border-radius: 50px; /* This makes the button rounded */
  cursor: pointer;
  font-size: 20px; /* Increased font size */
  transition: transform 0.3s; /* Smooth transition */
}

.action-box button:hover {
  background-color: #7f1a6c;
  color: white; /* Change text color on hover */
  transform: scale(1.1); /* Enlarge button on hover */
}

.delete-button {
  background-image: url('@/assets/boton-eliminar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}
</style>
