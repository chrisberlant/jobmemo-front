import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';
import { CardType, ContactType } from '../../@types/jobmemo';

interface FormProps {
  className: string;
  inputNames: string[];
  handleSubmit: () => void;
  inputValues: CardType | ContactType;
  setInputValues: Dispatch<SetStateAction<CardType | ContactType>>;
}

// TODO FIX THIS LATER
function Form({
  className,
  inputNames,
  inputValues,
  setInputValues,
  handleSubmit,
}: FormProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {inputNames.map((input, index) => (
        <div className="input-wrap" key={input}>
          <label htmlFor={input}>{input} : </label>
          <input
            name={input}
            value={Object.values(inputValues)[index + 1]}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
      ))}
      <div className="input-wrap">
        <button type="submit" className="button--submit">
          Modifier le contact
        </button>
      </div>
    </form>
  );
}

export default Form;
