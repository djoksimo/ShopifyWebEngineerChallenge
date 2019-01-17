import React, { Component } from 'react';
import './result.css';
import Star from './Star';
import PropTypes from 'prop-types';
import axios from 'axios';

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.updateSearch= this.updateSearch.bind(this);
    this.items = [];
    this.state = {
      query: '',
      searchClicked: false,
      displayResults: false,
      results: []
    }
  }

  search() {
    // this.setState({query: event});
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then(res => {
        console.log(res);
        // this.setState({ displayResults: true, results: res });
        // this.items = this.state.results;
      });
  }

  updateSearch(event) {
    console.log(event.target.value);
    this.setState({query: event.target.value })
  }

  handleStarClick() {
    // this.setState({ isClicked: !this.state.isClicked});
  }

  render() {
    return (
      <section>
        <div className="search-container">
          {/*Search bar*/}
          <form onSubmit={this.search}>
            <div id={'search-container'}>
              <input id={'search-input'} type="text" onChange={this.updateSearch} value={this.state.query} placeholder="Search for garbage..." />
              <button id={'search-btn'} >
                <img src={require('../assets/search.png')} alt="Search" id={'main-search-icon'} />
              </button>
            </div>
          </form>

          <div className={'result-container'}>
            <table id={'result-table'}>
              <tr>
                <td className={'star-col'}><Star handleStarClick={this.handleStarClick} isClicked={true}/></td>
                { this.items.map(item =>  this.state.displayResults &&  <td>a</td>)}
                {/*<td>{{items[0].description}}</td>*/}
              </tr>
              <tr>
                <td className={'star-col'}><Star handleStarClick={this.handleStarClick} isClicked={false}/></td>
                <td>500</td>
                <td>600</td>
              </tr>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

Result.propTypes = {
  // search: PropTypes.func.isRequired,
  // handleStarClick: PropTypes.func.isRequired,
  // handleChange: PropTypes.func.isRequired,
};

export default Result;
