import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.checkBoxClick();
  }

  checkBoxClick = async () => {
    const { obj } = this.props;
    this.setState({ loading: true });
    await addSong(obj);
    this.setState({ loading: false });
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { loading } = this.state;
    return (
      <div>

        { loading && <Loading /> }

        <label htmlFor="input_favorites">
          Favorita
          <input
            type="checkbox"
            name=""
            id="input_favorites"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.checkBoxClick() }
          />
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  obj: PropTypes.shape.isRequired,
};

export default MusicCard;
