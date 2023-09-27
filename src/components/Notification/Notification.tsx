import { AiFillCloseCircle } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '../../store/hook/redux';
import { removeAllMessages } from '../../store/reducers/app';
import './Notification.scss';

function Notification() {
  const textToDisplay = useAppSelector((state) => state.app.text);
  const isError = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  if (textToDisplay === '') {
    return null; // If there is nothing to display
  }
  return (
    <div className="notification">
      <span className={isError ? 'error' : 'message'}>{textToDisplay}</span>
      <AiFillCloseCircle
        className="close-button"
        onClick={() => dispatch(removeAllMessages())}
      />
    </div>
  );
}

export default Notification;
