import React from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'


class SearchBooks extends React.Component {
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
    this.props.onUpdate(bookID, value)
  }
  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
  }

  render() {
    let showBooks=''
    let booksObject = this.props.books
    if(this.state.query){
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showBooks = booksObject.filter(book=> match.test(book.title))
      console.log(showBooks);
    }
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.query} onChange ={(event) => this.updateQuery(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {(this.state.query.length >0)&&(
                  showBooks.map((book) => (
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
                              <option value="currentlyReading">{(book.shelf==='currentlyReading') && '\u2714'}
                                Currently Reading</option>
                              <option value="wantToRead">{(book.shelf==='wantToRead') && '\u2714'
    }Want to Read</option>
                              <option value="read">{(book.shelf === 'read') && '\u2714'
    }Read</option>
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
                )
}
            </ol>

          </div>
        </div>
      </div>
    )

  }
}

export default SearchBooks
