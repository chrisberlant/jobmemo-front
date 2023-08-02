import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import Navbar from '../Navbar/Navbar';
import Contact from './Contact/Contact';
import './Contacts.scss';

function Contacts() {
  console.log('Composant contacts');
  const contacts = useAppSelector((state) => state.contacts.list);
  const noContacts = useAppSelector((state) => state.contacts.isEmpty);
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
      <div className="contacts-container">
        {noContacts ? (
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
