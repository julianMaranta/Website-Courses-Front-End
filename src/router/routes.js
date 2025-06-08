import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  

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




export default router;
