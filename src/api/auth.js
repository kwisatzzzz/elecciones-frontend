import client from '../config/axios';

// 1. Iniciar Sesión
export const login = async (nombre_usuario, contrasena) => {
    // Obtener cookie CSRF
    await client.get('/sanctum/csrf-cookie'); 
    
    // Petición Login
    const response = await client.post('/login', { 
        nombre_usuario, 
        contrasena 
    });
    
    // Extraer datos (ajustado a tu AuthController)
    const { token, usuario } = response.data.data;
    
    if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    
    return usuario;
};

// 2. Obtener Usuario Actual
export const me = async () => {
    const { data } = await client.get('/me');
    return data.data; // Tu backend devuelve { success: true, data: {...} }
};

// 3. Obtener Permisos (¡ESTA ES LA QUE FALTABA!) 🚨
export const permissions = async () => {
    const { data } = await client.get('/permissions');
    return data.data; // Devuelve el array de permisos
};

// 4. Cerrar Sesión
export const logout = async () => {
    await client.post('/logout');
    localStorage.clear();
};