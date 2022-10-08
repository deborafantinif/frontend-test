import { Dispatch } from "redux";
import { fetchVehicles } from "../../api/ghibliApi";
import { FAILED_REQUEST, REQUEST_VEHICLES, SAVE_VEHICLES } from "./actionTypes";

const requestVehicles = () => ({
  type: REQUEST_VEHICLES,
});

const saveVehicles = (payload: string) => ({
  type: SAVE_VEHICLES,
  payload,
});

const failedRequest = (error: string) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const getVehicles = () => async (dispatch: Dispatch) => {
  dispatch(requestVehicles());

  try {
    const vehicles = await fetchVehicles();
    if (!vehicles) throw new Error('Not found vehicles');
    dispatch(saveVehicles(vehicles))
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(failedRequest(error.message));
  }
}
