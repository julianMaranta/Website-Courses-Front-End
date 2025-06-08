// auth.d.ts
declare module '../authenticator/auth' {
    import { Ref } from 'vue';
  
    const isAuthenticated: Ref<boolean>;
    const login: () => void;
    const logout: () => void;
    const checkAuth: () => boolean;
    export { isAuthenticated, login, logout, checkAuth };
  }
  