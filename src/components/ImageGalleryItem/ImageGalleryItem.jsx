import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export const ImageGelleryItem = ({ webformatURL, id, tags, toggleModal }) => {
  return (
    <ImageItem onClick={() => toggleModal(id)}>
      <Image src={webformatURL} alt={tags} />
    </ImageItem>
  );
};

ImageGelleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
