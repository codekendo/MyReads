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
    }) //EndofMap
    // console.log(updatingStateOfBooks);
    this.setState(state => ({books: updatingStateOfBooks}))
  }

  updateSearchBook(bookID, shelfChange) {
    BooksAPI.update(bookID, shelfChange);
    let updateBookObjects = [];
    let oldState = this.state.books;
    // This changes the object in the
    var newSearchResults = this.state.searchResults.map(function(x) {
      if (x.id === bookID) {
        x.shelf = shelfChange
        updateBookObjects.push(x);
        return x;
      } else {
        return x;
      }
    }) //endofMap

    this.setState(state => ({searchResults: newSearchResults}))
    // console.log('updateBookObjects', updateBookObjects);
    // console.log('oldState', oldState)

    /*
if the book list has the same thing as the search results
*/

    oldState.map(function(x) {
      if (x.id === bookID) {
        x.shelf = shelfChange
        return x;
      } else {
        return x
      }
    })

    this.setState(state => ({books: oldState}))
    // console.log(this.state.books)    this.setState(state => ({searchResults: updatingSearchResults}))
  }

  // updateData(data) {
  //   for (var x = 0; x > data.length; x++) {
  //     console.log(x);
  //     for (var y = 0; y > this.state.books.length; y++) {
  //       if (data[x].id === this.state.books[y].id) {
  //         data[x].shelf = this.state.books[y].shelf
  //       }
  //     }
  //   }
  //   return data;
  // }

  searchTheAPI(query) {
    BooksAPI.search(query, 20).then((data) => {
      // return this.updateData(data);
      // console.log(this.state.books);
      // let dataWrangle = data.map((x)=>{
      //
      //   for (let y of this.state.books) {
      //     console.log(y.id)
      //     console.log(x.id)
      //     if (y.id === x.id) {
      //       x.shelf = y.shelf
      //       return x;
      //     } else {
      //       return x;
      //     }
      //   } //endofFor
      // }) //endofmap
      // console.log(dataWrangle);
      //  this.setState(state => ({searchResults: dataWrangle}))
      //  console.log(this.state.searchResults)

      let dataWrangle = [];
      for (let dataObject of data) {
        for (let bookObject of this.state.books) {
          if (bookObject.id === dataObject.id) {
            dataObject.shelf = bookObject.shelf;
          }
        }
        dataWrangle.push(dataObject)
      }
      return dataWrangle;
    }).then((data) => {
      this.setState(state => ({searchResults: data}))

    }) //endofThen
  }

  clearStateFunction() {
    this.setState({searchResults: []});
  }

  render() {
    // console.log('from render',this.state.books)
    return (
      <div>
        <Route exact path='/' render={() => (<ListBooks books={this.state.books} onUpdateList={(book, shelf) => (this.updateBook(book, shelf))}/>)}/>
        <Route exact path='/search' render={() => (<SearchBooks listOfBooks={this.state.books} searchResults={this.state.searchResults} searchQuery={(query) => (this.searchTheAPI(query))} onUpdate={(book, shelf) => (this.updateSearchBook(book, shelf))} clearState={() => (this.clearStateFunction())}/>)}/>
      </div>
    ) //endOfReturn
  } //endofRender
} //endofClass

export default BooksApp
