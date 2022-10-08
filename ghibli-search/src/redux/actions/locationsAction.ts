import { Dispatch } from "redux";
import { fetchLocations } from "../../api/ghibliApi";
import { FAILED_REQUEST, REQUEST_LOCATIONS, SAVE_LOCATIONS } from "./actionTypes";

const requestLocations = () => ({
  type: REQUEST_LOCATIONS,
});

const saveLocations = (payload: string) => ({
  type: SAVE_LOCATIONS,
  payload,
});

const failedRequest = (error: string) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const getLocations = () => async (dispatch: Dispatch) => {
  dispatch(requestLocations());

  try {
    const locations = await fetchLocations();
    if (!locations) throw new Error('Not found locations');
    dispatch(saveLocations(locations))
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(failedRequest(error.message));
  }
}
