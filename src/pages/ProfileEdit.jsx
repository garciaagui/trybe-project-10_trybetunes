import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.handleGetUser = this.handleGetUser.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);

    this.state = {
      user: {},
      loading: false,
      isSaveButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  async handleGetUser() {
    this.setState({ loading: true },
      async () => {
        const infoStoraged = await getUser();
        this.setState({
          loading: false,
          user: infoStoraged,
        });
      }, () => { this.validateSaveButton(); });
  }

  async onSaveButtonClick(e) {
    const { user } = this.state;
    const { history } = this.props;
    e.preventDefault();
    this.setState({ loading: true },
      async () => {
        await updateUser(user);
        history.push('/profile');
        this.setState({ loading: false });
      });
  }

  validateSaveButton = () => {
    const { user: { name, email, description, image } } = this.state;

    const invalidationElements = [
      !name.length,
      !(email.toLowerCase()
        .match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm)),
      !description.length,
      !image.length,
    ];

    this.setState({
      isSaveButtonDisabled: !(invalidationElements.every((e) => e === false)),
    });
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: target.value,
      },
    }), () => { this.validateSaveButton(); });
  };

  render() {
    const { user, loading, isSaveButtonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <form>
            <h2>Editar perfil</h2>

            <label htmlFor="name">
              Nome
              <input
                type="text"
                name="name"
                id="name"
                data-testid="edit-input-name"
                value={ user.name }
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="email">
              E-mail
              <input
                type="email"
                name="email"
                id="email"
                data-testid="edit-input-email"
                value={ user.email }
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="description">
              Descrição
              <textarea
                name="description"
                id="description"
                data-testid="edit-input-description"
                value={ user.description }
                onChange={ this.onInputChange }
              />
            </label>

            <label htmlFor="image">
              Imagem
              <input
                type="text"
                name="image"
                id="image"
                data-testid="edit-input-image"
                value={ user.image }
                onChange={ this.onInputChange }
              />
            </label>

            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ isSaveButtonDisabled }
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>

          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
