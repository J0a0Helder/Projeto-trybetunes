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
    this.setState({ userName: user.name, loading: false });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <nav>
          <Link data-testid="link-to-search" to="/search">Search |</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites |</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile |</Link>
        </nav>
        { loading
          ? <Loading />
          : <h3 data-testid="header-user-name">{userName}</h3>}
      </header>
    );
  }
}

export default Header;
