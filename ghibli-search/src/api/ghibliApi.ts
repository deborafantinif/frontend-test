import axios from 'axios';

export async function fetchFilms() {
  return axios.get('https://ghibliapi.herokuapp.com/films')
    .then((result) => result.data);
}