import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../../BooksAPI'
import Book from '../Book'

class SearchBook extends Component {
    state = {
        searchInput: '',
        books: []
    }

    searchInputChangeHandler = (e) => {
        //Handling input text field as controlled componenet, setting state will force rerendring and calling componentDidUpdate
        const inputValue = e.target.value
        this.setState((prevState) => ({ ...prevState, searchInput: inputValue }))
    }

    //handling side effect calling search API
    componentDidUpdate = (prevProps, prevState) => {
        //Checking searchInput value change to stop infinte loop calls
        if (prevState.searchInput !== this.state.searchInput) {
            //Garding API call for not calling it with empty or null or undefined values
            if (this.state.searchInput) {
                search(this.state.searchInput)
                    .then(books => {
                        this.setState((prevState) => {
                            //Returning empty array if response is error
                            if (books.error) {
                                return { ...prevState, books: [] }
                            } else {
                                //Updating books shelfs based on app book state since search API dosen't return the correct shelf
                                this.updateBooksShelfToMatchAppState(books)
                                return { ...prevState, books }
                            }
                        })
                    })
                    .catch(error => { this.setState((prevState) => ({ ...prevState, books: [] })) })
            } else {
                this.setState((prevState) => ({ ...prevState, books: [] }))
            }
        }
    }

    updateBooksShelfToMatchAppState = (books) => {
        books && books.forEach(book => {
            this.props.appBooks && this.props.appBooks.forEach(appBook => {
                if (appBook.id === book.id) {
                    book.shelf = appBook.shelf
                }
            })
        })
    }

    render = () => {
        const { bookShelfChangeHandler } = this.props

        const renderBook = this.state.books &&
            this.state.books.map(
                (book) => {
                    //Setting default shelf to none
                    book.shelf = 'none'
                    return (<Book key={book.id} book={book} bookShelfChangeHandler={(e) => { bookShelfChangeHandler(e, book) }} />)
                }
            )

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" />
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.searchInput} onChange={this.searchInputChangeHandler} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            renderBook
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook