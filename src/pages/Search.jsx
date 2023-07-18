import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPi from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/Search.css';

export default class Search extends React.Component {
  state = {
    search: '',
    lastSearch: '',
    isDisabled: true,
    haveFound: false,
    loading: false,
  };

  handleChange = (event) => {
    const { target } = event;
    this.setState({
      search: target.value,
    }, this.handleButton);
  };

  handleButton = () => {
    const { search } = this.state;
    const minChar = 2;
    if (search.length >= minChar) {
      this.setState({
        isDisabled: false,
      });
    }
  };

  handleSearch = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const albums = await searchAlbumsAPi(search);
    this.setState((prevState) => ({
      loading: false,
      search: '',
      haveFound: true,
      lastSearch: prevState.search,
      albums,
    }));
  };

  render() {
    const { isDisabled, search, loading, haveFound, lastSearch, albums } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-search" className="page-search">
            <form className="search-form">
              <input
                className="search-input"
                data-testid="search-artist-input"
                type="text"
                value={ search }
                onChange={ this.handleChange }
                placeholder="Pesquisa"
              />
              <button
                data-testid="search-artist-button"
                type="button"
                disabled={ isDisabled }
                onClick={ this.handleSearch }
                className="search-btn"
              >
                Buscar
              </button>
            </form>
            {
              haveFound && (
                <section className="search-result">
                  <h2 className="title-search">
                    Resultado de álbuns de:
                    {' '}
                    { lastSearch }
                  </h2>
                  <ul className="album-list">
                    {
                      albums.length === 0 ? <span>Nenhum álbum foi encontrado</span>
                        : albums.map((album) => (
                          <Link
                            data-testid={ `link-to-album-${album.collectionId}` }
                            key={ album.collectionId }
                            to={ `/album/${album.collectionId}` }
                            className="album-info"
                          >
                            <img
                              src={ album.artworkUrl100 }
                              alt={ album.collectionName }
                              className="album-cover"
                            />
                            <li className="album-title">{album.collectionName}</li>
                            <li className="album-artist">{album.artistName}</li>
                          </Link>
                        ))
                    }
                  </ul>
                </section>
              )
            }
          </div>
        )
    );
  }
}
