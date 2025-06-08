<template>
  <div class="container">
    <A_Sidebar />
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-aprobar.png" alt="Logo ENSEA" class="logo-plataforma" />
      </div>
      <br />
      <br />

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por nombre, correo o DNI"
        class="search-bar"
      />
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else>
        <div v-for="comprobante in filteredComprobantes" :key="comprobante.id" class="user-item">
          <div class="user-details">
            <div class="user-name">
              <strong>Email:</strong> {{ comprobante.email }}
            </div>
            <div class="user-name">
              <strong>Producto:</strong> {{ comprobante.nombreSeleccionado }}
            </div>
            <div class="user-name">
              <strong>Tipo de Pago:</strong> {{ comprobante.tipoPago }}
            </div>
            <button @click="verComprobante(comprobante.comprobanteLink)" class="comprobante-button">
            </button>
            <button @click="validarYAgregarUsuario(comprobante)" class="aprobar-button"></button>

          <button @click="rechazarComprobante(comprobante.id)" class="rechazar-button"></button>
          </div>
        </div>
      </div>
       <!-- Modal de Aprobación -->
       <div v-if="showAprobadoModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Comprobante Aprobado</h2>
          <p>El usuario ha sido habilitado correctamente para el {{ aprobadoProducto }}</p>
          <button @click="closeAprobadoModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import A_Sidebar from '../components/A_Sidebar.vue';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import { useRouter } from 'vue-router';

const router = useRouter();

const client = generateClient<Schema>();
const comprobantes = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const showAprobadoModal = ref(false);
const aprobadoProducto = ref('');
const route = useRoute();

/* const userId = ref(''); 
const entityType = ref(route.query.entityType as string);
const entityId = ref(route.query.entityId as string);*/

const loadComprobantes = async () => {
  try {
    const response = await client.models.Comprobante.list({
      filter: { estado: { eq: "pendiente" } } // Filtrar solo comprobantes pendientes
    });
    if (response.data) {
      comprobantes.value = response.data.map((comprobante: any) => ({
        ...comprobante,
      }));
    }
  } catch (error) {
    console.error('Error al cargar comprobantes:', error);
  } finally {
    loading.value = false;
  }
};

// Validación y habilitación de usuario
const validarYAgregarUsuario = (comprobante: any) => {
  if (!comprobante.usuarioId || !comprobante.nombreSeleccionado || !comprobante.tipoEntidad) {
    alert("Faltan parámetros del comprobante.");
    return;
  }
  agregarUsuario(comprobante);
};

// Función mejorada para obtener el ID de la entidad por nombre
const obtenerEntityIdPorNombre = async (entityType: string, nombre: string): Promise<string | null> => {
  try {
    if (entityType === 'curso') {
      const { data: cursos, errors } = await client.models.Curso.list({
        filter: { nombre: { eq: nombre } }
      });
      
      if (errors) throw new Error(errors[0].message);
      if (!cursos || cursos.length === 0) {
        console.error(`No se encontró curso con nombre: ${nombre}`);
        return null;
      }
      
      // Ordenar por fecha de creación (el más reciente primero)
      const cursosOrdenados = [...cursos].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      return cursosOrdenados[0].id;
      
    } else if (entityType === 'especializacion') {
      const { data: especializaciones } = await client.models.Especializacion.list({ 
        filter: { nombre: { eq: nombre } } 
      });
      return especializaciones[0]?.id || null;
      
    } else if (entityType === 'tutoria') {
      const { data: tutorias } = await client.models.Tutoria.list({ 
        filter: { nombre: { eq: nombre } } 
      });
      return tutorias[0]?.id || null;
    }
    
    return null;
  } catch (error) {
    console.error(`Error al obtener ${entityType} por nombre:`, error);
    return null;
  }
};

