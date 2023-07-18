import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

export default class Login extends React.Component {
  state = {
    user: '',
    isDisabled: true,
    loading: false,
    isRedirecting: false,
  };

  handleChange = (event) => {
    const { target } = event;
    this.setState({
      user: target.value,
    }, this.handleButton);
  };

  handleButton = () => {
    const { user } = this.state;
    const charMin = 3;
    if (user.length >= charMin) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleNewUser = async () => {
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState({
      isRedirecting: true,
    });
  };

  render() {
    const { isDisabled, loading, isRedirecting } = this.state;
    return (
      <div data-testid="page-login" className="page-login-div">
        {(loading) ? <Loading /> : (
          <section className="login-container">
            <h1 className="login-title">Login</h1>
            <input
              className="login-input"
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
              placeholder="Usuário"
            />
            <button
              className="login-btn"
              type="button"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.handleNewUser }
            >
              Entrar
            </button>
          </section>
        )}
        {isRedirecting && <Redirect to="/search" />}
      </div>
    );
  }
}
