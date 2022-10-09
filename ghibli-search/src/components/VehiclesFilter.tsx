import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IVehiclesFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';

function VehiclesFilter({setIsMoreFiltersSelected, allFilms, allVehicles, fetchFilms}: IVehiclesFilterProps) {
  useEffect(() => {
    fetchFilms()
  }, [])
  const classificationsName = allVehicles.map((vehicle) => vehicle.vehicle_class);
  const classificationsUniqName = [ ...new Set(classificationsName)];
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <input type="text" name="person" placeholder='Search by pilot name' />
      <div>
        <label htmlFor="classification">Search by classification name</label>
        <select name="classification" id="classification">
          { classificationsUniqName.map((classification) => (
            <option key={classification} value={classification}>{classification}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="film">Search by film name</label>
        <select name="film" id="film">
          { allFilms.map((film) => (
            <option key={film.id} value={film.title}>{film.title}</option>
          ))}
        </select>
      </div>
      <div>
        <input type="number" name="max-length" placeholder='Minimum length' />
        <input type="number" name="min-length" placeholder='High length' />
      </div>
      <button type='button' onClick={() => setIsMoreFiltersSelected(false)}>
        SEARCH
      </button>
    </form>
  )
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
  allVehicles: state.vehiclesReducer.allVehicles,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
  fetchFilms: () => dispatch(getFilms()),
});

export default connect(mapState, mapDispatch)(VehiclesFilter)