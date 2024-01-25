import "./Meme.style.css";
import memesData from "./utils.js";
import { useState } from "react";
export default function Meme() {
  const [meme, setMeme] = useState({
    toptext: "",
    bottomtext: "",
    randomImage: "https://i.imgflip.com/1g8my4.jpg",
  });
  const [allMemesImages, setAllmemeImages] = useState(memesData);
  function getMemeImage() {
    const memesArray = allMemesImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prevImg) => ({
      ...prevImg,
      randomImage: url,
    }));
  }
  return (
    <main>
      <div className="memeContainer">
        <div className="inputCaptions">
          <input
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            value="Top Text"
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            value="Bottom text"
          />
        </div>
        <div className="memeGet">
          <button className="form--button" onClick={getMemeImage}>
            New meme image
          </button>
        </div>
        <div className="meme">
          <img src={meme.randomImage} className="meme--image" alt="" />
          <h2 className="meme--text top">topText</h2>
          <h2 className="meme--text bottom">bottomText</h2>
        </div>
      </div>
    </main>
  );
}
