import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.handleGetUser = this.handleGetUser.bind(this);

    this.state = {
      user: {},
      loading: false,
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
      });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <section>
            <h2>Profile</h2>
            <img
              src={ user.image }
              alt={ user.name }
              data-testid="profile-image"
            />
            <h3>Nome</h3>
            <span>{user.name}</span>
            <h3>E-mail</h3>
            <span>{user.email}</span>
            <h3>Descrição</h3>
            <span>{user.description}</span>
            <Link to="/profile/edit"> Editar perfil </Link>
          </section>
        )}
      </div>
    );
  }
}

export default Profile;
