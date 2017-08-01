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

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf);
    let updatingStateOfBooks = this.state.books.map((x) => {
      if (x.id === book) {
        x.shelf = shelf;
        return x;
      } else {
        return x
      }
    }) //EndofMap
    this.setState(state => ({books: updatingStateOfBooks}))
  }

  updateSearchBook(bookId, shelfChange) {
    BooksAPI.update(bookId, shelfChange);
    let updateBookObjects = [];
    let oldState = this.state.books;
    let newSearchResults = this.state.searchResults.map((x) => {
      if (x.id === bookId) {
        x.shelf = shelfChange
        updateBookObjects.push(x);
        return x
      } else {
        return x
      }
    }) //endofMap

    this.setState(state => ({searchResults: newSearchResults}));
    console.log()

    oldState.map(function(x) {
      if (x.id === bookId) {
        x.shelf = shelfChange
        return x;
      } else {
        return x
      }
    }) //Endof oldState.map
    this.setState(state => ({books: oldState}))
  } //Endof updateSearchBook

  searchTheAPI(query) {
    BooksAPI.search(query, 20).then((data) => {
      let dataWrangle = [];
      if (data.error !== 'empty query') {
        for (let datum of data) {
          for (let book of this.state.books) {
            if (book.id === datum.id) {
              datum.shelf = book.shelf;
            }
          }
          dataWrangle.push(datum)
        }
      }
      return dataWrangle;
    }).then((data) => {
      this.setState(state => ({searchResults: data}))
    }) //endof then
  }

  clearStateFunction() {
    this.setState({searchResults: []});
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (<ListBooks books={this.state.books} onUpdateList={(book, shelf) => (this.updateBook(book, shelf))}/>)}/>
        <Route exact path='/search' render={() => (<SearchBooks listOfBooks={this.state.books} searchResults={this.state.searchResults} searchQuery={(query) => (this.searchTheAPI(query))} onUpdate={(book, shelf) => (this.updateSearchBook(book, shelf))} clearState={() => (this.clearStateFunction())}/>)}/>
      </div>
    ) //endOfReturn
  } //endofRender
} //endofClass

export default BooksApp
