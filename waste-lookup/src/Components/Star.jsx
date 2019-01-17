import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './star.css';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: this.props.isClicked };
  }

  handleStarClick = () => {
    this.props.handleStarClick();
  };

  render() {
    return(
      <span>
        <svg id="star-svg" xmlns="http://www.w3.org/2000/svg">
          <polygon
            onClick={this.handleStarClick}
            transform={'scale(0.1)'}
            points="100,10 40,180 190,60 10,60 160,180"
            fill={ this.state.isClicked ? '#269B66': '#AEAEAE'}/>
        </svg>
      </span>
    )
  }
}

Star.propTypes = {
  isClicked: PropTypes.bool,
  handleStarClick: PropTypes.func.isRequired
};

export default Star;
