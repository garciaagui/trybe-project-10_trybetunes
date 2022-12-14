import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/musiccard.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  async handleCheckboxChange({ target }) {
    const { musicList, handleLoadingScreen, trackId, handleFavoriteSongs } = this.props;
    const targetMusic = musicList.find((music) => music.trackId === trackId);
    handleLoadingScreen(true);
    if (target.checked) {
      await addSong(targetMusic);
    } else {
      await removeSong(targetMusic);
    }
    handleFavoriteSongs(targetMusic);
    handleLoadingScreen(false);
  }

  render() {
    const { trackId,
      trackName,
      previewUrl,
      favoriteSongs } = this.props;

    const isFavorited = favoriteSongs.some((music) => music.trackId === trackId);

    return (
      <li className="trackItem">
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
            onChange={ this.handleCheckboxChange }
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
  handleFavoriteSongs: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.arrayOf(
    PropTypes.shape({
    }),
  ).isRequired,
};

export default MusicCard;
