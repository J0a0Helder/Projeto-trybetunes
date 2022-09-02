import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Favorites from '../pages/Favorites';

class MusicCard extends Component {
  state = {
    loading: false,
    favorited: false,
    songsList: [],
  };

  componentDidMount() {
    this.isFavorited();
    this.FavoriteSongsList();
  }

  FavoriteSongsList = async () => {
    this.setState({ loading: true });
    const songsList = await getFavoriteSongs();
    this.setState({ songsList, loading: false });
  };

  isFavorited = async () => {
    const { trackId } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const favorited = favoriteSongs
      ? favoriteSongs.some((track) => track.trackId === trackId)
      : false;
    this.setState({ favorited });
    return favorited;
  };

  onFavoriteClick = async (favorited) => {
    const { trackInfo } = this.props;
    const toggle = favorited ? removeSong : addSong;
    this.setState({ loading: true });
    await toggle(trackInfo);
    this.setState({ loading: false, favorited: !favorited });
  };

  handleChange = async (obj) => {
    this.onFavoriteClick(obj);
    await this.FavoriteSongsList();
  };

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    const { loading, favorited, songsList } = this.state;
    return (
      <div>
        <Favorites songsList={ songsList } />
        { loading && <Loading /> }

        <label htmlFor="input_favorites">
          Favorita
          <input
            type="checkbox"
            id="input_favorites"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ favorited }
            onChange={ () => this.handleChange(favorited) }
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
  trackInfo: PropTypes.string.isRequired,
};

export default MusicCard;
