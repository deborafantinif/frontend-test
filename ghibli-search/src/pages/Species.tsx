import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CardSpecie } from '../components/CardSpecie';
import HeaderHome from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { ISpeciesProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getSpecies } from '../redux/actions/speciesAction';

function Species({ fetchSpecies, species, loading, error }: ISpeciesProps) {
  useEffect(() => {
    fetchSpecies()
  }, [])
  if (error.length > 1) console.error(error);
  return (
    <div>
      <p>People</p>
      <HeaderHome endpoint='species'/>
      { (loading) ?
        <Loading/> :
        species.map((specie) => <CardSpecie key={specie.id} specie={specie} /> ) }
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