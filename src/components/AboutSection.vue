<template>
  <section id="nosotros" class="main-section">
    <br>
    <br>
    <div class="content">
      <h2 class="about-title">Sobre nosotros</h2>
      <p class="about-description">
        Somos un equipo interdisciplinario de profesionales formado por personas sordas, intérpretes de Lengua de Señas Argentina, docentes y psicólogos.
        Trabajamos y apostamos colectivamente en pos de romper las barreras existentes para el desarrollo y la convivencia social.
      </p>
      </div>
    <div class="image-container">
      <img src="/enseagente.png" alt="Enseñante SEA">
      
    </div>
    
  </section>
</template>

<style scoped>
.promo-text-1 {
  font-size: 25px;
  text-align: left; /* Alinea el texto promocional a la izquierda */
  margin-bottom: 20px;
  margin-left: 50px;
  margin-top: 40px;
  line-height: 0.7;
}
.promo-text-2 {
  font-size: 25px;
  text-align: left; /* Alinea el texto promocional a la izquierda */
  margin-bottom: 20px;
  margin-left: 50px;
  
  line-height: 0.7;
}
.highlight {
  color: #f57f25; /* Color naranja */
}
#nosotros {
  display: flex;
  justify-content: space-between; /* Distribuye el espacio entre los elementos */
  align-items: center; /* Centra verticalmente el contenido */
  background-color: #ebebeb;
  padding: 10px;
  text-align: center;
  margin-top: 0px;
}

.content {
  flex: 1; /* Toma el espacio disponible */
  margin-left: 20px; /* Margen izquierdo entre el contenido y la imagen */
}

.about-title {
  font-size: 65px;
  margin-bottom: 20px;
}
.about-subtitle {
  font-size: 45px;
  margin-bottom: 20px;
}

.about-description {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.image-container {
  flex: 1; /* Toma el espacio disponible */
  margin-top: 30px;
  margin-left: 40px;
  padding: 20px;
}

.image-container img {
  max-width: 100%; /* Ajusta el tamaño máximo de la imagen */
  height: auto; /* Mantiene la proporción de la imagen */
  border-radius: 15px;
}

.download-button {
  display: inline-block;
  margin-top: 60px;
  font-size: 30px;
  font-weight: 500;
  padding: 10px 60px;
  border-radius: 15px;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Añade sombra */
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
}

.download-button:hover {
  background-color: orange;
  transform: scale(1.1);
}



/* Media Queries para pantallas de tablet */
@media screen and (max-width: 1024px) and (min-width: 769px) {
  #nosotros {
    flex-direction: column; /* Apila los elementos verticalmente */
    align-items: center; /* Centra horizontalmente el contenido */
    justify-content: center; /* Centra verticalmente el contenido */
    margin-top: -30px;
    text-align: center;
  }

  .content {
    margin-left: 0; /* Elimina el margen izquierdo */
    text-align: center;
  }

  .image-container {
    margin-bottom: 20px; /* Espacio entre la imagen y el contenido */
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -30px;
  }

  .image-container img {
    max-width: 90%; /* Reduce el tamaño máximo de la imagen en tablets */
  }

  .download-button {
    margin-top: 20px;
    font-size: 25px;
    padding: 10px 40px;
  }
}

/* Media Queries para pantallas aún más pequeñas, como móviles */
@media screen and (max-width: 480px) {
  
  #nosotros {
    flex-direction: column; /* Apila los elementos verticalmente */
    align-items: center; /* Centra horizontalmente el contenido */
    justify-content: center; /* Centra verticalmente el contenido */
    margin-top: 0px;
    text-align: center;
  }
  .about-title {
    font-size: 35px;
  }
  .about-subtitle {
    font-size: 25px;
  }

  .about-description {
    font-size: 15px;
    margin-bottom: 40px;
  }

  .image-container img {
    max-width: 100%;
    display:none;
  }

  .content {
    margin-left: 0; /* Elimina el margen izquierdo */
    text-align: center;
    margin-top: 70px;
  }

  .image-container {
    margin-bottom: 20px; /* Espacio entre la imagen y el contenido */
    margin-top: -20px;
    margin-right: 10px;
    margin-left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    display:none;
  }

  .download-button {
    margin-top: 20px;
    font-size: 16px; /* Reduce el tamaño del texto del botón */
    padding: 10px 30px; /* Ajusta el relleno del botón */
  }
}
</style>
