import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import Contact from './Contact/Contact';
import './Contacts.scss';

function Contacts() {
  const contacts = useAppSelector((state) => state.contacts.items);
  const noContacts = useAppSelector((state) => state.contacts.isEmpty);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the contacts from the API and dispatch them to the store on first render
  useEffect(() => {
    const fetchContacts = () => {
      if (contacts.length === 0 && !noContacts) {
        dispatch(getAllContacts());
      }
    };
    fetchContacts();
  }, [dispatch, contacts, noContacts]);

  return (
    <div className="contacts">
      <div className="contacts-header">
        <h3 className="component-title">Mes contacts :</h3>

        <button
          type="button"
          className="add-contact-button"
          onClick={() => navigate('/create-contact')}
        >
          Ajouter un nouveau contact
        </button>
      </div>

      <div className="contacts-container">
        {!isLoading && noContacts ? (
          <span>Aucun contact pour le moment</span>
        ) : (
          contacts?.map((contact) => (
            <Contact
              key={contact.id}
              id={contact.id}
              firstName={contact.firstName}
              lastName={contact.lastName}
              enterprise={contact.enterprise}
              occupation={contact.occupation}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Contacts;
