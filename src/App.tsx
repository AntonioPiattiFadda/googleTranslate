import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import Footer from './Components/Footer';
import { useStore } from './Hooks/useStore';
import { AUTO_LANGUAGE } from './constants';
import { ArrowIcon, CopyIcon, SpeakerIcon } from './Icons';
import LanguageSelector from './Components/LanguageSelector';
import TextArea from './Components/TextArea';
import { getTraduction } from './Services/trastlation';
import { useEffect, useState } from 'react';
import useDebounce from './Hooks/useDebounce';

function App() {
  const {
    setFromText,
    setResult,
    state,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
  } = useStore();
  const handleClick = () => {
    interchangeLanguages();
  };
  const [copied, setCopied] = useState(false);

  const debbouncedText = useDebounce(state.fromText, 600) || '';

  useEffect(() => {
    const { fromText, fromLanguage, toLanguage } = state;
    if (fromText === '') return;
    const text = getTraduction({ debbouncedText, fromLanguage, toLanguage });
    text.then((res) => {
      if (res.error) {
        setResult(state.fromText);
        return;
      }
      setResult(res.data.translations[0].translatedText);
    });
  }, [debbouncedText, state.toLanguage, state.fromLanguage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(state.result);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(state.result);
    utterance.lang = state.toLanguage;
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Container fluid>
        <h1>Google translate</h1>
        <Row>
          <Col>
            <h3>From</h3>
            <Stack gap={2}>
              <LanguageSelector
                type="from"
                value={state.fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                type="from"
                onChange={setFromText}
                value={state.fromText}
              />
            </Stack>
          </Col>
          <Col xs="auto">
            <Button
              className="btn"
              variant="warning"
              disabled={state.fromLanguage === AUTO_LANGUAGE}
              onClick={handleClick}
            >
              <ArrowIcon />
            </Button>
          </Col>
          <Col>
            <h3>To</h3>
            <Stack gap={2}>
              <LanguageSelector
                type="to"
                value={state.toLanguage}
                onChange={setToLanguage}
              />
              <div className="text_area__container">
                <TextArea
                  type="to"
                  loading={state.loading}
                  value={state.result}
                />
                <div className="button__container">
                  <Button
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                    variant="link"
                    onClick={handleCopy}
                  >
                    {' '}
                    {copied && (
                      <div className="label-container">
                        <span className="label-text show">
                          Traducción copiada!
                        </span>
                      </div>
                    )}{' '}
                    <CopyIcon />
                  </Button>
                  <Button
                    style={{
                      margin: 0,
                      padding: 0,
                    }}
                    variant="link"
                    onClick={handleSpeak}
                  >
                    {' '}
                    <SpeakerIcon />
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
      {/* <Footer state={state} /> */}
    </>
  );
}

export default App;
