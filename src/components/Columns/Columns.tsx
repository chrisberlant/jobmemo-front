import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { gsap } from 'gsap';
import { status } from '../../fakeDatas/fakeDatas';
import { useAppDispatch } from '../hook/redux';
import { setDestination } from '../../store/reducers/movingCard';
import Column from '../Column/Column';
import './Columns.scss';

// Cet extrait de code définit une fonction appelée onDragEnd qui est utilisée comme rappel pour gérer la fin d'un événement glisser. Il prend trois paramètres : result, columns et setColumns.
// La fonction vérifie d'abord s'il existe une destination valide pour l'événement glisser. Sinon, il revient à sa place.
// Ensuite, il extrait les propriétés source et destination de l'objet de résultat.
// Si la source et la destination proviennent de conteneurs de dépôt différents, la fonction déplace l'élément déplacé de la colonne source vers la colonne de destination. Pour ce faire, il crée des copies des tableaux d'éléments des colonnes source et destination, supprime l'élément du tableau source et l'insère à l'index approprié dans le tableau de destination. Enfin, il met à jour l'état des colonnes en fusionnant les modifications avec l'état existant.
// Si la source et la destination proviennent du même conteneur de dépôt, la fonction déplace l'élément déplacé dans la même colonne. Il suit un processus similaire au précédent, mais avec une seule colonne impliquée.

const onDragEnd = (result, columns, setColumns, dispatch) => {
  // Check if there is a destination for the dragged item
  if (!result.destination) return;

  // Destructure the source and destination from the result object
  const { source, destination } = result;
  const sourceColumn = columns[source.droppableId];
  const destColumn = columns[destination.droppableId];

  // console.log(
  //   `card moving from : ("${sourceColumn.name}", column id : ${sourceColumn.id}, card position : ${source.index}) to (column "${destColumn.name}", column id : ${destColumn.id}, card position : ${destination.index})`
  // );

  // Get the source and destination columns based on the droppableIds
  // Create copies of the source and destination items arrays
  const sourceItems = [...sourceColumn.items];
  const destItems = [...destColumn.items];

  dispatch(
    setDestination({
      destinationColumnId: destColumn.id,
      destinationCardIndex: destination.index,
    })
  );

  // If the source and destination droppableIds are different
  if (source.droppableId !== destination.droppableId) {
    // Log the source and the destination column

    // Remove the dragged item from the source items array
    const [removed] = sourceItems.splice(source.index, 1);

    // Insert the dragged item at the destination index in the destination items array
    destItems.splice(destination.index, 0, removed);

    if (destColumn.className !== 'recycle-bin') {
      // Update the state with the modified columns, replacing the source and destination columns
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      // Update the state with the source columns
      // Dont update the state with the destination columns for removing the dragged item
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
      console.log(
        destItems[0].title,
        'is removed - ( id : ',
        destItems[0].id,
        ')'
      );
    }
  } else {
    // If the source and destination droppableIds are the same
    const column = columns[source.droppableId];

    // Create a copy of the items array
    const copiedItems = [...column.items];

    // Remove the dragged item from the copied items array
    const [removed] = copiedItems.splice(source.index, 1);

    // Insert the dragged item at the destination index in the copied items array
    copiedItems.splice(destination.index, 0, removed);

    // Update the state with the modified column with the right index of the dragged item
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Columns() {
  // Initialize state with the status object
  const [columns, setColumns] = useState(status);
  const dispatch = useAppDispatch();

  return (
    <DragDropContext
      // Call the onDragEnd function with the result, columns, and setColumns arguments
      onDragEnd={(result) => onDragEnd(result, columns, setColumns, dispatch)}
    >
      <div className="columns">
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              key={columnId}
              id={columnId}
              className={`column ${column.className} `}
            >
              <h3>{column.name}</h3>
              <div>
                <Column droppableId={columnId} key={columnId} column={column} />
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Columns;
