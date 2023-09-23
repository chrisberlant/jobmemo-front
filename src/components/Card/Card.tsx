import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { DashboardCard } from '../../@types/jobmemo';
import './Card.scss';

// Ce composant restitue un élément déplaçable à l'aide du composant Draggable de la bibliothèque 'react-beautifull-dnd'.
// Il définit la clé, draggableId et les accessoires d'index en fonction de l'accessoire d'élément.
// Dans le composant Draggable, il y a une fonction qui reçoit fourni et un instantané en tant que paramètres.

function Card({ item, index }: DashboardCard) {
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = () => {
    setChecked(!checked);
    console.log(item.title, item.id, 'is checked');
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card">
              <div className="card-container">
                <div
                  className="label"
                  style={{ backgroundColor: item.color }}
                />
                <div className="company-logo" />
                <div className="date-wrapper">
                  <span>Crée le : </span>
                  <span>
                    {item.createdAt.slice(0, 10).split('-').reverse().join('/')}
                  </span>
                </div>
                <div className="stars-wrapper">
                  <span>★★★★★</span>
                  <span className="notation">{'★'.repeat(item.notation)}</span>
                </div>
                <h4 className="company-title">{item.enterpriseName}</h4>
                <h3 className="card-title">{item.title}</h3>
                <div className="action-wrapper">
                  <Link to={`/card/${item.id}`}>
                    <button type="button">Voir la fiche</button>
                  </Link>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
