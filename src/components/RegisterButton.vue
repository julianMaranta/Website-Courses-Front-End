<template>
  <router-link to="/register">
  <button class="register-btn">Registrarme</button>
</router-link>
</template>

<style scoped>
@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-font/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-font/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.register-btn {
  font-family: 'DINNextRoundedLTPro-Light', sans-serif;
  font-size: 22px;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 15px;
  background-color: purple;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  margin-left: 5px;
  margin-right: 15px;
}

.register-btn:hover {
  background-color: orange;
  transform: scale(1.1);
}

/* Eliminar animaciones en tablets */
@media screen and (max-width: 1024px) {
  .register-btn {
    transition: none;
  }
  .register-btn:hover {
    transform: none;
  }
}

/* Eliminar animaciones en móviles */
@media screen and (max-width: 768px) {
  .register-btn {
    transition: none;
  }
  .register-btn:hover {
    transform: none;
  }
}
</style>
