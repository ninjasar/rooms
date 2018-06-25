import React from 'react';


import './index.css';
import torch from './torch.png';

class Logo extends React.Component {




  //<Route path="*"/>
  render () {
    return (
      <div className="logoContainer">
        <div>
          <img src={torch} alt="torch" className="logo"/>
        </div>
      </div>
    );
  }


}


export default Logo;
