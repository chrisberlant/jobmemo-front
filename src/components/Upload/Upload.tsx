import { ChangeEvent, useState } from 'react';
import securedFetch from '../../Utils/securedFetch';
import './Upload.scss';

function Upload() {
  const [title, setTitle] = useState<string>('');
  const [file, setFile] = useState<File>();

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // if (!file || !title) {
    //   console.log('Entrer un nom de document et sélectionner un fichier');
    //   return;
    // }

    const form = event.target;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    console.log(form);
    await securedFetch('/uploadFile', 'POST', formData);
  };

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const changeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) setFile(event.target.files[0]);
  };

  return (
    <div className="upload">
      <h1>File Upload</h1>
      <form id="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Titre du document</label>
          <input
            name="title"
            id="title"
            placeholder="Titre du document"
            value={title}
            onChange={changeTitle}
          />
        </div>
        <div className="input-group">
          <label htmlFor="file">Sélectionner document</label>
          <input id="file" name="file" type="file" onChange={changeFile} />
        </div>
        <button className="button--submit" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default Upload;
