import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import _ from 'lodash'
import BooksGrid from './BooksGrid'


class SearchBooks extends React.Component {
  constructor(props) {
    super(props);
    this.debounceFunction = _.debounce(this.debounceFunction, 500)
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    this.props.clearState();
  }

  handleChange = (event) => {
    let bookID = event.target.getAttribute('data-book')
    let value = event.target.value
    this.props.onUpdate(bookID, value)
  }

  debounceFunction = (event) => {
    if (this.state.query.length > 2) {
      this.props.searchQuery(this.state.query);
    } else if (this.state.query.length === 0) {
      this.props.clearState();
    }
  }

  updateQuery = (event) => {
    event.persist();
    this.setState({query: event.target.value.trim()})
    this.debounceFunction(event);
  }

  render() {
    let booksObject = this.props.searchResults;
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.updateQuery.bind(this)}/>
            </div>
          </div>
          <div className="search-books-results">
            {(this.state.query) && <BooksGrid books={booksObject} onChangeProp={this.handleChange}/>}
          </div>
        </div>
      </div>
    )

  }
}

export default SearchBooks
