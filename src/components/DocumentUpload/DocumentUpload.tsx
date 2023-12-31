import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentUploadFormType } from '../../@types/jobmemo';
import { createNewDocument } from '../../store/reducers/documents';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { useAppDispatch } from '../../store/hook/redux';
import { setMessage } from '../../store/reducers/app';
import './DocumentUpload.scss';

function DocumentUpload() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [infos, setInfos] = useState<DocumentUploadFormType>({
    title: '',
    type: 'Autre',
    file: null,
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const request = await dispatch(createNewDocument(infos));
    if (request.meta.requestStatus === 'fulfilled') {
      navigate('/documents');
      setTimeout(() => {
        dispatch(setMessage('Document ajouté avec succès'));
      }, 200);
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === 'file' && e.target instanceof HTMLInputElement) {
      if (e.target.files) {
        setInfos({ ...infos, file: e.target.files[0] });
      }
    } else setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  return (
    <div className="document-upload">
      <h3 className="component-title">Envoi d&apos;un document</h3>
      <form className="document-upload-form" onSubmit={handleSubmit}>
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
        <div className="input-wrap">
          <label htmlFor="file">Sélectionner document</label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={handleChange}
            accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .odt, .ods, .odp, .ott, .ots, .otp, .jpg, .jpeg, .png, .gif"
            required
          />
        </div>
        <input
          type="submit"
          className="button button--submit"
          value="Envoyer le document"
        />
        <input
          type="button"
          className="button button--cancel"
          value="Annuler"
          onClick={() => navigate('/documents')}
        />
      </form>
    </div>
  );
}

export default DocumentUpload;
