<template>
  <section id="cursos" class="main-section-niveles">
    <div class="header">
      <img src="@/assets/entry-logo.png" alt="Logo ENSEA" class="entry-logo"/>
    </div>
    <div class="login-register-boxes">
      <router-link to="/login" class="login-register-link login-box">
        <div class="login-register-content">
          
        </div>
      </router-link>
      <router-link to="/register" class="login-register-link register-box">
        <div class="login-register-content">
          
        </div>
      </router-link>
    </div>

    <!-- Imagen de la mujer en la esquina inferior izquierda -->
    <img src="@/assets/entry-woman.png" alt="Mujer de entrada" class="entry-woman" />
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
  background-image: url('@/assets/background-entry.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.entry-logo {
  width: 400px; /* Ajusta el tamaño según sea necesario */
  height: auto;
}

.login-register-boxes {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}

.login-register-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 170px;
  border: 1px solid #000000;
  border-radius: 25px;
  transition: transform 0.3s, background-color 0.3s;
  font-size: 24px;
  font-weight: bold;
  background-size: cover; /* Hace que la imagen de fondo cubra toda la caja */
  background-position: center;
}

.login-register-link:hover {
  transform: scale(1.1);
  background-color: #7f1a6c;
  color: white;
}

/* Estilo específico para la caja de "Iniciar Sesión" */
.login-box {
  background-image: url('@/assets/entry-login-button.png');
}

/* Estilo específico para la caja de "Registro" */
.register-box {
  background-image: url('@/assets/entry-register-button.png');
}

.login-register-content {
  font-size: 24px;
  font-weight: bold;
  color: rgb(255, 255, 255);
}

/* Imagen de la mujer en la esquina inferior izquierda */
.entry-woman {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 500px;
  height: auto;
}

@media (max-width: 1024px) and (min-width: 768px) {
  .login-register-boxes {
    width: 70%;
    flex-direction: column;
    margin-top: -20px;
  }


  .login-register-link {
    width: 250px;
    height: 120px;
  }
  .header {
  text-align: center;
  margin-top: -360px;
}
.header img{
  text-align: center;
  margin-top: -300px;
}

.entry-logo {
  width: 400px; /* Ajusta el tamaño según sea necesario */
  height: auto;
  margin-top: -300px;
}
}

@media (max-width: 480px) {
  .login-register-boxes {
    flex-direction: column;
    gap: 20px;
  }

  .login-register-link {
    width: 200px;
    height: 100px;
    font-size: 20px;
  }
}

/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
.entry-woman {
  
  width: 400px;
  
}

}
</style>
