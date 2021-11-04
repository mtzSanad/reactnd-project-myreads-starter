import React from 'react'
import BookShelf from './BookShelf';

const BookList = (props) => {
    return (<div className="list-books">
        <div className="list-books-content">
            <div>
                <BookShelf />
            </div>
        </div>
    </div>)
}

export default BookList;