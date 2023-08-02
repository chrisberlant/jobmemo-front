import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import { getAllContacts } from '../../store/reducers/contacts';
import Navbar from '../Navbar/Navbar';
import Contact from './Contact/Contact';
import './Contacts.scss';

function Contacts() {
  console.log('Composant contacts');
  const contacts = useAppSelector((state) => state.contacts.list);
  console.log(contacts);
  const dispatch = useAppDispatch();
  if (contacts.length === 0) dispatch(getAllContacts());

  return (
    <div className="Contacts">
      {/* <Navbar /> */}
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          id={contact.id}
          firstName={contact.firstName}
          lastName={contact.lastName}
          enterprise={contact.enterprise}
          occupation={contact.occupation}
        />
      ))}
    </div>
  );
}

export default Contacts;
