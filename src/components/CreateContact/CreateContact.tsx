import './CreateContact.scss';
import { gsap } from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import { createNewContact } from '../../store/reducers/contacts';
import { useAppDispatch } from '../../store/hook/redux';

function CreateContact() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleCreationSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    dispatch(createNewContact(formData));
    navigate('/contacts');
  };

  // ANIMATION ////////////////////////////////////////////////////

  // Animation des champs email et mot de passe avec GSAP >>
  // Animation lorsqu'il y'a une action sur le champ
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.parentNode?.querySelector('label');
    const line = e.target.parentNode?.querySelector('.line');
    if (label && line) {
      gsap.to(label, {
        duration: 0.2,
        y: -16,
        color: '#4a65ff',
      });
      gsap.to(line, {
        scaleX: 1,
      });
    }
  };
  // Animation lorsque l'on sort du champ
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const label = e.target.parentNode?.querySelector('label');
    const line = e.target.parentNode?.querySelector('.line');

    if (label && line) {
      if (e.target.value === '') {
        gsap.to(label, {
          duration: 0.1,
          y: 0,
          color: '#999',
        });
        gsap.to(line, {
          scaleX: 0,
        });
      }
    }
  };
  // FIN ANIMATION /////////////////////////////////////////////////////

  return (
    <div className="box-contact">
      <div className="box-contactform">
        <form method="post" onSubmit={handleCreationSubmit}>
          <div className="input-wrap">
            <label htmlFor="firstName">Prénom : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="lastName"
              id="LastName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="email">Email : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="email"
              name="email"
              id="email"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="phone">Téléphone : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="tel"
              name="phone"
              id="phone"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterprise">Entreprise : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="linkedinProfile"
              id="linkedinProfile"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          {/* <div className="input-wrap">
            <label htmlFor="comments">Commentaires : </label>
            <textarea name="comments" id="comments" autoComplete="off" />
            <div className="line" />
  </div> */}
          <div className="input-wrap">
            <input type="submit" value="Créer le contact" />
          </div>
        </form>
        <Link to="/contacts" className="link">
          Retour
        </Link>
      </div>
    </div>
  );
}

export default CreateContact;