// Función mejorada para agregar usuario
const agregarUsuario = async (comprobante: any) => {
  try {
    const { usuarioId, nombreSeleccionado, tipoEntidad } = comprobante;
    
    // Validaciones básicas
    if (!usuarioId || !nombreSeleccionado || !tipoEntidad) {
      throw new Error('Faltan datos esenciales en el comprobante');
    }

    // Obtener ID de la entidad
    const entityId = await obtenerEntityIdPorNombre(tipoEntidad, nombreSeleccionado);
    if (!entityId) {
      throw new Error(`No se pudo encontrar el ${tipoEntidad} con nombre: ${nombreSeleccionado}`);
    }

    // Obtener datos del usuario
    const { data: usuarioData } = await client.models.Usuario.get({ id: usuarioId });
    if (!usuarioData) throw new Error('Usuario no encontrado');

    // Crear registro según el tipo de entidad
    let creationResult;
    if (tipoEntidad === 'curso') {
      creationResult = await client.models.CursoComprado.create({
        usuarioId,
        cursoId: entityId,
        usuarioNombre: usuarioData.nombre,
        usuarioCorreo: usuarioData.correo,
      });
    } else if (tipoEntidad === 'especializacion') {
      creationResult = await client.models.EspecializacionComprada.create({
        usuarioId,
        especializacionId: entityId,
        usuarioNombre: usuarioData.nombre,
        usuarioCorreo: usuarioData.correo,
      });
    } else if (tipoEntidad === 'tutoria') {
      creationResult = await client.models.TutoriaComprada.create({
        usuarioId,
        tutoriaId: entityId,
        usuarioNombre: usuarioData.nombre,
        usuarioCorreo: usuarioData.correo,
      });
    } else {
      throw new Error('Tipo de entidad no reconocido');
    }

    // Actualizar estado del comprobante
    await client.models.Comprobante.update({
      id: comprobante.id,
      estado: "aprobado",
    });

    // Actualizar lista local de comprobantes
    comprobantes.value = comprobantes.value.filter(c => c.id !== comprobante.id);

    // Mostrar modal de éxito
    aprobadoProducto.value = nombreSeleccionado;
    showAprobadoModal.value = true;

  } catch (error) {
    console.error('Error en el proceso de aprobación:', error);
    
    let errorMessage = 'Error al aprobar el comprobante';
    if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    
    alert(errorMessage);
  }
};



// Función para rechazar comprobante y removerlo por ID
const rechazarComprobante = async (comprobanteId: string) => {
  try {
    // Actualizar el estado del comprobante a "rechazado"
    await client.models.Comprobante.update({
      id: comprobanteId,
      estado: "rechazado",
    });

    // Eliminar el comprobante de la lista local
    comprobantes.value = comprobantes.value.filter(comprobante => comprobante.id !== comprobanteId);

  } catch (error) {
    console.error('Error al rechazar el comprobante:', error);
    alert('Error al rechazar el comprobante.');
  }
};



const verComprobante = (link: string) => {
  window.open(link, '_blank');
};

const closeAprobadoModal = () => {
  showAprobadoModal.value = false;
  router.push('/plataforma-administrador');
};

// Filtrar comprobantes pendientes y por la búsqueda
const filteredComprobantes = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return comprobantes.value.filter(comprobante =>
    comprobante.estado === "pendiente" && // Solo mostrar comprobantes pendientes
    ((comprobante.usuario?.nombre?.toLowerCase() ?? '').includes(query) ||
     (comprobante.usuario?.correo?.toLowerCase() ?? '').includes(query) ||
     (comprobante.usuario?.dni?.toLowerCase() ?? '').includes(query))
  );
});


onMounted(() => {
  loadComprobantes();
});
</script>

<style scoped>
body, html  {
font-family: Arial, sans-serif;
background-color: #f0f0f0;
margin: 0;
padding: 0;
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
background-size: cover;
background-position: center;
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

.search-bar {
padding: 10px;
font-size: 16px;
border: 1px solid #000000;
border-radius: 5px;
width: 100%;
margin-bottom: 20px;
box-sizing: border-box;
text-align: center;
}

.user-name {
  display: inline-block;
  margin-right: 20px;
}

.user-item {
  margin: 10px 20px;
  padding: 30px;
  border: 1px solid #000000;
  color: #000000;
  background-image: url('@/assets/background-caja.png');
  border-radius: 45px;
}

.user-item button {
background-color: white;
color: #000000;
border: 1px solid #000000;
padding: 15px;
border-radius: 30px;
cursor: pointer;
font-size: 20px;
transition: transform 0.3s;
}

.user-item button:hover {
background-color: #7f1a6c;
color: white;
transform: scale(1.1);
}

.comprobante-button {
background-image: url('@/assets/boton-comprobante.png');
background-size: cover;
background-position: center;
color: white;
height: 35px;
width: 120px;
}

.aprobar-button {
background-image: url('@/assets/boton-aprobar.png');
background-size: cover;
background-position: center;
color: white;
height: 35px;
width: 120px;
}

.rechazar-button {
background-image: url('@/assets/boton-rechazar.png');
background-size: cover;
background-position: center;
color: white;
height: 35px;
width: 120px;
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
@media screen and (max-width: 1024px) and (min-width: 769px) {
  .user-item button {
background-color: white;
color: #000000;
border: 1px solid #000000;
padding: 20px;
border-radius: 30px;
cursor: pointer;
font-size: 20px;
transition: transform 0.3s;
}

.user-item button:hover {
background-color: #7f1a6c;
color: white;
transform: scale(1.1);
}

.comprobante-button {
background-image: url('@/assets/boton-comprobante.png');
background-size: cover;
background-position: center;
color: white;
height: 40px;
width: 150px;
}

.aprobar-button {
background-image: url('@/assets/boton-aprobar.png');
background-size: cover;
background-position: center;
color: white;
height: 40px;
width: 150px;
}

.rechazar-button {
background-image: url('@/assets/boton-rechazar.png');
background-size: cover;
background-position: center;
color: white;
height: 40px;
width: 150px;
}
}
</style>
