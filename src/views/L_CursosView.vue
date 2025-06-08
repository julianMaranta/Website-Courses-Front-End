<template>
  <nav class="menu">
    <ul :class="{ 'show': isMenuOpen }" v-if="!isMobile || isMenuOpen" class="menu-dropdown">
      <li @click="navigateToSection('')"><a>Inicio</a></li>
      <li @click="navigateToSection('cursos')"><a>Cursos</a></li>
      <li @click="navigateToSection('info-empresas')"><a>Empresas</a></li>
      <li @click="navigateToSection('promo')"><a>Libro SEA</a></li>
      <li @click="navigateToSection('nosotros')"><a>Nosotros</a></li>
      <li @click="navigateToSection('contactanos')"><a>Contactanos</a></li>
    </ul>
    <div class="menu-toggle" @click="toggleMenu" v-if="isMobile">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </nav>
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
        <router-link to="/nivel1" class="course-link">
          <img src="/caja-nivel-1.png" alt="Nivel 1">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="/nivel2" class="course-link">
          <img src="/caja-nivel-2.png" alt="Nivel 2">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="/nivel3" class="course-link">
          <img src="/caja-nivel-3.png" alt="Nivel 3">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="/nivel4" class="course-link">
          <img src="/caja-nivel-4.png" alt="Nivel 4">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="/nivel5" class="course-link">
          <img src="/caja-nivel-5.png" alt="Nivel 5">
        </router-link>
      </div>
      <div class="course-content">
        <router-link to="/nivel6" class="course-link">
          <img src="/caja-nivel-6.png" alt="Nivel 6">
        </router-link>
      </div>
    </div>
  </section>
  <footer id="contactanos" class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="/logo-ensea-footer.png" class="image-hands-header" alt="SEA Logo">
        <p class="footer-rights">&copy; 2024 Todos los derechos reservados | SEA</p>
      </div>
      <div class="footer-section">
        <h3>Enlaces útiles</h3>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#cursos">Cursos</a></li>
          <li><a href="#empresas">Empresas</a></li>
          <li><a href="#libro">Libro SEA</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Contacto</h3>
        <p class="contact-info">Teléfono: +54 9 11 5527-1430</p>
        <p class="contact-info">Email: lsa.sea.ong@gmail.com</p>
      </div>
      <div class="footer-section">
        <h3>Síguenos</h3>
        <ul class="social-icons">
          <li><a href="https://www.facebook.com/senasenaccion/"><img src="/logo-facebook-footer.png" alt="Facebook"></a></li>
          <li><a href="https://www.instagram.com/sea.ong"><img src="/logo-instagram-footer.png" alt="Instagram"></a></li>
          <li><a href="https://twitter.com/sea_ong"><img src="/logo-twitter-footer.png" alt="Twitter"></a></li>
          <li><a href="https://wa.me/5491155271430"><img src="/logo-whatsapp-footer.png" alt="WhatsApp"></a></li>
        </ul>
        <div class="additional-images">
          <img src="/logo-sea-app.png" alt="Additional Image 1">
          <img src="/logo-inter-sea-app-footer.png" alt="Additional Image 2">
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const isMobile = ref(false);
const isMenuOpen = ref(false);

const navigateToSection = (sectionId) => {
  router.push('/' + sectionId);
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});
</script>

<style scoped>
#cursos {
  background-color: #ebebeb;
  margin-top: 30px;
}

.section-title {
  font-size: 55px;
  margin-bottom: 5px;
  color: rgb(77, 77, 77);
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
  margin-top: 40px;
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
    margin-top: 80px;
    margin-bottom: 130px;
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
    margin-top: 80px;
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
  }
}

/* ESTILOS NAV BAR */

@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.menu {
  background-color: transparent; /* Fondo invisible */
  color: black;
  padding: 10px;
  font-size: 10px;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  position: relative;
  top: 0;
  z-index: 1000;
  margin-bottom: -110px;
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  z-index: 1001;
   /* Fondo blanco */
}

.menu ul.menu-dropdown {
  right: 0;
  left: unset;
  border-radius: 10px;
}

.menu ul li {
  margin-right: 20px;
  padding: 0;
  cursor: pointer;
 
}

.menu ul li:last-child {
  margin-right: 0;
}

.menu ul li a {
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px;
  font-size: 17px;
  font-weight: 700;

}

.menu ul li:hover {
  background-color: orange;
  border-radius: 5px;
}

.menu ul li:hover a {
  color: white;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  z-index: 1002;
}

.menu-toggle span {
  height: 3px;
  width: 25px;
  background-color: black;
  margin-bottom: 5px;
  border-radius: 5px;
}

