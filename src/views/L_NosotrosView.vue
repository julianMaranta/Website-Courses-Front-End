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
  <section id="nosotros" class="main-section">
    <br>
    <br>
    <div class="content">
      <h2 class="about-title">Sobre nosotros</h2>
      <p class="about-description">
        Somos un equipo interdisciplinario de profesionales formado por personas sordas, intérpretes de Lengua de Señas Argentina, docentes y psicólogos.
        Trabajamos y apostamos colectivamente en pos de romper las barreras existentes para el desarrollo y la convivencia social.
      </p>
      <div class="text-and-image-container">
        <div class="text-content">
          <h3 class="about-subtitle">¿Qué buscamos?</h3>
          <p class="about-description">
            Sumar fuerzas para la transformación social hacia un mundo más accesible.
          </p>
          <ul class="about-description">
            <li>Oportunidades de cooperación</li>
            <li>Fortalecer vínculos con otras organizaciones</li>
            <li>Generar alianzas estratégicas</li>
            <li>Acciones coordinadas</li>
          </ul>
          <p class="promo-text-1">+ <span class="highlight">VISIÓN</span></p>
          <p class="promo-text-2">+ <span class="highlight">VALORES</span></p>
        </div>
        <div class="image-container">
          <img src="/enseagente.png" alt="Enseñante SEA">
        </div>
      </div>
    </div>
    <br>
    <br>
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
/* Estilos existentes */
.promo-text-1 {
  font-size: 25px;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 50px;
  margin-top: 40px;
  line-height: 0.7;
}
.promo-text-2 {
  font-size: 25px;
  text-align: left;
  margin-bottom: 20px;
  margin-left: 50px;
  line-height: 0.7;
}
.highlight {
  color: #f57f25;
}
#nosotros {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ebebeb;
  padding: 40px;
  text-align: center;
  margin-top: 30px;
}

.content {
  flex: 1;
  margin-left: 20px;
}

.about-title {
  font-size: 65px;
  margin-bottom: 20px;
  color: #f57f25;
}
.about-subtitle {
  font-size: 45px;
  margin-bottom: 20px;
  color: #f57f25;
}

.about-description {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.text-and-image-container {
  display: flex;
  align-items: flex-start; /* Alinea el contenido y la imagen en la parte superior */
  gap: 40px; /* Espacio entre el texto y la imagen */
}

.text-content {
  flex: 1; /* El texto ocupa el espacio disponible */
}

.image-container {
  flex: 1; /* La imagen ocupa el espacio disponible */
  margin-top: 30px; /* Elimina el margen superior */
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 15px;
}

/* Media Queries para pantallas de tablet */
@media screen and (max-width: 1024px) and (min-width: 769px) {
  #nosotros {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    text-align: center;
  }

  .content {
    margin-left: 0;
    text-align: center;
  }

  .text-and-image-container {
    flex-direction: column; /* Apila el texto y la imagen en pantallas pequeñas */
    align-items: center;
    gap: 20px;
  }

  .image-container {
    margin-bottom: 20px;
    margin-top: 0;
  }

  .image-container img {
    max-width: 90%;
  }
}

/* Media Queries para pantallas móviles */
@media screen and (max-width: 480px) {
  #nosotros {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
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

  .text-and-image-container {
    flex-direction: column; /* Apila el texto y la imagen en pantallas móviles */
    align-items: center;
    gap: 20px;
  }

  .image-container img {
    max-width: 120%;
  }

  .content {
    margin-left: 0;
    text-align: center;
    margin-top: 70px;
  }

  .image-container {
    margin-bottom: 20px;
    margin-top: 0;
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
.image-container img{
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
}
</style>