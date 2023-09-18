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

const onDragEnd = (result, dispatch, movingCardId) => {
  // Check if there is a destination for the dragged item
  if (!result.destination) return;

  // Destructure the source and destination from the result object
  const { source, destination } = result;

  // If card is dragged to the exact same location
  if (
    source.index === destination.index &&
    source.droppableId === destination.droppableId
  )
    return;

  // If card is not dragged to trash bin
  if (destination.droppableId !== 'Ma corbeille') {
    const newCardInfos = {
      movingCardId,
      movingCardIndex: destination.index,
      movingCardCategory: destination.droppableId,
    };

    dispatch(moveCard(newCardInfos)); // TODO tester si l'index dest et source sont identiques
  } else {
    // Send to trash bin
    dispatch(sendCardToTrash(movingCardId));
  }
};

function Kanban() {
  const dispatch = useAppDispatch();
  const dashboardCards = useAppSelector((state) => state.cards.items);
  const loadedCards = useAppSelector((state) => state.cards.loadedCards);
  const movingCardId = useAppSelector((state) => state.cards.movingCardId);
  const offresColumn = {
    color: '#eee',
    className: 'Mes offres',
    id: 1,
    items: dashboardCards.filter((card) => card.category === 'Mes offres'),
  };
  const candidaturesColumn = {
    color: '#eee',
    className: 'candidatures',
    id: 2,
    items: dashboardCards.filter(
      (card) => card.category === 'Mes candidatures'
    ),
  };
  const relancesColumn = {
    color: '#eee',
    className: 'relances',
    id: 3,
    items: dashboardCards.filter((card) => card.category === 'Mes relances'),
  };
  const entretiensColumn = {
    color: '#eee',
    className: 'entretiens',
    id: 4,
    items: dashboardCards.filter((card) => card.category === 'Mes entretiens'),
  };
  const corbeilleColumn = {
    color: '#eee',
    className: 'corbeille',
    id: 5,
  };

  const columnsNames = [
    'Mes offres',
    'Mes candidatures',
    'Mes relances',
    'Mes entretiens',
    'Ma corbeille',
  ];
  const columnsData = [
    offresColumn,
    candidaturesColumn,
    relancesColumn,
    entretiensColumn,
    corbeilleColumn,
  ];

  useEffect(() => {
    if (!loadedCards) {
      dispatch(getAllCards());
      console.log('fetch');
    }
  }, [dispatch, loadedCards]);

  return (
    <DragDropContext
      // Call the onDragEnd function with the result, columns, and setColumns arguments
      onDragEnd={(result) => onDragEnd(result, dispatch, movingCardId)}
    >
      <div className="kanban">
        {columnsNames.map((column, index) => {
          const isTrashBin = column === 'Ma corbeille';
          return (
            <div
              key={column}
              id={column}
              className={`column ${column.replace(/^[^ ]+\s*/, '')}`}
            >
              <h3 className="column-title">{column}</h3>
              <div className="column-wrapper">
                <Column
                  droppableId={column}
                  key={column}
                  column={columnsData[index]}
                  trashColumn={!!isTrashBin}
                />
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default Kanban;
