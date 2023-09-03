import { useParams } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import './ContactForm.scss';
import { gsap } from 'gsap';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
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
    <form className="contact">
      <div className="input-wrap">
        <label htmlFor="lastName">Nom : </label>
        <input
          name="lastName"
          value={infos.lastName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="firstName">Prénom : </label>
        <input
          name="firstName"
          value={infos.firstName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="occupation">Fonction : </label>
        <input
          name="occupation"
          value={infos?.occupation}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="email">Email : </label>
        <input
          name="email"
          value={infos?.email}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="phone">Téléphone : </label>
        <input
          name="phone"
          value={infos?.phone}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="linkedinProfile">Profil LinkedIn : </label>
        <input
          name="linkedinProfile"
          value={infos?.linkedinProfile}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="enterprise">Entreprise : </label>
        <input
          name="enterprise"
          value={infos?.enterprise}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <label htmlFor="comments">Commentaires : </label>
        <input
          name="comments"
          type="textarea"
          value={infos?.comments}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className="line" />
      </div>
      <div className="input-wrap">
        <button type="submit" className="submit-button">
          Modifier le contact
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
