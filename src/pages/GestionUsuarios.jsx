import React, { useEffect, useState } from 'react';
import client from '../config/axios';
import { Edit, Trash2, Plus, Search, UserCircle } from 'lucide-react';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar usuarios
  const cargarUsuarios = async () => {
    try {
        const response = await client.get('/usuarios');
       
        setUsuarios(response.data.data.data); 
    } catch (err) {
        console.error("Error:", err);
        setError("No se pudieron cargar los usuarios.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const getIniciales = (nombre, apellido) => {
    return `${nombre?.charAt(0) || ''}${apellido?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-8 bg-red-600 rounded-full"></span> 
            Directorio de Usuarios
          </h1>
          <p className="text-gray-500 mt-1 ml-4 text-sm">Gestión de accesos del sistema</p>
        </div>
        
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-md transition-all">
           <Plus size={18} /> Nuevo Usuario
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
            <div className="p-10 text-center text-gray-500">Cargando usuarios...</div>
        ) : error ? (
            <div className="p-10 text-center text-red-500">{error}</div>
        ) : (
            <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Usuario</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Nombre Real</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Rol</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">Estado</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {usuarios.map((u) => (
                <tr key={u.id_usuario} className="hover:bg-red-50/10 transition group">
                    
                    {/* Usuario */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-100 p-2 rounded-full text-red-600">
                                <UserCircle size={20}/>
                            </div>
                            <span className="font-bold text-gray-800">@{u.nombre_usuario}</span>
                        </div>
                    </td>

                    {/* Nombre (Relación Persona) */}
                    <td className="px-6 py-4">
                        {u.persona ? (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                    {u.persona.nombre} {u.persona.apellido_paterno}
                                </span>
                                <span className="text-xs text-gray-400">CI: {u.persona.ci}</span>
                            </div>
                        ) : (
                            <span className="text-xs text-gray-400 italic">Sin persona asignada</span>
                        )}
                    </td>

                    {/* Rol */}
                    <td className="px-6 py-4">
                        {u.roles && u.roles.length > 0 ? (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                                {u.roles[0].name}
                            </span>
                        ) : (
                            <span className="text-gray-400 text-xs">Sin Rol</span>
                        )}
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {u.activo ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                    </td>

                    {/* Botones */}
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition"><Edit size={16}/></button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"><Trash2 size={16}/></button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
};

export default GestionUsuarios;