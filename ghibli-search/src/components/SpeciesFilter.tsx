import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ISpeciesFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';

function SpeciesFilter({setIsMoreFiltersSelected, allFilms, fetchFilms}: ISpeciesFilterProps) {
  useEffect(() => {
    fetchFilms()
  }, [])
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <input type="text" name="person" placeholder='Search by person name' />
      <input type="text" name="eye-color" placeholder='Search by eye color name' />
      <input type="text" name="hair-color" placeholder='Search by hair color name' />
      <div>
        <label htmlFor="film">Search by film name</label>
        <select name="film" id="film">
          { allFilms.map((film) => (
            <option key={film.id} value={film.title}>{film.title}</option>
          ))} 
        </select>
      </div>
      <button type='button' onClick={() => setIsMoreFiltersSelected(false)}>
        SEARCH
      </button>
    </form>
  )
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
  fetchFilms: () => dispatch(getFilms()),
});

export default connect(mapState, mapDispatch)(SpeciesFilter)