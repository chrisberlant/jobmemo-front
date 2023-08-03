import './CreateContact.scss';
import { useAppDispatch } from '../../store/hook/redux';
import { createNewContact } from '../../store/reducers/contacts';

function CreateContact() {
  const dispatch = useAppDispatch();
  const handleCreationSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    dispatch(createNewContact(formData));
  };

  return (
    <div className="box-contact">
      <div className="box-contactform">
        <form method="post" onSubmit={handleCreationSubmit}>
          <div className="input-wrap">
            <label htmlFor="firstName">Prénom : </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="lastName">Nom : </label>
            <input
              type="text"
              name="lastName"
              id="LastName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="email">email: </label>
            <input type="email" name="email" id="email" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="phone">Téléphone : </label>
            <input type="tel" name="phone" id="phone" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterprise">Entreprise : </label>
            <input
              type="text"
              name="enterprise"
              id="enterprise"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="occupation">Fonction : </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="linkedinProfile">Url du profil Linkedin : </label>
            <input
              type="text"
              name="linkedinProfile"
              id="linkedinProfile"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="comments">Commentaires : </label>
            <textarea name="comments" id="comments" autoComplete="off" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="submit" value="Créer le contact" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContact;
