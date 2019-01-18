import React from 'react';
import './styles/result.css';
import './styles/star.css';
import Search from './Search';

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleFavouriteState = this.handleFavouriteState.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      displayResults: false,
      displayFavourites: false,
      favourites: new Set(), // Set used for fast lookup and preventing duplicates
      items: [],
      rawData: []
    }
  }

  handleSearch(rawData, items, displayResults) {
    this.setState({
      rawData: rawData,
      items: items,
      displayResults: displayResults
    });
  }
  
  handleFavouriteState() {
    if (this.state.favourites.size >= 1) {
      this.setState( { displayFavourites: true });
    } else {
      this.setState( { displayFavourites: false });
    }
  }

  handleStarClick(itemIndex) {
    let favourites = this.state.favourites;
    if (favourites.has(itemIndex)) {
      favourites.delete(itemIndex);
    } else {
      favourites.add(itemIndex);
    }
    this.setState({ favourites: favourites });
    this.handleFavouriteState();
  }

  parseHtml(text) {
      // body field from json is encoded
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
      return text.replace(/&[\w\d#]{2,5};/g, function(m) { return map[m]; });
  }

  render() {
    return (
      <div id="result-body">
          <Search handleSearch={this.handleSearch}/>
          <div className={'result-container'}>
            <table className={'result-table'}>
              <tbody>
              { this.state.displayResults &&
              this.state.rawData.map( (item, index) =>
                ( this.state.items.includes(this.state.rawData[index]) &&
                <tr key={index}>
                  <td className={'star-col'}>
                    <span onClick={ e => this.handleStarClick(index)}>
                      <svg
                        id="star-svg"
                        xmlns="http://www.w3.org/2000/svg">
                        <polygon
                          transform={'scale(0.1)'}
                          points="100,10 40,180 190,60 10,60 160,180"
                          fill={ this.state.favourites.has(index) ? '#269B66': '#AEAEAE'}/>
                      </svg>
                    </span>
                  </td>
                  <td className={'title-col'}>{item.title}</td>
                  <td dangerouslySetInnerHTML={{__html: this.parseHtml(item.body)}}></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

        {this.state.displayFavourites &&
        <div className={'favourites-container'}>
          <h1 id="favourites-heading">Favourites</h1>
          <table className={'result-table'}>
              <tbody>
              { this.state.rawData.map((elem, index) => this.state.favourites.has(index) &&
                  <tr key={index}>
                    <td className={'star-col'}>
                      <span onClick={e => this.handleStarClick(index)}>
                        <svg
                          id="star-svg"
                          xmlns="http://www.w3.org/2000/svg">
                          <polygon
                            transform={'scale(0.1)'}
                            points="100,10 40,180 190,60 10,60 160,180"
                            fill={ this.state.favourites.has(index) ? '#269B66': '#AEAEAE'}/>
                        </svg>
                    </span>
                    </td>
                    <td className={'title-col'}>{this.state.rawData[index].title}</td>
                    <td dangerouslySetInnerHTML={{__html: this.parseHtml(this.state.rawData[index].body)}}></td>
                  </tr>
              )}
              </tbody>
            </table>
        </div>
        }
      </div>
    );
  }
}

export default Result;
