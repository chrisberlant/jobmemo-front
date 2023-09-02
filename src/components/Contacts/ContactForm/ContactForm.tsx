import { useParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import './ContactForm.scss';
import { useAppSelector } from '../../../store/hook/redux';

function ContactForm() {
  const { id } = useParams();
  const contact = useAppSelector((state) => state.contacts.items).filter(
    (searchedContact) => searchedContact.id === id
  )[0];
  const [infos, setInfos] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    occupation: contact.occupation,
    email: contact.email,
    phone: contact.phone,
    linkedinProfile: contact.linkedinProfile,
    enterprise: contact.enterprise,
    comments: contact.comments,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  return (
    <div className="contact">
      <input name="firstName" value={infos.firstName} onChange={handleChange} />
      <input name="firstName" value={infos.lastName} onChange={handleChange} />
      <input
        name="occupation"
        value={infos.occupation}
        onChange={handleChange}
      />
      <input name="email" value={infos.email} onChange={handleChange} />
      <input name="phone" value={infos.phone} onChange={handleChange} />
      <input
        name="linkedinProfile"
        value={infos.linkedinProfile}
        onChange={handleChange}
      />
      <input
        name="enterprise"
        value={infos.enterprise}
        onChange={handleChange}
      />
      <input name="comments" value={infos.comments} onChange={handleChange} />

      <button type="button">Modifier le contact</button>
    </div>
  );
}

export default ContactForm;
