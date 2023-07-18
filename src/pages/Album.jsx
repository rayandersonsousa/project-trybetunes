import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Album.css';

export default class Album extends React.Component {
  state = {
    album: [],
    musics: [],
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(id);
    this.setState({
      album: data[0],
      musics: data.filter((_song, index) => index !== 0),
    });
  }

  render() {
    const { musics, album } = this.state;
    return (
      <div data-testid="page-album" className="page-album">
        <Header />
        <div className="container-album-page">
          <div className="page-album-container">
            <div className="info-container">
              <img
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
                className="album-cover"
              />
              <div className="info-names">
                <h2 data-testid="artist-name" className="artist-name">
                  {album.artistName}
                </h2>
                <span data-testid="album-name">{album.collectionName }</span>
              </div>
            </div>
            <div className="music-card-container">
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
        </div>
        <Footer />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
