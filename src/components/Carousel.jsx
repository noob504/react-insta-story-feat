import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Stories from "react-insta-stories";
import ReactModal from "react-modal";

import "./Carousel.css";
import { statusCarousel } from "../data";
import { imageUrl } from '../imageUrl';


const Carousel = () => {
  
  const avatarClickHandler = (id) => {
    setAvatarClicked(true);
    setModalOpenState(true);
    console.log("avatar clicked");
    setActiveAvatar(id);
    setCurrentStoryId(0);
  };
  

  const nextStoryHandler = (storyId) => {
    if (activeAvatar === statusCarousel.length) {
      setAvatarClicked(false);
      setModalOpenState(false);
    }
    setActiveAvatar(activeAvatar + 1);
    
  }
  
  const prevStoryHandler = (storyId) => {
    setCurrentStoryId(storyId--);
  }
  
  
  const closeButtonHandler = () => {
    setAvatarClicked(false);
    setModalOpenState(false);
  };
  
  const nextButtonHandler = () => {
    console.log("next button clicked");
    if (activeAvatar !== statusCarousel.length) {
      setActiveAvatar(activeAvatar + 1);
    }
  };

  const prevButtonHandler = () => {
    console.log("prev button clicked");
    if (activeAvatar !== 1) {
      setActiveAvatar(activeAvatar - 1);
    }
  };
  
  
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [activeAvatar, setActiveAvatar] = useState();
  const [modalOpenState, setModalOpenState] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState();
  
  console.log("active story: ", currentStoryId)
  console.log("active avatar id: ", activeAvatar)
  console.log(">>>>: ", imageUrl);      // currently returns an array of the urls
  return (
    <>
      <div className="carousel-body">
        {statusCarousel.map((item) => {
          return (
            <img
              className="avatar-profile-image"
              src={item.img}
              alt=""
              onClick={() => { avatarClickHandler(item.id) }}
              key={item.id}
            />
          );
        })}
      </div>

      {avatarClicked && (
        <>
          <ReactModal
            isOpen={modalOpenState}
            transparent={true}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                zIndex: 10,
              },
              content: {
                border: "none",
                background: "transparent",
                overflow: "hidden",
                WebkitOverflowScrolling: "touch",
                borderRadius: "0px",
                outline: "none",
                padding: "0px",
              },
            }}
          >

            <div className="arrow-icon-container">
              <ArrowBackIosIcon
                className="arrow-icon"
                style={{
                  fontSize: 40,
                  color: "white",
                }}
                onClick={prevButtonHandler}
              />
              <ArrowForwardIosIcon
                className="arrow-icon"
                style={{
                  fontSize: 40,
                  color: "white",
                }}
                onClick={nextButtonHandler}
              />
            </div>


            <div className="story-container">
              <Stories
                stories={imageUrl[activeAvatar-1]}
                // loop={true}
                defaultInterval={2500}
                width={500}
                height={848}
                style={{
                  margin: "0px",
                  padding: "0px",
                }}
                onAllStoriesEnd={nextStoryHandler}
                currentIndex={currentStoryId}
              />
            </div>
            
            <div className="close-icon-container">
              <CloseIcon
                className="close-icon"
                onClick={closeButtonHandler}
                style={{
                  fontSize: 40,
                  color: "white",
                }}
              />
            </div>
          </ReactModal>
        </>
      )}
    </>
  );
};

export default Carousel;
