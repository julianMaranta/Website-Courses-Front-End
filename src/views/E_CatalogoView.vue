<template>
  <div class="container">
    <E_Sidebar />
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-catalogo.png" alt="Logo ENSEA" class="logo-plataforma" />
      </div>
      <br /><br />
      <div class="logo-container-producto">
          <img src="@/assets/logo-comprobante.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="course-box">
          

          <!-- Inputs debajo del texto -->
        <div class="form-wrapper">
          <div class="course-info">
            <h2>ENVÍA TU COMPROBANTE</h2>
            <p>Por favor selecciona el tipo de pago y curso, especialización o tutoría correspondiente.</p>
          </div>
                 <!-- Contenedor de inputs alineados horizontalmente -->
                 <div class="form-horizontal">
<!-- Desplegable para seleccionar tipo de pago -->
<div class="form-group">
          <label for="payment-type">Tipo de Pago</label>
          <select id="payment-type" v-model="selectedPayment">
            <option value="Transferencia">Transferencia</option>
            <option value="MercadoPago">Mercado Pago</option>
          </select>
        </div>

        <!-- Desplegable para seleccionar curso, especialización o tutoría -->
        <div class="form-group">
          <label for="course-name">Nombre del Producto</label>
          <select id="course-name" v-model="selectedName" @change="setSelectedEntityType">
            <option v-for="course in cursos" :key="course.id" :value="course.nombre" data-type="curso">
              {{ course.nombre }} (Curso)
            </option>
            <option v-for="specialization in especializaciones" :key="specialization.id" :value="specialization.nombre" data-type="especializacion">
              {{ specialization.nombre }} (Especialización)
            </option>
            <option v-for="tutoria in tutorias" :key="tutoria.id" :value="tutoria.nombre" data-type="tutoria">
              {{ tutoria.nombre }} (Tutoría)
            </option>
          </select>
        </div>

        <!-- Input de archivo para subir el comprobante -->
        <div class="form-group">
        <label for="file-upload">Sube tu comprobante</label>
        <input type="file" @change="handleFileUpload" accept="image/*" class="file-input" />
      </div>
    </div>
  </div>
       <!-- Botón para subir el comprobante -->
       <div class="form-group">
        <button @click="handleUploadClick" class="comunidad-button"></button>
      </div>
        </div>

        <!-- Cartel de advertencia -->
<div class="advertencia">
  <p>ADVERTENCIA: AL ENVIAR TU COMPROBANTE DEBES ESPERAR UNOS SEGUNDOS HASTA QUE APAREZCA EL CARTEL DE CONFIRMACIÓN POSITIVO, EN CASO DE QUE EL CARTEL SEA NEGATIVO DEBES VOLVER A ENVIARLO.</p>
</div>

        <div v-if="isModalVisible" class="modal-overlay">
    <div class="modal-content">
      <p>{{ modalMessage }}</p>
      <button @click="closeModal">Cerrar</button>
    </div>
  </div>

        

      <div class="catalog">
        <!-- Cursos -->
        <div class="logo-container-producto">
          <img src="@/assets/logo-catalogo-cursos.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="course-grid">
          <div class="course-box-curso" v-for="curso in cursos" :key="curso.id">
            <h3>{{ curso.nombre }}</h3>
            <div class="button-container">
              <button @click="redirectToLinkPago(curso.linkPago)" class="comprar-button-mercadopago"></button>
              <button @click="redirectToTransferencia" class="comprar-button"></button>
              
              <button @click="verCurso(curso.id)" class="ver-button"></button>
            </div>
          </div>
        </div>
        <!-- Especializaciones -->
        <div class="logo-container-producto">
          <img src="@/assets/logo-catalogo-especializaciones.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="specialization-grid">
          <div class="course-box-especializacion" v-for="especializacion in especializaciones" :key="especializacion.id">
             <!-- Mostrar la imagen de la especialización desde Dropbox -->
    <div class="especializacion-image-container">
      <img
        :src="processDropboxImageUrl(especializacion.imagen)"
        alt="Imagen de la Especialización"
        class="especializacion-imagen"
      />
    </div>
            <div class="button-container">
              <button @click="redirectToLinkPago(especializacion.linkPago)" class="comprar-button-mercadopago"></button>
              <button @click="redirectToTransferencia" class="comprar-button"></button>

              <button @click="verEspecializacion(especializacion.id)" class="ver-button"></button>
            </div>
          </div>
        </div>
        <!-- Tutorías -->
        <div class="logo-container-producto">
          <img src="@/assets/logo-catalogo-tutorias.png" alt="Logo ENSEA" class="logo-plataforma-producto" />
        </div>
        <div class="tutoria-grid">
          <div class="course-box-tutoria" v-for="tutoria in tutorias" :key="tutoria.id">
            <h3>{{ tutoria.nombre }}</h3>
            <div class="button-container">
              <button @click="redirectToLinkPago(tutoria.linkPago)" class="comprar-button-mercadopago"></button>
              <button @click="redirectToTransferencia" class="comprar-button"></button>

              <button @click="verTutoria(tutoria.id)" class="ver-button"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import E_Sidebar from '../components/E_Sidebar.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { userId } from '../authenticator/auth';
