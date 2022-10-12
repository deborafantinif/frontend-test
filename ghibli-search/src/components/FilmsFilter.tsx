import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IFilm } from '../interfaces/endpoints';
import { IFilmsFilterProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilmsByFilters, handleMoreFilters } from '../redux/actions/filmsAction';
import { getLocations } from '../redux/actions/locationsAction';
import styles from '../styles/Filters.module.css'

function FilmsFilter({setIsMoreFiltersSelected, allFilms, allLocations, fetchLocations, requestWithFilter }: IFilmsFilterProps) {
  const [filmName, setFilmName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [producerName, setProducerName] = useState('');
  const [locationName, setLocationName] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('10000');
  const [minDuration, setMinDuration] = useState('');
  const [maxDuration, setMaxDuration] = useState('1000');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('10000');
  useEffect(() => {
    fetchLocations()
  }, [])

  const directorsName = allFilms.map((film) => film.director);
  const directorsUniqName = [ ...new Set(directorsName)];
  const producersName = allFilms.map((film) => film.producer);
  const producersUniqName = [ ...new Set(producersName)];

  function filteringFilms() {
    const filteredFilms = allFilms
      .filter((film) => film.title.toLowerCase().includes(filmName.toLowerCase()))
      .filter((film) => film.director.toLowerCase().includes(directorName.toLowerCase()))
      .filter((film) => film.producer.toLowerCase().includes(producerName.toLowerCase()))
      .filter((film) => (Number(film.rt_score) >= Number(minScore) && Number(film.rt_score) <= Number(maxScore)))
      .filter((film) => (Number(film.running_time) >= Number(minDuration) && Number(film.running_time) <= Number(maxDuration)))
      .filter((film) => (Number(film.release_date) >= Number(minYear) && Number(film.release_date) <= Number(maxYear)))
      .filter((film) => allLocations
        .find((location) => (
          location.films.includes(`https://ghibliapi.herokuapp.com/films/${film.id}`) && location.name.toLowerCase().includes(locationName.toLowerCase())
        )))
    requestWithFilter(filteredFilms);
  }
  function handleSendFilters() {
    setIsMoreFiltersSelected(false)
    filteringFilms()
  }
  return (
    <div data-cy="filters">
      <div className={styles.backgroundFilters}></div>
      <form className={styles.filtersForm}>
        <input
          type="text"
          className={styles.filtersInput}
          name="title"
          placeholder="Search by film name"
          onChange={(e) => setFilmName(e.target.value)}
        />
        <div className={styles.filtersSelect}>
          <label htmlFor="director">Search by director name:</label>
          <select
            name="director"
            id="director"
            onChange={(e) => setDirectorName(e.target.value)}
          >
            <option value="none"></option>
            {directorsUniqName.map((director) => (
              <option key={director} value={director}>
                {director}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filtersSelect}>
          <label htmlFor="producer">Search by producer name:</label>
          <select
            name="producer"
            id="producer"
            onChange={(e) => setProducerName(e.target.value)}
          >
            <option value="none"></option>
            {producersUniqName.map((producer) => (
              <option key={producer} value={producer}>
                {producer}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filtersSelect}>
          <label htmlFor="location">Search by location name:</label>
          <select
            name="location"
            id="location"
            onChange={(e) => setLocationName(e.target.value)}
          >
            <option value="none"></option>
            {allLocations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filtersInputNumber}>
          <input
            type="number"
            name="min-score"
            placeholder="Minimum score"
            onChange={(e) => setMinScore(e.target.value)}
          />
          <input
            type="number"
            name="max-score"
            placeholder="High score"
            onChange={(e) => setMaxScore(e.target.value)}
          />
        </div>
        <div className={styles.filtersInputNumber}>
          <input
            type="number"
            name="min-duration"
            placeholder="Minimum duration"
            onChange={(e) => setMinDuration(e.target.value)}
          />
          <input
            type="number"
            name="max-duration"
            placeholder="High duration"
            onChange={(e) => setMaxDuration(e.target.value)}
          />
        </div>
        <div className={styles.filtersInputNumber}>
          <input
            type="number"
            name="min-year"
            placeholder="Minimum year"
            onChange={(e) => setMinYear(e.target.value)}
          />
          <input
            type="number"
            name="max-year"
            placeholder="High year"
            onChange={(e) => setMaxYear(e.target.value)}
          />
        </div>
        <button
          data-cy="submit-filters"
          type="button"
          onClick={handleSendFilters}
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}

const mapState = (state: IRootState) => ({
  allFilms: state.filmsReducer.allFilms,
  allLocations: state.locationsReducer.allLocations,
});

const mapDispatch = (dispatch: ThunkDispatch<null, null, AnyAction>) => ({
  setIsMoreFiltersSelected: (isSelected: boolean) =>
    dispatch(handleMoreFilters(isSelected)),
  fetchLocations: () => dispatch(getLocations()),
  requestWithFilter: (films: IFilm[]) => dispatch(getFilmsByFilters(films)),
});

export default connect(mapState, mapDispatch)(FilmsFilter)