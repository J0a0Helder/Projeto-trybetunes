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
          albuns.map((element, index) => (index === 0 ? (
            <div key={ index }>
              <p data-testid="artist-name">{element.artistName}</p>
              <p data-testid="album-name">{element.collectionName}</p>
            </div>
          ) : (<MusicCard
            key={ index }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            obj={ element }
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
