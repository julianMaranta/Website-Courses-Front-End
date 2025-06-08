<template>
  <section id="empresas-mas-info" class="main-section">
    <div class="section-content">
      
      <div class="content">
        <h1 class="section-title">SWISS MEDICAL</h1>
  
        <div class="company-grid">
          <div class="company-row">

            <router-link to="/carrefour" class="course-link">
            <div class="company-box">
              <img src="/swissensea.jpg" alt="Carrefour" class="company-logo">
            </div>
          </router-link>
          <div class="company-description form-container">
        
        <h2>Ingresá los siguientes datos para acceder a más herramientas para seguir aprendiendo:</h2><br>
        <form>
          <label for="full-name">Nombre Completo:</label>
          <input type="text" id="full-name" name="full-name"><br>
          <label for="phone">Teléfono:</label>
          <input type="text" id="phone" name="phone"><br>
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email"><br>
          <label for="course-password">Contraseña del curso:</label>
          <input type="password" id="course-password" name="course-password"><br>
          <button type="submit" class="enviar-btn">ACCEDER</button>

        </form>
      </div>

          
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilos para el formulario */
#empresas-mas-info{
padding:50px;
margin-top: 40px;
}
h2 {
color: orange;
}
.main-section{
padding: 30px;
}
.form-container {
padding: 20px;
background-color: #ffffff;
border-radius: 10px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.form-container label {
display: block;
margin-bottom: 10px;
}

.form-container input[type="text"],
.form-container input[type="email"],
.form-container input[type="password"] {
width: 100%;
padding: 10px;
margin-bottom: 20px;
border: 1px solid #cccccc;
border-radius: 5px;
}

/* Estilos para el botón */
.enviar-btn, .donate-btn {
  font-size: 20px;
  background-color: purple;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 30px;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
}

.enviar-btn:hover, .donate-btn:hover {
  background-color: orange;
}



#empresas-mas-info {
  background-color: #ebebeb;
}

.company-logo {
  max-width: 100%;
  height: auto;
}

.section-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.image-container {
  margin-right: 20px;
  width: 30%;
  margin-left: 40px;
  margin-top: 40px;
}

.image-container img {
  max-width: 100%;
  height: auto;
}

.content {
  flex: 1;
}

.section-title {
  font-size: 55px;
  text-align: center;
  margin-bottom: 20px;
}

.empresas-text {
  text-align: center;
  font-size:25px;
  margin-bottom: 20px;
}

.company-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.company-row {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.company-box {
  flex: 1;
  max-width: 250px;
}

.company-box img {
  width: 100%;
  height: auto;
}

.company-box {
  background-color: white;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  transition: transform 0.4s;
  font-size: 24px;
}

.company-box:hover {
  transform: scale(1.2);
}

.company-description {
  font-size: 18px;
  margin-top: 10px;
}


/* Media Queries para pantallas aún más pequeñas, como móviles */
@media screen and (max-width: 480px) {
  .section-title {
    font-size: 20px;
  }
  .btn-saber {
    font-size: 16px;
    padding: 6px 16px;
  }
  .company-box {
    max-width: 100%;
  }
  .section-content{
    margin-top: 50px;
  }

  .section-title {
    font-size: 25px;
  }
  .btn-saber {
    font-size: 18px;
    padding: 8px 20px;
  }
  .company-row {
    flex-direction: column;
  }
}

/* Media Queries para pantallas Tablets */
@media screen and (max-width: 1024px) and (min-width: 769px) {
  .section-content{
    margin-top: 60px;
  }
}
</style>
