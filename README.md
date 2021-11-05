# MyReads Project

This project is part of Udacity react nano degree.Simply you will be able to fetch books from udacity API these books can be categorized into 3 category which are currently reading, want to read and read.

Moreover you can search for other books by typing book name and then you can add the book to any of the previous mentioned categories.

You can find the original template of this project [here](https://github.com/udacity/reactnd-project-myreads-starter)

## Installing & Starting the project

First you will need to install the npm dependencies by running the below command inside the project directory

```
npm install
```

After finishing the installation you can start playing with the project by running the below command inside the project directory

```
npm start
```

## How I structure my project

This is a simple project that may not require components folder, but I do like to apply the natural component composition in case in the future it is required to add functionalities to components.

I decided to handl showing the books categories as BooksList > BooksShelf > Book. However, it is not necessary to do this in this project but I see this is the natural flow of the data.

And due to this childrens nesting I decided to use Context API to avoid chaining props.

Book component dosen't use context API, because I need to reuse this component in different places so I made it dumy functional component.

Search component is included under components/search and it handles searching for books and adding it to application main page.

Finally, store folder holds the AppContext.

## Using React Class base Component

This nano degree is focused on React class based component, thats why I didn't use react hooks because I found that react version in configuration is below 16.8.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.


