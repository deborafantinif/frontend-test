import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IVehicle, IVehiclesFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';
import { getVehiclesByFilters } from '../redux/actions/vehiclesAction';

function VehiclesFilter({setIsMoreFiltersSelected, allVehicles, fetchFilms, requestWithFilter}: IVehiclesFilterProps) {
  const [vehiclesName, setVehiclesName] = useState('');
  const [classificationName, setClassificationName] = useState('');
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('10000');

  function filteringVehicles() {
    const filteredVehicles = allVehicles
    .filter((vehicle) => vehicle.name.toLowerCase().includes(vehiclesName.toLowerCase()))
    .filter((vehicle) => vehicle.vehicle_class.toLowerCase().includes(classificationName.toLowerCase()))
    .filter((vehicle) => (Number(vehicle.length) >= Number(minLength) && Number(vehicle.length) <= Number(maxLength)))

    requestWithFilter(filteredVehicles);
  }
  function handleSendVehicles() {
    setIsMoreFiltersSelected(false)
    filteringVehicles()
  }

  useEffect(() => {
    fetchFilms()
  }, [])
  const classificationsName = allVehicles.map((vehicle) => vehicle.vehicle_class);
  const classificationsUniqName = [ ...new Set(classificationsName)];
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' onChange={(e) => setVehiclesName(e.target.value)} />
      <div>
        <label htmlFor="classification">Search by classification name</label>
        <select name="classification" id="classification" onChange={(e) => setClassificationName(e.target.value)}>
          <option value='none'></option>
          { classificationsUniqName.map((classification) => (
            <option key={classification} value={classification}>{classification}</option>
            ))}
        </select>
      </div>
      <div>
        <input type="number" name="max-length" placeholder='Minimum length' onChange={(e) => setMaxLength(e.target.value)} />
        <input type="number" name="min-length" placeholder='High length' onChange={(e) => setMinLength(e.target.value)} />
      </div>
      <button type='button' onClick={handleSendVehicles}>
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
  requestWithFilter: (vehicles: IVehicle[]) => dispatch(getVehiclesByFilters(vehicles)),
});

export default connect(mapState, mapDispatch)(VehiclesFilter)