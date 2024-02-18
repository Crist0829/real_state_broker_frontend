import Axios from 'axios'

const axios = Axios.create({
    baseURL: import.meta.env.BASE_URL_BACKEND || 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept' : 'application/json'
    },
    /* withCredentials: true,
    withXSRFToken: true */
})

/* axios.interceptors.request.use((config)=>{
    
}) */

// Añade un interceptor para incluir el token en las solicitudes
axios.interceptors.request.use(
    (config) => {
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Maneja errores de la solicitud
        return Promise.reject(error);
    }
);

export default axios