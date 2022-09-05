import React from 'react';

export default class Search extends React.Component {
  state = {
    search: '',
    isDisabled: true,
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

  render() {
    const { isDisabled, search } = this.state;
    return (
      <div data-testid="page-search">
        Busca
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isDisabled }
          >
            Buscar
          </button>
        </form>
      </div>
    );
  }
}
