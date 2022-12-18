import PropTypes from 'prop-types';

import { LoadMoreBtn } from './Button.styled';

export const Button = ({ loadMore }) => {
  return <LoadMoreBtn onClick={loadMore}>Load more</LoadMoreBtn>;
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
