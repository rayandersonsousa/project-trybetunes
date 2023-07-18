import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../styles/Header.css';

export default class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  async componentDidMount() {
    const usuario = await getUser();
    this.setState({
      user: `Bem-vindo, ${usuario.name}`,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;

    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component" className="header-component">
            <h1>Trybe Tunes</h1>
            <p data-testid="header-user-name">{ user }</p>
            <div className="links-container">
              <Link data-testid="link-to-search" to="/search" className="links">
                Busca
              </Link>
              <Link data-testid="link-to-favorites" to="/favorites" className="links">
                Favoritos
              </Link>
              <Link data-testid="link-to-profile" to="/profile" className="links">
                Perfil
              </Link>
            </div>
          </header>
        )
    );
  }
}
