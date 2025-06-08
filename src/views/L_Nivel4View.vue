<script setup>
</script>

<template>
  <section id="cursos" class="main-section-niveles">
    <div class="image-container">
      <img src="/women-pink-niveles.png" alt="Hombre SEA">
      <div class="course-info">
        <h2 class="section-title">Nivel 4</h2>
        <p class="section-description">
          Descripción Nivel 4.
        </p>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="course-boxes">
        <!-- Cajas de cursos -->
        <div class="course-content">
          <router-link to="" class="course-link">
            <img src="/caja-nivel-4.png" alt="Nivel 1">
          </router-link>
        </div>
      </div>
      <!-- Información del curso de Lengua de Señas Argentina Nivel I -->
      <div class="course-details">
        <h3>Lengua de Señas Argentina Nivel IV</h3>
        <p><strong>Horario y Docentes:</strong> Miércoles 18.30hs. del 8/5 al 26/6</p>
        
        <div class="login-alert">
          <p>Es necesario INICIAR SESIÓN para inscribirte en el curso. Ve a la Página de Inicio.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#cursos {
  background-color: #ebebeb;
  margin-top: 40px;
}

.section-title {
  font-size: 55px;
  margin-bottom: 5px;
  color: black;
}

.section-description {
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
}

.course-link {
  transition: transform 0.4s;
  display: inline-block;
}

.course-content {
  transition: transform 0.7s;
  margin: 0; /* Eliminar margen */
  display: flex;
  justify-content: center; /* Centrar la caja horizontalmente */
  align-items: center; /* Centrar la caja verticalmente */
  padding: 0; /* Eliminar padding */
}

.course-link:hover {
  transform: scale(1.1);
}

.main-section-niveles {
  display: flex;
  align-items: flex-start; /* Cambiar a flex-start para alinear al inicio */
  gap: 0; /* Eliminar el espacio entre las cajas */
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  margin-top: -5px;
  margin-left: -130px; /* Ajuste del margen izquierdo */
}

.image-container img {
  max-width: 65%; /* Ajustado para reducir el tamaño */
  height: auto;
}

.course-info {
  position: absolute;
  text-align: left;
  margin-top: 40px; /* Ajusta este valor según sea necesario */
  margin-left: 600px;
  width: 70%;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  width: 50%; /* Asegurar que el contenedor ocupe el 50% del espacio */
}

.course-boxes {
  display: flex;
  justify-content: center; /* Centrar la caja del curso */
  align-items: center;
  width: 100%; /* Asegurar que las cajas ocupen todo el ancho disponible */
  margin: 0;
  padding: 20px;
  margin-top: 40px;
}

.course-content img {
  max-width: 100%; /* Mantener el tamaño de las imágenes */
  height: auto;
}

.course-details {
  font-size: 20px;
  padding: 40px; /* Reducir el padding para coincidir con .course-boxes */
  width: 100%; /* Asegurarse de que ocupe todo el ancho */
}

.login-alert {
  margin-top: 20px;
  background-color: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

@media (max-width: 1024px) {
  #cursos {
  
  margin-top: 40px;
}

.course-boxes {
    margin-top: 60px;
  }
  .section-title {
    font-size: 40px;
  }
  .section-description {
    font-size: 16px;
  }
  .image-container {
    display: none; /* Ocultar contenedor de la imagen en tablets */
  }
  .content-wrapper {
    width: 100%; /* Asegurar que el contenedor ocupe el 100% del ancho */
    padding: 0 20px; /* Agregar padding a los lados */
  }
  .login-alert {
  margin-bottom: 180px;
  
}
}


@media (max-width: 480px) {
  #cursos {
  
  margin-top: 90px;
}
 
  .course-content {
    padding: 10px;
  }
  .course-details {
    padding: 20px;
  }


  .main-section-niveles {
    flex-direction: column;
    align-items: center;
  }
  .section-title {
    font-size: 30px;
  }
  .section-description {
    font-size: 14px;
  }
  .course-content {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .course-boxes {
    margin-top: 40px;
  }
  .image-container {
    width: 100%;
  }
  .content-wrapper {
    width: 100%;
    padding: 0 20px;
  }
}
</style>
