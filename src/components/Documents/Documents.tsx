import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook/redux';
import Document from './Document/Document';
import { getAllDocuments } from '../../store/reducers/documents';
import './Documents.scss';

function Documents() {
  const documents = useAppSelector((state) => state.documents.items);
  const noDocuments = useAppSelector((state) => state.documents.isEmpty);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the contacts from the API and dispatch them to the store on first render
  useEffect(() => {
    const fetchDocuments = () => {
      if (documents.length === 0 && !noDocuments) {
        dispatch(getAllDocuments());
      }
    };
    fetchDocuments();
  }, [dispatch, documents, noDocuments]);

  return (
    <div className="documents">
      <div className="documents-header">
        <h1>Vos Documents :</h1>
        {!isLoading && (
          <button
            type="button"
            className="add-document-button"
            onClick={() => navigate('/document-upload')}
          >
            Ajouter un nouveau document
          </button>
        )}
      </div>

      <div className="documents-container">
        {!isLoading && noDocuments ? (
          <span>Aucun document pour le moment</span>
        ) : (
          documents?.map((document) => (
            <Document
              key={document.id}
              id={document.id}
              title={document.title}
              type={document.type}
              url={document.url}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Documents;
