import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();

    this.handleGetFavoriteSongs = this.handleGetFavoriteSongs.bind(this);

    this.state = {
      loading: false,
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.handleGetFavoriteSongs();
  }

  async handleGetFavoriteSongs() {
    this.setState({ loading: true }, async () => {
      const storagedFavorites = await getFavoriteSongs();
      this.setState({
        favoriteSongsList: storagedFavorites,
        loading: false,
      });
    });
  }

  handleFavoriteSongs = (song) => {
    const { favoriteSongsList } = this.state;
    this.setState({ loading: true }, () => {
      if (!favoriteSongsList.find((music) => music.trackId === song.trackId)) {
        this.setState((prevState) => ({
          favoriteSongsList: [...prevState.favoriteSongsList, song],
        }));
      } else {
        this.setState((prevState) => ({
          favoriteSongsList: prevState.favoriteSongsList
            .filter((music) => music.trackId !== song.trackId),
        }));
      }
    });
    this.setState({ loading: false });
  }

  handleLoadingScreen = (bool) => {
    this.setState({ loading: bool });
  }

  render() {
    const { loading, favoriteSongsList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <section>
            <h2>Favorites</h2>
            <ul>
              {favoriteSongsList.filter((music) => music.previewUrl !== undefined)
                .map((music) => (<MusicCard
                  key={ music.trackId }
                  musicList={ favoriteSongsList }
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  handleLoadingScreen={ this.handleLoadingScreen }
                  favoriteSongs={ favoriteSongsList }
                  handleFavoriteSongs={ this.handleFavoriteSongs }
                />))}
            </ul>
          </section>
        )}
      </div>
    );
  }
}

export default Favorites;
