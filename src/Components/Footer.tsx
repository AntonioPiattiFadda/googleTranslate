import './Footer.css';

function Footer({ state }: any) {
  return <footer className="footer">{JSON.stringify(state)}</footer>;
}
export default Footer;
