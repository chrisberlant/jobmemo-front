import { Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import recycleBinIcon from '../../assets/icons/icon-recycle-bin.svg';
import addCardIcon from '../../assets/icons/icon-add-card.svg';
import { ColumnProps } from '../../@types/jobmemo';
import './Column.scss';

// Rendu de la colonne avec fonctions glissables et déposables à l'aide du composant Droppable de la bibliothèque react-beautiful-dnd. Le composant Column prend en charge deux props: droppableId et column.
// Il utilise ensuite ces accessoires pour définir le droppableId du composant Droppable et restituer une liste de composants Card basée sur le tableau column.items

function Column({ droppableId, column, trashColumn }: ColumnProps) {
  const sortedItems = column.items?.sort((a, b) => a.index - b.index);
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided) => {
        const route = `/addCard/${column.className}`;

        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column"
          >
            {!trashColumn &&
              sortedItems?.map((item: { id: React.Key }, index: number) => {
                return <Card key={item.id} item={item} index={index} />;
              })}
            {provided.placeholder}
            {!trashColumn && (
              <Link to={route}>
                <div className="add-card">
                  <img
                    src={addCardIcon}
                    alt="Ajouter une fiche"
                    className="icon-add-card"
                  />
                </div>
              </Link>
            )}
            {trashColumn && (
              <Link to="/recyclebin">
                <div className="recycle-bin">
                  <img
                    src={recycleBinIcon}
                    alt="Accéder à la corbeille"
                    className="icon-recycle-bin"
                  />
                </div>
              </Link>
            )}
          </div>
        );
      }}
    </Droppable>
  );
}

export default Column;
