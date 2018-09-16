import React from 'react';
import dateFormat from 'dateformat';

import './timeBtn.css';
import '../../god.css';

let btnSelected = 0;
const handleClick = () =>  {
  btnSelected= !btnSelected;
  //API.getLocInfo(loc)
}

var TimeBtn = (props) => {
  return (
  <div>
    <button className={"timeBtn pink" + (props.btnSelected ? " btnSelected purpleBckgd purpleBrdr" : " ")}  onClick={props.onClick}> {props.startTime ? dateFormat(props.startTime, "shortTime") : ' '}</button>
  </div>
  )
};

export default TimeBtn;
