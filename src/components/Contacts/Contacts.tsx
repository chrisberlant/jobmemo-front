import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import ContactCard from './ContactCard/ContactCard';
import './Contacts.scss';

function Contacts() {
  const contacts = useAppSelector((state) => state.contacts.items);
  const noContacts = useAppSelector((state) => state.contacts.isEmpty);
  const isLoading = useAppSelector((state) => state.contacts.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the contacts from the API and dispatch them to the store on first render
  useEffect(() => {
    const fetchContacts = async () => {
      if (contacts.length === 0 && !noContacts) {
        dispatch(getAllContacts());
      }
    };
    fetchContacts();
  }, [dispatch, contacts, noContacts]);

  return (
    <div className="contacts">
      <div className="contacts-header">
        <h1>Vos contacts :</h1>
        {!isLoading && (
          <button
            type="button"
            className="add-contact-button"
            onClick={() => navigate('/createContact')}
          >
            Ajouter un nouveau contact
          </button>
        )}
      </div>

      <div className="contacts-container">
        {isLoading && <span>Chargement en cours</span>}
        {!isLoading && noContacts ? (
          <span>Aucun contact pour le moment</span>
        ) : (
          contacts?.map((contact) => (
            <ContactCard
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
