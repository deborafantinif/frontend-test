import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPerson } from '../interfaces/endpoints';
import { IPeopleFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';
import { getPeopleByFilters } from '../redux/actions/peopleAction';
import styles from '../styles/Filters.module.css'

function PeopleFilter({setIsMoreFiltersSelected, allPeople, fetchFilms, fetchLocations, requestWithFilter}: IPeopleFilterProps) {
  const [peopleName, setPeopleName] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('10000');
  const [eyeColorName, setEyeColorName] = useState('');
  const [hairColorName, setHairColorName] = useState('');
  useEffect(() => {
    fetchLocations();
    fetchFilms();
  }, []);

  const peopleEyeColor = allPeople.map((person) => person.eye_color);
  const peopleUniqEyeColor = [ ...new Set(peopleEyeColor)];
  const peopleHairColor = allPeople.map((person) => person.hair_color);
  const peopleUniqHairColor = [ ...new Set(peopleHairColor)];

  function filteringFilms() {
    const filteredPeople = allPeople
    .filter((person) => person.name.toLowerCase().includes(peopleName.toLowerCase()))
    .filter((person) => person.eye_color.toLowerCase().includes(eyeColorName.toLowerCase()))
    .filter((person) => person.hair_color.toLowerCase().includes(hairColorName.toLowerCase()))
    .filter((person) => (Number(person.age) >= Number(minAge) && Number(person.age) <= Number(maxAge)))

    requestWithFilter(filteredPeople);
  }
  function handleSendFilters() {
    setIsMoreFiltersSelected(false)
    filteringFilms()
  }
  return (
    <>
      <div className={styles.backgroundFilters}></div>
      <form className={styles.filtersForm}>
      <input type="text" name="name" className={styles.filtersInput} placeholder='Search by name' onChange={(e) =>setPeopleName(e.target.value)} />
      <div className={styles.filtersInputNumber}>
        <input type="number" name="max-age" placeholder='Minimum age' onChange={(e) =>setMinAge(e.target.value)} />
        <input type="number" name="min-agr" placeholder='High age' onChange={(e) =>setMaxAge(e.target.value)} />
      </div>
      <div className={styles.filtersSelect}>
        <label htmlFor="eye-color">Search by eye color:</label>
        <select name="eye-color" id="eye-color" onChange={(e) => setEyeColorName(e.target.value)}>
          <option value='none'></option>
          { peopleUniqEyeColor.map((eyeColor, index) => (
            <option key={`${eyeColor}${index}`} value={eyeColor}>{eyeColor}</option>
          ))}
        </select>
      </div>
      <div className={styles.filtersSelect}>
        <label htmlFor="hair-color">Search by hair color:</label>
        <select name="hair-color" id="hair-color" onChange={(e) => setHairColorName(e.target.value)}>
          <option value='none'></option>
          { peopleUniqHairColor.map((hairColor, index) => (
            <option key={`${hairColor}${index}`} value={hairColor}>{hairColor}</option>
          ))}
        </select>
      </div>
      <button type='button' onClick={handleSendFilters}>
        SEARCH
      </button>
    </form>
    </>
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
  requestWithFilter: (people: IPerson[]) => dispatch(getPeopleByFilters(people)),
});

export default connect(mapState, mapDispatch)(PeopleFilter)