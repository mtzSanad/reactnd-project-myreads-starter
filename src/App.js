import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BooksList'
import AppHeader from './components/AppHeader'
import AppContext from './store/AppContext'
import { Route } from 'react-router-dom'
import SearchBook from './components/search/SearchBook'
import SearchButton from './components/SearchButton'

class BooksApp extends React.Component {
  state = {
    books: [],
    bookShelfChangeHandler: () => { }
  }

  //Life cycle method that runs after component rendered to the DOM should handles any side effect code.
  componentDidMount = () => {
    //Calling getAll Api to get all books and initialize the screen with books
    BooksAPI.getAll().then((books) => {
      //Extracting used information only, to improve performance
      //Using map function to loop through every book in book list
      //Using object destructring in map arrow functionto argument to get required info only
      //Using shorthand object notation to return object
      const minifiedBookList = books.map(({ id, authors, imageLinks, shelf, title, subtitle, publishedDate, printType }) => ({ id, authors, imageLinks, shelf, title, subtitle, publishedDate, printType }))

      //Setting books state to be able to render and re-render page content based on state and its changes.
      //Setting bookshelf handler function to be able to change state based on user interations
      this.setState((prevState) => ({ ...prevState, books: [...minifiedBookList], bookShelfChangeHandler: this.bookShelfChangeHandler }))
    })
  }

  //Handling change of books shelf, the method must exists where its state exists
  bookShelfChangeHandler = (e, vBook) => {
    const { id: bookId } = vBook
    const updatedShelf = e.target.value

    //Changing the state based on book id and value selected
    this.setState((prevState) => {
      //Handling updating shelf of existing book in books application state
      let bookFoundForUpdate = false
      const updatedBooks = prevState.books.map(book => {
        if (book.id === bookId) {
          bookFoundForUpdate = true
          book.shelf = updatedShelf

          //persisting information by calling save api
          BooksAPI.update(book, updatedShelf)
        }
        return book
      })

      if (bookFoundForUpdate) {
        return { ...prevState, books: updatedBooks }
      } else {
        //Adding book to books list
        //persisting information by calling book shelf save api
        BooksAPI.update(vBook, updatedShelf)

        return { ...prevState, books: [...prevState.books, { ...vBook, shelf: updatedShelf }] }
      }
    })
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <Route path="/" exact>
          <div className="app">
            <AppHeader />
            <BookList />
            <SearchButton />
          </div>
        </Route>
        <Route path="/search">
          <SearchBook appBooks={this.state.books} bookShelfChangeHandler={this.bookShelfChangeHandler} />
        </Route>
      </AppContext.Provider>
    )
  }
}

export default BooksApp
