import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isSearchBtnDisabled: true,
    };
  }

  handleArtistNameChange = ({ target }) => {
    const minLimit = 2;
    this.setState({
      artistName: target.value,
      isSearchBtnDisabled: (target.value.length < minLimit),
    });
  };

  render() {
    const { artistName, isSearchBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">

        <Header />

        <form className="form-search">
          <h2>Search</h2>

          <label htmlFor="artist-name">
            <input
              type="text"
              name="artist-name"
              id="artist-name"
              value={ artistName }
              onChange={ this.handleArtistNameChange }
              placeholder="Insira o nome de uma banda ou artista"
              data-testid="search-artist-input"
            />
          </label>

          {isSearchBtnDisabled
            ? (<span>O nome precisa ter no mínimo 2 caracteres</span>)
            : ''}

          <button
            type="button"
            disabled={ isSearchBtnDisabled }
            // onClick={ this.validateLogin }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>

        </form>
      </div>
    );
  }
}

export default Search;
