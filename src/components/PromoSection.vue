<template>
  <section id="libro" class="main-section">
    <div class="content">
      <h2 class="section-title">NOVEDADES</h2>
      <p class="title-sea">SEA</p>
      <p class="promo-text">¡Con tu donación nos ayudas a seguir difundiendo la Lengua de Señas, capacitar, desarrollar material de estudio, crear aplicaciones y mucho más!</p>
      <p class="promo-text-2">Llevate tu <span class="highlight">LIBRO</span>: "Amor en tiempo de <span class="highlight">Lenguas de Seña"</span></p>
      <p class="promo-text-2"></p>
      <PromoButton/>
    </div>
    <div class="image-container">
      <img src="/bolsa-libro-ensea-1.png" alt="Libro SEA">
    </div>
    
  </section>
  
</template>

<script setup>
import PromoButton from './PromoButton.vue'
</script>

<style scoped>
.title-sea {
  font-size: 85px;
  margin-top: 0px;
  margin-bottom: 30px;
  margin-left: 40px;
  color: #f57f25;
  line-height: 1.1;
}

#libro {
  display: flex;
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
  align-items: center; /* Centra verticalmente el contenido */
  background-color: #ebebeb;
  padding: 10px;
}

.content {
  flex: 1; /* Toma el espacio disponible */
}

.section-title {
  line-height: 1.1;
  font-size: 75px;
  text-align: left; /* Alinea el título a la izquierda */
  margin-bottom: 0px;
  margin-left: 40px;
  width: 100%;
}

.promo-text {
  font-size: 20px;
  text-align: left; /* Alinea el texto promocional a la izquierda */
  margin-bottom: 40px;
  margin-left: 50px;
  line-height: 1.3;
}

.promo-text-2 {
  font-size: 22px;
  text-align: left; /* Alinea el texto promocional a la izquierda */
  margin-bottom: 20px;
  margin-left: 50px;
  line-height: 1.5;
}

.image-container {
  flex: 1; /* Toma el espacio disponible */
  position: relative; /* Añade posicionamiento relativo para el contenedor */
  overflow: hidden; /* Oculta cualquier desbordamiento */
}

.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/fondo-iconos.png') no-repeat center center;
  background-size: 80%; /* Ajusta el tamaño de la imagen de fondo */
  transition: transform 0.2s ease-in-out;
  z-index: 0; /* Asegura que la imagen de fondo esté detrás de la imagen principal */
}

.image-container img {
  max-width: 95%; /* Ajusta el tamaño máximo de la imagen */
  height: auto; /* Mantiene la proporción de la imagen */
  margin-left: 0px;
  margin-right: 70px;
  margin-top: 40px;
  border-radius: 20px;
  position: relative; /* Mantiene la posición relativa */
  z-index: 1; /* Asegura que la imagen esté por encima de la imagen de fondo */
}

.image-container:hover::before {
  transform: scale(1.1); /* Agranda la imagen de fondo al pasar el mouse */
}

/* Estilo para el texto resaltado */
.highlight {
  color: #f57f25; /* Color naranja */
}

/* Media Queries para pantallas aún más pequeñas, como móviles */
@media screen and (max-width: 768px) {
  #libro {
    flex-direction: column; /* Cambia la dirección del flex para móviles */
    align-items: center; /* Centra los elementos horizontalmente */
    text-align: center; /* Centra el texto */
  }

  .content {
    margin-left: 0; /* Elimina el margen izquierdo */
    text-align: center; /* Centra el texto */
  }

  .section-title {
    text-align: center; /* Centra el título */
    margin-left: 0; /* Elimina el margen izquierdo */
    font-size: 50px;
    
  }
  .title-sea{
    font-size: 50px;
  }

  .promo-text, .promo-text-2 {
    text-align: center; /* Centra el texto promocional */
    margin-left: 0; /* Elimina el margen izquierdo */
  }

  .btn-promo {
    margin-left: 0; /* Ajusta el margen izquierdo del botón */
  }

  .image-container img {
    margin-left: 0; /* Elimina el margen izquierdo */
    margin-top: 20px; /* Añade margen superior */
  }
}

@media screen and (max-width: 1024px) and (min-width: 768px) {
  .image-container::before,
  .image-container:hover::before {
    transition: none;
  }
  
  .image-container:hover::before {
    transform: none;
  }
  .section-title {
    width: 180%;
    font-size: 60px;
  }
  .title-sea {
   
    font-size: 70px;
  }
}

@media screen and (max-width: 1024px) {
  .image-container::before,
  .image-container:hover::before {
    transition: none;
  }
  
  .image-container:hover::before {
    transform: none;
  }
  
}
</style>
