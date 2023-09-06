import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import Contact from './Contact/Contact';
import './Contacts.scss';
import { ContactType } from '../../@types/jobmemo';

function Contacts() {
  const contacts = useAppSelector((state) => state.contacts.items);
  const isLoading = useAppSelector((state) => state.contacts.isLoading);
  const noContacts = useAppSelector((state) => state.contacts.isEmpty);
  const error = useAppSelector((state) => state.contacts.error);
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
        {!isLoading && error && (
          <span>Erreur lors de la récupération des contacts</span>
        )}
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
