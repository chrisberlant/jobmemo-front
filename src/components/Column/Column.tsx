import { Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import CardButton from '../CardButton/CardButton';
import recycleBinIcon from '../../assets/icons/icon-recycle-bin.svg';
import addCardIcon from '../../assets/icons/icon-add-card.svg';
import './Column.scss';

interface ColumnProps {
  droppableId: string;
  column: {
    color: string;
    className: string;
    name: string;
    id: number;
    items?: Array<{ id: React.Key }>;
  };
}
interface CardProps {
  key: string;
  item: any; // Replace 'any' with the specific type of 'item' if possible
  index: number;
}

// Rendu de la colonne avec fonctions glissables et déposables à l'aide du composant Droppable de la bibliothèque react-beautiful-dnd. Le composant Column prend en charge deux props: droppableId et column.
// Il utilise ensuite ces accessoires pour définir le droppableId du composant Droppable et restituer une liste de composants Card basée sur le tableau column.items

function Column({ droppableId, column }: ColumnProps) {
  const isNotRecycleBin = column.className !== 'recycle-bin';
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {

        const route = `/addCard/${column.id}`;

        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column"
            // style={{
            //   background: snapshot.isDraggingOver
            //     ? 'lightsteelblue'
            //     : 'lavender',
            // }}
          >
            {column?.items?.map((item: { id: React.Key }, index: number) => {
              return <Card key={item.id} item={item} index={index} />;
            })}
            {provided.placeholder}
            {!isNotRecycleBin && (
              <Link to="/recyclebin">
                <img
                  src={recycleBinIcon}
                  alt="icon-recycle-bin"
                  className="icon-recycle-bin"
                />
              </Link>
            )}
            {isNotRecycleBin && (
              <Link to={route}>
                <div className="add-card">
                  <img
                    src={addCardIcon}
                    alt="icon-add-card"
                    className="icon-add-card"
                  />
                </div>
              </Link>
            )}
            {/* {isNotRecycleBin && <CardButton />} */}
            {/* <CardButton /> */}
          </div>
        );
      }}
    </Droppable>
  );
}

export default Column;
