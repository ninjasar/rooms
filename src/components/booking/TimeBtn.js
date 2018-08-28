import React from 'react';
import dateFormat from 'dateformat';

import './timeBtn.css';



var TimeBtn = (props) => {
  return (
  <div>
    <button className={"timeBtn" + (props.btnSelected ? " btnSelected" : " ")}  onClick={props.onClick}> {props.startTime ? dateFormat(props.startTime, "shortTime") : ' '}</button>
  </div>
  )
};

export default TimeBtn;
