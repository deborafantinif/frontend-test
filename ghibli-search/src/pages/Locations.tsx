import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { LocationCard } from '../components/LocationCard';
import HeaderHome from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { ILocationsProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getLocations } from '../redux/actions/locationsAction';
import styles from '../styles/Cards.module.css';

function Locations({ fetchLocations, locations, loading, error }: ILocationsProps) {
  useEffect(() => {
    fetchLocations()
  }, [])

  if (error.length > 1) console.error(error);

  return (
    <div>
      <HeaderHome endpoint='locations'/>
      <div className={styles.cards}>
        { (loading) ?
          <Loading/> :
          locations.map((location) => <LocationCard key={location.id} location={location} /> ) }
      </div>
    </div>
  )
}

const mapState = (state: IRootState) => ({
  locations: state.locationsReducer.locations,
  loading: state.locationsReducer.loading,
  error: state.locationsReducer.error,
})

const mapDispatch = (dispatch: ThunkDispatch< null, null, AnyAction>) => ({
  fetchLocations: () => dispatch(getLocations()),
})

export default connect(mapState, mapDispatch)(Locations)