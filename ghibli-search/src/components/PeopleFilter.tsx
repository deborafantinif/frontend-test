import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPeopleFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';

function PeopleFilter({setIsMoreFiltersSelected, allFilms, allLocations, allPeople, fetchFilms, fetchLocations}: IPeopleFilterProps) {
  useEffect(() => {
    fetchLocations()
    fetchFilms()
  }, [])
  const peopleGender = allPeople.map((person) => person.gender);
  const peopleUniqGender = [ ...new Set(peopleGender)];
  const peopleEyeColor = allPeople.map((person) => person.eye_color);
  const peopleUniqEyeColor = [ ...new Set(peopleEyeColor)];
  const peopleHairColor = allPeople.map((person) => person.hair_color);
  const peopleUniqHairColor = [ ...new Set(peopleHairColor)];
  return (
    <form>
      <input type="text" name="name" placeholder='Search by name' />
      <div>
        <label htmlFor="film">Search by film name</label>
        <select name="film" id="film">
          { allFilms.map((film) => (
            <option key={film.id} value={film.title}>{film.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="gender">Search by gender name</label>
        <select name="gender" id="gender">
          { peopleUniqGender.map((gender, index) => (
            <option key={`${gender}${index}`} value={gender}>{gender}</option>
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
      <div>
        <input type="number" name="max-age" placeholder='Minimum age' />
        <input type="number" name="min-agr" placeholder='High age' />
      </div>
      <div>
        <label htmlFor="eye-color">Search by eye color</label>
        <select name="eye-color" id="eye-color">
          { peopleUniqEyeColor.map((eyeColor, index) => (
            <option key={`${eyeColor}${index}`} value={eyeColor}>{eyeColor}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="hair-color">Search by hair color</label>
        <select name="hair-color" id="hair-color">
          { peopleUniqHairColor.map((hairColor, index) => (
            <option key={`${hairColor}${index}`} value={hairColor}>{hairColor}</option>
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
  allLocations: state.locationsReducer.allLocations,
  allPeople: state.peopleReducer.allPeople,
  error: state.locationsReducer.error,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
  fetchLocations: () => dispatch(getLocations()),
  fetchFilms: () => dispatch(getFilms()),
});

export default connect(mapState, mapDispatch)(PeopleFilter)