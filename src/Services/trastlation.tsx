const API_KEY = import.meta.env.VITE_API_KEY;

interface Props {
  debbouncedText: string;
  fromLanguage: string;
  toLanguage: string;
}

export const getTraduction = ({
  debbouncedText,
  fromLanguage,
  toLanguage,
}: Props) => {
  const stringDeTraduccion = debbouncedText;
  const source = fromLanguage === 'auto' ? '' : fromLanguage;
  const target = toLanguage;
  const resquestJson = fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&q=${stringDeTraduccion}&target=${target}&source=${source}`
  );
  const translatedText = resquestJson.then((res) => res.json());
  return translatedText;
};
