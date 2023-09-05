import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import './ContactForm.scss';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import { useAppSelector } from '../../../store/hook/redux';
import securedFetch from '../../../Utils/securedFetch';
import Form from '../../Form/Form';

function ContactForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = useAppSelector((state) => state.contacts.items).find(
    (searchedContact) => searchedContact.id === id
  );
  const inputNames = [
    'firstName',
    'lastName',
    'occupation',
    'email',
    'phone',
    'linkedinProfile',
    'enterprise',
    'comments',
  ];
  const [infos, setInfos] = useState({
    firstName: '',
    lastName: '',
    occupation: '',
    email: '',
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
  // TODO uncomment if Form component not working
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInfos({ ...infos, [event.target.name]: event.target.value });
  // };

  const handleSubmit = () => {
    // const formInfos = new FormData();
    // dispatch(createNewContact(formInfos));
  };

  <Form
    className="contact"
    inputNames={inputNames}
    handleSubmit={handleSubmit}
    inputValues={infos}
    setInputValues={setInfos}
  />;
  // TODO uncomment if Form component not working
  // return (
  //   <form className="contact" onSubmit={handleSubmit}>
  //     <div className="input-wrap">
  //       <label htmlFor="lastName">Nom : </label>
  //       <input
  //         name="lastName"
  //         value={infos.lastName}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="firstName">Prénom : </label>
  //       <input
  //         name="firstName"
  //         value={infos.firstName}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="occupation">Fonction : </label>
  //       <input
  //         name="occupation"
  //         value={infos?.occupation}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="email">Email : </label>
  //       <input
  //         name="email"
  //         value={infos?.email}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="phone">Téléphone : </label>
  //       <input
  //         name="phone"
  //         value={infos?.phone}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="linkedinProfile">Profil LinkedIn : </label>
  //       <input
  //         name="linkedinProfile"
  //         value={infos?.linkedinProfile}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="enterprise">Entreprise : </label>
  //       <input
  //         name="enterprise"
  //         value={infos?.enterprise}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <label htmlFor="comments">Commentaires : </label>
  //       <input
  //         name="comments"
  //         type="textarea"
  //         value={infos?.comments}
  //         onFocus={handleFocus}
  //         onBlur={handleBlur}
  //         onChange={handleChange}
  //       />
  //       <div className="line" />
  //     </div>
  //     <div className="input-wrap">
  //       <button type="submit" className="submit-button">
  //         Modifier le contact
  //       </button>
  //     </div>
  //   </form>
  // );
}

export default ContactForm;