@media screen and (max-width: 768px) {
  .menu {
    justify-content: space-between;
  }

  .menu ul {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 40px;
    right: 0; /* Alinea el menú desplegable a la derecha */
    background-color: white !important;  /* Fondo blanco */
    width: 200px;
    z-index: 1001;
  }

  .menu ul.show {
    display: flex;
  }

  .menu ul li {
    margin-right: 0;
    margin-bottom: 10px;
    text-align: center;
  }

  .menu-toggle {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}

/* Nuevas reglas para dispositivos de tamaño tablet */
@media screen and (min-width: 481px) and (max-width: 1024px) {
  .menu {
    justify-content: space-between;
  }

  .menu ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
      /* Fondo blanco */
  }

  .menu ul li {
    margin-right: 20px;
    padding: 0;
  }

  .menu ul li a {
    display: block;
    color: black;
    text-decoration: none;
    padding: 10px;
    font-size: 17px;
  }

  .menu ul li:hover {
    background-color: orange;
    border-radius: 5px;
  }

  .menu ul li:hover a {
    color: white;
  }
}
@media screen and (max-width: 480px) {

  .menu ul {
   
    background-color: white !important;  /* Fondo blanco */
  }

}

/*ESTILOS FOOTER*/

@font-face {
  font-family: 'DINNextRoundedLTPro-Light';
  src: url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff2') format('woff2'),
       url('/path-to-your-fonts/DINNextRoundedLTPro-Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.image-hands-header {
  width: 30%;
  margin-top: 10px;
  margin-left: 20px;
  transition: transform 0.3s; /* Añade la transición */
}

.image-hands-header:hover {
  transform: scale(1.4); /* Escala la imagen al pasar el mouse por encima */
}

.footer {
  background-color: #763CA1;
  color: white;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra todo el contenido verticalmente */
}

.footer-container {
  display: flex;
  justify-content: space-between; /* Distribuye el contenido horizontalmente */
  width: 100%;
  margin-top: 20px; /* Agrega un margen superior */
}

.footer-logo {
  flex: 1; /* Ocupa 1 parte del espacio disponible */
  text-align: center; /* Centra la imagen */
}



.footer-section {
  flex: 1;
  text-align: center; /* Centra el contenido dentro de cada sección */
}

.footer-section h3 {
  font-size: 30px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  font-size: 20px;
  padding: 0;
}

ul li {
  margin-bottom: 8px;
  font-size: 20px;
}

ul li a {
  font-size: 20px;
  color: white;
  text-decoration: none;
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
}

.social-icons {
  display: flex;
  justify-content: center; /* Centra los íconos sociales */
  padding: 0;
}

.social-icons li {
  margin-right: 25px;
}

.social-icons li a img {
  width: 45px; /* Ajusta el tamaño de las imágenes de los íconos */
  height: 45px; /* Asegura que las imágenes mantengan una proporción adecuada */
  transition: transform 0.3s; /* Añade la transición */
}

.social-icons li a img:hover {
  transform: scale(1.5); /* Escala la imagen al pasar el mouse por encima */
}

.additional-images {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Añade un margen superior para separar las imágenes adicionales de los íconos sociales */
}

.additional-images img {
  width: 100px; /* Ajusta el tamaño de las imágenes adicionales */
  height: 100px; /* Mantiene la proporción de las imágenes adicionales */
  margin-right: 20px; /* Añade un margen derecho para espaciar las imágenes */
  transition: transform 0.3s; /* Añade la transición */
}

.additional-images img:hover {
  transform: scale(1.3); /* Escala la imagen al pasar el mouse por encima */
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
  width: 100%; /* Ajusta el ancho */
}

.contact-info {
  font-size: 20px;
  margin-bottom: 8px;
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
}

.footer-bottom {
  font-size: 15px;
}

.footer-rights {
  font-size: 15px;
  margin-top: 50px;
  margin-left: 30px; /* Añade margen superior para separarlo de la imagen */
  font-family: 'DINNextRoundedLTPro-Light', sans-serif; /* Fuente aplicada */
}

/* Media queries para dispositivos móviles */
@media only screen and (max-width: 768px) {
  .image-hands-header, .social-icons li a img, .additional-images img {
    transition: none;
    transform: none;
  }
  .footer-container {
    flex-direction: column; /* Cambia a una disposición de columna */
    align-items: center; /* Centra todos los elementos */
  }
 
  .footer-rights {
    font-size: 13px; /* Reduce el tamaño de la fuente para pantallas más pequeñas */
  }
  .additional-images {
    flex-direction: column; /* Cambia a una disposición de columna en pantallas pequeñas */
    align-items: center;
  }
  .additional-images img {
    margin-bottom: 10px; /* Añade un margen inferior para espaciar las imágenes en pantallas pequeñas */
    margin-right: 0; /* Elimina el margen derecho en pantallas pequeñas */
  }
  .footer-logo{
    width: 60%;

  }
  .image-hands-header {
    width: 30%;
  }
  .footer-rights {
  font-size: 18px;
  margin-top: 50px;
  
}

.image-container {
   display:none;
}
.course-info {
   display:none;
}
}

/* Media queries para dispositivos móviles */
@media only screen and (max-width: 1024px) {
  
  .image-hands-header, .social-icons li a img, .additional-images img {
    transition: none!important;
    transform: none!important;
  }

  .image-hands-header {
    width: 60%;
  }
  .footer-rights {
  
  margin-top: 20px;
  
}
 .course-boxes {
 
  margin-top: 100px;
  
}


}

/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
 .course-boxes {
 
  margin-top: 60px;
  
}

}
</style>
