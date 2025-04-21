import './Loading.css';
import React, { useState, useEffect } from 'react';

const frames = [
  '<span class="ellipse"><img src="/images/slugmation1.png" alt="Loading" class="loading-image" /></span>',
  '<span class="ellipse">.<img src="/images/slugmation2.png" alt="Loading" class="loading-image" /></span>',
  '<span class="ellipse">..<img src="/images/slugmation3.png" alt="Loading" class="loading-image" /></span>',
];

const Loading = () => {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <span
        className="loadingAnimation"
        dangerouslySetInnerHTML={{ __html: frames[frameIndex] }}
      />
    </div>
  );
};

export default Loading;

