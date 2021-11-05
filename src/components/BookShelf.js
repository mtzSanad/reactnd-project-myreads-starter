import React from 'react'
import AppContext from '../store/AppContext';
import Book from './Book';

const BookShelf = (props) => {
    return (
        <AppContext.Consumer>
            {
                (appCtx) => {
                    //Getting books list and extract unique shelfs
                    const books = appCtx.books;
                    //This set will hold unique values
                    const shelfsSet = new Set();
                    //Initialize values to keep rendering of page with 3 category
                    shelfsSet.add('currentlyReading')
                    shelfsSet.add('wantToRead')
                    shelfsSet.add('read')

                    //Converting set back to array
                    const shelfs = [...shelfsSet]

                    // const renderShelf = 

                    return (
                        //Returning shelfs dynamically based on data
                        <>
                            {shelfs.map(shelf => (
                                <div key={shelf} className="bookshelf">
                                    <h2 className="bookshelf-title">{shelf}</h2>
                                    <div className="bookshelf-books">
                                        <ol className="books-grid">
                                            {
                                                //Filtering books based on shelf and then loop through result to render each book
                                                books.filter(book => book.shelf === shelf)
                                                    .map(book => {
                                                        return (<Book book={book} key={book.id} bookShelfChangeHandler={appCtx.bookShelfChangeHandler} />)
                                                    })
                                            }
                                        </ol>
                                    </div>
                                </div>
                            ))}
                        </>
                    )
                }
            }
        </AppContext.Consumer>)
}

export default BookShelf;