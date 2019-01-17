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
    this.rawData = [];
    this.state = {
      query: '',
      searchClicked: false,
      displayResults: false,
    }
  }

  search(e) {
    e.preventDefault();
    this.setState({searchClicked: true});
    console.log(this.state.query);
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then(res => {
        this.rawData = res.data;
        for (let i = 0; i < res.data.length; ++i) {
          if (res.data[i].keywords.includes(this.state.query)) {
            this.items.push(res.data[i]);
          }
        }
        console.log(this.items);
        this.setState({ displayResults: true });
      });
  }

  updateSearch(event) {
    this.setState({query: event.target.value });
    if (this.state.query === '') {
      this.setState({displayResults: true});
    }
  }

  handleStarClick(e) {
    // console.log(e);
    // this.setState({ isClicked: !this.state.isClicked});
  }

  render() {
    return (
      <section>
        <div className="search-container">
          {/*Search bar*/}
          <form>
            <div id={'search-container'}>
              <input
                id={'search-input'}
                type="text"
                onChange={this.updateSearch}
                value={this.state.query}
                placeholder="Search for garbage..." />
              <button onClick={this.search} id={'search-btn'}>
                <img src={require('../assets/search.png')} alt="Search" id={'main-search-icon'} />
              </button>
            </div>
          </form>

          <div className={'result-container'}>
            <table id={'result-table'}>
              <tbody>
              { this.state.displayResults &&
              this.items.map(item => (
                <tr key={this.rawData.indexOf(item)}>
                  <td><Star handleStarClick={this.handleStarClick}/></td>
                  <td>{item.title}</td>
                </tr>
              ))}
              </tbody>
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
