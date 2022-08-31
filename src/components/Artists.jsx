import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Artists extends Component {
  render() {
    const { collectionName, artworkUrl100, artistName } = this.props;
    return (
      <div>
        <h3>{ collectionName }</h3>
        <h4>{ artistName }</h4>
        <img src={ artworkUrl100 } alt={ `capa do album do artista ${artistName}` } />
      </div>
    );
  }
}

Artists.propTypes = {
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
}.isRequired;

export default Artists;
