<template>
    <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-editar.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
        <div class="action-box">
          <div class="action-info">
            <h2>CURSO</h2>
            <p>Edita cursos.</p>
          </div>
          <button @click="editCourse"  class="editar-button"></button>
        </div>
        <div class="action-box">
          <div class="action-info">
            <h2>ESPECIALIZACION</h2>
            <p>Edita Especializaciones</p>
          </div>
          <button @click="editEspecializacion"  class="editar-button"></button>
        </div>
        <div class="action-box">
          <div class="action-info">
            <h2>TUTORIA</h2>
            <p>Edita Tutorias</p>
          </div>
          <button @click="editTutoria"  class="editar-button"></button>
        </div>
        <div class="action-box">
          <div class="action-info">
            <h2>USUARIO</h2>
            <p>Edita usuarios.</p>
          </div>
          <button @click="editUser"  class="editar-button"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import A_Sidebar from '../components/A_Sidebar.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();

  
  const editCourse = () => {
    router.push('/course-list'); // Navega a la vista de edición de cursos
  };
  
  const editEspecializacion = () => {
    
    router.push('/especializacion-list');
  };
  const editTutoria = () => {
    
    router.push('/tutoria-list');
  };
  
  const editUser = () => {
    console.log('Editing user');
    router.push('/user-list');
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
  padding: 20px;
  width: calc(100% - 220px);
  position: relative;
  background-color: #f0f0f0;
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
  border: none;
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

.editar-button {
  background-image: url('@/assets/boton-editar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
}
</style>
