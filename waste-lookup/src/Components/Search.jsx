import React from 'react';
import './styles/search.css';
import axios from 'axios';
import PropTypes from 'prop-types';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.getMatchResults = this.getMatchResults.bind(this);

    this.state = {
      query: '',
      rawData: [],
      items: []
    }
  }

  async getRawData() {
    await axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then(res => {
        this.setState({ rawData: res.data });
      });
  }

  getMatchResults() {
    let items = [];
    for (let i = 0; i < this.state.rawData.length; ++i) {
      if (this.state.rawData[i].keywords.includes(this.state.query.toLowerCase())) {
        items.push(this.state.rawData[i]);
      }
    }
    return items;
  }

  search(e) {
    e.preventDefault();
    if (!this.state.rawData.length > 0) {
      this.getRawData().then(res => {
        this.setState( { items: this.getMatchResults() });
        this.props.handleSearch(this.state.rawData, this.state.items, true);
      }).catch(err => {
        console.error(err);
      });
    } else {
      this.setState( { items: this.getMatchResults() });
      this.props.handleSearch(this.state.rawData, this.state.items, true);
    }
  }

  updateSearch(event) {
    this.setState({ query: event.target.value });
    if (this.state.query.length <= 1) {
      this.props.handleSearch(this.state.rawData, this.state.items, false);
    }
  }

  render() {
    return(
      <div className="search-container">
        <form onSubmit={this.search}>
          <div id={'search-container'}>
            <input
              id={'search-input'}
              type="text"
              onChange={this.updateSearch.bind(this)}
              value={this.state.query}
              placeholder="Enter garbage item ..." />
            <button type="submit" onClick={this.search} id={'search-btn'}>
              <img src={require('../assets/search.png')} alt="Search" id={'main-search-icon'} />
            </button>
          </div>
        </form>
      </div>
    )
  }
}

React.propTypes = {
  handleSearch: PropTypes.func.isRequired
};

export default Search;
