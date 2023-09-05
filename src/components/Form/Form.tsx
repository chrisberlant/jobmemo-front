import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { handleFocus, handleBlur } from '../../Utils/animatedForm';

interface FormProps {
  className: string;
  inputNames: string[];
  handleSubmit: () => void;
  inputValues: T;
  setInputValues: Dispatch<SetStateAction<T>>;
}
// TODO fix this
function Form<T extends Record<string, string | null>>({
  className,
  inputNames,
  handleSubmit,
  inputValues,
  setInputValues,
}: FormProps<T>) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      {inputNames.map((input) => (
        <div className="input-wrap" key={input}>
          <label htmlFor={input}>{input} : </label>
          <input
            name={input}
            value="test"
            // value={inputValues?.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="line" />
        </div>
      ))}
      <div className="input-wrap">
        <button type="submit" className="submit-button">
          Modifier le contact
        </button>
      </div>
    </form>
  );
}

export default Form;