import { Dropbox } from 'dropbox';  // Importar el SDK de Dropbox

const client = generateClient<Schema>();
const router = useRouter();



// Reemplaza la inicialización actual del SDK de Dropbox
const dbx = new Dropbox({
  clientId: '', // Tu App Key
  clientSecret: '', // Tu App Secret
  refreshToken: '', // Tu nuevo refresh token
});


const cursos = ref<any[]>([]);
const especializaciones = ref<any[]>([]);
const tutorias = ref<any[]>([]);
const loading = ref(true);

const fileToUpload = ref<File | null>(null);
const comprobanteLink = ref('');
const selectedPayment = ref('');  // Para almacenar el tipo de pago seleccionado
const selectedName = ref('');     // Para almacenar el curso/especialización/tutoría seleccionado
const selectedEntityType = ref('');  // Nuevo: para almacenar el tipo de entidad (curso/especialización/tutoría)

// Estado global para modales
const isModalVisible = ref(false); // Controla si el modal es visible
const modalMessage = ref(''); // Mensaje a mostrar en el modal

const showModal = (message: string) => {
  modalMessage.value = message;
  isModalVisible.value = true;
};


const closeModal = () => {
  isModalVisible.value = false;
  modalMessage.value = '';
};


const processDropboxImageUrl = (url: string) => {
  if (url && url.includes('dropbox.com')) {
    let imagen = url.trim();
    imagen = imagen.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

    if (imagen.includes('?dl=0')) {
      imagen = imagen.replace('?dl=0', '?raw=1');
    } else if (imagen.includes('?dl=1')) {
      imagen = imagen.replace('?dl=1', '?raw=1');
    } else if (!imagen.includes('?raw=1')) {
      imagen += '?raw=1';
    }
    return imagen;
  }
  return url;
};


// Manejo de archivo
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    fileToUpload.value = target.files[0];
  }
};

// Función para setear el tipo de entidad seleccionada
const setSelectedEntityType = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const selectedOption = target.selectedOptions[0];
  selectedEntityType.value = selectedOption.getAttribute('data-type') || '';
};

// Modificar la función `handleUploadClick` para mostrar el modal al finalizar
const handleUploadClick = async () => {
  const usuarioId = obtenerUsuarioActual();
  if (!usuarioId) {
    alert('Usuario no autenticado.');
    return;
  }

  await uploadComprobante(usuarioId);
  isModalVisible.value = true; // Mostrar el modal después del éxito
};

