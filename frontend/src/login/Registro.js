import React, { useState } from 'react';
import api from '../api/axios';
import './Registro.css';

const Registro = () => {
  const [form, setForm] = useState({
    nombre_completo: '',
    correo: '',
    contraseña: '',
    rol: '',

    // Campos adicionales según el rol
    grado: '',
    seccion: '',
    establecimiento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/registro', form);
      alert('Usuario registrado exitosamente');
    } catch (error) {
      alert('Error al registrar: ' + (error.response?.data?.message || 'Intenta más tarde'));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <input
          name="nombre_completo"
          placeholder="Nombre completo"
          value={form.nombre_completo}
          onChange={handleChange}
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />
        <input
          name="contraseña"
          type="password"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={handleChange}
        />

        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="">Selecciona un rol</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Docente">Docente</option>
          <option value="Directora">Directora</option>
          <option value="Administrador">Administrador</option>
        </select>

        {/* Mostrar solo si el rol seleccionado es Estudiante */}
        {form.rol === 'Estudiante' && (
          <>
          <input
              name="codigo_estudiante"
              placeholder="codigo_estudiante"
              value={form.codigo_estudiante}
              onChange={handleChange}
            />
          <select
    name="grado"
    value={form.grado}
    onChange={handleChange}
    className="block w-full p-2 mb-4 border rounded"
  >
    <option value="">Seleccione un grado</option>
    <option value="Primero Básico">Primero Básico</option>
    <option value="Segundo Básico">Segundo Básico</option>
    <option value="Tercero Básico">Tercero Básico</option>
  </select>
           <input
              name="fecha_nacimiento"
              type="date"
              placeholder="Fecha de nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
            />
            <input
              name="responsable"
              placeholder="Nombre del responsable"
              value={form.responsable}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Registrar</button>
        
      </form>
    </div>
    
  );
  
};


export default Registro;
