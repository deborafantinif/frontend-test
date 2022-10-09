import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ILocation, ILocationsFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';
import { getLocationsByFilters } from '../redux/actions/locationsAction';

function LocationsFilter({setIsMoreFiltersSelected, allLocations, fetchFilms, requestWithFilter}: ILocationsFilterProps) {
  const [locationName, setLocationName] = useState('');
  const [climateName, setClimateName] = useState('');
  const [terrainName, setTerrainName] = useState('');
  const [minWater, setMinWater] = useState('');
  const [maxWater, setMaxWater] = useState('10000');

  useEffect(() => {
    fetchFilms()
  }, [])
  const locationsClimate = allLocations.map((location) => location.climate);
  const locationsUniqClimate = [ ...new Set(locationsClimate)];
  const locationsTerrain = allLocations.map((location) => location.terrain);
  const locationsUniqTerrain = [ ...new Set(locationsTerrain)];

  function filteringLocations() {
    const filteredPeople = allLocations
    .filter((location) => location.name.toLowerCase().includes(locationName.toLowerCase()))
    .filter((location) => location.climate.toLowerCase().includes(climateName.toLowerCase()))
    .filter((location) => location.terrain.toLowerCase().includes(terrainName.toLowerCase()))
    .filter((location) => (Number(location.surface_water) >= Number(minWater) && Number(location.surface_water) <= Number(maxWater)))

    requestWithFilter(filteredPeople);
  }
  function handleSendFilters() {
    setIsMoreFiltersSelected(false)
    filteringLocations()
  }
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' onChange={(e) => setLocationName(e.target.value)} />
      <div>
        <label htmlFor="climate">Search by climate</label>
        <select name="climate" id="climate" onChange={(e) => setClimateName(e.target.value)}>
          <option value='none'></option>
          { locationsUniqClimate.map((climate) => (
            <option key={climate} value={climate}>{climate}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="terrain">Search by terrain</label>
        <select name="terrain" id="terrain" onChange={(e) => setTerrainName(e.target.value)}>
          <option value='none'></option>
          { locationsUniqTerrain.map((terrain) => (
            <option key={terrain} value={terrain}>{terrain}</option>
          ))}
        </select>
      </div>
      <div>
        <input type="number" name="max-water" placeholder='Minimum water' onChange={(e) => setMinWater(e.target.value)} />
        <input type="number" name="min-water" placeholder='High water' onChange={(e) => setMaxWater(e.target.value)} />
      </div>
      <button type='button' onClick={handleSendFilters}>
        SEARCH
      </button>
    </form>
  )
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
  allLocations: state.locationsReducer.allLocations,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
  fetchFilms: () => dispatch(getFilms()),
  requestWithFilter: (locations: ILocation[]) => dispatch(getLocationsByFilters(locations)),
});

export default connect(mapState, mapDispatch)(LocationsFilter)