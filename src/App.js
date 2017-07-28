import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }


/*
Notes:
The searchBook Api is different than the
getAll book api.
The books returned do not reflect the books being listed


*/
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf);
    // console.log(book);
    // console.log(shelf);
    // console.log(this.state.books);
    let updatingStateOfBooks = this.state.books.map((x) => {
      if (x.id === book) {
        x.shelf = shelf;
        return x;
      } else {
        return x
      }
    })
    // console.log(updatingStateOfBooks);
    this.setState(state => ({books: updatingStateOfBooks}))
  }

  updateSearchBook(bookID, shelfChange) {
    BooksAPI.update(bookID, shelfChange);
    let bookObject;
    let oldState = this.state.books;
    this.state.searchResults.map(function(x) {
      if (x.id === bookID) {
        x.shelf = shelfChange
        bookObject = x;
        return x;
      } else {
        return x;
      }
    }) //endofMap
    // console.log('bookObject', bookObject);
    // console.log('oldState', oldState)
    let newState = oldState.concat(bookObject)

    this.setState(state=> ({books: newState}))

// console.log(this.state.books)    this.setState(state => ({searchResults: updatingSearchResults}))

  }

  searchTheAPI(query) {
    BooksAPI.search(query, 20).then((data) => {
      this.setState(state => ({searchResults: data}))
    })
  }

  clearStateFunction() {
    this.setState({searchResults: []});
  }

  render() {
    // console.log('from render',this.state.books)
    return (
      <div>
        <Route exact path='/' render={() => (<ListBooks books={this.state.books} onUpdateList={(book, shelf) => (this.updateBook(book, shelf))}/>)}/>
        <Route exact path='/search' render={() => (<SearchBooks books={this.state.searchResults} searchQuery={(query) => (this.searchTheAPI(query))} onUpdate={(book, shelf) => (this.updateSearchBook(book, shelf))} clearState={() => (this.clearStateFunction())}/>)}/>
      </div>
    ) //endOfReturn
  } //endofRender
} //endofClass

export default BooksApp
