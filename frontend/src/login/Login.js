import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Login.css';
function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { correo, contraseña });
      localStorage.setItem('token', res.data.access_token);
      alert('¡Login exitoso!');
      // Aquí podrías redirigir al dashboard, por ejemplo
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <button type="submit">Entrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p style={{ marginTop: '1rem' }}>
        ¿No tenés cuenta? <Link to="/registro">Crear una cuenta</Link>
      </p>
    </form>
  );
}

export default Login;
