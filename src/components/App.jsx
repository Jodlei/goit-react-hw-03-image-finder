import { Component } from 'react';
import React from 'react';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { getDataFromApi } from './services/API';

import { Container } from './Container/Container.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    status: 'idle',
    page: 1,
    showModal: false,
    modalImageIdx: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ status: 'loading' });
      getDataFromApi(query, page).then(response => this.updateState(response));
    }
  }

  updateState = resp => {
    const imagesLength = this.state.images.length;
    const { totalHits, hits } = resp.data;
    const requiredData = hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => {
        return { id, webformatURL, largeImageURL, tags };
      }
    );

    if (hits.length === 0) {
      this.setState({ status: 'idle' });
      toast('По вашому запиту не знайдено жодного зображення');
      return;
    }

    if (imagesLength + 12 >= totalHits) {
      this.setState(prevState => ({
        images: [...prevState.images, ...requiredData],
        status: 'idle',
      }));
      toast('Більше немає зображень по вашому запиту');
      return;
    }

    this.setState(prevState => ({
      images: [...prevState.images, ...requiredData],
      status: 'resolved',
    }));
  };

  handleFormSubmit = imageName => {
    this.setState({ query: imageName, page: 1, images: [] });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = id => {
    this.setState(state => ({
      showModal: !state.showModal,
      modalImageIdx: this.state.images.findIndex(el => el.id === id),
    }));
  };

  render() {
    const { largeImageURL, tags } =
      this.state.images[this.state.modalImageIdx] ?? '';
    return (
      <Container>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {this.state.status === 'loading' && <Loader />}

        {this.state.images.length !== 0 && (
          <ImageGallery
            images={this.state.images}
            toggleModal={this.toggleModal}
          />
        )}

        {this.state.status === 'resolved' && (
          <Button loadMore={this.loadMore} />
        )}

        {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}

        <ToastContainer
          position="top-right"
          autoClose={1500}
          closeOnClick
          theme="dark"
        />
      </Container>
    );
  }
}
