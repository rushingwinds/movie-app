import React from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      movies: [],
      movie: {}
    };

    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    this._getPopularMovies();
  }

  getMovies = () => (
    fetch('//localhost:8000/api/popular')
      .then((res) => res.json())
      .then((body) => body.results)
  );

  _getMovies = () => (
    this.getMovies()
      .catch((ex) => console.error(ex))
  );

  _getPopularMovies = () => {
    return this._getMovies()
      .then((movies) => {
        this.setState({movies});
        console.log('state:' , this.state);
      })
  };

  _handleChange(e) {
    this.setState({value: e.target.value});
  }

  _handleSubmit(e) {
    e.preventDefault();
    this._searchQueryMovies(this.state.value);
    this.setState({value: ''});
  }

  searchMovies = (query) => {
    console.log('searchMovies');
    return fetch('//localhost:8000/api/search?query=' + query)
      .then((res) => res.json())
      .then((body) => body.results)
  };

  _searchMovies = (query) => {
    console.log('_searchMovies');
    return this.searchMovies(query)
      .catch((ex) => console.error(ex))
  };

  _searchQueryMovies = (query) => {
    console.log('searchQueryMovies');
    return this._searchMovies(query)
      .then((movies) => {
        this.setState({movies});
        console.log('state:' , this.state);
      })
  };

  render() {
    return (
      <div>
        <SearchBar
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />
        <MovieList
          movies={this.state.movies}
        />
      </div>
    );
  }
}
