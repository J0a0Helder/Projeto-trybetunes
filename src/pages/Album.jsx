import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albuns: [],
  };

  componentDidMount() {
    this.getAlbumMusics();
  }

  getAlbumMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ albuns: musics });
  };

  render() {
    const { albuns } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          albuns.map(({ trackId,
            trackName,
            previewUrl,
            artistName,
            collectionName,
          }, i) => (i === 0 ? (
            <div key={ trackId }>
              <p data-testid="artist-name">{artistName}</p>
              <p data-testid="album-name">{collectionName}</p>
            </div>
          ) : (<MusicCard
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />)))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default Album;
