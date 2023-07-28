import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import logo from '../../assets/images/logo.svg';
import { CardType } from '../../@types/jobmemo';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { setMovingCardId } from '../../store/reducers/cards';
import './Card.scss';

// Ce composant restitue un élément déplaçable à l'aide du composant Draggable de la bibliothèque 'react-beautifull-dnd'.
// Il définit la clé, draggableId et les accessoires d'index en fonction de l'accessoire d'élément.
// Dans le composant Draggable, il y a une fonction qui reçoit fourni et un instantané en tant que paramètres.

type CardProps = {
  item: {
    id: string;
    title: string;
    enterpriseName: string;
    createdAt: string;
    color: string;
    isDeleted: boolean;
    notation: number;
  };
  index: number;
};

function Card({ item, index }: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState<boolean>(false);
  const handleChange = (): void => {
    setChecked(!checked);
    console.log(item.title, item.id, 'is checked');
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDropAnimating) {
          dispatch(setMovingCardId(item.id));
        }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="card">
              <img src={logo} alt="logo" className="logo" />
              <h3>{item.title}</h3>
              <span>{item.enterpriseName}</span>
              <span>
                {item.createdAt.slice(0, 10).split('-').reverse().join('/')}
              </span>
              <span>{'★'.repeat(item.notation)}</span>
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
