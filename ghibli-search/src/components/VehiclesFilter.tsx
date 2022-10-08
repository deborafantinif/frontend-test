import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFilterProps } from '../interfaces/propsComponents';
import { handleMoreFilters } from '../redux/actions/filmsAction';

function VehiclesFilter({setIsMoreFiltersSelected}: IFilterProps) {
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <input type="text" name="person" placeholder='Search by pilot name' />
      <div>
        <label htmlFor="classification">Search by classification name</label>
        <select name="classification" id="classification">
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
        <input type="number" name="max-length" placeholder='Minimum length' />
        <input type="number" name="min-length" placeholder='High length' />
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

export default connect(null, mapDispatch)(VehiclesFilter)