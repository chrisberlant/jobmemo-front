import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentModificationType } from '../../../@types/jobmemo';
import {
  modifyDocument,
  deleteDocument,
} from '../../../store/reducers/documents';
import { handleFocus, handleBlur } from '../../../Utils/animatedForm';
import { useAppDispatch, useAppSelector } from '../../../store/hook/redux';
import { setMessage } from '../../../store/reducers/app';
import securedFetch from '../../../Utils/securedFetch';
import './DocumentDetails.scss';

function DocumentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const document = useAppSelector((state) => state.documents.items).find(
    (searchedDocument) => searchedDocument.id === id
  );
  const [documentIsFetched, setDocumentIsFetched] = useState(false);
  const [infos, setInfos] = useState<DocumentModificationType>({
    title: '',
    type: 'Autre',
  });

  useEffect(() => {
    const fetchDocument = async () => {
      if (document) {
        setInfos(document);
      } else {
        // Get document infos from API if not in the store
        const fetchedContact = await securedFetch(`/document/${id}`);
        if (fetchedContact.failed) {
          navigate('/404');
        }
        setInfos(fetchedContact.data);
      }
    };
    if (!documentIsFetched) {
      fetchDocument();
      setDocumentIsFetched(true);
    }
  }, [document, id, documentIsFetched, navigate]);

  const handleDocumentDelete = async () => {
    if (id) {
      const request = await dispatch(deleteDocument(id));
      if (request.meta.requestStatus === 'fulfilled') {
        navigate('/contacts');
        setTimeout(() => {
          dispatch(setMessage('Contact supprimé avec succès'));
        }, 200);
      }
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await dispatch(modifyDocument(infos));
    if (request.meta.requestStatus === 'fulfilled') {
      navigate('/documents');
      setTimeout(() => {
        dispatch(setMessage('Document modifié avec succès'));
      }, 200);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  return (
    <div className="document-details">
      <span className="title">D&eacute;tails d&apos;un document</span>
      <form className="document-details-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="title">Titre du document : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="title"
            id="title"
            value={infos.title}
            onChange={handleChange}
            required
          />
          <div className="line" />
        </div>
        <div className="input-wrap">
          <div className="select-input">
            <label htmlFor="type">Type : </label>
            <select
              id="type"
              name="type"
              value={infos.type}
              onChange={handleChange}
              required
            >
              <option value="CV">CV</option>
              <option value="Lettre de motivation">Lettre de motivation</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>
        <input type="hidden" name="id" value={id} />
        <input
          type="submit"
          className="button button--submit"
          value="Modifier le document"
        />
        <input
          type="button"
          className="button button--download"
          value="Télécharger le document"
          aria-label="Télécharger le document"
          // onClick={handleDocumentDownload}
        />
        <input
          type="button"
          className="button button--delete"
          value="Supprimer le document"
          aria-label="Supprimer le document"
          onClick={handleDocumentDelete}
        />
        <input
          type="button"
          className="button button--cancel"
          value="Annuler"
          aria-label="Annuler"
          onClick={() => navigate('/documents')}
        />
      </form>
    </div>
  );
}

export default DocumentDetails;
