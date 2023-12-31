import { Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import recycleBinIcon from '../../assets/icons/icon-recycle-bin.svg';
import addCardIcon from '../../assets/icons/icon-add-card.svg';
import { ColumnProps } from '../../@types/jobmemo';
import './Column.scss';

function Column({ droppableId, column, trashColumn }: ColumnProps) {
  const sortedItems = column.items?.sort((a, b) => a.index - b.index);
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={
              snapshot.isDraggingOver && droppableId === 'Ma corbeille'
                ? 'column-content--deleting'
                : 'column-content'
            }
          >
            {!trashColumn &&
              sortedItems?.map((item: { id: React.Key }, index: number) => {
                return <Card key={item.id} item={item} index={index} />;
              })}
            {provided.placeholder}
            {!trashColumn && (
              <Link to={`/add-card/${column.className}`}>
                <img
                  src={addCardIcon}
                  alt="Ajouter une fiche"
                  className="kanban-button add-card"
                />
              </Link>
            )}
            {trashColumn && (
              <Link to="/recycle-bin">
                <img
                  src={recycleBinIcon}
                  alt="Accéder à la corbeille"
                  className="kanban-button recycle-bin"
                />
              </Link>
            )}
          </div>
        );
      }}
    </Droppable>
  );
}

export default Column;
