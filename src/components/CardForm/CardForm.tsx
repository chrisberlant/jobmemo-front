import { useParams } from 'react-router-dom';
import './CardForm.scss';

function CardForm() {
  const { id } = useParams();
  console.log(id);
  return (
    <div className="CardForm">
      <h1>Hello CardForm {id}</h1>
    </div>
  );
}

export default CardForm;
