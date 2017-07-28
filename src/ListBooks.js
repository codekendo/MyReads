import React from 'react'
// import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

class ListBooks extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let bookID = event.target.getAttribute('data-book')
    let value = event.target.value
    //  console.log(bookID)
    // console.log(event)
    // console.log(this.props.onUpdate);
    this.props.onUpdateList(bookID, value)
  }

  render() {
    let booksObject = this.props.books
    // console.log('bookObjectFrom ListBooks', booksObject)
    let wantToReads = booksObject.filter((book) => book.shelf === 'wantToRead')
    let currentlyReading = booksObject.filter((book) => book.shelf === 'currentlyReading')
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
                  <ol className="books-grid">
                    {currentlyReading.map((book) => (
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
                                <option value="currentlyReading">&#10004; Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {book.authors.map((author, item) => (
                            <div key={item} className="book-authors">{author}</div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToReads.map((book) => (
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
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">
                                  &#10004; Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {book.authors.map((author, item) => (
                            <div key={item} className="book-authors">{author}</div>
                          ))}
                        </div>
                      </li>
                    ))
}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {read.map((book) => (
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
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">
                                  &#10004; Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {book.authors.map((author, item) => (
                            <div key={item} className="book-authors">{author}</div>
                          ))}
                        </div>
                      </li>
                    ))
}

                  </ol>
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
