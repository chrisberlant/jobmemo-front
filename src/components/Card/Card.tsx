import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
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

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const navigate = useNavigate();

        const navigateToCardItem = () => {
          navigate(`/cardItem/${item.id}`);
        };

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
                  <button type="button" onClick={navigateToCardItem}>
                    Editer la fiche
                  </button>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* <div classNameName="card">
              <img src={logo} alt="logo" classNameName="logo" />
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
              <button type="button" onClick={navigateToCardItem}>
                Voir la fiche
              </button>
            </div> */}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
