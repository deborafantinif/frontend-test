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
  fetchFilms(): void,
}

export interface IFilmProps {
  film: IFilm,
}

export interface IDetails {
  endpoint: string,
}