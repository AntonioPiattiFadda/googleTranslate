import { Form } from 'react-bootstrap';

type Props =
  | {
      type: 'to';
      loading: boolean;
      onChange?: (text: string) => void;
      value: string;
    }
  | {
      type: 'from';
      loading?: undefined;
      onChange: (text: string) => void;
      value: string;
    };
const commonStyles = {
  height: '150px',
  backgroundColor: 'white',
  // resize: 'none',
};

const TextArea = ({ type, loading, onChange, value }: Props) => {
  const styles =
    type === 'from'
      ? { ...commonStyles }
      : { ...commonStyles, backgroundColor: '#f8f9fa' };
  const placeholder =
    type === 'from'
      ? 'Ingresa un texto'
      : loading
      ? 'Cargando..'
      : 'Traduccion';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'from') {
      onChange(e.target.value);
    }
    return;
  };

  return (
    <Form.Control
      as="textarea"
      placeholder={placeholder}
      style={styles}
      disabled={type === 'to'}
      onChange={handleChange}
      value={value}
    />
  );
};

export default TextArea;
