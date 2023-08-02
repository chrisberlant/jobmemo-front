import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import Navbar from '../Navbar/Navbar';
import Contact from './Contact/Contact';
import './Contacts.scss';

function Contacts() {
  console.log('Composant contacts');
  const contacts = useAppSelector((state) => state.contacts.list);
  const noContacts = useAppSelector((state) => state.contacts.isEmpty);
  const isLoading = useAppSelector((state) => state.contacts.isLoading);
  console.log(contacts);
  const dispatch = useAppDispatch();

  // Get the contacts from the API and dispatch them to the store on first render
  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <div className="Contacts">
      {/* <Navbar /> */}
      <h1>Vos contacts :</h1>
      {!isLoading && (
        <Link to="/createContact" className="add-contact-button">
          <button type="button">Ajouter un nouveau contact</button>
        </Link>
      )}
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
