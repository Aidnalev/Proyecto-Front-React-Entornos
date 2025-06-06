import axios from 'axios';
import { useState } from 'react';

export default function IdeaItem({ idea, reloadIdeas }) {
  const token = localStorage.getItem('authToken');
  const [editing, setEditing] = useState(false);
  const [titulo, setTitulo] = useState(idea.titulo);
  const [descripcion, setDescripcion] = useState(idea.descripcion);
  const [estado, setEstado] = useState(idea.estado || 'Pendiente');
  const [msg, setMsg] = useState('');

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que quieres eliminar esta idea?')) return;
    try {
      await axios.delete(`/api/ideas/${idea.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reloadIdeas();
    } catch (error) {
      setMsg('Error al eliminar idea');
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/ideas/${idea.id}`, {
        titulo,
        descripcion,
        estado,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditing(false);
      reloadIdeas();
    } catch (error) {
      setMsg('Error al actualizar idea');
    }
  };

  return (
    <li>
      {msg && <p style={{color:'red'}}>{msg}</p>}
      {editing ? (
        <>
          <input
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          /><br/>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          /><br/>
          <select value={estado} onChange={e => setEstado(e.target.value)}>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select><br/>
          <button onClick={handleSave}>Guardar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{idea.titulo}</strong><br/>
          <em>{idea.descripcion}</em><br/>
          <small>Estado: {idea.estado}</small><br/>
          <button onClick={() => setEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </li>
  );
}
