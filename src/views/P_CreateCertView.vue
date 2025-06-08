<template>
  <div class="container">
    <P_Sidebar/>
    <div class="content">
      <div class="logo-container">
          <img src="@/assets/logo-certificados-profesor.png" alt="Logo ENSEA" class="logo-plataforma"/>
        </div>
      <br>
      <br>
      <form @submit.prevent="createCertificate">
        <div class="form-group">
          <label for="certificate-name">Nombre del Certificado</label>
          <input id="certificate-name" v-model="certificateName" placeholder="Escribe aquí el nombre del certificado" />
        </div>
        
        <!-- Search bar para seleccionar destinatario -->
        <div class="form-group">
          <label for="recipient-search">Buscar Destinatario</label>
          <input
            id="recipient-search"
            type="text"
            v-model="searchQuery"
            @focus="showUserDropdown = true"
            placeholder="Buscar por nombre, correo o DNI"
          />
          <div v-if="showUserDropdown" class="user-dropdown">
            <div 
              v-for="user in filteredUsers" 
              :key="user.id"
              class="user-dropdown-item"
              @click="selectUser(user)"
            >
              {{ user.nombre }} - {{ user.dni }} - {{ user.correo }}
            </div>
          </div>
        </div>

        <!-- Campos llenados automáticamente -->
        <div class="form-group">
          <label for="selected-name">Nombre del Destinatario</label>
          <input id="selected-name" v-model="selectedUserName" readonly />
        </div>
        
        <div class="form-group">
          <label for="selected-dni">DNI del Destinatario</label>
          <input id="selected-dni" v-model="selectedUserDni" readonly />
        </div>

        <div class="form-group">
          <label for="issue-date">Fecha de Emisión</label>
          <input id="issue-date" v-model="issueDate" type="date" />
        </div>

        <div class="form-group">
          <label for="course-name">Nombre del Curso, Especialización o Tutoría</label>
          <select id="course-name" v-model="selectedName">
            <option v-for="course in courses" :key="course.id" :value="course.nombre">
              {{ course.nombre }} (Curso)
            </option>
            <option v-for="specialization in specializations" :key="specialization.id" :value="specialization.nombre">
              {{ specialization.nombre }} (Especialización)
            </option>
            <option v-for="tutoria in tutorias" :key="tutoria.id" :value="tutoria.nombre">
              {{ tutoria.nombre }} (Tutoría)
            </option>
          </select>
        </div>
        <div class="button-container">

        <button type="submit">Guardar Certificado</button>
      </div>
      </form>

      <div v-if="showConfirmationModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Certificado Creado Exitosamente</h2>
          <p>El certificado ha sido guardado correctamente.</p>
          <button @click="redirectToAdminCreate">Ir al Inicio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import P_Sidebar from '../components/P_Sidebar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();
const router = useRouter();

const certificateName = ref('');
const recipientId = ref('');
const selectedUserName = ref('');
const selectedUserDni = ref('');
const issueDate = ref('');
const selectedName = ref('');
const courses = ref<any[]>([]);
const specializations = ref<any[]>([]);
const tutorias = ref<any[]>([]);
const users = ref<any[]>([]);
const searchQuery = ref('');
const showUserDropdown = ref(false);
const showConfirmationModal = ref(false);

onMounted(async () => {
  try {
    const coursesResponse = await client.models.Curso.list();
    const specializationsResponse = await client.models.Especializacion.list();
    const tutoriasResponse = await client.models.Tutoria.list();
    const usersResponse = await client.models.Usuario.list();

    if (coursesResponse?.data) courses.value = coursesResponse.data;
    if (specializationsResponse?.data) specializations.value = specializationsResponse.data;
    if (tutoriasResponse?.data) tutorias.value = tutoriasResponse.data;
    if (usersResponse?.data) users.value = usersResponse.data;
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
    (user.nombre?.toLowerCase() ?? '').includes(query) ||
    (user.correo?.toLowerCase() ?? '').includes(query) ||
    (user.dni?.toLowerCase() ?? '').includes(query)
  );
});

const selectUser = (user: any) => {
  recipientId.value = user.id;
  selectedUserName.value = user.nombre;
  selectedUserDni.value = user.dni;
  showUserDropdown.value = false; // Ocultar el dropdown después de seleccionar
  searchQuery.value = ''; // Limpiar el search bar después de seleccionar
};

const createCertificate = async () => {
  try {
    const newCertificate = await client.models.Certificado.create({
      nombre: certificateName.value,
      destinatario: selectedUserName.value,
      dniDestinatario: selectedUserDni.value,
      fechaDeEmision: issueDate.value,
      cursoNombre: selectedName.value,
    });

    if (newCertificate.data) {
      // Crear la relación en CertificadoComprado
      await client.models.CertificadoComprado.create({
        certificadoId: newCertificate.data.id,
        usuarioId: recipientId.value,
        usuarioNombre: selectedUserName.value,
        usuarioCorreo: users.value.find((user) => user.id === recipientId.value)?.correo,
      });

      showConfirmationModal.value = true;
    } else {
      throw new Error('Error al crear el certificado, el objeto data es nulo.');
    }
  } catch (error) {
    console.error('Error al crear el certificado:', error);
  }
};

const redirectToAdminCreate = () => {
  showConfirmationModal.value = false;
  router.push('/plataforma-profesor');
};
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
}

.content {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
  position: relative;
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

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.button-container {
  display: flex;
  justify-content: center; /* Centra el botón horizontalmente */
  margin-top: 20px; /* Añade espacio superior para separación */
}

button[type="submit"] {
  background-color: #7f1a6c;
  color: #ffffff;
  border: 1px solid #000000;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  transition: transform 0.3s;
  
}

button[type="submit"]:hover {
  background-color: #e97b0d;
  color: white;
  transform: scale(1.1);
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


/* Estilos para el dropdown de usuarios */
.user-dropdown {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 5px;
  padding: 0;
}

.user-dropdown-item {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Efecto hover */
.user-dropdown-item:hover {
  background-color: #e97b0d;
  color: white;
  cursor: pointer;
}
</style>
