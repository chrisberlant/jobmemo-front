import { AiFillCloseCircle } from 'react-icons/ai';
import { ImSpinner9 } from 'react-icons/Im';
import { useAppSelector, useAppDispatch } from '../../store/hook/redux';
import { removeAllMessages } from '../../store/reducers/app';
import './Notification.scss';

function Notification() {
  const textToDisplay = useAppSelector((state) => state.app.text);
  const contactsLoading = useAppSelector((state) => state.user.isLoading);
  const cardsLoading = useAppSelector((state) => state.cards.isLoading);
  const isError = useAppSelector((state) => state.app.error);
  const dispatch = useAppDispatch();

  if (textToDisplay === '' && !contactsLoading && !cardsLoading) {
    return null; // If there is nothing to display
  }

  if (textToDisplay === '' && (contactsLoading || cardsLoading)) {
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
        onClick={() => dispatch(removeAllMessages())}
      />
    </div>
  );
}

export default Notification;
