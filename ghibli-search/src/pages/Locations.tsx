import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CardLocation } from '../components/CardLocation';
import { HeaderHome } from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { ILocationsProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getLocations } from '../redux/actions/locationsAction';

function Locations({ fetchLocations, locations, loading, error }: ILocationsProps) {
  useEffect(() => {
    fetchLocations()
  }, [])
  if (error.length > 1) console.error(error);
  return (
    <div>
      <p>Locations</p>
      <HeaderHome/>
      { (loading) ?
        <Loading/> :
        locations.map((location) => <CardLocation key={location.id} location={location} /> ) }
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