import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createNewContact } from '../../store/reducers/contacts';
import { useAppDispatch } from '../../store/hook/redux';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import './ContactCreation.scss';

function CreateContact() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [infos, setInfos] = useState({
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
    phone: '',
    linkedinProfile: '',
    enterprise: '',
    comments: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    dispatch(createNewContact(formData));
    navigate('/contacts');
  };

  // TODO fix width, compared to ContactForm
  return (
    <div className="contact-creation">
      <span className="title">Création dun nouveau contact</span>
      <form className="contact-creation-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="lastName">Nom : </label>
          <input
            id="lastName"
            name="lastName"
            value={infos.lastName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="firstName">Prénom : </label>
          <input
            id="firstName"
            name="firstName"
            value={infos.firstName}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <label htmlFor="occupation">Fonction : </label>
          <input
            id="occupation"
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
            id="email"
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
            id="phone"
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
            id="linkedinProfile"
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
            id="enterprise"
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
            id="comments"
            name="comments"
            type="textarea"
            value={infos?.comments}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <input
          type="submit"
          name="submit-button"
          className="button button--submit"
          value="Créer le contact"
          aria-label="Créer le contact"
        />
        <input
          type="button"
          name="cancel-button"
          className="button button--cancel"
          value="Annuler"
          aria-label="Annuler"
          onClick={() => navigate('/contacts')}
        />
      </form>
    </div>
  );
}

export default CreateContact;
