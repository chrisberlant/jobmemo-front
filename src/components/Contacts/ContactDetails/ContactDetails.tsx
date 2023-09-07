import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import { useAppSelector } from '../../../store/hook/redux';
import securedFetch from '../../../Utils/securedFetch';
import './ContactDetails.scss';

function ContactForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = useAppSelector((state) => state.contacts.items).find(
    (searchedContact) => searchedContact.id === id
  );
  // formRef.current?.handleInputFilled();
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

  useEffect(() => {
    const fetchContact = async () => {
      if (contact) {
        setInfos(contact);
      } else {
        const fetchedContact = await securedFetch(`/contact/${id}`);
        if (fetchedContact.status !== 200) {
          navigate('/404');
        }
        setInfos(fetchedContact.data);
      }
    };
    fetchContact();
  }, [contact, id, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // const formInfos = new FormData();
    // dispatch(createNewContact(formInfos));
  };

  return (
    <div className="contact-details">
      <span className="title">Détails du contact</span>
      <form className="contact-details-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="lastName">Nom : </label>
          <input
            id="lastName"
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
            id="firstName"
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
        <div className="input-wrap">
          <input
            type="submit"
            className="submit-button"
            value="Modifier le contact"
          />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
