import React from 'react';

import './banner.css';
import ban from './banner.png';



const Banner = (props) => {
  return (
    <div id="bannerContainer">
      <img src={ban} alt="islands"/>
    </div>
  )
};

export default Banner;
