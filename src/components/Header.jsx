import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const user = await getUser();
    this.setState({ userName: user, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisa |
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritas |
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil |
          </Link>
        </nav>
        { loading
          ? <Loading />
          : <h3 data-testid="header-user-name">{userName.name}</h3>}
      </header>
    );
  }
}

export default Header;
