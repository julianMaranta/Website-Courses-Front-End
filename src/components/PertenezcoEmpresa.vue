<template>
  <section id="empresas" class="main-section">
    <div class="section-content">
      <div class="image-container hide-on-tablet hide-on-mobile">
        <img src="/gente-ensea-inicio.png" alt="Mujer SEA">
      </div>
      <div class="content">
        <h2 class="section-title">Empresas que se capacitan con SEA</h2>
        <div class="company-grid">
          <div class="company-row">
            <router-link to="" class="course-link">
              <img src="/caja-carrefour.png" alt="Carrefour" class="company-logo">
            </router-link>

            <router-link to="" class="course-link">
              <img src="/caja-disney.png" alt="Disney" class="company-logo">
            </router-link>

            <router-link to="" class="course-link">
              <img src="/caja-makro.png" alt="Makro" class="company-logo">
            </router-link>

            <router-link to="" class="course-link">
              <img src="/caja-adidas-1.png" alt="ATE" class="company-logo">
            </router-link>
          </div>

          <div class="company-row">
            <router-link to="" class="course-link">
              <img src="/caja-swiss.png" alt="Swiss" class="company-logo">
            </router-link>
            <router-link to="" class="course-link">
              <img src="/caja-sac.png" alt="SAC" class="company-logo">
            </router-link>
            <router-link to="" class="course-link">
              <img src="/caja-trenes.png" alt="Trenes" class="company-logo">
            </router-link>
          </div>
        </div>
        <div class="button-container">
          <SaberButton />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SaberButton from '@/components/SaberButton.vue'
</script>

<style scoped>
#empresas {
  margin-top: 0px;
  background-color: #ebebeb;
  background-image: url('/fondo-empresas.png'); /* Agrega la imagen de fondo */
  background-size: 92%; /* Ajusta el tamaño de la imagen de fondo */
  background-position: center bottom; /* Centra la imagen horizontalmente y la coloca en la parte inferior */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  position: relative;
  z-index: 1; /* Asegúrate de que otros elementos se posicionen correctamente respecto al fondo */
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.section-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2; /* Asegúrate de que el contenido esté encima de la imagen de fondo */
}

.image-container {
  margin-right: 20px;
  width: 35%;
  margin-left: 60px;
  margin-top: 40px;
  transition: transform 0.3s;
}

.image-container:hover {
  transform: scale(1.1);
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.content {
  flex: 1;
}

.section-title {
  font-size: 35px;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 20px;
  font-weight: bold;
  color: rgb(77, 77, 77);
}

.company-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
}

.company-row {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.course-link {
  width: 200px;
  height: 200px;
  display: inline-block;
  transition: transform 0.4s;
}

.course-link img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.course-link:hover {
  transform: scale(1.2);
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px; /* Reduce el margen superior */
  margin-left: 0px; /* Elimina el margen izquierdo */
}

/* Media Queries para tabletas */
@media screen and (max-width: 1024px) and (min-width: 768px) {
  .image-container,
  .course-link {
    transition: none;
  }
  .image-container:hover,
  .course-link:hover {
    transform: none;
  }
  #empresas {
    padding: 30px;
  }
  .hide-on-tablet {
    display: none; /* Oculta el contenedor de imagen para dispositivos de tamaño tablet */
  }
  .section-content {
    flex-direction: column;
    align-items: center;
  }
  .section-title {
    font-size: 50px; /* Ajusta el tamaño de la fuente del título */
    margin-bottom: 20px;
  }
  .company-grid {
    width: 100%;
    align-items: center;
  }
  .company-row {
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 10px;
  }
  .course-link {
    width: 30%; /* Ajusta el ancho de los enlaces de los cursos */
    margin-bottom: 10px;
  }
}


/* Media Queries para pantallas aún más pequeñas, como móviles */
@media screen and (max-width: 480px) {
  .image-container,
  .course-link {
    transition: none;
  }
  .image-container:hover,
  .course-link:hover {
    transform: none;
  }
  #empresas {
    background-image: none;
    margin-top: -10px; /* Elimina la imagen de fondo para dispositivos móviles */
  }
  .section-content {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
  }
  .image-container.hide-on-mobile {
    display: none; /* Elimina el contenedor de imagen para dispositivos móviles */
  }
  .section-title {
    font-size: 24px; /* Aumenta el tamaño de la fuente del título */
    margin-bottom: 20px;
  }
  .company-grid {
    width: 100%;
    align-items: center;
  }
  .company-row {
    flex-direction: row;
    flex-wrap: wrap; /* Permite que los elementos se ajusten a múltiples filas */
    justify-content: center;
    width: 100%;
  }
  .course-link {
    width: 45%; /* Ajusta el ancho de los enlaces de los cursos para que quepan dos por fila */
    margin-bottom: 10px;
  }
  .content {
    text-align: center;
    margin-top: 100px;
  }

  .btn-saber {
    font-size: 18px;
    padding: 8px 20px;
  }
}
</style>
