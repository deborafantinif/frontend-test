import axios from 'axios';
import { IFilm, ILocation, IPerson, ISpecie, IVehicle } from '../interfaces/propsComponents';

export async function fetchFilms() {
  return axios.get('https://ghibliapi.herokuapp.com/films')
    .then((result) => result.data);
}

export async function fetchFilmsById(id: string): Promise<IFilm> {
  return axios.get(`https://ghibliapi.herokuapp.com/films/${id}`)
    .then((result) => result.data);
}

export async function fetchPeople() {
  return axios.get('https://ghibliapi.herokuapp.com/people')
  .then((result) => result.data);
}

export async function fetchPersonById(id: string): Promise<IPerson> {
  return axios.get(`https://ghibliapi.herokuapp.com/people/${id}`)
    .then((result) => result.data);
}

export async function fetchLocations() {
  return axios.get('https://ghibliapi.herokuapp.com/locations')
  .then((result) => result.data);
}

export async function fetchLocationById(id: string): Promise<ILocation> {
  return axios.get(`https://ghibliapi.herokuapp.com/locations/${id}`)
    .then((result) => result.data);
}

export async function fetchSpecies() {
  return axios.get('https://ghibliapi.herokuapp.com/species')
  .then((result) => result.data);
}

export async function fetchSpeciesById(id: string): Promise<ISpecie> {
  return axios.get(`https://ghibliapi.herokuapp.com/species/${id}`)
    .then((result) => result.data);
}

export async function fetchVehicles() {
  return axios.get('https://ghibliapi.herokuapp.com/vehicles')
  .then((result) => result.data);
}

export async function fetchVehicleById(id: string): Promise<IVehicle> {
  return axios.get(`https://ghibliapi.herokuapp.com/vehicles/${id}`)
    .then((result) => result.data);
}