import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    loading: false,
    redirect: false,
    loginName: '',
    isloginButtonDisabled: true,
  };

  validation = () => {
    const { loginName } = this.state;
    const minCaracteres = 3;
    if (loginName.length >= minCaracteres) {
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
    const { loginName, isloginButtonDisabled, loading, redirect } = this.state;

    return (
      redirect ? <Redirect to="/search" />
        : (
          <div data-testid="page-login">
            { loading ? <Loading /> : (
              <form>
                <span>Bem vindo!</span>
                <div>
                  <label htmlFor="login">
                    insira seu nome para o Login:
                    <input
                      type="text"
                      placeholder="nome"
                      name="loginName"
                      id="login"
                      data-testid="login-name-input"
                      value={ loginName }
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <div>
                  <button
                    type="button"
                    data-testid="login-submit-button"
                    disabled={ isloginButtonDisabled }
                    onClick={ async () => {
                      this.setState({ loading: true });
                      await createUser({ name: loginName });
                      this.setState({ redirect: true });
                    } }
                  >
                    Entrar
                  </button>
                </div>
              </form>
            )}
          </div>
        )
    );
  }
}

export default Login;
