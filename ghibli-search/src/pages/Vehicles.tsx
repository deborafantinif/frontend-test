import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CardVehicle } from '../components/CardVehicles';
import { HeaderHome } from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { IVehiclesProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getVehicles } from '../redux/actions/vehiclesAction';

function Vehicles({ fetchVehicles, vehicles, loading, error }: IVehiclesProps) {
  useEffect(() => {
    fetchVehicles()
  }, [])
  if (error.length > 1) console.error(error);
  return (
    <div>
      <p>Vehicles</p>
      <HeaderHome/>
      { (loading) ?
        <Loading/> :
        vehicles.map((vehicle) => <CardVehicle key={vehicle.id} vehicle={vehicle} /> ) }
    </div>
  )
}

const mapState = (state: IRootState) => ({
  vehicles: state.vehiclesReducer.vehicles,
  loading: state.vehiclesReducer.loading,
  error: state.vehiclesReducer.error,
})

const mapDispatch = (dispatch: ThunkDispatch< null, null, AnyAction>) => ({
  fetchVehicles: () => dispatch(getVehicles()),
})

export default connect(mapState, mapDispatch)(Vehicles)