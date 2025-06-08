<template>
  <div class="container">
    <E_Sidebar />
    <div class="content">
      <div class="logo-container">
        <img src="@/assets/logo-certificados.png" alt="Logo ENSEA" class="logo-plataforma"/>
      </div>
      <br />
      <div v-if="certificadosComprados.length > 0">
        <div class="certificate-box" v-for="certificado in certificadosComprados" :key="certificado.id">
          <div class="certificate-info">
            <div class="certificate-text">
              <h2>{{ certificado.nombre }}</h2>
              <p>{{ certificado.fechaDeEmision }}</p>
            </div>
            <button @click="downloadCertificate(certificado)" class="certificado-button"></button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No tienes certificados disponibles.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import E_Sidebar from '../components/E_Sidebar.vue';
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/data';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Schema } from '../../amplify/data/resource';
import { userId } from '../authenticator/auth';

const client = generateClient<Schema>();
const certificadosComprados = ref<any[]>([]);

// Función para cargar certificados comprados
const loadPurchasedCertificates = async () => {
  if (!userId.value) return;
  try {
    const response = await client.models.CertificadoComprado.list({
      filter: { usuarioId: { eq: userId.value } },
    });
    if (response.data) {
      const certificadoIds = response.data.map((certificadoComprado: any) => certificadoComprado.certificadoId);
      const certificadosResponse = await Promise.all(certificadoIds.map(async (id: string) => {
        const certificadoResponse = await client.models.Certificado.get({ id });
        return certificadoResponse.data;
      }));
      certificadosComprados.value = certificadosResponse.filter((certificado) => certificado !== null);
    }
  } catch (error) {
    console.error('Error al cargar certificados comprados:', error);
  }
};

// Función para descargar certificado en formato PDF
const downloadCertificate = (certificado: any) => {
  const doc = new jsPDF('landscape');

  const img = new Image();
  img.src = new URL('@/assets/nuevo-cert-1.png', import.meta.url).href; 
  img.onload = () => {
    doc.addImage(img, 'JPEG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
   // Texto principal superior con mayor margen superior
   doc.setFontSize(13);
    doc.setTextColor(0, 0, 0); // Negro
    doc.setFont('helvetica', 'normal');
    doc.text(
      'SEA SEÑAS EN ACCIÓN EXTIENDE EL PRESENTE CERTIFICADO A',
      doc.internal.pageSize.width / 2,
      55, // Coordenada Y ajustada para mayor margen superior
      { align: 'center' }
    );
    doc.text(
      `[ ${certificado.destinatario.toUpperCase()} ]`,
      doc.internal.pageSize.width / 2,
      65,
      { align: 'center' }
    );
    doc.text(
      'EN RECONOCIMIENTO POR HABER COMPLETADO CON ÉXITO EL',
      doc.internal.pageSize.width / 2,
      75,
      { align: 'center' }
    );
    doc.text(
      `[ ${certificado.cursoNombre.toUpperCase()} ]`,
      doc.internal.pageSize.width / 2,
      85,
      { align: 'center' }
    );

    // Mensaje de agradecimiento con menor interlineado
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const lineSpacing = 5; // Espaciado reducido
    const baseY = 100; // Coordenada Y inicial del mensaje
    const lines = [
      'AGRADECEMOS TU COMPROMISO Y DEDICACIÓN EN ESTE APRENDIZAJE EN LA PLATAFORMA ENSEA, QUE',
      'FOMENTA LA INCLUSIÓN Y LA COMUNICACIÓN ACCESIBLE. TU ESFUERZO CONTRIBUYE A CONSTRUIR',
      'UNA SOCIEDAD MÁS EMPÁTICA Y CONECTADA.',
    ];
    lines.forEach((line, index) => {
      doc.text(line, doc.internal.pageSize.width / 2, baseY + index * lineSpacing, { align: 'center' });
    });

    // Resto del contenido del certificado
    doc.setFontSize(15);
    doc.setTextColor(255, 102, 0); // Naranja para títulos relevantes
    doc.text(
      `Nombre del Certificado: ${certificado.nombre.toUpperCase()}`,
      doc.internal.pageSize.width / 2,
      130,
      { align: 'center' }
    );
    doc.text(
      `Destinatario: ${certificado.destinatario}`,
      doc.internal.pageSize.width / 2,
      140,
      { align: 'center' }
    );
    doc.text(
      `DNI: ${certificado.dniDestinatario}`,
      doc.internal.pageSize.width / 2,
      150,
      { align: 'center' }
    );

     // Fecha en la esquina inferior derecha
     doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Negro
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const marginRight = 35; // Margen derecho
    const marginBottom = 25; // Margen inferior
    doc.text(
      `Fecha de Certificación: ${certificado.fechaDeEmision}`,
      pageWidth - marginRight,
      pageHeight - marginBottom,
      { align: 'right' }
    );

    doc.save(`${certificado.nombre}.pdf`);
  };
};

onMounted(() => {
  loadPurchasedCertificates();
});
</script>

<style scoped>
.container {
  display: flex;
}

.content {
  margin-left: 220px;
  padding: 20px;
  width: calc(100% - 220px);
  
  position: relative;
}

.certificate-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('@/assets/background-caja.png');
  padding: 40px;
  border-radius: 40px;
  margin-bottom: 20px;
  color: white;
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

.certificate-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.certificate-text {
  flex-grow: 1;
}

.certificate-info h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.certificate-info p {
  margin: 10px 0;
  font-size: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}


.certificado-button {
  background-image: url('@/assets/boton-descargar.png');
  background-size: cover;
  background-position: center;
  color: white;
  height: 60px;
  width: 200px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}

.certificado-button:hover {
  background-color: #7f1a6c;
  transform: scale(1.1);
}
</style>
