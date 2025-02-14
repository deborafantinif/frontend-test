import { Dispatch } from "redux";
import { fetchSpecies } from "../../api/ghibliApi";
import { ISpecie } from "../../interfaces/propsComponents";
import { FAILED_REQUEST, GET_SPECIES_BY_FILTERS, GET_SPECIES_BY_NAME, REQUEST_SPECIES, SAVE_SPECIES } from "./actionTypes";

const requestSpecies = () => ({
  type: REQUEST_SPECIES,
});

const saveSpecies = (payload: string) => ({
  type: SAVE_SPECIES,
  payload,
});

const failedRequest = (error: string) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const getSpecies = () => async (dispatch: Dispatch) => {
  dispatch(requestSpecies());

  try {
    const species = await fetchSpecies();
    if (!species) throw new Error('Not found species');
    dispatch(saveSpecies(species))
  } catch (error: unknown) {
    if (error instanceof Error)
      dispatch(failedRequest(error.message));
  }
}

export const getSpeciesByName = (filteredSpecies: ISpecie[]) => ({
  type: GET_SPECIES_BY_NAME,
  payload: filteredSpecies,
});

export const getSpeciesByFilters = (species: ISpecie[]) => ({
  type: GET_SPECIES_BY_FILTERS,
  payload: species,
});

