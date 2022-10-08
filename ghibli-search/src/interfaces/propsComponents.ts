export interface IFilm {
  id: string,
  title: string,
  original_title: string,
  description: string,
  director: string,
  producer: string,
  release_date: string,
  running_time: string,
  rt_score: string,
  people: string[],
  locations: string[],
  vehicles: string[],
  url: string,
}

export interface IFilmsProps {
  loading: boolean,
  films: IFilm[],
  error: string,
  fetchFilms(): void,
}

export interface IFilmProps {
  film: IFilm,
}

export interface IPerson {
  id: string,
  name: string,
  gender: string,
  age: string,
  eye_color: string,
  hair_color: string,
  films: string[],
  species: string,
  url: string,
}

export interface IPeopleProps {
  loading: boolean,
  people: IPerson[],
  error: string,
  fetchPeople(): void,
}

export interface IPersonProps {
  person: IPerson,
}

export interface IDetails {
  endpoint: string,
}