// Utilitário para debug de cookies e autenticação
export const debugAuth = {
  checkCookies: () => {
    console.log('🍪 Cookies disponíveis:', document.cookie);
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    console.log('🍪 Cookies parsed:', cookies);
    return cookies;
  },

  checkLocalStorage: () => {
    console.log('💾 LocalStorage keys:', Object.keys(localStorage));
    const authKeys = Object.keys(localStorage).filter(key => 
      key.includes('auth') || key.includes('user') || key.includes('token')
    );
    console.log('🔑 Auth-related localStorage:', authKeys.map(key => ({
      key,
      value: localStorage.getItem(key)
    })));
  },

  checkSessionStorage: () => {
    console.log('🗂️ SessionStorage keys:', Object.keys(sessionStorage));
    const authKeys = Object.keys(sessionStorage).filter(key => 
      key.includes('auth') || key.includes('user') || key.includes('token')
    );
    console.log('🔑 Auth-related sessionStorage:', authKeys.map(key => ({
      key,
      value: sessionStorage.getItem(key)
    })));
  },

  fullAuthCheck: () => {
    console.log('🔍 === DEBUG AUTH STATE ===');
    debugAuth.checkCookies();
    debugAuth.checkLocalStorage();
    debugAuth.checkSessionStorage();
    console.log('🔍 === END DEBUG AUTH ===');
  }
};

// Disponibiliza globalmente para debug no console
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuth;
}