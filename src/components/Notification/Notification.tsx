import { useAppSelector } from '../../store/hook/redux';
import './Notification.scss';

function Notification() {
  const textToDisplay = useAppSelector((state) => state.app.text);
  const isError = useAppSelector((state) => state.app.error);
  return (
    <div className="notification">
      <span className={isError ? 'error' : 'message'}>{textToDisplay}</span>
    </div>
  );
}

export default Notification;
