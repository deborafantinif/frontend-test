import { IFilm, ILocation, IPerson, ISpecie, IVehicle } from "./propsComponents";

export interface IRootState {
  filmsReducer: {
    films: IFilm[],
    allFilms: IFilm[],
    loading: boolean,
    error: string,
  },
  peopleReducer: {
    people: IPerson[],
    allPeople: IPerson[],
    loading: boolean,
    error: string,
  },
  locationsReducer: {
    locations: ILocation[],
    allLocations: ILocation[],
    loading: boolean,
    error: string,
  },
  speciesReducer: {
    species: ISpecie[],
    allSpecies: ISpecie[],
    loading: boolean,
    error: string,
  },
  vehiclesReducer: {
    vehicles: IVehicle[],
    allVehicles: IVehicle[],
    loading: boolean,
    error: string,
  }
}