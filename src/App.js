import React, { Component } from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Home from "./Home";
import Search from "./Search";
import "./App.css";
// import BookShelf from './BookShelf';
// import BookList from './BookList'

// some parts inspire from this repo https://github.com/udacity/reactnd-contacts-app
// and this link https://reactjs.org/docs/getting-started.html

class BooksApp extends Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
  };

  // Get all books from book API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  }
  // Changing books from shelf to another shelf.
  movingBooks = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then((result) => {
      // Change the shelf of the book.
      book.shelf = newShelf;
      //  Filter books accuording to new result after changing the shelf of books.
      const updatedBooks = this.state.books.filter(
        (resultBook) => resultBook.id !== book.id
      );
      updatedBooks.push(book);
      // Set the new state of the book.
      this.setState({ books: updatedBooks });
    });
  };

  render() {
    // const { books } = this.props;

    return (
      <div className="app">
        {/* Rendering the exact page which is Home page. */}
        <Route
          exact
          path="/"
          render={() => <Home books={this.state.books} movingBooks={this.movingBooks} />}
        />
        {/* Rendering the exact page which is page for
           searching book to add it in hom page. */}
        <Route
          exact
          path="/search"
          render={() => <Search books={this.state.books} movingBooks={this.movingBooks} />}
        />
      </div>
    );
  }
}
export default BooksApp;
