import React from 'react';
import PropTypes from 'prop-types';
import './star.css';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { isClicked: props.isClicked };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isClicked: !this.props.isClicked });
    this.props.handleStarClick(this.props.id);
  }

  render() {
    return(
      <span onClick={this.handleClick}>
        <svg
          id="star-svg"
          xmlns="http://www.w3.org/2000/svg">
          <polygon
            transform={'scale(0.1)'}
            points="100,10 40,180 190,60 10,60 160,180"
            fill={ this.state.isClicked ? '#269B66': '#AEAEAE'}/>
        </svg>
      </span>
    )
  }
}

Star.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  handleStarClick: PropTypes.func.isRequired
};

export default Star;
