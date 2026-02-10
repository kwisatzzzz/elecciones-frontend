import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000/api', // Puerto 8000 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials: true // Necesario para Sanctum
});

// INTERCEPTOR REQUEST: Inyectar Token
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// INTERCEPTOR RESPONSE: Manejar Token Vencido
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default client;