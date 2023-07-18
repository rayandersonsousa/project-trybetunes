import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

export default class Favorites extends React.Component {
  state = {
    musics: [],
  };

  async componentDidMount() {
    const data = await getFavoriteSongs();
    this.setState({
      musics: data,
    });
  }

  async componentDidUpdate() {
    const favorites = await getFavoriteSongs();
    this.setState({
      musics: favorites,
    });
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-favorites" className="favorites-container">
        <div className="songs-container">
          {
            musics.map((song, index) => (
              <MusicCard
                key={ index }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                track={ song }
                trackId={ song.trackId }
              />
            ))
          }
        </div>
      </div>
    );
  }
}
