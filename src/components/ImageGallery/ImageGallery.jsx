import PropTypes from 'prop-types';

import { ImageGelleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImagesList } from './ImageGallery.styled';

export const ImageGallery = ({ images, toggleModal }) => {
  return (
    <ImagesList>
      {images.map(({ id, ...props }) => (
        <ImageGelleryItem
          key={id}
          id={id}
          {...props}
          toggleModal={toggleModal}
        />
      ))}
    </ImagesList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
