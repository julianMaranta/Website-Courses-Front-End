<template>
    <div class="container">
    <A_Sidebar/>
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-descarga-informes.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br>   
      <br>
      
        <div class="export-buttons">
          <button @click="exportUsuariosToExcel">Excel de Usuarios</button>
          <button @click="exportCursosToExcel">Excel de Cursos</button>
          <button @click="exportEspecializacionesToExcel">Excel de Especializaciones</button>
          <button @click="exportTutoriasToExcel">Excel de Tutorías</button>
          <button @click="exportClasesToExcel">Excel de Clases</button>
          <button @click="exportCertificadosToExcel">Excel de Certificados</button>
        </div>
        <div v-if="loading" class="loading">Cargando datos...</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import A_Sidebar from '../components/A_Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import * as XLSX from 'xlsx';
  import { generateClient } from 'aws-amplify/data';
  import type { Schema } from '../../amplify/data/resource';
  
  const client = generateClient<Schema>();
  const router = useRouter();
  
  const usuarios = ref<any[]>([]);
  const cursos = ref<any[]>([]);
  const especializaciones = ref<any[]>([]);
  const tutorias = ref<any[]>([]);
  const clases = ref<any[]>([]);
  const certificados = ref<any[]>([]);
  const loading = ref(true);

  
  const loadData = async () => {
    try {
      // Cargar datos de Usuarios
      const usuariosResponse = await client.models.Usuario.list();
      if (usuariosResponse.data) {
        usuarios.value = usuariosResponse.data.map((user: any) => ({
          ...user,
          contrasena: ''  // Omite contraseñas por seguridad
        }));
      }
  
      // Cargar datos de Cursos
      const cursosResponse = await client.models.Curso.list();
      if (cursosResponse.data) {
        cursos.value = cursosResponse.data;
      }
  
      // Cargar datos de Especializaciones
      const especializacionesResponse = await client.models.Especializacion.list();
      if (especializacionesResponse.data) {
        especializaciones.value = especializacionesResponse.data;
      }
  
      // Cargar datos de Tutorías
      const tutoriasResponse = await client.models.Tutoria.list();
      if (tutoriasResponse.data) {
        tutorias.value = tutoriasResponse.data;
      }
  
      // Cargar datos de Clases
      const clasesResponse = await client.models.Clase.list();
      if (clasesResponse.data) {
        clases.value = clasesResponse.data;
      }

       // Cargar datos de Certificados
       const certificadosResponse = await client.models.Certificado.list();
      if (certificadosResponse.data) {
        certificados.value = certificadosResponse.data;
      }
  
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      loading.value = false;
    }
  };
  
  const exportToExcel = (data: any[], sheetName: string, fileName: string) => {
    if (data.length === 0) {
      console.warn(`No hay datos de ${sheetName.toLowerCase()} para exportar`);
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, fileName);
  };
  
  const exportUsuariosToExcel = () => exportToExcel(usuarios.value, 'Usuarios', 'usuarios.xlsx');
  const exportCursosToExcel = () => exportToExcel(cursos.value, 'Cursos', 'cursos.xlsx');
  const exportEspecializacionesToExcel = () => exportToExcel(especializaciones.value, 'Especializaciones', 'especializaciones.xlsx');
  const exportTutoriasToExcel = () => exportToExcel(tutorias.value, 'Tutorías', 'tutorias.xlsx');
  const exportClasesToExcel = () => exportToExcel(clases.value, 'Clases', 'clases.xlsx');
  const exportCertificadosToExcel = () => exportToExcel(certificados.value, 'Certificados', 'certificados.xlsx');
  
  onMounted(() => {
    loadData();
  });
  </script>
  
  <style scoped>
  body, html  {
  font-family: Arial, sans-serif;
  
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
  
  h1 {
    font-size: 24px;
  }
  
  .export-buttons button {
    background-color: #e97b0d;
    color: white;
    border: none;
    padding: 15px 70px;
    margin: 10px 20px;
    cursor: pointer;
    border-radius: 50px;
    font-size: 20px;
    transition: transform 0.3s;
  }
  
  .export-buttons button:hover {
    background-color: #7f1a6c;
    
    border: 1px solid #000000;
    transform: scale(1.1);
  }
  
  .loading {
    font-size: 18px;
    color: #7f1a6c;
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
  /* Media query para notebooks estándar (ej: 1024px - 1366px) */
@media screen and (min-width: 1024px) and (max-width: 1366px) {

}
  </style>
  