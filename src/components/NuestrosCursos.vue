<template>
  <section id="cursos" class="main-section-niveles">
    <div class="image-container">
      <img src="/women-pink-niveles.png" alt="Hombre SEA" class="main-image">
      <div class="course-info">
        <h2 class="section-title">Nuestros Cursos</h2>
        <p class="section-description">
          Explora nuestra amplia variedad de cursos diseñados para todas las edades y niveles de habilidad.
        </p>
        <div class="info-images">
          <img src="/iconos-violeta-niveles.png" alt="Imagen 1">
        </div>
      </div>
    </div>
    <div class="course-boxes">
      <!-- Cajas de cursos -->
      <div class="course-content">
        <router-link to="" class="course-link">
          <img src="/caja-nivel-1.png" alt="Nivel 1">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="" class="course-link">
          <img src="/caja-nivel-2.png" alt="Nivel 2">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="" class="course-link">
          <img src="/caja-nivel-3.png" alt="Nivel 3">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="" class="course-link">
          <img src="/caja-nivel-4.png" alt="Nivel 4">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="" class="course-link">
          <img src="/caja-nivel-5.png" alt="Nivel 5">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="" class="course-link">
          <img src="/caja-nivel-6.png" alt="Nivel 6">
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

#cursos {
  background-color: #ebebeb;
}

.section-title {
  font-size: 55px;
  margin-bottom: 5px;
  color: rgb(77, 77, 77);
  font-weight: bold;
}

.section-description {
  font-size: 20px;
  margin-bottom: 10px;
  color: rgb(77, 77, 77);
}

.course-link {
  transition: transform 0.4s;
  display: inline-block;
}

.course-content {
  transition: transform 0.7s;
  margin: 0;
  display: inline-block;
  padding: 0;
}

.course-link:hover {
  transform: scale(1.1);
}

.main-section-niveles {
  display: flex;
  align-items: center;
  gap: 0;
  flex-wrap: wrap;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin-top: -5px;
  margin-left: -130px;
}

.main-image {
  max-width: 65%;
  height: auto;
}

.course-info {
  position: absolute;
  text-align: left;
  top: 50%;
  left: 95%;
  transform: translate(-50%, -50%);
  width: 70%;
  color: white; /* Asegúrate de que el texto sea visible sobre la imagen */
}

.info-images {
  display: flex;
  gap: 10px;
  margin-top: 150px;
  margin-left: 320px;
  transition: transform 0.3s;
}

.info-images:hover {
  transform: scale(1.2);
}

.info-images img {
  width: 120px;
  height: auto;
}

.course-boxes {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  justify-content: flex-end;
  flex: 1;
  margin-right: 30px;
  background-image: url('/fondo-niveles.png');
  background-size: 75% auto;
  background-position: top right;
  background-repeat: no-repeat;
  padding: 10px;
}

.course-content img {
  max-width: 80%;
  height: auto;
}

@media (max-width: 1024px) and (min-width: 768px) {
  .course-link,
  .course-content,
  .info-images {
    transition: none;
  }
  .course-link:hover,
  .info-images:hover {
    transform: none;
  }
  .section-title {
    font-size: 50px;
  }
  .section-description {
    font-size: 12px;
    text-align: left;
    display: none;
  }

  .main-section-niveles {
    flex-direction: row;
    align-items: flex-start;
  }

  .image-container {
    width: 50%;
    margin-left: 0;
    margin-top: 0;
    flex-direction: column;
    justify-content: center;
  }

  .course-info {
    position: absolute;
    text-align: center;
    top: 22%;
    left: 72%;
    transform: translate(-50%, -50%);
    margin-top: 0;
    width: 80%;
  }

  .info-images {
    justify-content: center;
    margin: 20px 0;
    max-width: 75%;
    display: none;
  }

  .course-boxes {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
    padding: 20px;
  }

  .main-image {
    max-width: 90%;
    margin-left: -40px;
  }

  .course-content {
    width: 45%;
    margin: 5px;
  }

  .course-content img {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .course-link,
  .course-content,
  .info-images {
    transition: none;
  }
  .course-link:hover,
  .info-images:hover {
    transform: none;
  }
  .section-title {
    font-size: 25px;
  }
  .section-description {
    font-size: 10px;
  }

  .main-image {
    display: none;
  }
  .info-images {
    display: none;
  }
  .course-info {
    margin-top: 20px;
    text-align: center;
    position: relative;
    width: 100%;
    left: 65%;
    
    padding: 20px;
  }

  .course-boxes {
    background-image: none;
    justify-content: center;
    text-align: center;
    margin-right: 0px;
  }
  .main-section-niveles {
    flex-direction: column;
    align-items: center;
  }

  .course-content {
    padding: 10px;
    width: 45%;
    margin: 5px;
  }

  .course-content img {
    max-width: 100%;
  }

  .image-container {
    width: 100%;
    display:none;
  }
  .course-info {
  display:none;
  }
}
</style>
