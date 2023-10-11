import { AiFillCloseCircle } from 'react-icons/ai';
import { ImSpinner9 } from 'react-icons/Im';
import { useAppSelector, useAppDispatch } from '../../store/hook/redux';
import { removeNotification } from '../../store/reducers/app';
import './Notification.scss';

function Notification() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const textToDisplay = useAppSelector((state) => state.app.text);
  const isError = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  if (textToDisplay === '' && !isLoading) {
    return null; // If there is nothing to display
  }

  if (isLoading) {
    return (
      <div className="loader">
        <ImSpinner9 size={30} color="#4a65ff" />
      </div>
    );
  }

  return (
    <div className="notification">
      <span className={isError ? 'error' : 'message'}>{textToDisplay}</span>
      <AiFillCloseCircle
        className="close-button"
        onClick={() => dispatch(removeNotification())}
      />
    </div>
  );
}

export default Notification;
