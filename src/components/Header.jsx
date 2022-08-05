import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <li>
            <Link data-testid="link-to-search" to="/search"> Search </Link>
          </li>
          <li>
            <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
          </li>
          <li>
            <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
          </li>
        </nav>

        {loading ? <Loading /> : (
          <span data-testid="header-user-name">{username}</span>
        ) }

      </header>
    );
  }
}

export default Header;
