import { Dispatch } from "redux";
import { fetchFilms } from "../../api/ghibliApi";
import { IFilm } from "../../interfaces/endpoints";
import { FAILED_REQUEST, GET_FILMS_BY_FILTERS, GET_FILMS_BY_TITLE, HANDLE_MORE_FILTERS, REQUEST_FILMS, SAVE_FILMS } from "./actionTypes";

const requestFilms = () => ({
  type: REQUEST_FILMS,
});

const saveFilms = (payload: string) => ({
  type: SAVE_FILMS,
  payload,
});

const failedRequest = (error: string) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const getFilms = () => async (dispatch: Dispatch) => {
  dispatch(requestFilms());

  try {
    const films = await fetchFilms();
    if (!films) throw new Error('Not found films');
    dispatch(saveFilms(films))
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(failedRequest(error.message));
  }
}

export const getFilmsByTitle = (filteredFilms: IFilm[]) => ({
  type: GET_FILMS_BY_TITLE,
  payload: filteredFilms,
});

export const handleMoreFilters = (isSelected: boolean) => ({
  type: HANDLE_MORE_FILTERS,
  payload: isSelected,
});

export const getFilmsByFilters = (films: IFilm[]) => ({
  type: GET_FILMS_BY_FILTERS,
  payload: films,
});
