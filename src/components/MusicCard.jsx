import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends React.Component {
  state = {
    checked: false,
    loading: false,
  };

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    const { trackId } = this.props;
    const check = favorites.some((song) => song.trackId === trackId);

    this.setState({
      checked: check,
    });
  }

  checkFavorites = async (song) => {
    this.setState({
      loading: true,
    });
    await addSong(song);
    this.setState({
      loading: false,
      checked: true,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, track } = this.props;
    const { loading, checked } = this.state;
    return (
      loading ? <Loading /> : (
        <section>
          <h3>{trackName}</h3>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorite
            <input
              type="checkbox"
              id={ trackId }
              checked={ checked }
              onChange={ () => { this.checkFavorites(track); } }
            />
          </label>
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
