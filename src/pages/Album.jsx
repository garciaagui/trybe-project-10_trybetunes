import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.handleGetMusics = this.handleGetMusics.bind(this);

    this.state = {
      loading: false,
      musicList: [],
      artistName: '',
      albumName: '',
      coverImage: '',
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  async handleGetMusics() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true },
      async () => {
        const infoRetrieved = await getMusics(id);
        // const albumInfo = infoRetrieved.shift();
        const [, albumInfo] = infoRetrieved;
        this.setState({
          loading: false,
          musicList: infoRetrieved,
          artistName: albumInfo.artistName,
          albumName: albumInfo.collectionName,
          coverImage: albumInfo.artworkUrl100,
        });
      });
  }

  render() {
    const { loading, musicList, artistName, albumName, coverImage } = this.state;
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
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
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