// Subir comprobante a Dropbox
// Modifica la función uploadComprobante para generar nombres únicos
const uploadComprobante = async (usuarioId: string) => {
  if (!fileToUpload.value || !selectedName.value || !selectedPayment.value || !selectedEntityType.value) {
    alert('Selecciona imagen');
    return;
  }

  try {
    const file = fileToUpload.value;
    const fileExtension = file.name.split('.').pop(); // Obtener la extensión del archivo
    const timestamp = new Date().getTime(); // Timestamp actual
    const randomString = Math.random().toString(36).substring(2, 8); // Cadena aleatoria
    const userPrefix = usuarioId.substring(0, 8); // Parte del ID de usuario
    
    // Generar nombre único: usuario_timestamp_random.extension
    const uniqueFileName = `comprobante_${userPrefix}_${timestamp}_${randomString}.${fileExtension}`;
    const dropboxPath = `/comprobantes/${uniqueFileName}`;

    // Subir archivo a Dropbox
    const response = await dbx.filesUpload({
      path: dropboxPath,
      contents: file,
    });

    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: response.result.path_lower || '',
    });

    comprobanteLink.value = sharedLinkResponse.result.url.replace('?dl=0', '?raw=1');

    console.log('Link del comprobante:', comprobanteLink.value);

    // Guardar el comprobante con el link en la base de datos
    await saveComprobanteToDB(comprobanteLink.value, usuarioId, selectedName.value, selectedPayment.value, selectedEntityType.value);
    showModal('Comprobante subido con éxito');
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    showModal('Error al subir el comprobante. Por favor, inténtalo de nuevo.');
  }
};

// Guardar el link del comprobante en la base de datos
const saveComprobanteToDB = async (link: string, usuarioId: string, nombreSeleccionado: string, tipoPago: string, tipoEntidad: string) => {
  try {
    const emailUsuario = await obtenerEmailUsuario(usuarioId);  // Obtener email del usuario a partir del ID
    if (!emailUsuario) {
      alert('Error al obtener el correo del usuario.');
      return;
    }
    console.log('Guardando en DB:', link, usuarioId);  // Depuración
    
    // Crear el comprobante en la base de datos
    const nuevoComprobante = await client.models.Comprobante.create({
      comprobanteLink: link, // Enlace del comprobante subido (Dropbox)
      usuarioId: usuarioId,  // Relación con el usuario que subió el comprobante
      email: emailUsuario,         // Guardar el correo del usuario
      nombreSeleccionado: nombreSeleccionado, // El curso, especialización o tutoría seleccionada
      tipoPago: tipoPago, // Tipo de pago seleccionado (Transferencia o MercadoPago)
      tipoEntidad: tipoEntidad,  // Nuevo: Almacenar el tipo de entidad (curso, especialización, tutoría)
      estado: "pendiente", // Asigna el valor predeterminado manualmente
    });

    console.log('Comprobante guardado en la base de datos con éxito:', nuevoComprobante);
    
  } catch (error) {
    console.error('Error al guardar el comprobante en la base de datos:', error);
    alert('Error al guardar el comprobante en la base de datos.');
  }
};


// Obtener usuario actual
// Si userId es un ref, usa .value para acceder a su valor
const obtenerUsuarioActual = (): string => {
  return userId.value || ''; // Devuelve el userId actual o una cadena vacía si es null
};

// Obtener email del usuario a partir del ID
const obtenerEmailUsuario = async (usuarioId: string): Promise<string | null> => {
  try {
    // Obtener usuario con su ID, parece que el correo está en `correo` dentro de `data`
    const usuario = await client.models.Usuario.get({ id: usuarioId });
    return usuario?.data?.correo || null;  // Acceder a `data.corre`
  } catch (error) {
    console.error('Error al obtener el correo del usuario:', error);
    return null;
  }
};


const loadCourses = async () => {
  try {
    const response = await client.models.Curso.list();
    if (response.data) {
      cursos.value = response.data
        .map((curso: any) => ({ ...curso, clases: [] }))
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Use .getTime()

      for (let curso of cursos.value) {
        const clasesResponse = await client.models.Clase.list({
          filter: { cursoId: { eq: curso.id } }
        });
        if (clasesResponse.data) {
          curso.clases = clasesResponse.data;
        }
      }
    }
  } catch (error) {
    console.error('Error al cargar cursos:', error);
  } finally {
    loading.value = false;
  }
};

const loadSpecializations = async () => {
  try {
    const response = await client.models.Especializacion.list();
    if (response.data) {
      especializaciones.value = response.data
        .sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()); // Ordenar por fecha de creación
    }
  } catch (error) {
    console.error('Error al cargar especializaciones:', error);
  }
};

