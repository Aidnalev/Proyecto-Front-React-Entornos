import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [msg, setMsg] = useState('');

  const [regNombre, setRegNombre] = useState('');
  const [regCorreo, setRegCorreo] = useState('');
  const [regContrasena, setRegContrasena] = useState('');
  const [regMsg, setRegMsg] = useState('');
  const [regMsgColor, setRegMsgColor] = useState('green');

  async function handleLogin(e) {
    e.preventDefault();
    setMsg('');

    try {
      const response = await axios.post('/api/auth/login', {
        nombre,
        contrasena,
      });

      localStorage.setItem('authToken', response.data.token || '');
      localStorage.setItem('nombre', nombre);

      window.location.href = '/home';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMsg('Usuario o contraseña incorrectos');
      } else {
        setMsg('Error al conectar con el servidor');
      }
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setRegMsg('');
    setRegMsgColor('green');

    try {
      await axios.post('/api/auth/registro', {
        nombre: regNombre,
        correo: regCorreo,
        contrasena: regContrasena,
      });

      setRegMsg('Cuenta creada correctamente. Ahora puedes iniciar sesión.');
      setRegNombre('');
      setRegCorreo('');
      setRegContrasena('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setRegMsg('El nombre ya está en uso.');
        setRegMsgColor('red');
      } else {
        setRegMsg('Error al registrar. Intenta más tarde.');
        setRegMsgColor('red');
      }
    }
  }

  return (
    <div style={{ padding: '1rem', maxWidth: 400, margin: 'auto' }}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="nombre">Usuario:</label>
        <br />
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="contrasena">Contraseña:</label>
        <br />
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Entrar</button>
        <p style={{ color: 'red' }}>{msg}</p>
      </form>

      <hr />

      <h2>Crear Cuenta</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="regName">Nombre de usuario:</label>
        <br />
        <input
          id="regName"
          type="text"
          value={regNombre}
          onChange={(e) => setRegNombre(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="regCorreo">Correo:</label>
        <br />
        <input
          id="regCorreo"
          type="email"
          value={regCorreo}
          onChange={(e) => setRegCorreo(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="regPassword">Contraseña:</label>
        <br />
        <input
          id="regPassword"
          type="password"
          value={regContrasena}
          onChange={(e) => setRegContrasena(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Registrarse</button>
        <p style={{ color: regMsgColor, marginTop: '10px' }}>{regMsg}</p>
      </form>
    </div>
  );
}
