import { IFilm } from "./propsComponents";

export interface IRootState {
  filmsReducer: {
    films: IFilm[],
    loading: boolean,
    error: string,
  },
  peopleReducer: {
    people: [],
    loading: boolean,
    error: string,
  }
}