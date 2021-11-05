import React from 'react'

const AppContext = React.createContext({
    books: [],
    bookShelfChangeHandler: () => { }
})

export default AppContext