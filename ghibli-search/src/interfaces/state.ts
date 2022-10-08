import { IFilm, ILocation, IPerson, ISpecie } from "./propsComponents";

export interface IRootState {
  filmsReducer: {
    films: IFilm[],
    loading: boolean,
    error: string,
  },
  peopleReducer: {
    people: IPerson[],
    loading: boolean,
    error: string,
  },
  locationsReducer: {
    locations: ILocation[],
    loading: boolean,
    error: string,
  },
  speciesReducer: {
    species: ISpecie[],
    loading: boolean,
    error: string,
  }
}