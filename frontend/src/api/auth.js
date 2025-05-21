import axios from 'axios';

const API = 'http://localhost:3000/auth'; // Ruta base del módulo auth

export const loginRequest = async ({ correo, contraseña }) => {
  const res = await axios.post(`${API}/login`, { correo, contraseña });
  return res.data;
};

export const registerRequest = async (form) => {
  // 1. Crear el usuario
  const resUsuario = await axios.post(`${API}/registro`, {
    nombre_completo: form.nombre_completo,
    correo: form.correo,
    contraseña: form.contraseña,
    rol: form.rol,
  });

  const { usuario } = resUsuario.data;
  const id_usuario = usuario.id_usuario;

  // 2. Registrar datos según el rol
  switch (form.rol) {
    case 'Estudiante':
      await axios.post('http://localhost:3000/estudiantes', {
        id_usuario,
        codigo_estudiante: form.codigo_estudiante,
        grado: form.grado,
        seccion: form.seccion,
        fecha_nacimiento: form.fecha_nacimiento,
        responsable: form.responsable,
      });
      break;

    case 'Docente':
      await axios.post('http://localhost:3000/docentes', {
        id_usuario,
        especialidad: form.especialidad,
        telefono: form.telefono,
        fecha_ingreso: form.fecha_ingreso,
      });
      break;

    case 'Directora':
      // Si aún no existe endpoint, solo registrar el usuario base
      await axios.post('http://localhost:3000/directora', {
        id_usuario,
        numero_acuerdo: form.numero_acuerdo,
        fecha_designacion: form.fecha_designacion,
      });
      break;

    case 'Administrador':
      await axios.post('http://localhost:3000/administradores', {
        id_usuario,
        nivel_acceso: form.nivel_acceso,
        area_asignada: form.area_asignada,
      });
      break;

    default:
      break;
  }

  return resUsuario.data;
};
