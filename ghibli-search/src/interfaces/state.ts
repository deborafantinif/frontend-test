import { IFilm } from "./propsComponents";

export interface IRootState {
  filmsReducer: {
    films: IFilm[],
    loading: boolean,
  }
}