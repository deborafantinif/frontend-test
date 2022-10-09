import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFilmsFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { handleMoreFilters } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';

function FilmsFilter({setIsMoreFiltersSelected, allFilms, allLocations, fetchLocations}: IFilmsFilterProps) {
  useEffect(() => {
    fetchLocations()
  }, [])
  const directorsName = allFilms.map((film) => film.director);
  const directorsUniqName = [ ...new Set(directorsName)];
  const producersName = allFilms.map((film) => film.producer);
  const producersUniqName = [ ...new Set(producersName)];
  return (
    <form>
      <input type="text" name="title" placeholder='Search by film name' />
      <div>
        <label htmlFor="director">Search by director name</label>
        <select name="director" id="director">
          { directorsUniqName.map((director) => (
            <option key={director} value={director}>{director}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="producer">Search by producer name</label>
        <select name="producer" id="producer">
          { producersUniqName.map((producer) => (
            <option key={producer} value={producer}>{producer}</option>
          ))}       
        </select>
      </div>
      <div>
        <label htmlFor="location">Search by location name</label>
        <select name="location" id="location">
          { allLocations.map((location) => (
            <option key={location.id} value={location.name}>{location.name}</option>
          ))}       
        </select>
      </div>
      <input type="text" name="title" placeholder='Search by location name' />
      <div>
        <input type="number" name="max-score" placeholder='Minimum score' />
        <input type="number" name="min-score" placeholder='High name' />
      </div>
      <div>
        <input type="number" name="max-duration" placeholder='Minimum duration' />
        <input type="number" name="min-duration" placeholder='High duration' />
      </div>
      <div>
        <input type="number" name="max-year" placeholder='Minimum year' />
        <input type="number" name="min-year" placeholder='High year' />
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
  fetchLocations: () => dispatch(getLocations()),
});

export default connect(mapState, mapDispatch)(FilmsFilter)