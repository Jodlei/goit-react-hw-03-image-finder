import axios from 'axios';

export const getDataFromApi = (query, page) => {
  return axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=30808898-c0dc862c32689843f849354cf&image_type=photo&orientation=horizontal&per_page=12`
  );
};
