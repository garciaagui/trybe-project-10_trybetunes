import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';
import TrybeTunesLogo from '../images/trybe-tunes_white-logo.png';
import UserIcon from '../images/user-icon.png';

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
        {loading ? <Loading /> : (
          <section>
            <img className="imgLogo" src={ TrybeTunesLogo } alt="" />
            <nav>
              <li>
                <Link
                  className="link"
                  data-testid="link-to-search"
                  to="/search"
                >
                  Pesquisa
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  Favoritas
                </Link>
              </li>
              <li>
                <Link
                  className="link"
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  Perfil
                </Link>
              </li>
            </nav>
            <section className="userField">
              <img src={ UserIcon } alt="" />
              <span data-testid="header-user-name">{username}</span>
            </section>
          </section>
        )}
      </header>
    );
  }
}

export default Header;
