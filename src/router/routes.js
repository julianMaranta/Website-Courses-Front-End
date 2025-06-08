import { createRouter, createWebHistory } from 'vue-router';
import { checkAuth } from '../authenticator/auth';

const routes = [
  /* RUTAS ADMINISTRADOR - LOGIN */
  {
    path: '/login-admin',
    name: 'login-admin',
    component: () => import('../views/A_LoginView.vue'),
    meta: { requiresAuth: true }
  },
  /* RUTAS ADMINISTRADOR - EXCEL */

  {
    path: '/descargar-informe',
    name: 'descargar-informe',
    component: () => import('../views/A_ExcelView.vue'),
    meta: { requiresAuth: true }
  },

 /* RUTAS ADMINISTRADOR - HABILITAR */

 {
  path: '/plataforma-administrador-habilitar',
  name: 'plataforma-administrador-habilitar',
  component: () => import('../views/A_HabilitarView.vue'),
  meta: { requiresAuth: true }
},

{
  path: '/plataforma-administrador-productos',
  name: 'plataforma-administrador-productos',
  component: () => import('../views/A_ProductosView.vue'),
  meta: { requiresAuth: true }
},

 /* RUTAS ADMINISTRADOR - ELIMINAR */
 {
  path: '/delete-tutoria',
  name: 'delete-tutoria',
  component: () => import('../views/A_DeleteTutoriaView.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/delete-especializacion',
  name: 'delete-especializacion',
  component: () => import('../views/A_DeleteEspecializacionView.vue'),
  meta: { requiresAuth: true }
},
  {
    path: '/delete-course',
    name: 'delete-course',
    component: () => import('../views/A_DeleteCourseView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/delete-user',
    name: 'delete-user',
    component: () => import('../views/A_DeleteUserView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plataforma-administrador-eliminar',
    name: 'plataforma-administrador-eliminar',
    component: () => import('../views/A_DeleteView.vue'),
    meta: { requiresAuth: true }
  },
  /* RUTAS ADMINISTRADOR - EDITAR */
   {
    path: '/user-list',
    name: 'user-list',
    component: () => import('../views/A_EditUserView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tutoria-list',
    name: 'tutoria-list',
    component: () => import('../views/A_EditTutoriaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/especializacion-list',
    name: 'especializacion-list',
    component: () => import('../views/A_EditEspecializacionView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course-list',
    name: 'course-list',
    component: () => import('../views/A_EditCourseView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plataforma-administrador-editar',
    name: 'plataforma-administrador-editar',
    component: () => import('../views/A_EditView.vue'),
    meta: { requiresAuth: true }
  },
  /* RUTAS ADMINISTRADOR - CREAR*/
  {
    path: '/plataforma-administrador-crear-especializacion',
    name: 'plataforma-administrador-crear-especializacion',
    component: () => import('../views/A_CreateEspecializacionView.vue'),
    meta: { hideNavBarAndFooter: true }
  },
  {
    path: '/plataforma-administrador-crear-tutoria',
    name: 'plataforma-administrador-crear-tutoria',
    component: () => import('../views/A_CreateTutoriaView.vue'),
    meta: { hideNavBarAndFooter: true }
  },
  {
    path: '/plataforma-administrador-crear-curso',
    name: 'plataforma-administrador-crear-curso',
    component: () => import('../views/A_CreateCourseView.vue'),
    meta: { hideNavBarAndFooter: true }
  },
  {
    path: '/plataforma-administrador-crear-usuario',
    name: 'plataforma-administrador-crear-usuario',
    component: () => import('../views/A_CreateUserView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plataforma-administrador-crear',
    name: 'plataforma-administrador-crear',
    component: () => import('../views/A_CreateView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/comunidad-sea-administrador',
    name: 'comunidad-sea-administrador',
    component: () => import('../views/A_ComunidadSEAView.vue')
  },
  {
    path: '/configurar-perfil-administrador',
    name: 'configurar-perfil-administrador',
    component: () => import('../views/A_ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/plataforma-administrador',
    name: 'plataforma-administrador',
    component: () => import('../views/A_PlataformaView.vue'),
    meta: { requiresAuth: true }
  },
   /* RUTAS PROFESOR - LOGIN */
   {
    path: '/login-profesor',
    name: 'login-profesor',
    component: () => import('../views/P_LoginView.vue'),
    meta: { requiresAuth: true }
  },
  /* RUTAS PROFESOR */
  {
    path: '/asignados',
    name: 'asignados',
    component: () => import('../views/P_AsignadosView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/configurar-perfil-profesor',
    name: 'configurar-perfil-profesor',
    component: () => import('../views/P_ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/clase-tutoria-profesor/:id',
    name: 'clase-tutoria-profesor',
    component: () => import('../views/P_ClasesTutoriaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reproductor-clase-profesor/:id',
    name: 'reproductor-clase-profesor',
    component: () => import('../views/P_ReproductorClaseView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listado-especializaciones-profesor/:id',
    name: 'listado-especializaciones-profesor',
    component: () => import('../views/P_ClasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listado-tutorias-profesor/:id',
    name: 'tutoria-profesor',
    component: () => import('../views/P_ClasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listado-clases-profesor/:id',
    name: 'listado-clases-profesor',
    component: () => import('../views/P_ClasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/crear-certificado',
    name: 'crear-certificado',
    component: () => import('../views/P_CreateCertView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/comunidad-sea-profesor',
    name: 'comunidad-sea-profesor',
    component: () => import('../views/P_ComunidadSEAView.vue')
  },
  {
    path: '/plataforma-profesor',
    name: 'plataforma-profesor',
    component: () => import('../views/P_PlataformaView.vue'),
    meta: { requiresAuth: true }
  },
  /* RUTAS ESTUDIANTE */
  {
    path: '/soporte',
    name: 'soporte',
    component: () => import('../views/E_SoporteView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/datos-transferencia',
    name: 'datos-transferencia',
    component: () => import('../views/E_DatosTransferencia.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/mis-compras',
    name: 'mis-compras',
    component: () => import('../views/E_ComprasView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/descargar-certificado',
    name: 'descargar-certificado',
    component: () => import('../views/E_CertificadosView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/clase-tutoria/:id',
    name: 'clase-tutoria',
    component: () => import('../views/E_ClasesTutoriaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reproductor-clase/:id',
    name: 'reproductor-clase',
    component: () => import('../views/E_ReproductorClaseView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/detalles-especializacion/:id',
    name: 'detalles-especializacion',
    component: () => import('../views/E_DetallesCursoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/detalles-tutoria/:id',
    name: 'detalles-tutoria',
    component: () => import('../views/E_DetallesCursoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/detalles-curso/:id',
    name: 'detalles-curso',
    component: () => import('../views/E_DetallesCursoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/aprobar-comprobantes',
    name: 'aprobar-comprobantes',
    component: () => import('../views/A_AprobarComprobantes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/catalogo-cursos',
    name: 'catalogo-cursos',
    component: () => import('../views/E_CatalogoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listado-especializaciones/:id',
    name: 'listado-especializaciones',
    component: () => import('../views/E_ClasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listado-tutorias/:id',
    name: 'tutoria',
    component: () => import('../views/E_ClasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/listado-clases/:id',
    name: 'listado-clases',
    component: () => import('../views/E_ClasesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/configurar-perfil-estudiante',
    name: 'configurar-perfil-estudiante',
    component: () => import('../views/E_ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/comunidad-sea-estudiante',
    name: 'comunidad-sea-estudiante',
    component: () => import('../views/E_ComunidadSEAView.vue')
  },
  {
    path: '/plataforma-estudiante',
    name: 'plataforma-estudiante',
    component: () => import('../views/E_PlataformaView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/recuperar-contrasena',
    name: 'recuperar-contrasena',
    component: () => import('../views/RecoverPassword.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/E_RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/E_LoginView.vue')
  },
  {
    path: '/entry-option',
    name: 'entry-option',
    component: () => import('../views/EntryOptionView.vue')
  },
  {
    path: '/',
    name: 'inicio',
    component: () => import('../views/L_InicioView.vue')
  },
 
  {
    path: '/contactanos',
    name: 'contactanos',
    component: () => import('../views/L_ContactanosView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: () => import('../views/L_CursosView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nosotros',
    name: 'nosotros',
    component: () => import('../views/L_NosotrosView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nivel1',
    name: 'nivel1',
    component: () => import('../views/L_Nivel1View.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nivel2',
    name: 'nivel2',
    component: () => import('../views/L_Nivel2View.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nivel3',
    name: 'nivel3',
    component: () => import('../views/L_Nivel3View.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nivel4',
    name: 'nivel4',
    component: () => import('../views/L_Nivel4View.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nivel5',
    name: 'nivel5',
    component: () => import('../views/L_Nivel5View.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/nivel6',
    name: 'nivel6',
    component: () => import('../views/L_Nivel6View.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/carrefour',
    name: 'carrefour',
    component: () => import('../views/L_CarrefourView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/disney',
    name: 'disney',
    component: () => import('../views/L_DisneyView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/makro',
    name: 'makro',
    component: () => import('../views/L_MakroView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/ate',
    name: 'ate',
    component: () => import('../views/L_AteView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/swiss',
    name: 'swiss',
    component: () => import('../views/L_SwissView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/sac',
    name: 'sac',
    component: () => import('../views/L_SacView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/trenes',
    name: 'trenes',
    component: () => import('../views/L_TrenesView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/info-empresas',
    name: 'info-empresas',
    component: () => import('../views/L_InfoEmpresasView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/promo',
    name: 'promo',
    component: () => import('../views/L_PromoView.vue'),
    meta: { hideNavBarAndFooter: false }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
];

// Crea el enrutador
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/*router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!checkAuth()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});*/


export default router;
