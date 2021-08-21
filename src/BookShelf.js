import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";


class BookShelf extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    movingBooks: PropTypes.func.isRequired,
    books:PropTypes.array.isRequired
  };
  // To change books between shelves so we need to use state,
  // as props for unchangeable data.
  state = {
    books: [],
  };

  // Get all books from book API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books,
      });
    });
  }

  // Using same movingBooks func here also to apply moving books
  //  from shelf to another in home page name as search page
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
    const shelves = [
      { name: "currentlyReading", title: "Currently Reading" },
      { name: "wantToRead", title: "Want to Read" },
      { name: "read", title: "Read" },
    ];
    return (
      <div>
        <div className="list-books-content">
          {this.state.books.length > 0 && (
            <div>
              {/* Using .map and .filter component to show the book in their shelves. */}
              {shelves.map((bookShelfTitle, index) => {
                const bookShelves = this.state.books.filter(
                  (book) => book.shelf === bookShelfTitle.name
                );
                return (
                  <div className="bookshelf" key={index}>
                    <h2 className="bookshelf-title">{bookShelfTitle.title}</h2>
                    <Shelf
                      key={index}
                      books={bookShelves}
                      shelf={shelves}
                      movingBooks={this.movingBooks}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search">Add Book</Link>
        </div>
      </div>
    );
  }
}
// Create New class component for shelves to maping books through shelves
class Shelf extends Component {
  static propTypes = {
    // bookShelfs: PropTypes.number.isRequired,
    books: PropTypes.array.isRequired,
    movingBooks: PropTypes.func.isRequired,
  };

  render() {
    const { bookShelfs, books, movingBooks } = this.props;
    console.log(this.props);
    return (
      <div>
        {/* After filtering the books arry will maping the 
            books accourding to their shelves*/}
        <div className="bookshelf-books" key={bookShelfs}>
          <ol className="books-grid">
            {books.map((book) => (
              <BookList key={book.id} book={book} movingBooks={movingBooks} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
