import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import { useAppDispatch, useAppSelector } from '../../../store/hook/redux';
import securedFetch from '../../../Utils/securedFetch';
import { modifyContact, deleteContact } from '../../../store/reducers/contacts';
import { setMessage } from '../../../store/reducers/app';
import './ContactDetails.scss';

function ContactDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const contact = useAppSelector((state) => state.contacts.items).find(
    (searchedContact) => searchedContact.id === id
  );
  const [contactIsFetched, setContactIsFetched] = useState(false);
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
        // Get contact from API if not in the store
        const fetchedContact = await securedFetch(`/contact/${id}`);
        if (fetchedContact.failed) {
          navigate('/404');
        }
        setInfos(fetchedContact.data);
      }
    };
    if (!contactIsFetched) {
      fetchContact();
      setContactIsFetched(true);
    }
  }, [contact, id, contactIsFetched, navigate]);

  const handleContactDelete = async () => {
    if (id) {
      const request = await dispatch(deleteContact(id));
      if (request.meta.requestStatus === 'fulfilled') {
        navigate('/contacts');
        setTimeout(() => {
          dispatch(setMessage('Contact supprimé avec succès'));
        }, 200);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await dispatch(modifyContact(infos));
    if (request.meta.requestStatus === 'fulfilled') {
      navigate('/contacts');
      setTimeout(() => {
        dispatch(setMessage('Contact modifié avec succès'));
      }, 200);
    }
  };

  return (
    <div className="contact-details">
      <h3 className="component-title">D&eacute;tails du contact</h3>
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
            value={infos.occupation}
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
            value={infos.email}
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
            value={infos.phone}
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
            value={infos.linkedinProfile}
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
            value={infos.enterprise}
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
            value={infos.comments}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
        <input type="hidden" name="id" value={id} />
        <input
          type="submit"
          className="button button--submit"
          value="Modifier le contact"
        />
        <input
          type="button"
          className="button button--delete"
          value="Supprimer le contact"
          onClick={handleContactDelete}
        />
        <input
          type="button"
          className="button button--cancel"
          value="Annuler"
          onClick={() => navigate('/contacts')}
        />
      </form>
    </div>
  );
}

export default ContactDetails;
