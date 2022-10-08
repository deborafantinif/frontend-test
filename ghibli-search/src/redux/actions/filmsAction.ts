import { Dispatch } from "redux";
import { fetchFilms } from "../../api/ghibliApi";
import { FAILED_REQUEST, REQUEST_FILMS, SAVE_FILMS } from "./actionTypes";

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
