import { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import Column from '../Column/Column';
import {
  getAllCards,
  moveCard,
  sendCardToTrash,
} from '../../store/reducers/cards';
import { ColumnsData } from '../../@types/jobmemo';
import './Kanban.scss';

// Cet extrait de code définit une fonction appelée onDragEnd qui est utilisée comme rappel pour gérer la fin d'un événement glisser. Il prend trois paramètres : result, columns et setColumns.
// La fonction vérifie d'abord s'il existe une destination valide pour l'événement glisser. Sinon, il revient à sa place.
// Ensuite, il extrait les propriétés source et destination de l'objet de résultat.
// Si la source et la destination proviennent de conteneurs de dépôt différents, la fonction déplace l'élément déplacé de la colonne source vers la colonne de destination. Pour ce faire, il crée des copies des tableaux d'éléments des colonnes source et destination, supprime l'élément du tableau source et l'insère à l'index approprié dans le tableau de destination. Enfin, il met à jour l'état des colonnes en fusionnant les modifications avec l'état existant.
// Si la source et la destination proviennent du même conteneur de dépôt, la fonction déplace l'élément déplacé dans la même colonne. Il suit un processus similaire au précédent, mais avec une seule colonne impliquée.

const onDragEnd = (result, dispatch, movingCardId: string) => {
  // Destructure the source and destination from the result object
  const { source, destination } = result;

  // Check if there is a destination for the dragged item
  if (!result.destination) return;

  // If card is dragged to the exact same location
  if (
    source.index === destination.index &&
    source.droppableId === destination.droppableId
  )
    return;

  // If card is not dragged to trash bin
  if (destination.droppableId !== 'Ma corbeille') {
    const movingCardInfos = new FormData();
    movingCardInfos.append('id', movingCardId);
    movingCardInfos.append('newIndex', destination.index);
    movingCardInfos.append('newCategory', destination.droppableId);
    dispatch(moveCard(movingCardInfos));
  } else {
    // Send to trash bin
    dispatch(sendCardToTrash(movingCardId));
  }
};

function Kanban() {
  const dispatch = useAppDispatch();
  let movingCardId: string;
  const dashboardCards = useAppSelector((state) => state.cards.items);
  const loadedCards = useAppSelector((state) => state.cards.loadedCards);
  const offresColumn = {
    className: 'Mes offres',
    id: 1,
    color: '#eee',
    items: dashboardCards.filter((card) => card.category === 'Mes offres'),
  };
  const candidaturesColumn = {
    className: 'candidatures',
    id: 2,
    color: '#eee',
    items: dashboardCards.filter(
      (card) => card.category === 'Mes candidatures'
    ),
  };
  const relancesColumn = {
    className: 'relances',
    id: 3,
    color: '#eee',
    items: dashboardCards.filter((card) => card.category === 'Mes relances'),
  };
  const entretiensColumn = {
    className: 'entretiens',
    id: 4,
    color: '#eee',
    items: dashboardCards.filter((card) => card.category === 'Mes entretiens'),
  };
  const corbeilleColumn = {
    className: 'corbeille',
    id: 5,
    color: '#eee',
  };

  const columnsData: ColumnsData = {
    'Mes offres': offresColumn,
    'Mes candidatures': candidaturesColumn,
    'Mes relances': relancesColumn,
    'Mes entretiens': entretiensColumn,
    'Ma corbeille': corbeilleColumn,
  };

  useEffect(() => {
    if (!loadedCards) {
      dispatch(getAllCards());
    }
  }, [dispatch, loadedCards]);

  return (
    <DragDropContext
      onDragStart={(start) => {
        // Get the id of the dragged card here
        movingCardId = start.draggableId;
      }}
      // Call the onDragEnd function with the result, columns, and setColumns arguments
      onDragEnd={(result) => onDragEnd(result, dispatch, movingCardId)}
    >
      <div className="kanban">
        {Object.keys(columnsData).map((columnName) => {
          const isTrashBin = columnName === 'Ma corbeille';
          return (
            <div
              key={columnName}
              id={columnName}
              className={`column ${columnName.replace(/^[^ ]+\s*/, '')}`}
            >
              <h3 className="column-title">{columnName}</h3>

              <Column
                droppableId={columnName}
                key={columnName}
                column={columnsData[columnName]}
                trashColumn={!!isTrashBin}
              />
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
