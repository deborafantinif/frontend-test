import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CardFilm } from '../components/CardFilm';
import HeaderHome from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { IFilmsProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getFilms } from '../redux/actions/filmsAction';

function Films({ fetchFilms, films, loading, error }: IFilmsProps) {
  useEffect(() => {
    fetchFilms()
  }, [])
  if (error.length > 1) console.error(error);
  return (
    <div>
      <HeaderHome endpoint={"films"}/>
      { (loading) ?
        <Loading/> :
        films.map((film) => <CardFilm key={film.id} film={film} /> ) }
    </div>
  )
}

const mapState = (state: IRootState) => ({
  films: state.filmsReducer.films,
  loading: state.filmsReducer.loading,
  error: state.filmsReducer.error,
})

const mapDispatch = (dispatch: ThunkDispatch< null, null, AnyAction>) => ({
  fetchFilms: () => dispatch(getFilms()),
})

export default connect(mapState, mapDispatch)(Films)