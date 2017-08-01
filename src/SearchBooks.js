import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import _ from 'lodash'

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
            <ol className="books-grid">
              {(this.state.query !== undefined && booksObject.length > 3) && (booksObject.map((book) => (
                <li key={book.id}>
                  <div className='book'>
                    <div className="book-top">
                      <div className='book-cover' style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={this.handleChange} data-book={book.id} value={book.shelf}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">{(book.shelf === 'currentlyReading') && '\u2714'}
                            Currently Reading</option>
                          <option value="wantToRead">
                            {(book.shelf === 'wantToRead') && '\u2714'}
                            Want to Read
                          </option>
                          <option value="read">
                            {(book.shelf === 'read') && '\u2714'}
                            Read
                          </option>
                          <option value="none">
                            {(book.shelf === 'none') && '\u2714'}
                            None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && (book.authors.map((author, item) => (
                      <div key={item} className="book-authors">{author}</div>
                    )))}
                  </div>
                </li>
              )))}
            </ol>
          </div>
        </div>
      </div>
    )

  }
}

export default SearchBooks
