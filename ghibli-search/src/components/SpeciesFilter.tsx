import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ISpecie, ISpeciesFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms, handleMoreFilters } from '../redux/actions/filmsAction';
import { getSpeciesByFilters } from '../redux/actions/speciesAction';
import styles from '../styles/Filters.module.css'

function SpeciesFilter({setIsMoreFiltersSelected, fetchFilms, requestWithFilter, allSpecies}: ISpeciesFilterProps) {
  const [speciesName, setSpeciesName] = useState('');
  const [eyeColorName, setEyeColorName] = useState('');
  const [hairColorName, setHairColorName] = useState('');

  useEffect(() => {
    fetchFilms()
  }, [])

  function filteringSpecies() {
    const filteredSpecie = allSpecies
    .filter((specie) => specie.name.toLowerCase().includes(speciesName.toLowerCase()))
    .filter((specie) => specie.eye_colors.toLowerCase().includes(eyeColorName.toLowerCase()))
    .filter((specie) => specie.hair_colors.toLowerCase().includes(hairColorName.toLowerCase()))
    requestWithFilter(filteredSpecie);
  }
  function handleSendSpecies() {
    setIsMoreFiltersSelected(false)
    filteringSpecies()
  }

  return (
    <>
      <div className={styles.backgroundFilters}></div>
      <form className={styles.filtersForm}>
      <input type="text" name="name" placeholder='Search by name' onChange={(e) => setSpeciesName(e.target.value)} />
      <input type="text" name="eye-color" placeholder='Search by eye color' onChange={(e) => setEyeColorName(e.target.value)} />
      <input type="text" name="hair-color" placeholder='Search by hair color' onChange={(e) => setHairColorName(e.target.value)} />
      <button type='button' onClick={handleSendSpecies}>
        SEARCH
      </button>
    </form>
    </>
  )
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
  allSpecies: state.speciesReducer.allSpecies,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
  fetchFilms: () => dispatch(getFilms()),
  requestWithFilter: (species: ISpecie[]) => dispatch(getSpeciesByFilters(species)),
});

export default connect(mapState, mapDispatch)(SpeciesFilter)