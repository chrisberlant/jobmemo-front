import { useNavigate } from 'react-router-dom';
import { TrashedCardType } from '../../@types/jobmemo';
import { restoreCard } from '../../store/reducers/cards';
import { useAppDispatch } from '../../store/hook/redux';
import './TrashedCard.scss';

function TrashedCard({
  id,
  title,
  enterpriseName,
  createdAt,
  color,
  rating,
}: TrashedCardType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardRestore = async () => {
    const request = await dispatch(restoreCard(id));
    navigate('/recycle-bin');
    // TODO confirmation/erreur
  };
  return (
    <div className="trashed-card">
      <div className="trashed-card-container">
        <div className="label" style={{ backgroundColor: color }} />
        <div className="company-logo" />
        <div className="date-wrapper">
          <span>Crée le : </span>
          <span>
            {createdAt.toString().slice(0, 10).split('-').reverse().join('/')}
          </span>
        </div>
        <div className="stars-wrapper">
          <span>★★★★★</span>
          <span className="rating">{'★'.repeat(rating)}</span>
        </div>
        <h4 className="company-title">{enterpriseName}</h4>
        <h3 className="card-title">{title}</h3>
        <div className="action-wrapper">
          <button
            type="button"
            className="see-card"
            onClick={() => navigate(`/card/${id}`)}
          >
            Voir la fiche
          </button>
          <button
            type="button"
            className="restore-card"
            onClick={handleCardRestore}
          >
            Restaurer la fiche
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrashedCard;
