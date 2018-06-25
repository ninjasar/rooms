import React from 'react';

import './index.css';
import Img from './ban.png';


const Banner = (props) => (
      <div id="bannerContainer">
        <img src={Img} alt="islands"/>
        <div>
            Banner and stuff
        </div>
      </div>
);

export default Banner;
