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
import PromoButton from '@/components/PromoButton.vue'
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
  margin-top: 30px;
}

.content {
  flex: 1; /* Toma el espacio disponible */
  margin-top: 40px;
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
  .promo-text-2 {
  
  line-height: 1.5;
}
  .content {
    margin-left: 0; /* Elimina el margen izquierdo */
    text-align: center; /* Centra el texto */
    margin-top: 100px;
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
 .content{
  margin-top: 100px;
  margin-bottom: 180px;
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
