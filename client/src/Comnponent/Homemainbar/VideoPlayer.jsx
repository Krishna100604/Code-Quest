import React, { useRef, useState } from "react";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [speedInterval, setSpeedInterval] = useState(null);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleForward = () => {
    videoRef.current.currentTime += 10;
  };

  const handleBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  const handleSpeedChange = (direction) => {
    if (direction === "forward") {
      setSpeedInterval(
        setInterval(() => (videoRef.current.currentTime += 0.2), 50)
      );
    } else {
      setSpeedInterval(
        setInterval(() => (videoRef.current.currentTime -= 0.3), 50)
      );
    }
  };

  const clearSpeedInterval = () => {
    clearInterval(speedInterval);
    setSpeedInterval(null);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    const { offsetX, target } = e.nativeEvent;
    const third = target.clientWidth / 3;

    if (offsetX < third) {
      handleBackward();
    } else if (offsetX > 2 * third) {
      handleForward();
    } else {
      handlePlayPause();
    }
  };

  const handleMouseDown = (e) => {
    const { offsetX, target } = e.nativeEvent;
    const half = target.clientWidth / 2;

    if (offsetX < half) {
      handleSpeedChange("backward");
    } else {
      handleSpeedChange("forward");
    }
  };

  const handleMouseUp = () => {
    clearSpeedInterval();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setVideoSource(fileURL);
    }
  };

  const handleClose = () => {
    setVideoSource(null);
  };

  return (
    <div style={styles.container}>
      <label style={styles.fileInputLabel}>
        Choose a video file
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
      </label>
      {videoSource && (
        <div
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={styles.videoContainer}
        >
          <video
            ref={videoRef}
            width="100%"
            controls
            onContextMenu={(e) => e.preventDefault()}
            style={styles.video}
          >
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleClose} style={styles.closeButton}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  fileInputLabel: {
    display: "inline-block",
    padding: "10px 20px",
    marginBottom: "20px",
    border: "2px solid #007BFF",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  fileInput: {
    display: "none",
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#000",
    borderRadius: "10px",
    overflow: "hidden",
  },
  video: {
    borderRadius: "10px",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "0 0 10px 10px",
  },
  controlButton: {
    margin: "0 10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default VideoPlayer;
