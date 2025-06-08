// src/shims-vue.d.ts
declare module 'aws-amplify';

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
  }
  
  // Declaration for your routes module if you are importing it
declare module './router/routes' {
    import { RouteRecordRaw } from 'vue-router';
    const routes: RouteRecordRaw[];
    export default routes;
  }

  // Declaration for auth module
declare module './authenticator/auth' {
  const isAuthenticated: import('vue').Ref<boolean>;
  const login: () => void;
  const logout: () => void;
  const checkAuth: () => boolean;
  export { isAuthenticated, login, logout, checkAuth };
}