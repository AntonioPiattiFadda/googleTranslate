import './Footer.css';
import { State } from '../types';

function Footer({ state }) {
  return <footer className="footer">{JSON.stringify(state)}</footer>;
}
export default Footer;
