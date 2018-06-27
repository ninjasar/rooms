import React from "react";

import './index.css';
import backIcon from './back.png';

class BackButton extends React.Component {
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  render() {
    return (
      <button
        className="back"
        onClick={this.context.router.history.goBack}>
        <img src={backIcon} alt="back" className="backIcon" title="Go Back"/>

      </button>
    )
  }
}

export default BackButton;
