import { Dispatch } from "redux";
import { fetchPeople } from "../../api/ghibliApi";
import { FAILED_REQUEST, REQUEST_PEOPLE, SAVE_PEOPLE } from "./actionTypes";

const requestPeople = () => ({
  type: REQUEST_PEOPLE,
});

const savePeople = (payload: string) => ({
  type: SAVE_PEOPLE,
  payload,
});

const failedRequest = (error: string) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const getPeople = () => async (dispatch: Dispatch) => {
  dispatch(requestPeople());

  try {
    const people = await fetchPeople();
    if (!people) throw new Error('Not found people');
    dispatch(savePeople(people))
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(failedRequest(error.message));
  }
}
