<template>
   <div class="button-container">
      <router-link to="/promo" class="promo-btn">Pedí tu LIBRO</router-link>
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
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    margin-top: 60px;
    margin-bottom: 40px;
    
    
  }
  
  .promo-btn {
    font-size: 30px;
    font-weight: bold;
    padding: 2px 60px;
    border-radius: 15px;
    background-color: purple;
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none; /* Elimina el subrayado */
    transition: background-color 0.3s, transform 0.3s;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Añade sombra */
    font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
  }
  
  .promo-btn:hover {
    background-color: orange;
    transform: scale(1.2);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4); /* Cambia la sombra al hacer hover */
  }
  
  /* Media Queries para pantallas pequeñas */
  @media screen and (max-width: 768px) {
    .promo-btn {
      font-size: 18px;
      padding: 8px 20px;
    }
  }
  
  /* Media Queries para pantallas aún más pequeñas, como móviles */
  @media screen and (max-width: 480px) {
    .promo-btn {
      font-size: 25px;
      padding: 15px 25px;
    }
  }

  @media screen and (max-width: 1024px) {
  .promo-btn,
  .promo-btn:hover {
    transition: none;
    transform: none;
  }
}
  </style>
  