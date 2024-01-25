import trollface from "../../images/trollface.png";
import "./Header.style.css";

export default function Header() {
  return (
    <header className="header">
      <img src={trollface} className="header--image" alt="" />
      <h2 className="header--title">Meme Generator</h2>
    </header>
  );
}
