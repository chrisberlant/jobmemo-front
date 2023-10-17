import { AiFillCloseCircle } from 'react-icons/ai';
import { ImSpinner9 } from 'react-icons/im';
import { useAppSelector, useAppDispatch } from '../../store/hook/redux';
import { removeNotification } from '../../store/reducers/app';
import './Notification.scss';

function Notification() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const textToDisplay = useAppSelector((state) => state.app.text);
  const isError = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  if (isLoading) {
    // If something is loading
    return (
      <div className="loader">
        <ImSpinner9 size={30} color="#4a65ff" />
      </div>
    );
  }

  if (textToDisplay) {
    // If there is a message to display
    return (
      <div className="notification">
        <span className={isError ? 'error' : 'message'}>{textToDisplay}</span>
        <AiFillCloseCircle
          className="close-button"
          aria-label="Fermer la notification"
          onClick={() => dispatch(removeNotification())}
        />
      </div>
    );
  }

  return null; // By default nothing is displayed
}

export default Notification;
