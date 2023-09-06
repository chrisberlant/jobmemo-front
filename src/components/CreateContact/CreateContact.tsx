import './CreateContact.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewContact } from '../../store/reducers/contacts';
import { useAppDispatch } from '../../store/hook/redux';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  // TODO FIX THIS
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    dispatch(createNewContact(formData));
    navigate('/contacts');
  };

  // TODO fix width, compared to ContactForm
  return (
    <form className="contact-creation" onSubmit={handleSubmit}>
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
        <input
          type="submit"
          className="submit-button"
          value="Créer le contact"
        />
      </div>
    </form>
  );
}

export default CreateContact;
