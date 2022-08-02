import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/search.css';

class Search extends Component {
  constructor() {
    super();

    this.handleGetAlbums = this.handleGetAlbums.bind(this);

    this.state = {
      artistName: '',
      backupArtistName: '',
      isSearchBtnDisabled: true,
      loading: false,
      albums: '',
    };
  }

  handleArtistNameChange = ({ target }) => {
    const minLimit = 2;
    this.setState({
      artistName: target.value,
      isSearchBtnDisabled: (target.value.length < minLimit),
    });
  };

  async handleGetAlbums() {
    const { artistName } = this.state;
    this.setState({ loading: true, backupArtistName: artistName },
      async () => {
        const infoRetrieved = await searchAlbumsAPI(artistName);
        this.setState({
          artistName: '',
          loading: false,
          albums: infoRetrieved,
        });
      });
  }

  render() {
    const { artistName,
      backupArtistName,
      isSearchBtnDisabled,
      loading,
      albums } = this.state;

    return (
      <div data-testid="page-search">

        <Header />

        {loading ? <Loading /> : (
          <section>
            <form className="form-search">
              <h2>Search</h2>

              <label htmlFor="artistName">
                <input
                  type="text"
                  name="artistName"
                  id="artistName"
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
                onClick={ this.handleGetAlbums }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </form>

            {!albums.length ? 'Nenhum álbum foi encontrado' : (
              <section>
                <span>
                  {`Resultado de álbuns de: ${backupArtistName}`}
                </span>
                <ul className="all-albums">
                  {albums.map((e) => (
                    <li className="individual-album" key={ e.collectionId }>
                      <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                      <span>{e.collectionName}</span>
                      <Link
                        data-testid={ `link-to-album-${e.collectionId}` }
                        to={ `/album/${e.collectionId}` }
                      >
                        Detalhes
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </section>
        )}

      </div>
    );
  }
}

export default Search;
