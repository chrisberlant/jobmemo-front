import { Link } from 'react-router-dom';
import { ContactType } from '../../../@types/jobmemo';
import './Contact.scss';

function Contact({
  id,
  firstName,
  lastName,
  enterprise,
  occupation,
}: ContactType) {
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
