import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SpecieCard } from '../components/SpecieCard';
import HeaderHome from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { ISpeciesProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getSpecies } from '../redux/actions/speciesAction';
import styles from '../styles/Cards.module.css';

function Species({ fetchSpecies, species, loading, error }: ISpeciesProps) {
  useEffect(() => {
    fetchSpecies()
  }, [])

  if (error.length > 1) console.error(error);

  return (
    <div>
      <HeaderHome endpoint='species'/>
      <div className={styles.cards}>
        { (loading) ?
          <Loading/> :
          species.map((specie) => <SpecieCard key={specie.id} specie={specie} /> ) }
      </div>
    </div>
  )
}

const mapState = (state: IRootState) => ({
  species: state.speciesReducer.species,
  loading: state.speciesReducer.loading,
  error: state.speciesReducer.error,
})

const mapDispatch = (dispatch: ThunkDispatch< null, null, AnyAction>) => ({
  fetchSpecies: () => dispatch(getSpecies()),
})

export default connect(mapState, mapDispatch)(Species)