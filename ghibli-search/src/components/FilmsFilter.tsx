import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFilterProps } from '../interfaces/propsComponents';
import { handleMoreFilters } from '../redux/actions/filmsAction';

function FilmsFilter({setIsMoreFiltersSelected}: IFilterProps) {
  return (
    <form>
      <input type="text" name="title" placeholder='Search by movie name' />
      <div>
        <label htmlFor="director">Search by director name</label>
        <select name="director" id="director">
          <option value="fff">fff</option>
        </select>
      </div>
      <div>
        <label htmlFor="producer">Search by producer name</label>
        <select name="producer" id="producer">
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

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
});

export default connect(null, mapDispatch)(FilmsFilter)