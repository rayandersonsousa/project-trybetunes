import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../styles/MusicCard.css';

export default class MusicCard extends React.Component {
  state = {
    loading: false,
    currentf: [],
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();

    this.setState({
      currentf: favorites,
    });
  }

  async componentDidUpdate() {
    const newFavorites = await getFavoriteSongs();

    this.setState({
      currentf: newFavorites,
    });
  }

  checkFavorites = async (song, isTrue) => {
    this.setState({
      loading: true,
    });
    if (isTrue === false) {
      await addSong(song);
      this.setState({
        loading: false,
      });
    } else {
      await removeSong(song);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { trackName, previewUrl, trackId, track } = this.props;
    const { loading, currentf } = this.state;

    const isFavorite = currentf.some((song) => song.trackId === trackId);
    return (
      loading ? <Loading /> : (
        <section className="section-music-card">
          <div className="music-card-header">
            <h3>{trackName}</h3>
            <label
              htmlFor={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            >
              Favorite
              <input
                type="checkbox"
                id={ trackId }
                checked={ isFavorite }
                onChange={ () => { this.checkFavorites(track, isFavorite); } }
              />
            </label>
          </div>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        </section>
      )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  track: PropTypes.shape,
  trackId: PropTypes.number,
}.isRequired;
