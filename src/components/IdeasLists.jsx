import { useState } from 'react';
import AddIdeaForm from './AddIdeaForm';
import IdeaItem from './IdeaItem';

export default function IdeasList({ ideas, reloadIdeas }) {
  const [filter, setFilter] = useState('Todas');

  const filteredIdeas = ideas.filter(idea =>
    filter === 'Todas' ? true : idea.estado === filter
  );

  return (
    <div>
      <h2>Filtrar por estado:</h2>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="Todas">Todas</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En progreso">En progreso</option>
        <option value="Completada">Completada</option>
      </select>

      <h2>Lista de Ideas</h2>
      {filteredIdeas.length === 0 ? (
        <p>No hay ideas registradas</p>
      ) : (
        <ul>
          {filteredIdeas.map(idea => (
            <IdeaItem key={idea.id} idea={idea} reloadIdeas={reloadIdeas} />
          ))}
        </ul>
      )}

      <AddIdeaForm reloadIdeas={reloadIdeas} />
    </div>
  );
}
