import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import logo from '../../assets/images/logo.svg';
import { CardType } from '../../@types/jobmemo';
import './Card.scss';
import { useAppDispatch, useAppSelector } from '../hook/redux';
import { setMovingCardId } from '../../store/reducers/movingCard';

// Ce composant restitue un élément déplaçable à l'aide du composant Draggable de la bibliothèque 'react-beautifull-dnd'.
// Il définit la clé, draggableId et les accessoires d'index en fonction de l'accessoire d'élément.
// Dans le composant Draggable, il y a une fonction qui reçoit fourni et un instantané en tant que paramètres.

type CardProps = {
  item: {
    id: string;
    title: string;
    enterpriseName: string;
    createdAt: string;
  };
  index: number;
};

function Card({ item, index }: CardProps): JSX.Element {
  const dispatch = useAppDispatch();
  // const storedCardId = useAppSelector((state) => state.movingCard.cardId);
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
          // console.log(item.title, 'is dragged- (id : ', item.id), ')';
          // console.log("Id dans le store :" + storedCardId);
        }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={{
            //   backgroundColor: snapshot.isDragging
            //     ? 'darkslateblue'
            //     : 'slateblue',
            //   ...provided.draggableProps.style,
            // }}
          >
            <div className="card">
              <img src={logo} alt="logo" className="logo" />
              <h3>{item.title}</h3>
              <span>{item.enterpriseName}</span>
              <span>{item.createdAt}</span>
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

// import './Card.scss';
// import { CardType } from '../../@types/jobmemo';

// function Card({
//   title,
//   enterpriseName,
//   notation,
//   color,
//   createdAt,
//   index,
// }: CardType) {
//   return (
//     <div className="Card">
//       <h3>Nom : {title}</h3>
//       <p>Entreprise : {enterpriseName}</p>
//       <p>Etoile : {notation}</p>
//       <p>Couleur : {color}</p>
//       <p>Date : {createdAt} </p>
//       <p>index : {index}</p>
//       <input type="checkbox" />
//     </div>
//   );
// }

// export default Card;
