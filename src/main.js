// src/main.ts
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChalkboardUser, faGraduationCap, faSchool, faCertificate, faUser } from '@fortawesome/free-solid-svg-icons';
import router from './router/routes'; // Asegúrate de que la ruta sea correcta

// Configura Amplify con los outputs
Amplify.configure(outputs);

// Agrega los iconos que deseas usar al objeto library
library.add(faChalkboardUser, faGraduationCap, faSchool, faCertificate, faUser);

const app = createApp(App);

// Registra el componente global de FontAwesomeIcon
app.component('font-awesome-icon', FontAwesomeIcon);

// Usa el router en la aplicación
app.use(router);

app.mount('#app');
