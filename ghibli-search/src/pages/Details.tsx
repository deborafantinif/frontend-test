import React from 'react';
import { FilmsDetails } from '../components/FilmDetails';
import { HeaderDetails } from '../components/HeaderDetails';
import { LocationsDetails } from '../components/LocationsDetails';
import { PeopleDetails } from '../components/PeopleDetails';
import { SpeciesDetails } from '../components/SpeciesDetails';
import { IDetails } from '../interfaces/propsComponents';

export function Details({endpoint}: IDetails) {
  function renderSwitch(param: string) {
    switch(param) {
      case 'film':
        return <FilmsDetails/>
      case 'person':
        return <PeopleDetails/>
      case 'location':
        return <LocationsDetails/>
      case 'specie':
        return <SpeciesDetails/>
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