import axios from 'axios';

export async function fetchFilms() {
  return axios.get('https://ghibliapi.herokuapp.com/films')
}

export async function fetchPeople() {
  return axios.get('https://ghibliapi.herokuapp.com/people')
}

export async function fetchLocations() {
  return axios.get('https://ghibliapi.herokuapp.com/locations')
}

export async function fetchSpecies() {
  return axios.get('https://ghibliapi.herokuapp.com/species')
}

export async function fetchVehicles() {
  return axios.get('https://ghibliapi.herokuapp.com/vehicles')
}