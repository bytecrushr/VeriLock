
import React, { useState } from 'react';

const FaviconScrap = ({ site }) => {
  const [errorCount, setErrorCount] = useState(0);

  let domain = '';
  try {
    const url = site.startsWith('http') ? site : `https://${site}`;
    domain = new URL(url).hostname;
  } catch (err) {
    return (
      <img
        src="/icon.png"
        alt="favicon"
        className="w-10 h-10"
      />
    );
  }

  // Decide which source to use based on how many times loading failed
  const getSrc = () => {
    if (errorCount === 0) {
      return `https://logo.clearbit.com/${domain}`;
    } else if (errorCount === 1) {
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } else {
      return `/icon.png`;
    }
  };

  return (
    <img
      src={getSrc()}
      onError={() => setErrorCount((prev) => prev + 1)}
      alt="favicon"
      className="w-10 h-10"
    />
  );
};

export default FaviconScrap;
