import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../style/header.css';

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
          <a className="logo" href="/search">TrybeTunes</a>
          <ul className="nav-list">
            <li>
              <Link
                data-testid="link-to-search"
                to="/search"
                className="links"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-favorites"
                to="/favorites"
                className="links"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                data-testid="link-to-profile"
                to="/profile"
                className="links"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        { loading
          ? <Loading />
          : <h3 data-testid="header-user-name">{userName}</h3>}
      </header>
    );
  }
}

export default Header;
