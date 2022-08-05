import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.handleGetMusics = this.handleGetMusics.bind(this);
    this.handleGetFavoriteSongs = this.handleGetFavoriteSongs.bind(this);

    this.state = {
      loading: false,
      musicList: [],
      artistName: '',
      albumName: '',
      coverImage: '',
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.handleGetMusics();
    this.handleGetFavoriteSongs();
  }

  async handleGetMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true },
      async () => {
        const infoRetrieved = await getMusics(id);
        // const albumInfo = infoRetrieved.shift();
        const [, albumInfo] = infoRetrieved;
        this.setState({
          musicList: infoRetrieved,
          artistName: albumInfo.artistName,
          albumName: albumInfo.collectionName,
          coverImage: albumInfo.artworkUrl100,
          loading: false,
        });
      });
  }

  async handleGetFavoriteSongs() {
    this.setState({ loading: true }, async () => {
      const storagedFavorites = await getFavoriteSongs();
      this.setState({
        favoriteSongs: storagedFavorites,
        loading: false,
      });
    });
  }

  handleFavoriteSongs = (song) => {
    const { favoriteSongs } = this.state;
    this.setState({ loading: true }, () => {
      if (!favoriteSongs.find((music) => music.trackId === song.trackId)) {
        this.setState((prevState) => ({
          favoriteSongs: [...prevState.favoriteSongs, song],
        }));
      } else {
        this.setState((prevState) => ({
          favoriteSongs: prevState.favoriteSongs
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
    const { loading,
      musicList,
      artistName,
      albumName,
      coverImage,
      favoriteSongs } = this.state;

    return (
      <div data-testid="page-album">

        <Header />

        {loading ? <Loading /> : (
          <section>

            <section>
              <img src={ coverImage } alt={ albumName } />
              <h3 data-testid="artist-name">
                {`Artist Name: ${artistName}`}
              </h3>
              <h3 data-testid="album-name">
                {`Collection Name: ${albumName}`}
              </h3>
            </section>

            <ul>
              {musicList.filter((music) => music.previewUrl !== undefined)
                .map((music) => (<MusicCard
                  key={ music.trackId }
                  musicList={ musicList }
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  handleLoadingScreen={ this.handleLoadingScreen }
                  favoriteSongs={ favoriteSongs }
                  handleFavoriteSongs={ this.handleFavoriteSongs }
                />))}
            </ul>

          </section>
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
