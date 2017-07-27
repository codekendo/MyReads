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
      // console.log('after render',books)
      this.setState({books})
      // console.log(this.state.books)
    })
  }

  updateBook = (book, shelf) => {
    let newState = this.state.books.map((x) => {
      if (x.id === book) {
        x.shelf = shelf
      }
    })

    BooksAPI.update(book, shelf).then((data) => {
      this.setState(state => ({book: newState}))
    })
    if (this.state.searchResults.length > 0) {
      let newSearchResults = this.state.searchResults.map((x) => {
        if (x.id === book) {
          x.shelf = shelf
        }
      }) //endofMap
      this.setState(state => ({book: newSearchResults}))
    } //endofIf
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
        console.log('from render',this.state.books)
    return (
      <div>
        <Route exact path='/' render={
          () => (
            <ListBooks
              books={this.state.books}
              onUpdate={(book, shelf) => (this.updateBook(book, shelf)
            )
          }/>)}/>
        <Route exact path='/search' render={
          () => (
            <SearchBooks
              books={this.state.searchResults}
              searchQuery={(query) => (this.searchTheAPI(query))}
              onUpdate={(book, shelf) => (this.updateBook(book, shelf))}
              clearState={() => (this.clearStateFunction())}/>)}/>
      </div>
    ) //endOfReturn
  } //endofRender
} //endofClass

export default BooksApp
