import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadFileType } from '../../@types/jobmemo';
import securedFetch from '../../Utils/securedFetch';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import './DocumentUpload.scss';

function Upload() {
  const navigate = useNavigate();
  const [infos, setInfos] = useState<UploadFileType>({
    title: '',
    type: 'Autre',
    file: null,
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!infos.file || !infos.title) {
      console.log('Entrer un nom de document et sélectionner un fichier');
      return;
    }
    const formData = new FormData();
    formData.append('title', infos.title);
    formData.append('type', infos.type);
    formData.append('file', infos.file);
    await securedFetch('/uploadFile', 'POST', formData);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.name === 'file' && e.target instanceof HTMLInputElement)
      setInfos({ ...infos, file: e.target.files?.[0] });
    else setInfos({ ...infos, [e.target.name]: e.target.value });
  };

  return (
    <div className="document-upload">
      <span className="title">Envoi d&apos;un document</span>
      <form className="document-upload-form" onSubmit={handleSubmit}>
        <div className="input-wrap">
          <label htmlFor="title">Titre du document : </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
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
          aria-label="Annuler"
          onClick={() => navigate('/documents')}
        />
      </form>
    </div>
  );
}

export default Upload;
