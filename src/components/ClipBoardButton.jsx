import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";


export const ClipBoardButton = () => {
  const [isCopied, setIsCopied] = useState(false);
  const params = useParams();

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(params.id)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <input type="text" value={params.id} readOnly />
      <button>
        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
      </button>
    </div>
  )
}
