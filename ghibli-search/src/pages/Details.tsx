import React from 'react';
import { useParams } from 'react-router-dom';
import FilmDetails from '../components/FilmDetails';
import { HeaderDetails } from '../components/HeaderDetails';
import LocationsDetails from '../components/LocationsDetails';
import PeopleDetails from '../components/PeopleDetails';
import SpeciesDetails from '../components/SpeciesDetails';
import VehiclesDetails from '../components/VehiclesDetails';
import { IDetailsProps } from '../interfaces/propsComponents';

export function Details({endpoint}: IDetailsProps) {
  const {id} = useParams();

  function renderSwitch(param: string) {
    switch(param) {
      case 'film':
        return <FilmDetails id={id as string}/>
      case 'person':
        return <PeopleDetails id={id as string}/>
      case 'location':
        return <LocationsDetails id={id as string}/>
      case 'specie':
        return <SpeciesDetails id={id as string}/>
      case 'vehicle':
        return <VehiclesDetails id={id as string}/>
      default:
        return <p>None</p>
    }
  }

  return (
    <>
      <HeaderDetails/>
      {renderSwitch(endpoint)}
    </>
  )
}