import React, { Component }  from 'react';
import 'header.css';
import PropTypes from 'prop-types';

const Header = () => {
  return (
    <header>
      <div id={'main-title-container'}>
        <h1>Toronto Waste Lookup</h1>
      </div>
    </header>
  );
};

export default Header;