const loadTutorias = async () => {
  try {
    const response = await client.models.Tutoria.list();
    if (response.data) {
      tutorias.value = response.data
        .sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()); // Ordenar por fecha de creación
    }
  } catch (error) {
    console.error('Error al cargar tutorías:', error);
  }
};


// Redirige al link de pago específico del producto
const redirectToLinkPago = (linkPago: string) => {
  if (linkPago) {
    window.open(linkPago, '_blank');
  } else {
    console.error('El link de pago no está disponible');
  }
};

// Redirige a la página de transferencia
const redirectToTransferencia = () => {
  router.push('/datos-transferencia');
};


const verCurso = (cursoId: string) => {
  router.push({ name: 'detalles-curso', params: { id: cursoId } });
};

const verEspecializacion = (especializacionId: string) => {
  router.push({ name: 'detalles-especializacion', params: { id: especializacionId } });
};

const verTutoria = (tutoriaId: string) => {
  router.push({ name: 'detalles-tutoria', params: { id: tutoriaId } });
};

onMounted(() => {
  loadCourses();
  loadSpecializations();
  loadTutorias();
});
</script>

<style scoped>
body, html {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  height: 100%;
}

.container {
  display: flex;
  min-height: 100vh;
}

.content {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
  position: relative;

  background-image: url('@/assets/plataforma-background.png');
  background-size: cover; /* Asegura que la imagen cubra todo el área manteniendo la proporción */
  background-position: center; /* Centra la imagen en el contenedor */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  min-height: 100vh;
}

.logo-plataforma {
  width: 500px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
}

.logo-container {
  text-align: left; 
  margin-bottom: 5px;
  width: 160px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}


.logo-plataforma-producto {
  min-width: 120px; /* Cambia este valor según el tamaño que desees para la imagen */
  padding: 5px; /* Ajusta el espacio interior si es necesario */
  height: auto; /* Mantén la proporción de la imagen */
}

.logo-container-producto {
  text-align: left; 
  margin-bottom: 5px;
  min-width: 140px; /* Ajusta el ancho del contenedor acorde al tamaño de la imagen */
  height: auto; /* Mantén la proporción de la imagen */
}


h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.course-grid, .specialization-grid, .tutoria-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.course-grid h3 {
 color: white;
 }
 
 .button-container {
  display: flex;
  flex-direction: column; /* Coloca los botones uno encima del otro */
  gap: 10px; /* Añade espacio entre los botones */
  margin-bottom: 25px;
  
  margin-right: 10px;
}

button {
  background-color: white;
  color: #000000;
  border: 1px solid #000000;
  padding: 5px;
  border-radius: 30px; /* Hace que los botones sean más redondos */
  cursor: pointer;
  font-size: 12px;
  transition: transform 0.3s;
 
}

