import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form>
            <input
              type="text"
              name=""
              id="search-input"
              placeholder="Nome do artista"
              data-testid="search-artist-input"
            />
            <button
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
