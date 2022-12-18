import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from 'react';

import {
  Header,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  Input,
} from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    imageName: '',
  };

  handleValueChange = event => {
    this.setState({
      imageName: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast('Введіть назву картинки');
      return;
    }
    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FaSearch size={32} />

            <ButtonLabel>Search</ButtonLabel>
          </SearchFormButton>

          <Input
            type="text"
            name="imageName"
            value={this.state.imageName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleValueChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
