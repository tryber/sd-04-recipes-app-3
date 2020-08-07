import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';

const ShareBtn = () => {
  const [shareTimer, setShareTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    if (shareTimer === 5) {
      clearInterval(timerInterval);
    }
  }, [shareTimer, timerInterval]);

  const handleShare = () => {
    clearInterval(timerInterval);
    setShareTimer(1);
    setTimerInterval(
      setInterval(() => setShareTimer((prevState) => prevState + 1), 1000),
    );
    copy(window.location.href);
  };

  return (
    <React.Fragment>
      <button type="button" onClick={handleShare}>
        <img src={shareIcon} alt="Share button" />
      </button>
      {shareTimer > 0 && shareTimer < 5 ? (
        <div>
          <p>Link copiado!</p>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ShareBtn;
