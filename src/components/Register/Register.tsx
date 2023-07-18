// import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
// import { useLayoutEffect, useRef } from 'react';
import logo from '../../assets/images/logo.svg';
// import check from '../../assets/icons/check.svg';
// import error from '../../assets/icons/error.svg';
import './Register.scss';

function Register() {
  // ANIMATION ////////////////////////////////////////////////////

  // Animation des champs avec GSAP >>
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

  // Register form submit
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // A virer (pour tester le contenu du formulaire dans la console)
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    // Appel à l'API
    // try {
    //   const fetchParams = {
    //     method: 'POST',
    //     body: formData,
    //   };
    //   const response = await fetch('http://localhost:3000/login', fetchParams);
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {git branch
    //   console.error(error);
    // }
  };

  return (
    <div className="box-wrap">
      <div className="box-register">
        <h2>Créer votre compte</h2>
        <img className="logo" src={logo} alt="logo" />
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="first_name">Prénom : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="first_name"
              id="first_name"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="last_name">Nom : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="last_name"
              id="last_name"
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Mot de passe : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <label htmlFor="confirm_password">Confirmez mot de passe : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="password"
              name="confirm_password"
              id="confirm_password"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Enregistrer" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
