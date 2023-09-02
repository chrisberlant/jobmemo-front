import { Link, useNavigate } from 'react-router-dom';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import { useLayoutEffect, useRef } from 'react';
import logo from '../../assets/images/logo.svg';
// import check from '../../assets/icons/check.svg';
// import error from '../../assets/icons/error.svg';
import './Register.scss';

function Register() {
  // ANIMATION ////////////////////////////////////////////////////
  const registerRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const tl = useRef();

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

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const registerBox = self.selector('.box-register');
      const registerElements = self.selector('.box-register *');
      const labels = self.selector('label');

      tl.current = gsap
        .timeline()
        .from(registerBox, {
          ease: 'ease.Out',
          duration: 0.4,
          clipPath:
            'polygon(0px 100px, 50px 50px, 300px 50px, 300px 500px, 250px 550px, 0px 550px)',
        })
        .from(registerElements, {
          opacity: 0,
          stagger: 0.01,
        })
        .to(labels, {
          opacity: 1,
          stagger: 0.05,
        });
    }, registerRef);
    return () => ctx.revert();
  }, []);
  // FIN ANIMATION /////////////////////////////////////////////////////

  // Register form submit
  const handleSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const fetchParams = {
        method: 'POST',
        body: formData,
      };
      const response = await fetch(
        'http://localhost:3000/register',
        fetchParams
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    navigate('/login');
  };

  return (
    <div className="register" ref={registerRef}>
      <div className="box-register">
        <h2>Créer votre compte</h2>
        <img className="logo" src={logo} alt="logo" />
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-wrap">
            <label htmlFor="firstName">Prénom : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="new-password"
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
              id="lastName"
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
            <label htmlFor="confirmPassword">Confirmez mot de passe : </label>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
            />
            <div className="line" />
          </div>
          <div className="input-wrap">
            <input type="submit" defaultValue="Enregistrer" />
          </div>
        </form>
        <span className="forgot">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
