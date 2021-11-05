import React from 'react'

const Book = (props) => {
    const { id, title, authors, imageLinks: { thumbnail } = {}, shelf } = props.book
    return (
        <li key={id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={shelf} onChange={(e) => { props.bookShelfChangeHandler(e, props.book) }}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors.join(',')}</div>
            </div>
        </li>

    )
}

export default Book;

