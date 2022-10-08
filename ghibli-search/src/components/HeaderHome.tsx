import { Plus } from 'phosphor-react';
import React from 'react';
import { Menu } from './Menu';

export function HeaderHome() {
  return (
    <header>
      <Menu/>
      <h1>GHIBLI SEARCH</h1>
      <input type="text" name="name" placeholder='Search by movie name...' />
      <button type='button'>
        <Plus size={25}/>
        {' '}
        FILTERS
      </button>
    </header>
  )
}