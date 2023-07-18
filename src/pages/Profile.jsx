import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';
import Loading from './Loading';

export default class Profile extends React.Component {
  state = {
    currentUser: [],
    isLoading: true,
    isRedirecting: false,
  };

  async componentDidMount() {
    const user = await getUser();

    this.setState({
      currentUser: user,
      isLoading: false,
    });
  }

  handleBtn = () => {
    this.setState({
      isRedirecting: true,
    });
  };

  render() {
    const { currentUser, isRedirecting, isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div data-testid="page-profile" className="page-profile">
            <div className="profile-container">
              <div className="name-container">
                <h3>Nome</h3>
                <span>
                  {currentUser.name}
                </span>
              </div>
              <div className="email-container">
                <h3>E-mail</h3>
                <span>
                  { currentUser.email }
                </span>
              </div>
              <div className="description-container">
                <h3>Descrição</h3>
                <span>
                  {currentUser.description}
                </span>
              </div>
              <button
                type="button"
                className="btn-edit"
                onClick={ this.handleBtn }
              >
                Editar perfil
              </button>
            </div>
            {isRedirecting && <Redirect to="/profile/edit" />}
          </div>
        )
    );
  }
}
