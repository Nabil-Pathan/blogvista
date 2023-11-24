import React from 'react'
import { ProgressBar } from "react-loader-spinner"
const ImageLoader = () => {
  return (
    <div className="flex  items-center justify-center">
   <ProgressBar
  height="40"
  width="40"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#F4442E'
  barColor = '#51E5FF'
/>
  </div>
  )
}

export default ImageLoader