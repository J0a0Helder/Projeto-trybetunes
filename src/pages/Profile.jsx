import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  };

  componentDidMount() {
    this.userInfos();
  }

  userInfos = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({ loading: false, name, email, description, image });
  };

  render() {
    const { name, email, description, image, loading } = this.state;

    const profile = (
      <div>
        <h1>Meu Perfil</h1>
        <img
          data-testid="profile-image"
          src={ image }
          alt="Foto de perfil"
        />
        <div data-testid="profile-name">
          <h3>Nome: </h3>
          { name }
        </div>
        <div data-testid="profile-email">
          <h3>Email: </h3>
          { email }
        </div>
        <div data-testid="profile-description">
          <h3>Descrição: </h3>
          { description }
        </div>
        <Link to="/profile/edit">
          <button type="button">
            Editar perfil
          </button>
        </Link>
      </div>
    );

    return (
      <div data-testid="page-profile">
        <Header />
        { !loading ? profile : null }
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Profile;
