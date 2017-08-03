import React from 'react'
import './App.css'

class BooksGrid extends React.Component{
render(){
  let booksArray = this.props.books
  console.log(booksArray);
  return (
    <ol className="books-grid">
      {(booksArray) && (booksArray.map((book) => (
        <li key={book.id}>
          <div className='book'>
            <div className="book-top">
              <div className='book-cover' style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}>
              </div>
              <div className="book-shelf-changer">
                <select onChange={this.props.onChangeProp} data-book={book.id} value={book.shelf}>
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
      )
    ))}
    </ol>

  )
}//Endof Render

}//Endof Class

export default BooksGrid
