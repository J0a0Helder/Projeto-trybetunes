import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    // loading: false,
    // redirect: false,
    userName: '',
    isloginButtonDisabled: true,
  };

  validation = () => {
    const { userName } = this.state;
    const minCaracteres = 2;
    if (userName.length >= minCaracteres) {
      this.setState({ isloginButtonDisabled: false });
    } else {
      this.setState({ isloginButtonDisabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => { this.validation(); });
  };

  render() {
    const { userName, isloginButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form>
            <input
              type="text"
              name="userName"
              id="search-input"
              placeholder="Nome do artista"
              data-testid="search-artist-input"
              value={ userName }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isloginButtonDisabled }
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
