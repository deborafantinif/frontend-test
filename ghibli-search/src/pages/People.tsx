import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { CardPerson } from '../components/CardPerson';
import HeaderHome from '../components/HeaderHome';
import { Loading } from '../components/Loading';
import { IPeopleProps } from '../interfaces/propsComponents';
import { IRootState } from '../interfaces/state';
import { getPeople } from '../redux/actions/peopleAction';
import styles from '../styles/Cards.module.css';

function People({ fetchPeople, people, loading, error }: IPeopleProps) {
  useEffect(() => {
    fetchPeople()
  }, [])
  if (error.length > 1) console.error(error);
  return (
    <div>
      <HeaderHome endpoint='people'/>
      <div className={styles.cards}>
        { (loading) ?
          <Loading/> :
          people.map((person) => <CardPerson key={person.id} person={person} /> ) }
      </div>
    </div>
  )
}

const mapState = (state: IRootState) => ({
  people: state.peopleReducer.people,
  loading: state.peopleReducer.loading,
  error: state.peopleReducer.error,
})

const mapDispatch = (dispatch: ThunkDispatch< null, null, AnyAction>) => ({
  fetchPeople: () => dispatch(getPeople()),
})

export default connect(mapState, mapDispatch)(People)