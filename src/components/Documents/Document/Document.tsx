import { Link } from 'react-router-dom';
import { DocumentType } from '../../../@types/jobmemo';
import './Document.scss';

function Document({ id, title, type, url }: DocumentType) {
  return (
    <div className="document">
      <h1>{title}</h1>
      <p>Type : {type}</p>
      <p>Url : {url}</p>
      <Link className="see-document-button" to={`/document/${id}`}>
        <button type="button">Voir le document</button>
      </Link>
    </div>
  );
}

export default Document;
