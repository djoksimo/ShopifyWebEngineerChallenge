import React from 'react';
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
    this.handleStarClick = this.handleStarClick.bind(this);
    this.rawData = [];
    this.state = {
      query: '',
      displayResults: false,
      favourites: new Set()
    }
  }

  search(e) {
    e.preventDefault();
    this.items = [];
    axios.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
      .then(res => {
        this.rawData = res.data;
        for (let i = 0; i < res.data.length; ++i) {
          if (res.data[i].keywords.includes(this.state.query.toLowerCase())) {
            this.items.push(res.data[i]);
          }
        }
        this.setState({ displayResults: true });
      });
  }

  updateSearch(event) {
    this.setState({query: event.target.value });
    if (this.state.query.length <= 1) {
      this.setState({displayResults: false});
    }
  }

  handleStarClick(index) {
    let favourites = this.state.favourites;
    favourites.add(index);
    this.setState({ favourites: favourites });
  }

  escapeHtml(text) {
      var map = {
        '&amp;': '&',
        '&#038;': "&",
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
        '&#8217;': "’",
        '&#8216;': "‘",
        '&#8211;': "–",
        '&#8212;': "—",
        '&#8230;': "…",
        '&#8221;': '”'
      };
      return text.replace(/\&[\w\d\#]{2,5}\;/g, function(m) { return map[m]; });
  }

  render() {
    return (
      <section>
        <div className="search-container">
          <form>
            <div id={'search-container'}>
              <input
                id={'search-input'}
                type="text"
                onChange={this.updateSearch}
                value={this.state.query}
                placeholder="Enter garbage item ..." />
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
                  <td className={'star-col'}><Star
                    handleStarClick={this.handleStarClick}
                    id={this.rawData.indexOf(item)}
                    isClicked={this.state.favourites.has(this.rawData.indexOf(item))}
                  /></td>
                  <td className={'title-col'}>{item.title}</td>
                  <td dangerouslySetInnerHTML={{__html: this.escapeHtml(item.body)}}></td>
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
  search: PropTypes.func,
  handleStarClick: PropTypes.func,
  updateSearch: PropTypes.func
};

export default Result;
