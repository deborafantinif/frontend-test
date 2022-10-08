import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFilterProps } from '../interfaces/propsComponents';
import { handleMoreFilters } from '../redux/actions/filmsAction';

function PeopleFilter({setIsMoreFiltersSelected}: IFilterProps) {
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <div>
        <label htmlFor="film">Search by film name</label>
        <select name="film" id="film">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <label htmlFor="gender">Search by gender name</label>
        <select name="gender" id="gender">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <label htmlFor="location">Search by location name</label>
        <select name="location" id="location">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <input type="number" name="max-age" placeholder='Minimum age' />
        <input type="number" name="min-agr" placeholder='High age' />
      </div>
      <div>
        <label htmlFor="eye-color">Search by eye color</label>
        <select name="eye-color" id="eye-color">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <label htmlFor="hair-color">Search by hair color</label>
        <select name="hair-color" id="hair-color">
          <option value="fff">fff</option>
        </select>
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

export default connect(null, mapDispatch)(PeopleFilter)