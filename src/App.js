import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './components/BooksList'
import AppHeader from './components/AppHeader'
import AddBook from './components/AddBook'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
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
      this.setState((prevState) => ({ ...prevState, books: [...minifiedBookList] }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <>
            <AppHeader />
            <BookList />
            <AddBook />
          </>
        )}
      </div>
    )
  }
}

export default BooksApp
