import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFilterProps } from '../interfaces/propsComponents';
import { handleMoreFilters } from '../redux/actions/filmsAction';

function LocationsFilter({setIsMoreFiltersSelected}: IFilterProps) {
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <input type="text" name="person" placeholder='Search by person name' />
      <div>
        <label htmlFor="climate">Search by climate</label>
        <select name="climate" id="climate">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <label htmlFor="terrain">Search by terrain</label>
        <select name="terrain" id="terrain">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <label htmlFor="film">Search by film name</label>
        <select name="film" id="film">
          <option value="fff">fff</option>
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

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
});

export default connect(null, mapDispatch)(LocationsFilter)