import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import Contact from './Contact/Contact';
import './Contacts.scss';

function Contacts() {
  const contacts = useAppSelector((state) => state.contacts.items);
  const noContacts = useAppSelector((state) => state.contacts.isEmpty);
  const isLoading = useAppSelector((state) => state.contacts.isLoading);
  const dispatch = useAppDispatch();

  // Get the contacts from the API and dispatch them to the store on first render
  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <div className="Contacts">
      <div className="contacts-header">
        <h1>Vos contacts :</h1>
        {!isLoading && (
          <Link to="/createContact">
            <button type="button" className="add-contact-button">
              Ajouter un nouveau contact
            </button>
          </Link>
        )}
      </div>

      <div className="contacts-container">
        {isLoading && <span>Chargement en cours</span>}

        {!isLoading && noContacts ? (
          <span>Aucun contact pour le moment</span>
        ) : (
          contacts.map((contact) => (
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
