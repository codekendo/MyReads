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
    const shelves = {currentlyReading: 'Currently Reading', read:'Read', wantToRead: 'Want to Read'}

    return (
      <div className="app">

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>




            {Object.keys(shelves).map((shelfkey)=>{
              let currentlyReading = booksObject.filter((book) => book.shelf === 'currentlyReading')
              let wantToReads = booksObject.filter((book) => book.shelf === 'wantToRead')
              let read = booksObject.filter((book) => book.shelf === 'read')

              return (
                <div className='bookshelf' key={shelfkey}>
                  <h2 className='bookshelf-title'>{shelves[shelfkey]}</h2>
                  <div className='bookshelf-books'>

                    <BooksGrid
                      books={booksObject.filter(
                        (x) => {
                          if(x.shelf===shelfkey){
                            return x}
                          }
                      )}
                      onChangeProp={this.handleChange}
                    />

                  </div>
                </div>
              )
            })}











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
