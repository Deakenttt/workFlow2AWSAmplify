// base url
// export const BASE_URL = 'https://workflowbackendapi-production.up.railway.app';
// in react 
// export const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
// in Vite 
export const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;
console.log('Base URL:', BASE_URL);
