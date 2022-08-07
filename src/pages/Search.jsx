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
          isSearchBtnDisabled: true,
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
              <h2>Pesquisa</h2>
              <section className="container-input-btn">
                <label htmlFor="artistName">
                  <input
                    type="text"
                    name="artistName"
                    id="artistName"
                    className="form-control"
                    autoComplete="off"
                    placeholder="Insira o nome de uma banda ou artista"
                    value={ artistName }
                    onChange={ this.handleArtistNameChange }
                    data-testid="search-artist-input"
                  />
                </label>

                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={ isSearchBtnDisabled }
                  onClick={ this.handleGetAlbums }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </section>

              {isSearchBtnDisabled
                ? (<span>O nome precisa ter no mínimo 2 caracteres</span>)
                : ''}
            </form>

            {!albums.length ? (
              <section className="container-failed-search">
                <span>Nenhum álbum foi encontrado</span>
                <span>&#128531;</span>
              </section>
            ) : (
              <section className="container-successful-search">
                <span>
                  {`Resultado de álbuns de: ${backupArtistName}`}
                </span>

                <ul className="container-all-albums">
                  {albums.map((e) => (
                    <li key={ e.collectionId }>
                      <Link
                        className="container-link"
                        data-testid={ `link-to-album-${e.collectionId}` }
                        to={ `/album/${e.collectionId}` }
                      >
                        <img
                          src={ e.artworkUrl100
                            .replace(/100x100bb/g, '1000x1000bb') }
                          alt={ e.collectionName }
                        />
                        <span>{e.collectionName}</span>
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
