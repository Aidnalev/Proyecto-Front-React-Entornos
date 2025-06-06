import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token) {
      alert('No has iniciado sesión. Serás redirigido al login.');
      navigate('/login');
    } else {
      fetchNombreUsuario();
      cargarIdeas();
    }
  }, []);

  const fetchNombreUsuario = async () => {
    try {
      const { data } = await axios.get('/api/auth/usuario/nombre', { headers });
      setUsername(data.nombre);
    } catch {
      setUsername('Invitado');
    }
  };

  const cargarIdeas = async () => {
    try {
      const { data } = await axios.get('/api/ideas', { headers });
      setIdeas(data);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error al cargar ideas');
    }
  };

  const handleAgregarIdea = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) {
      setMsg('Completa todos los campos');
      return;
    }
    try {
      await axios.post(
        '/api/ideas',
        { titulo, descripcion, estado: 'Pendiente' },
        { headers }
      );
      setTitulo('');
      setDescripcion('');
      cargarIdeas();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error al crear idea');
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar esta idea?')) return;
    try {
      await axios.delete(`/api/ideas/${id}`, { headers });
      cargarIdeas();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error al eliminar idea');
    }
  };

  const handleEditar = async (idea) => {
    const newTitle = prompt('Nuevo título:', idea.titulo);
    if (newTitle === null) return;
    const newDesc = prompt('Nueva descripción:', idea.descripcion);
    if (newDesc === null) return;
    try {
      await axios.put(
        `/api/ideas/${idea.id}`,
        {
          titulo: newTitle.trim(),
          descripcion: newDesc.trim(),
          estado: idea.estado,
        },
        { headers }
      );
      cargarIdeas();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error al actualizar idea');
    }
  };

  const handleEstadoChange = async (id, newEstado) => {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) return;
    try {
      await axios.put(
        `/api/ideas/${id}`,
        {
          titulo: idea.titulo,
          descripcion: idea.descripcion,
          estado: newEstado,
        },
        { headers }
      );
      cargarIdeas();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error al actualizar estado');
    }
  };

  const formatearFecha = (iso) => {
    const f = new Date(iso);
    return `${f.getDate().toString().padStart(2, '0')}/${(f.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${f.getFullYear()}`;
  };

  const ideasFiltradas =
    filtro === 'Todos'
      ? ideas
      : ideas.filter((i) => (i.estado || 'Pendiente') === filtro);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Gestor de Ideas Personales</h1>
      <p>
        Usuario: {username}{' '}
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
        >
          Cerrar sesión
        </button>
      </p>

      <h2>Filtrar ideas por estado</h2>
      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="Todos">Todos</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En progreso">En progreso</option>
        <option value="Completada">Completada</option>
      </select>

      <h2>Agregar nueva idea</h2>
      <form onSubmit={handleAgregarIdea}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Agregar Idea</button>
      </form>

      <h2>Lista de Ideas</h2>
      {ideasFiltradas.length === 0 ? (
        <p>No hay ideas registradas para este estado</p>
      ) : (
        <ul>
          {ideasFiltradas.map((idea) => (
          <li key={idea.id} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {/* Título y Estado en la misma línea */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <strong>{idea.titulo}</strong>
                <label>
                  Estado:
                  <select
                    style={{ marginLeft: '0.5rem' }}
                    value={idea.estado || 'Pendiente'}
                    onChange={(e) => handleEstadoChange(idea.id, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                </label>
              </div>
              {/* Descripción, fecha y botones con espacio justo */}
              <em>{idea.descripcion}</em>
              <small>Creado: {formatearFecha(idea.fechaCreacion)}</small>
              <div>
                <button onClick={() => handleEditar(idea)}>Editar</button>{' '}
                <button onClick={() => handleEliminar(idea.id)}>Eliminar</button>
              </div>
            </div>
          </li>
          ))}
        </ul>
      )}

      {msg && <p style={{ color: 'red' }}>{msg}</p>}
    </div>
  );
}