import { Dispatch } from "redux";
import { fetchVehicles } from "../../api/ghibliApi";
import { IVehicle } from "../../interfaces/propsComponents";
import { FAILED_REQUEST, GET_VEHICLES_BY_FILTERS, GET_VEHICLES_BY_NAME, REQUEST_VEHICLES, SAVE_VEHICLES } from "./actionTypes";

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

export const getVehiclesByName = (filteredVehicles: IVehicle[]) => ({
  type: GET_VEHICLES_BY_NAME,
  payload: filteredVehicles,
});

export const getVehiclesByFilters = (vehicles: IVehicle[]) => ({
  type: GET_VEHICLES_BY_FILTERS,
  payload: vehicles,
});
