import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import Column from '../Column/Column';
import './Kanban.scss';
import {
  getAllCards,
  moveCard,
  sendCardToTrash,
} from '../../store/reducers/cards';

// Cet extrait de code définit une fonction appelée onDragEnd qui est utilisée comme rappel pour gérer la fin d'un événement glisser. Il prend trois paramètres : result, columns et setColumns.
// La fonction vérifie d'abord s'il existe une destination valide pour l'événement glisser. Sinon, il revient à sa place.
// Ensuite, il extrait les propriétés source et destination de l'objet de résultat.
// Si la source et la destination proviennent de conteneurs de dépôt différents, la fonction déplace l'élément déplacé de la colonne source vers la colonne de destination. Pour ce faire, il crée des copies des tableaux d'éléments des colonnes source et destination, supprime l'élément du tableau source et l'insère à l'index approprié dans le tableau de destination. Enfin, il met à jour l'état des colonnes en fusionnant les modifications avec l'état existant.
// Si la source et la destination proviennent du même conteneur de dépôt, la fonction déplace l'élément déplacé dans la même colonne. Il suit un processus similaire au précédent, mais avec une seule colonne impliquée.

const onDragEnd = (result, columns, dispatch, movingCardId) => {
  // Check if there is a destination for the dragged item
  if (!result.destination) return;

  // Destructure the source and destination from the result object
  const { source, destination } = result;
  const sourceColumn = columns[source.droppableId];
  // TODO FIX THIS BUG, remove columns from parameters ?
  const destColumn = columns[destination.droppableId];

  // Get the source and destination columns based on the droppableIds
  // Create copies of the source and destination items arrays

  if (destination.droppableId !== 'corbeille') {
    const newCardInfos = {
      movingCardId,
      movingCardindex: destination.index,
      movingCardcategory: destColumn?.name,
    };
    dispatch(moveCard(newCardInfos)); // TODO tester si l'index dest et source sont identiques
  }

  // If the source and destination droppableIds are different
  if (source.droppableId !== destination.droppableId) {
    if (destination.droppableId === 'corbeille') {
      dispatch(sendCardToTrash(movingCardId));
    }
  }
};

function Kanban() {
  // Initialize state with the categories object
  const columns = useAppSelector((state) => state.cards.items);
  const loadedCards = useAppSelector((state) => state.cards.loadedCards);
  const dispatch = useAppDispatch();
  const movingCardId = useAppSelector((state) => state.cards.movingCardId);

  const corbeilleColumn = {
    color: '#eee',
    className: 'corbeille',
    name: 'Corbeille',
    id: 4,
    items: [],
  };

  useEffect(() => {
    if (!loadedCards) {
      dispatch(getAllCards());
      console.log('fetch');
    }
  }, [dispatch, loadedCards]);

  return (
    <DragDropContext
      // Call the onDragEnd function with the result, columns, and setColumns arguments
      onDragEnd={(result) => onDragEnd(result, columns, dispatch, movingCardId)}
    >
      <div className="kanban">
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              key={columnId}
              id={columnId}
              className={`column ${column.className}`}
            >
              <h3 className="column-title">{column.name}</h3>
              <div className="column-wrapper">
                <Column
                  droppableId={columnId}
                  key={columnId}
                  column={column}
                  trashColumn={false}
                />
              </div>
            </div>
          );
        })}
        <div key="corbeille" id="corbeille" className="column corbeille">
          <h3 className="column-title">corbeille</h3>
          <div className="column-wrapper">
            <Column
              droppableId="corbeille"
              key="corbeille"
              column={corbeilleColumn}
              trashColumn
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default Kanban;
