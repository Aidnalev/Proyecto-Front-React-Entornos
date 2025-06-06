import { useState } from 'react';
import axios from 'axios';

export default function AddIdeaForm({ reloadIdeas }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    if (!titulo.trim() || !descripcion.trim()) {
      setMsg('Completa todos los campos');
      return;
    }

    try {
      await axios.post('/api/ideas', {
        titulo,
        descripcion,
        estado: 'Pendiente'
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitulo('');
      setDescripcion('');
      reloadIdeas();
    } catch (error) {
      setMsg('Error al crear idea');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar nueva idea</h2>
      {msg && <p style={{ color: 'red' }}>{msg}</p>}
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        required
      /><br />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
        required
      /><br />
      <button type="submit">Agregar</button>
    </form>
  );
}
