import React from 'react'
// import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

import BooksGrid from './BooksGrid'

class ListBooks extends React.Component {


  handleChange =(event)=> {
    let bookID = event.target.getAttribute('data-book')
    let value = event.target.value
    this.props.onUpdateList(bookID, value)
  }

  render() {
    let booksObject = this.props.books
    let currentlyReading = booksObject.filter((book) => book.shelf === 'currentlyReading')
    let wantToReads = booksObject.filter((book) => book.shelf === 'wantToRead')
    let read = booksObject.filter((book) => book.shelf === 'read')

    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                <BooksGrid books={currentlyReading} onChangeProp={this.handleChange} />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                <BooksGrid books={wantToReads} onChangeProp={this.handleChange} />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                <BooksGrid books={read} onChangeProp={this.handleChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to='/Search'>Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
