import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import logo from '../../assets/images/logo.svg';
import { CardType } from '../../@types/jobmemo';
import './Card.scss';

function Card({ item, index }) {
  // console.log(item);
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          console.log('on drag : ', item.title, '- id : ', item.id);
        }
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging
                ? 'darkslateblue'
                : 'slateblue',
              ...provided.draggableProps.style,
            }}
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