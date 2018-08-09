import React from 'react';
import { NavLink } from 'react-router-dom';




var SuppQuestions = (props) => {
  return (
    <div>
      {props.message}
      {this.props.questions.forEach((q) => {
        return (
          <div>
            {q.description}
          </div>
        )
      })}
    </div>
  )
};

export default SuppQuestions;
