import React, { useState } from "react";
import Question from "./Question";
import img1 from "./images/ad1.jfif";
import img2 from "./images/ad2.jpg";
import img3 from "./images/ad3.avif";
import img4 from "./images/ad4.png";
import img5 from "./images/ad5.png";
import img6 from "./images/ad6.jpg";
import img7 from "./images/ad7.jpeg";

// Define an array of image URLs (replace with your actual image URLs)
//const allImages = [img1, img2, img3, img4, img5, img6, img7];

const allImages = [
  {
    id: 1,
    url: img1,
    description: "Image 1",
    link: "https://www.imdb.com/title/tt0113497/",
  },
  {
    id: 2,
    url: img2,
    description: "Image 2",
    link: "https://www.redbull.com/in-en",
  },
  {
    id: 3,
    url: img3,
    description: "Image 3",
    link: "https://example.com/page3",
  },
  {
    id: 4,
    url: img4,
    description: "Image 4",
    link: "https://www.penguin.com/",
  },
  {
    id: 5,
    url: img5,
    description: "Image 5",
    link: "https://www.cdc.gov/flu/about/season/index.html#:~:text=Most%20of%20the%20time%20flu,activity%20has%20been%20less%20predictable.",
  },
  {
    id: 6,
    url: img6,
    description: "Image 5",
    link: "https://www.healthline.com/health/skin/cracked-skin",
  },
  { id: 7, url: img7, description: "Image 5", link: "https://www.bk.com/" },
];

// Function to get a random subset of images
const getRandomImages = (images, count) => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function Questionlist({ questionlist }) {
  const [images, setImages] = useState(getRandomImages(allImages, 3));

  // Function to get a random subset of images
  function getRandomImages(images, count) {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Function to remove an image
  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };
  return (
    <>
      <div>
        <div className="mb-5">
          {questionlist.map((question) => (
            <Question question={question} key={question._id} />
          ))}
        </div>

        <div className="flex flex-wrap">
          {images.map((image) => (
            <div key={image.id} className="relative m-2">
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-40 h-40 object-cover cursor-pointer" // Add cursor-pointer for better UX
                />
              </a>
              <button
                onClick={() => removeImage(image.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-1"
              >
                &times; {/* Cross button */}
              </button>
              {/* <p className="text-center mt-1">{image.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Questionlist;
