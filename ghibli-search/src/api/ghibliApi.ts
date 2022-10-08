import axios from 'axios';

export async function fetchFilms() {
  return axios.get('https://ghibliapi.herokuapp.com/films')
    .then((result) => result.data);
}

export async function fetchPeople() {
  return axios.get('https://ghibliapi.herokuapp.com/people')
  .then((result) => result.data);
}

export async function fetchLocations() {
  return axios.get('https://ghibliapi.herokuapp.com/locations')
  .then((result) => result.data);
}

export async function fetchSpecies() {
  return axios.get('https://ghibliapi.herokuapp.com/species')
  .then((result) => result.data);
}

export async function fetchVehicles() {
  return axios.get('https://ghibliapi.herokuapp.com/vehicles')
  .then((result) => result.data);
}