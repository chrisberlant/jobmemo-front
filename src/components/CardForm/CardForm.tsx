import { Link, useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChangeEvent, useState } from 'react';
// import ReactQuill from 'react-quill';
import logo from '../../assets/images/logo.svg';
import './CardForm.scss';
import { useAppSelector } from '../../store/hook/redux';
// Import Quill css and snow theme (2 themes are available : snow & bubble)
// import 'react-quill/dist/quill.snow.css';

function CardForm() {
  // state for select value of contractType
  const [value, setValue] = useState('');
  // onChange : catch the new value
  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    setValue(e.target.value);
  }
  // onSubmit : catch all entries from Form
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append('contrat', value);
    console.log(Object.fromEntries(formData.entries()));
  };

  const { id } = useParams();

  const navigate = useNavigate();

  /* const navigateToDrive = () => {
    navigate('/docs');
  }; */

  const back = () => {
    navigate('/dashboard');
    window.location.reload();
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
    <div className="box-wrap">
      <div className="box-cardform">
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        {/* <img className="avatar" src="avatarUrl" alt="avatar" /> */}
        <div className="input-wrap">
          <label htmlFor="category">Catégorie : </label>
          <select className="category">
            <option>catégories</option>
          </select>
          <div className="line" />
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="title">Titre : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="title"
              id="title"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterpriseName">Entreprise : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="enterpriseName"
              id="enterpriseName"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="enterpriseUrl">
              Site web de l&apos;entreprise :
            </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="enterpriseUrl"
              id="enterpriseUrl"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="adress">Adresse : </label>
            <textarea name="adress" id="adress" autoComplete="off" />
            <div className="line" />
          </div>
          {/* <h3>Contacts liés</h3>
          <div className="input-wrap">
            <label htmlFor="contacts">Ajouter depuis mon réseau : </label>
            <input type="search" />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="button" defaultValue="Ajouter un nouveau contact" />
            <div className="line" />
          </div> */}
          <div className="input-wrap">
            <label htmlFor="offer-title">Intitulé de l&apos;annonce : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="offer-title"
              id="offer-title"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="offerUrl">Source / Lien de l&apos;annonce : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="offerUrl"
              id="offerUrl"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="contractType">Type de contrat : </label>
            <select
              className="contractType"
              value={value}
              onChange={handleChange}
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Alternance">Alternance</option>
              <option value="Intérim">Intérim</option>
            </select>
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="commentaries">Descriptif du poste : </label>
            <textarea
              name="commentaries"
              id="commentaries"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="salary">Salaire : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="salary"
              id="salary"
              autoComplete="off"
            />
            <div className="line" />
          </div>
          {/* // add Quill text editor 
            <div className="input-wrap">
            <div className="box-editor">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
              </div> */}
          {/* <div className="input-wrap">
            <label htmlFor="docs">Documents associés : </label>
            <select className="docs">
              <option value="#">Document 01</option>
              <option value="#">Document 02</option>
              <option value="#">Document 03</option>
              <option value="#">Document 04</option>
            </select>
            <div className="line" />
            </div> 
          <h2>Ajouter un document depuis : </h2>
          <div className="input-wrap">
            <input
              type="button"
              onClick={navigateToDrive}
              defaultValue="Drive"
            />
          </div>
          <div className="input-wrap">
            <input type="file" />
            </div> */}
          <div className="input-wrap">
            <input type="submit" defaultValue="Enregistrer" />
          </div>
          {/* <div className="input-wrap">
            <input type="reset" defaultValue="Annuler" />
          </div> */}
        </form>
        <button type="button" onClick={back}>
          Retour
        </button>
      </div>
    </div>
  );
}

export default CardForm;
