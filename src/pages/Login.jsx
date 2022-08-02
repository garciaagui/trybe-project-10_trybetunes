import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/login.css';

class Login extends Component {
  constructor() {
    super();

    this.validateLogin = this.validateLogin.bind(this);

    this.state = {
      username: '',
      isLoginBtnDisabled: true,
      loading: false,
    };
  }

  handleLoginNameChange = ({ target }) => {
    const minLimit = 3;
    this.setState({
      username: target.value,
      isLoginBtnDisabled: (target.value.length < minLimit),
    });
  };

  async validateLogin() {
    const { username } = this.state;
    const { history } = this.props;
    this.setState({ loading: true },
      async () => {
        await createUser({ name: username });
        history.push('/search');
        this.setState({ loading: false });
      });
  }

  render() {
    const { username, isLoginBtnDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">

        {loading ? <Loading /> : (
          <form className="form-login">
            <h2>Login</h2>
            <label htmlFor="username">
              <input
                type="text"
                name="username"
                id="username"
                value={ username }
                onChange={ this.handleLoginNameChange }
                placeholder="Insira o seu nome"
                data-testid="login-name-input"
              />
            </label>

            {isLoginBtnDisabled
              ? (<span>O nome precisa ter no mínimo 3 caracteres</span>)
              : ''}

            <button
              type="button"
              disabled={ isLoginBtnDisabled }
              onClick={ this.validateLogin }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>)}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
