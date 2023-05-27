import { Form } from 'react-bootstrap';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { Languages, FromLanguage } from '../types';

type Props =
  | {
      type: 'from';
      onChange: (language: Languages) => void;
      value: FromLanguage;
    }
  | {
      type: 'to';
      onChange: (language: Languages) => void;
      value: Languages;
    };

const LanguageSelector = ({ onChange, value, type }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Languages);
  };
  return (
    <>
      <Form.Select
        value={value}
        aria-label="Select a language"
        onChange={handleChange}
      >
        {type === 'from' && (
          <option value={AUTO_LANGUAGE}>Detectar idioma</option>
        )}
        {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default LanguageSelector;
