import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';
import CardButton from '../CardButton/CardButton';
import './Column.scss';

interface ColumnProps {
  droppableId: string;
  column: {
    color: string;
    items?: Array<{ id: React.Key | null | undefined }>;
  };
}

function Column({ droppableId, column }: ColumnProps) {
  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column"
            style={{
              background: snapshot.isDraggingOver
                ? 'lightsteelblue'
                : 'lavender',
            }}
          >
            {column?.items?.map(
              (item: { id: React.Key | null | undefined }, index: number) => {
                return <Card key={item.id} item={item} index={index} />;
              }
            )}
            {provided.placeholder}
            <CardButton />
          </div>
        );
      }}
    </Droppable>
  );
}

export default Column;
