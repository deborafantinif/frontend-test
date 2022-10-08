import React from 'react';
import { FilmsDetails } from '../components/FilmDetails';
import { HeaderDetails } from '../components/HeaderDetails';
import { IDetails } from '../interfaces/propsComponents';

export function Details({endpoint}: IDetails) {
  function renderSwitch(param: string) {
    switch(param) {
      case 'film':
        return <FilmsDetails/>
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