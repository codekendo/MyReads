import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks'
import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // console.log('after render',books)
      this.setState({books})
      // console.log(this.state.books)
    })
  }

  updateBook = (book, shelf) => {
    this.setState((state)=>({
      books:state.books.map();
      //*********FINSH THIS************
    }))

    BooksAPI.updateBook(book, shelf)
  }

  render() {
    //    console.log('from render',this.state.books)
    return (
      <div>
        <Route exact path='/' render={() => (<ListBooks books={this.state.books}/>)}/>
        <Route exact path='/search' render={() => (<SearchBooks/>)}/>
      </div>
    ) //endOfReturn
  } //endofRender
} //endofClass

export default BooksApp
