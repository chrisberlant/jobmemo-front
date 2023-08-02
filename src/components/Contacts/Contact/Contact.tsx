import { useNavigate, Link } from 'react-router-dom';
import './Contact.scss';

interface ContactProps {
  id: string;
  firstName: string;
  lastName: string;
  enterprise: string;
  occupation: string;
}

function Contact({
  id,
  firstName,
  lastName,
  enterprise,
  occupation,
}: ContactProps) {
  return (
    <div className="contact">
      <h1>
        {firstName} {lastName}
      </h1>
      <p>Entreprise : {enterprise}</p>
      <p>Fonction : {occupation}</p>
      <Link className="see-contact-button" to={`/contact/${id}`}>
        <button type="button">Voir le contact</button>
      </Link>
    </div>
  );
}

export default Contact;
