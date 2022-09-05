import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends React.Component {
  state = {
    user: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
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
          <header data-testid="header-component">
            <h1>Trybe Tunes</h1>
            <p data-testid="header-user-name">{ user }</p>
          </header>
        )
    );
  }
}