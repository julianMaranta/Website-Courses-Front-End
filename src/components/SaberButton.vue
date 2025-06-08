<template>
  <div class="button-container">
    <router-link to="/info-empresas" class="btn saber-mas-btn">Saber más</router-link>
    <p class="info-text">
       
    </p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}


.button-container {
  display: flex;
  flex-direction: column; /* Alinea los elementos en columna */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
}

.saber-mas-btn {
  font-size: 30px;
  font-weight: 500;
  padding: 2px 60px;
  border-radius: 15px;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none; /* Elimina el subrayado */
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
  margin-bottom: 0px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Añade sombra */
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
}

.saber-mas-btn:hover {
  background-color: orange;
  transform: scale(1.2);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4); /* Cambia la sombra al hacer hover */
}

/* Texto de información */
.info-text {
  font-size: 16px; /* Aumenta el tamaño del texto */
  color: #333;
  text-align: center;
  margin-top: 9px;
  margin-right: 10px;
  opacity: 0; /* Inicialmente oculto */
  transition: opacity 0.3s;
  max-width: 700px; /* Aumenta el ancho máximo del texto */
  line-height: 1.5; /* Mejora la legibilidad */
  padding: 0px;
}

/* Mostrar el texto al pasar el mouse */
.button-container:hover .info-text {
  opacity: 1; /* Muestra el texto */
}

/* Media Queries para pantallas pequeñas */
@media screen and (max-width: 768px) {
  .saber-mas-btn,
  .button-container:hover .info-text {
    transition: none;
  }

  .saber-mas-btn:hover {
    transform: none;
    box-shadow: none;
  }
  .saber-mas-btn {
    font-size: 18px;
    padding: 8px 20px;
  }

  .info-text {
    font-size: 14px;
    max-width: 400px; /* Ajusta el ancho máximo del texto para pantallas pequeñas */
  }
}

/* Media Queries para pantallas aún más pequeñas, como móviles */
@media screen and (max-width: 480px) {
  .saber-mas-btn,
  .button-container:hover .info-text {
    transition: none;
  }

  .saber-mas-btn:hover {
    transform: none;
    box-shadow: none;
  }
  .saber-mas-btn {
    font-size: 25px;
    padding: 15px 25px;
  }

  .info-text {
    font-size: 12px;
    max-width: 300px; /* Ajusta el ancho máximo del texto para pantallas aún más pequeñas */
  }
}

@media screen and (max-width: 1024px) {
  .saber-mas-btn,
  .button-container:hover .info-text {
    transition: none;
  }

  .saber-mas-btn:hover {
    transform: none;
    box-shadow: none;
  }
}
</style>
