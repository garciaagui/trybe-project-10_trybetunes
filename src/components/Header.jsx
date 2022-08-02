import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

class Header extends Component {
  constructor() {
    super();

    this.handleGetUser = this.handleGetUser.bind(this);

    this.state = {
      username: '',
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
          username: infoStoraged.name,
        });
      });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1> TrybeTunes </h1>
        {loading ? <Loading /> : (
          <span data-testid="header-user-name">{`Usuário: ${username}`}</span>
        ) }
      </header>
    );
  }
}

export default Header;
