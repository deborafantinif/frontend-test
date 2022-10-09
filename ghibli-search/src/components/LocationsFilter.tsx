import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ILocationsFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';

function LocationsFilter({setIsMoreFiltersSelected, allFilms, allLocations, fetchFilms}: ILocationsFilterProps) {
  useEffect(() => {
    fetchFilms()
  }, [])
  const locationsClimate = allLocations.map((location) => location.climate);
  const locationsUniqClimate = [ ...new Set(locationsClimate)];
  const locationsTerrain = allLocations.map((location) => location.terrain);
  const locationsUniqTerrain = [ ...new Set(locationsTerrain)];
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <input type="text" name="person" placeholder='Search by person name' />
      <div>
        <label htmlFor="climate">Search by climate</label>
        <select name="climate" id="climate">
          { locationsUniqClimate.map((climate) => (
            <option key={climate} value={climate}>{climate}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="terrain">Search by terrain</label>
        <select name="terrain" id="terrain">
          { locationsUniqTerrain.map((terrain) => (
            <option key={terrain} value={terrain}>{terrain}</option>
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
        <input type="number" name="max-water" placeholder='Minimum water' />
        <input type="number" name="min-water" placeholder='High water' />
      </div>
      <button type='button' onClick={() => setIsMoreFiltersSelected(false)}>
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
});

export default connect(mapState, mapDispatch)(LocationsFilter)