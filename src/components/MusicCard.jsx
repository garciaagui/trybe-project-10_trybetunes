import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  async handleCheckboxChange(bool, id) {
    const { musicList, handleLoadingScreen } = this.props;
    const targetMusic = musicList.find((music) => music.trackId === id);
    if (!bool) {
      handleLoadingScreen(true);
      await addSong(targetMusic);
      handleLoadingScreen(false);
    } else {
      handleLoadingScreen(true);
      await removeSong(targetMusic);
      handleLoadingScreen(false);
    }
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const storagedFavorites = JSON.parse(localStorage.getItem('favorite_songs'));
    const isFavorited = storagedFavorites.some((music) => music.trackId === trackId);

    return (
      <li>
        <span>
          {trackName}
        </span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteTrack">
          Favorita
          <input
            type="checkbox"
            name="favoriteTrack"
            id="favoriteTrack"
            checked={ isFavorited }
            onChange={ () => { this.handleCheckboxChange(isFavorited, trackId); } }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.arrayOf(
    PropTypes.shape({
    }),
  ).isRequired,
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  handleLoadingScreen: PropTypes.func.isRequired,
};

export default MusicCard;
