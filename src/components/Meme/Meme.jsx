import "./Meme.style.css";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemes, setAllMemes] = useState([]);
  const memeContainerRef = useRef();

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setAllMemes(data.data.memes || []);
        setMeme((prevMeme) => ({
          ...prevMeme,
          randomImage: data.data.memes?.[0]?.url || "",
        }));
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };

    fetchMemes();
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber]?.url || "";
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  const downloadMemeImage = async () => {
    try {
      const memeContainer = memeContainerRef.current;

      // Create an image from the meme content using html2canvas
      const memeImage = await html2canvas(memeContainer, { useCORS: true });

      // Create a download link
      const dataUrl = memeImage.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "generated-meme.png";
      document.body.appendChild(downloadLink);

      // Trigger a click on the link to start the download
      downloadLink.click();

      // Remove the download link from the document
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error capturing meme image:", error);
    }
  };

  return (
    <main>
      <div className="meme--Container">
        <div className="input--Captions">
          <input
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <div className="memeGet">
          <button className="form--button" onClick={getMemeImage}>
            New meme image
          </button>
        </div>
        <div className="meme" ref={memeContainerRef}>
          <img src={meme.randomImage} className="meme--image" alt="" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
        <div className="memeGet">
          <button className="form--button" onClick={downloadMemeImage}>
            Download Meme
          </button>
        </div>
      </div>
    </main>
  );
}
