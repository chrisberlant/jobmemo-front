import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const navigateToCardItem = () => {
    navigate(`/contact/${id}`);
  };

  return (
    <div className="Contact">
      <h1>
        {firstName} {lastName}
      </h1>
      <p>Entreprise : {enterprise}</p>
      <p>Fonction : {occupation}</p>
      <button type="button" onClick={navigateToCardItem}>
        Voir le contact
      </button>
    </div>
  );
}

export default Contact;