/* Botón Comprar */
.comprar-button {
  background-image: url('@/assets/boton-transferencia.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 40px;
  width: 140px;
 
  border: 1px solid black; /* Borde negro de 3px */
  border-radius: 21px;
  transition: transform 0.3s;
}

.comprar-button:hover {
  transform: scale(1.1);
}

/* Botón Comprar */
.comprar-button-mercadopago {
  background-image: url('@/assets/button-mercadopago.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 40px;
  width: 140px;
  
  border: 1px solid black; /* Borde negro de 3px */
  border-radius: 15px;
  transition: transform 0.3s;
}

.comprar-button-mercadopago:hover {
  transform: scale(1.1);
}

/* Botón Ver */
.ver-button {
  background-image: url('@/assets/boton-ver.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 40px;
  width: 140px;
  
  border: 1px solid black; /* Borde negro de 3px */
  border-radius: 21px;
  transition: transform 0.3s;
}

.ver-button:hover {
  transform: scale(1.1);
}

/* CAJAS TUTORIAS*/

.course-box-tutoria {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-tutorias-2.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 300px;
  max-height: 320px;
  min-width: 300px;
  min-height: 320px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.course-box-tutoria:hover {
 
  transform: scale(1.1);
}

.course-box-tutoria h3 {
  font-size: 22px;
  text-align: center;
  margin-top: 10px;
}



/* CAJAS ESPECIALIZACIONES*/

.course-box-especializacion {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-especializaciones.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 300px;
  max-height: 320px;
  min-width: 300px;
  min-height: 320px;
  box-sizing: border-box;
  transition: transform 0.3s;
}


.course-box-especializacion:hover {
 
 transform: scale(1.1);
}

.course-box-especializacion h3 {
  font-size: 18px;
  text-align: center;
  margin-top: 10px;
}



/* CAJAS CURSOS*/

.course-box-curso {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-catalogo-cursos.png');
  background-size: cover; /* Asegura que el fondo cubra todo el contenedor */
  background-position: center; /* Centra el fondo */
  background-repeat: no-repeat; /* Evita que el fondo se repita */
  padding: 20px;
  border-radius: 15px;
  color: black;
  max-width: 300px;
  max-height: 320px;
  min-width: 300px;
  min-height: 320px;
  box-sizing: border-box;
  transition: transform 0.3s;
}

.course-box-curso:hover {
 
 transform: scale(1.1);
}

.course-box-curso h3 {
  font-size: 22px;
  text-align: center;
  
  padding: 10px;
}

/* COURSE BOX COMPROBANTE */

.course-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url('@/assets/background-caja.png');
    padding: 40px;
    border-radius: 40px;
    margin-bottom: 20px;
    color: white;
  }
  

  .course-info {
  width: 100%;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
}

.form-horizontal {
  display: flex;
  flex-direction: row; /* Alinear elementos horizontalmente */
  flex-wrap: wrap;
  gap: 15px; /* Espacio entre cada grupo de formulario */
  align-items: center;
  margin-top: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.form-group label {
  font-size: 16px;
  margin-bottom: 5px;
}

.form-group select, .form-group input {
  width:260px;
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.form-group::after {
  content: '▼';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Evita que la flecha interfiera con el clic en el select */
}

.file-input {
  margin-top: 5px;
}



  .course-box button {
    background-color: white;
    color: #000000;
    border: 1px solid #000000;
    padding: 15px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 20px;
    transition: transform 0.3s;
  }
  
  .course-box button:hover {
    background-color: #7f1a6c;
    color: white;
    transform: scale(1.1);
  }

  .comunidad-button {
    background-image: url('@/assets/boton-enviar.png');
    background-size: cover;
    background-position: center;
    color: white;
    height: 60px;
    width: 200px;
  }
.especializacion-imagen{
  padding: 15px;
  width: 100%;
  max-width: 150px;
  height: auto;
}
.especializacion-imagen-container{
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  text-align: center;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  margin-bottom: 20px;
  font-size: 22px;
}
.modal-content p {
  margin-bottom: 20px;
  font-size: 20px;
}

.modal-content button {
  font-size: 18px;
  padding: 10px 20px;
  margin-top: 20px;
  background-color: #7f1a6c;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #e97b0d;
}

.advertencia {
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee; /* Fondo rojo claro */
  border: 2px solid #ff1744; /* Borde rojo */
  border-radius: 10px; /* Bordes redondeados */
  color: #d32f2f; /* Color de texto rojo */
  font-size: 14px;
  text-align: center;
  font-weight: bold; /* Texto en negrita para mayor énfasis */
}

.advertencia p {
  margin: 0;
}

  @media screen and (max-width: 1024px) and (min-width: 769px) {
    .course-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-image: url('@/assets/background-caja-tablet.png');
    padding: 40px;
    border-radius: 70px;
    margin-bottom: 20px;
    color: white;
  }
  .course-box-tutoria {
  
  max-width: 250px;
  max-height: 270px;
  min-width: 250px;
  min-height: 270px;
  
}

.course-box-curso {
  
  max-width: 250px;
  max-height: 270px;
  min-width: 250px;
  min-height: 270px;

}

.course-box-especializacion {
 
  max-width: 250px;
  max-height: 270px;
  min-width: 250px;
  min-height: 270px;
  
}
  #payment-type{
    width:100%;
    height:20px;

  }
  #course-name{
    width:100%;
    height:20px;
  }
  }
/* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  .course-box {
    
    background-image: url('@/assets/background-caja-tablet.png');
   
    border-radius: 70px;
    
  }
  .form-group select, .form-group input {
  width:200px;
  padding: 7px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}
}

</style>
