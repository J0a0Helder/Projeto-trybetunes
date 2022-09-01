import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/logo.jpg';
import '../style/login.css';

class Login extends Component {
  state = {
    loading: false,
    redirect: false,
    userName: '',
    isloginButtonDisabled: true,
  };

  validation = () => {
    const { userName } = this.state;
    const minCaracteres = 3;
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
    const { userName, isloginButtonDisabled, loading, redirect } = this.state;

    return (
      <div className="container">
        { redirect ? <Redirect to="/search" />
          : (
            <div data-testid="page-login" className="container-login">
              { loading ? <Loading /> : (
                <form
                  className="login-form"
                  onSubmit={ async () => {
                    this.setState({ loading: true });
                    await createUser({ name: userName });
                    this.setState({ redirect: true });
                  } }
                >
                  <span className="login-form-title">Bem vindo!</span>
                  <span className="login-form-title">
                    <img src={ logo } alt="logo-login" />
                  </span>
                  <div className="name-input">
                    <input
                      type="text"
                      placeholder="Insira seu nome"
                      name="userName"
                      id="login"
                      data-testid="login-name-input"
                      value={ userName }
                      onChange={ this.handleChange }
                      className="login-input"
                    />
                    <span className="focus-input" data-placeholder="Nome" />
                  </div>
                  <div className="login-btn-container">
                    <button
                      type="submit"
                      data-testid="login-submit-button"
                      disabled={ isloginButtonDisabled }
                      className="login-btn"
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default Login;
