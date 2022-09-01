import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Artists from '../components/Artists';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isloginButtonDisabled: true,
    searchRequest: '',
    loading: false,
    loadingComplet: false,
    results: '',
    artist: '',
  };

  validation = () => {
    const { searchRequest } = this.state;
    const minCaracteres = 2;
    if (searchRequest.length >= minCaracteres) {
      this.setState({ isloginButtonDisabled: false });
    } else {
      this.setState({ isloginButtonDisabled: true });
    }
  };

  search = async (searchRequest) => {
    this.setState({ loading: true, artist: searchRequest });
    const results = await searchAlbumsAPI(searchRequest);
    this.setState({ loadingComplet: true, results, loading: false, searchRequest: '' });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => { this.validation(); });
  };

  artistResults = (results) => {
    if (results.length === 0) {
      return <span>Nenhum álbum foi encontrado</span>;
    }
    return results
      .map(({ collectionName, artworkUrl100, artistName, collectionId }, index) => (
        <Link
          key={ index }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <Artists
            collectionName={ collectionName }
            artworkUrl100={ artworkUrl100 }
            artistName={ artistName }
          />
        </Link>
      ));
  };

  render() {
    const {
      isloginButtonDisabled,
      searchRequest,
      loading,
      loadingComplet,
      results,
      artist,
    } = this.state;

    const form = (
      <form onSubmit={ () => this.search(searchRequest) }>
        <input
          type="text"
          name="searchRequest"
          id="search-input"
          placeholder="Nome do artista"
          data-testid="search-artist-input"
          value={ searchRequest }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ isloginButtonDisabled }
        >
          Pesquisar
        </button>
      </form>
    );

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          { !loading ? form : null }
          { loading && <Loading /> }
          { loadingComplet
            && !loading
            && results.length > 0
            && <span>{`Resultado de álbuns de: ${artist}`}</span>}
          { loadingComplet && this.artistResults(results) }
        </div>
      </div>
    );
  }
}

export default Search;
