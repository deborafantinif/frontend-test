import React from 'react';
import { useParams } from 'react-router-dom';
import FilmsDetails from '../components/FilmDetails';
import { HeaderDetails } from '../components/HeaderDetails';
import LocationsDetails from '../components/LocationsDetails';
import PeopleDetails from '../components/PeopleDetails';
import SpeciesDetails from '../components/SpeciesDetails';
import { VehiclesDetails } from '../components/VehiclesDetails';
import { IDetails } from '../interfaces/propsComponents';

export function Details({endpoint}: IDetails) {
  const {id} = useParams();
  function renderSwitch(param: string) {
    switch(param) {
      case 'film':
        return <FilmsDetails id={id as string}/>
      case 'person':
        return <PeopleDetails id={id as string}/>
      case 'location':
        return <LocationsDetails id={id as string}/>
      case 'specie':
        return <SpeciesDetails id={id as string}/>
      case 'vehicle':
        return <VehiclesDetails/>
      default:
        return <p>None</p>
    }
  }
  return (
    <div>
      <HeaderDetails/>
      {renderSwitch(endpoint)}
    </div>
  )
}