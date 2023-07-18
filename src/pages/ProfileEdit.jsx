import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/ProfileEdit.css';

export default class ProfileEdit extends React.Component {
  state = {
    isDisabled: true,
    isLoading: false,
    isRedirecting: false,
    name: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    this.userFetch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    this.validateInputs();
  };

  handleClick = async () => {
    this.setState({
      isLoading: true,
    });

    const { name, email, description, image } = this.state;

    const userObject = { name, email, description, image };

    await updateUser(userObject);

    this.setState({
      isLoading: false,
      isRedirecting: true,
    });
  };

  validateInputs = () => {
    const { name, email, description, image } = this.state;

    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const testEmail = regex.test(email);

    if (name.length > 1 && testEmail && image.length > 1 && description.length > 1) {
      return this.setState({
        isDisabled: false,
      });
    }

    return this.setState({
      isDisabled: true,
    });
  };

  userFetch = async () => {
    const userData = await getUser();

    const { name, email, description, image } = userData;

    this.setState({
      name,
      email,
      description,
      image,
    });
  };

  render() {
    const { name, email, description, image, isDisabled,
      isLoading, isRedirecting } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <div className="profile-edit-container">
          <input
            value={ name }
            name="name"
            onChange={ this.handleChange }
            className="input-edit"
          />
          <input
            value={ email }
            name="email"
            onChange={ this.handleChange }
            className="input-edit"
          />
          <input
            value={ description }
            name="description"
            onChange={ this.handleChange }
            className="input-edit"
          />
          <input
            value={ image }
            name="image"
            onChange={ this.handleChange }
            className="input-edit"
          />
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            className="btn-save-edit"
          >
            Salvar
          </button>
          {isLoading ? <Loading /> : null}
        </div>
        {isRedirecting ? <Redirect to="/profile/" /> : null}
      </div>
    );
  }
}
